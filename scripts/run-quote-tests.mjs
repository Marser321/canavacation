import { mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const outfile = 'node_modules/.tmp/quote.test.mjs';

await mkdir('node_modules/.tmp', { recursive: true });

await build({
  entryPoints: ['src/lib/quote.test.ts'],
  outfile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  sourcemap: false,
  logLevel: 'silent'
});

await import(pathToFileURL(`${process.cwd()}/${outfile}`).href);

