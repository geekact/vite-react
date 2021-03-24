import { defineConfig } from 'vite-react';

export default defineConfig({
  html: {
    injectData: {
      now: '2021-03-24', // OR use Date constructor
    },
  },
  legacy: {
    enable: true,
  }
});
