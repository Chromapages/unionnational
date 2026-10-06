import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { applyBracesSecurityPatch } from './patch-braces-security.mjs';

const require = createRequire(import.meta.url);
const braces = require('braces');
const bracesRoot = path.dirname(require.resolve('braces/package.json'));
const boundedError = error => error instanceof SyntaxError && /security limit of 100/.test(error.message);

test('brace depth patch is installed on every lockfile copy and is idempotent', async () => {
  const checked = await applyBracesSecurityPatch({ checkOnly: true });
  assert.ok(checked.packagesChecked > 0);
  assert.equal((await applyBracesSecurityPatch()).filesPatched, 0);
});

test('normal ranges, nesting, escaping and quoted literals keep their behavior', () => {
  assert.deepEqual(braces.expand('src/{app,lib}/file-{01..03}.ts'), [
    'src/app/file-01.ts', 'src/app/file-02.ts', 'src/app/file-03.ts',
    'src/lib/file-01.ts', 'src/lib/file-02.ts', 'src/lib/file-03.ts',
  ]);
  assert.deepEqual(braces.expand('{a,{b,c}}'), ['a', 'b', 'c']);
  assert.equal(braces.compile('src/{app,lib}/**/*.ts'), 'src/(app|lib)/**/*.ts');
  assert.equal(braces.stringify(braces.parse('file-{a,b}.ts')), 'file-{a,b}.ts');
  assert.deepEqual(braces.expand(String.raw`\{literal\}`), ['{literal}']);
  assert.equal(braces.stringify(braces.parse(`"${'{'.repeat(200)}"`)), '{'.repeat(200));
  assert.deepEqual(braces.expand('[{}]/{a,b}'), ['[{}]/a', '[{}]/b']);
});

test('deep balanced, unbalanced and parenthesized strings stop before uncontrolled recursion', () => {
  for (const pattern of [
    '{'.repeat(4000) + 'x' + '}'.repeat(4000),
    '{'.repeat(4000) + 'x',
    '('.repeat(4000) + 'x' + ')'.repeat(4000),
    '{('.repeat(1000) + 'x' + ')}'.repeat(1000),
  ]) {
    for (const operation of [braces.parse, braces.compile, braces.expand, braces.stringify]) {
      assert.throws(() => operation(pattern), boundedError);
    }
  }
});

test('direct AST entry points also enforce the depth bound', () => {
  function deepAst() {
    let node = { type: 'text', value: 'x' };
    for (let depth = 0; depth < 500; depth++) node = { type: 'paren', nodes: [node] };
    return { type: 'root', nodes: [node] };
  }
  for (const operation of [braces.compile, braces.expand, braces.stringify]) {
    assert.throws(() => operation(deepAst()), boundedError);
  }
});

test('source drift fails before any writes and missing guards fail verification', async () => {
  const fixture = await mkdtemp(path.join(os.tmpdir(), 'union-braces-security-'));
  try {
    const dependency = path.join(fixture, 'node_modules', 'braces');
    await mkdir(path.dirname(dependency), { recursive: true });
    await cp(bracesRoot, dependency, { recursive: true });
    await writeFile(path.join(fixture, 'package-lock.json'), JSON.stringify({
      packages: { 'node_modules/braces': { version: '3.0.3' } },
    }));
    assert.equal((await applyBracesSecurityPatch({ root: fixture })).filesPatched, 0);
    const compile = path.join(dependency, 'lib', 'compile.js');
    await writeFile(compile, (await readFile(compile, 'utf8')) + '\n// unexpected source drift\n');
    const parse = path.join(dependency, 'lib', 'parse.js');
    const before = createHash('sha256').update(await readFile(parse)).digest('hex');
    await assert.rejects(applyBracesSecurityPatch({ root: fixture }), /hash changed/);
    assert.equal(createHash('sha256').update(await readFile(parse)).digest('hex'), before);

    await writeFile(parse, (await readFile(parse, 'utf8')).replaceAll(
      "      if (stack.length >= 100) throw new SyntaxError('Brace nesting exceeds the security limit of 100');\n", ''));
    await assert.rejects(applyBracesSecurityPatch({ root: fixture, checkOnly: true }), /patch is missing/);
  } finally {
    // The fixture is explicitly created under tmp, and no symlink targets are used.
    const resolvedFixture = path.resolve(fixture);
    if (path.dirname(resolvedFixture) !== path.resolve(os.tmpdir()) || !path.basename(resolvedFixture).startsWith('union-braces-security-')) {
      throw new Error('Refusing to remove a path outside the dependency test fixture.');
    }
    await rm(resolvedFixture, { recursive: true, force: true });
  }
});

test('Sanity runtime CLI can package and read a local asset with patched adm-zip', async () => {
  const runtimeRequire = createRequire(new URL('../node_modules/@sanity/runtime-cli/package.json', import.meta.url));
  const AdmZip = runtimeRequire('adm-zip');
  const archive = new AdmZip();
  archive.addFile('index.js', Buffer.from('export default () => 1;'));
  const bytes = archive.toBuffer();
  const roundTrip = new AdmZip(bytes);
  assert.equal(roundTrip.getEntry('index.js').getData().toString(), 'export default () => 1;');
});

test('Sanity UUID wrapper retains CommonJS v4 document ID generation', () => {
  const { uuid } = require('@sanity/uuid');
  const id = uuid();
  assert.match(id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
});
