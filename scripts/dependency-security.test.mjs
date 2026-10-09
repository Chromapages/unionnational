import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { applyBracesSecurityPatch } from './patch-braces-security.mjs';

const require = createRequire(import.meta.url);
const braces = require('braces');
const bracesRoot = path.dirname(require.resolve('braces/package.json'));
const boundedError = error => error instanceof SyntaxError && /security limit of 100/.test(error.message);

test('every source-map-js copy is patched and normal PostCSS maps round-trip', async () => {
  const projectRoot = path.resolve(import.meta.dirname, '..');
  const lock = JSON.parse(await readFile(path.join(projectRoot, 'package-lock.json'), 'utf8'));
  const locations = Object.keys(lock.packages).filter(location => /(?:^|\/)node_modules\/source-map-js$/.test(location));
  assert.ok(locations.length > 0);
  for (const location of locations) {
    assert.equal(lock.packages[location].version, '1.2.2');
    const dependency = JSON.parse(await readFile(path.join(projectRoot, location, 'package.json'), 'utf8'));
    assert.equal(dependency.version, '1.2.2');
  }
  const postcss = require('postcss');
  const result = await postcss([{
    postcssPlugin: 'security-css-fixture',
    Declaration(declaration) { if (declaration.prop === 'color') declaration.value = 'green'; },
  }]).process('.fixture { color: red; }', {
    from: 'fixture.css', to: 'output.css', map: { inline: false },
  });
  assert.match(result.css, /color: green/);
  const { SourceMapConsumer, SourceNode } = require('source-map-js');
  const map = new SourceMapConsumer(result.map.toJSON());
  assert.deepEqual(map.originalPositionFor({ line: 1, column: 11 }), {
    source: 'fixture.css', line: 1, column: 11, name: null,
  });
  assert.equal(SourceNode.fromStringWithSourceMap(result.css, map).toString(), result.css);
});

test('indexed source-map offsets beyond generated code complete within a bounded process', () => {
  // Run in a child so a future vulnerable install cannot hang the test runner.
  const result = spawnSync(process.execPath, ['-e', `
    const assert = require('node:assert/strict');
    const { SourceMapConsumer, SourceNode } = require('source-map-js');
    const indexedMap = line => ({ version: 3, sections: [{
      offset: { line, column: 0 },
      map: { version: 3, sources: ['fixture.css'], sourcesContent: ['x'], names: [], mappings: 'AAAA' }
    }] });
    assert.throws(() => new SourceMapConsumer(indexedMap(1e12)), /Section offset line must not exceed/);
    const map = new SourceMapConsumer(indexedMap(1e6));
    assert.equal(SourceNode.fromStringWithSourceMap('x', map).toString(), 'x');
  `], { cwd: path.resolve(import.meta.dirname, '..'), timeout: 2000, encoding: 'utf8' });
  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr);
});

test('installed image optimizer rejects private DNS and literal loopback before HTTP', () => {
  const result = spawnSync(process.execPath, ['-e', `
    const assert = require('node:assert/strict');
    const dns = require('node:dns/promises');
    let requests = 0, lookups = 0;
    for (const name of ['node:http', 'node:https']) require(name).request = () => { requests++; throw new Error('Fixture network forbidden'); };
    dns.lookup = async () => { lookups++; return [{ address: '127.0.0.1', family: 4 }]; };
    const { fetchExternalImage } = require('next/dist/server/image-optimizer');
    (async () => {
      await assert.rejects(fetchExternalImage('https://offline-image.invalid/test.png', false, 1024), error => error.statusCode === 400);
      assert.equal(lookups, 1);
      await assert.rejects(fetchExternalImage('http://127.0.0.1/test.png', false, 1024), error => error.statusCode === 400);
      assert.equal(lookups, 1);
      assert.equal(requests, 0);
    })();
  `], { cwd: path.resolve(import.meta.dirname, '..'), timeout: 3000, encoding: 'utf8' });
  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr);
});

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

test('optional Rolldown WASI dependency pins resolve in the lock on every platform', async () => {
  const lock = JSON.parse(await readFile(new URL('../package-lock.json', import.meta.url), 'utf8'));
  const location = 'node_modules/@rolldown/binding-wasm32-wasi';
  const binding = lock.packages[location];
  assert.ok(binding, 'The optional WASI binding must remain in the cross-platform lock.');
  for (const name of ['@emnapi/core', '@emnapi/runtime']) {
    const resolution = lock.packages[`${location}/node_modules/${name}`] ?? lock.packages[`node_modules/${name}`];
    assert.equal(resolution?.version, binding.dependencies[name], `${name} must satisfy the WASI exact pin.`);
  }
  const core = lock.packages[`${location}/node_modules/@emnapi/core`];
  const threads = lock.packages[`${location}/node_modules/@emnapi/wasi-threads`];
  assert.equal(threads?.version, core.dependencies['@emnapi/wasi-threads']);
});
