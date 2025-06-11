import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: true,
  sourcemap: true,
  clean: true,
  format: ['esm'],
  platform: 'node',
  tsconfig: './tsconfig.json',
  target: 'node18',
  shims: false,
  dts: true,
});
