import { defineConfig } from 'vite-react';

export default defineConfig({
  legacy: true,
  html: {
    inject: {
      data: {
        now: Date.now(),
      },
    },
  },
  server: {
    https: true,
  },
});
