# vite-react

[Vite](https://github.com/vitejs/vite) based tooling for react explicitly.

# Installation
```bash
yarn add vite-react
```

# Migrate from vite
#### package.json
```diff
{
  "scripts": {
-   "dev": "vite",
+   "dev": "vite-react",
-   "build": "vite build",
+   "build": "vite-react build",
-   "serve": "vite preview"
+   "serve": "vite-react preview",
  },
  ...
  "devDependencies": {
-   "@vitejs/plugin-legacy": "x.y.z",
-   "@vitejs/plugin-react-refresh": "x.y.z",
-   "less": "x.y.z",
-   "sass": "x.y.z",
-   "vite": "x.y.z",
+   "vite-react": "x.y.z",
    ...
  },
  ...
}
```

#### tsconfig.json
```diff
{
  "compilerOptions": {
    ...
-   "types": ["vite/client"]
    ...
  }
}
```

#### vite.config.ts
```diff
- import { defineConfig } from 'vite';
- import legacy from '@vitejs/plugin-legacy';
- import reactRefresh from '@vitejs/plugin-react-refresh';
+ import { defineConfig } from 'vite-react';

export default defineConfig({
  ...
- plugins: [reactRefresh(), legacy()],
  ...
});
```
