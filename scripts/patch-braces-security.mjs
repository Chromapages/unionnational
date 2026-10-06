import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// GHSA-vfj7-8cjw-p6xm has no upstream release. Keep the installed version honest.
// This bounded patch follows https://github.com/micromatch/braces/issues/70.
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const depthError = "throw new SyntaxError('Brace nesting exceeds the security limit of 100');";
const sourceHashes = {
  'parse.js': 'e572166565f15fa6ad9865ae49d678218e32aabfd1b3720f6d0d43d39800d310',
  'compile.js': 'dc98f22eee3d511785d92a00758d5f0d48efed5f5813bdecc2de430c529b5c9f',
  'expand.js': '41ccc196ebfa7b7781a634e721eb744e4e7bcb54cba427a7e3d6806a1b9e58f7',
  'stringify.js': '379f22d77bfa1478341ccd49c5e4267464aabcbba03558bab332aac23fc6f23a',
};

const sha256 = source => createHash('sha256').update(source).digest('hex');
const normalized = source => source.replaceAll('\r\n', '\n');

function replaceExact(source, before, after, count = 1) {
  if (source.split(before).length - 1 !== count) {
    throw new Error('braces patch anchors changed; review the upstream source before installation.');
  }
  return source.replaceAll(before, after);
}

function patchedSource(file, source) {
  if (file === 'parse.js') {
    return replaceExact(source, '      stack.push(block);',
      `      if (stack.length >= 100) ${depthError}\n      stack.push(block);`, 2);
  }
  const walker = file === 'stringify.js' ? 'stringify' : 'walk';
  let patched = replaceExact(source, `  const ${walker} = (node, parent = {}) => {`,
    `  const ${walker} = (node, parent = {}, depth = 0) => {\n    if (depth > 100) ${depthError}`);
  patched = replaceExact(patched,
    file === 'stringify.js' ? 'stringify(child)' : 'walk(child, node)',
    file === 'stringify.js' ? 'stringify(child, {}, depth + 1)' : 'walk(child, node, depth + 1)');
  return patched;
}

function originalSource(file, source) {
  if (file === 'parse.js') {
    return replaceExact(source,
      `      if (stack.length >= 100) ${depthError}\n      stack.push(block);`,
      '      stack.push(block);', 2);
  }
  const walker = file === 'stringify.js' ? 'stringify' : 'walk';
  let original = replaceExact(source,
    `  const ${walker} = (node, parent = {}, depth = 0) => {\n    if (depth > 100) ${depthError}`,
    `  const ${walker} = (node, parent = {}) => {`);
  original = replaceExact(original,
    file === 'stringify.js' ? 'stringify(child, {}, depth + 1)' : 'walk(child, node, depth + 1)',
    file === 'stringify.js' ? 'stringify(child)' : 'walk(child, node)');
  return original;
}

export async function applyBracesSecurityPatch({ root = projectRoot, checkOnly = false } = {}) {
  const lock = JSON.parse(await readFile(path.join(root, 'package-lock.json'), 'utf8'));
  const locations = Object.keys(lock.packages).filter(location => /(?:^|\/)node_modules\/braces$/.test(location));
  const updates = [];
  for (const location of locations) {
    const directory = path.resolve(root, location);
    if (!directory.startsWith(path.join(root, 'node_modules') + path.sep)) {
      throw new Error('braces lockfile path is outside node_modules.');
    }
    let manifest;
    try {
      manifest = JSON.parse(await readFile(path.join(directory, 'package.json'), 'utf8'));
    } catch (error) {
      if (error.code === 'ENOENT' && lock.packages[location].dev && process.env.NODE_ENV === 'production') continue;
      throw error;
    }
    if (manifest.name !== 'braces' || manifest.version !== '3.0.3') {
      throw new Error('braces version changed; review the upstream advisory and retire or update the patch.');
    }
    for (const [file, expectedHash] of Object.entries(sourceHashes)) {
      const target = path.join(directory, 'lib', file);
      const source = normalized(await readFile(target, 'utf8'));
      if (sha256(source) === expectedHash) {
        if (checkOnly) throw new Error(`braces security patch is missing from ${location}/lib/${file}.`);
        updates.push({ target, source: patchedSource(file, source) });
        continue;
      }
      if (sha256(originalSource(file, source)) !== expectedHash) {
        throw new Error(`braces source hash changed in ${location}/lib/${file}; installation stopped for review.`);
      }
    }
  }
  // Validate every file before writing so source drift cannot leave a partial patch.
  for (const update of updates) await writeFile(update.target, update.source, 'utf8');
  return { packagesChecked: locations.length, filesPatched: updates.length };
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  try {
    const result = await applyBracesSecurityPatch({ checkOnly: process.argv.includes('--check') });
    console.log(`braces depth guard: ${result.packagesChecked} package(s) verified; ${result.filesPatched} file(s) patched.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
