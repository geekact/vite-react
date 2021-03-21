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

# Feature
#### HMR
We builtin recommended plugin `@vitejs/plugin-react-refresh` and is enabled for `serve` command by default.

#### Legacy support
We builtin recommended plugin `@vitejs/plugin-legacy` and is enabled by default.

#### Antd
`antd` and `antd-mobile` component style will be imported dynamically.
```typescript
// Your code
import { Button, Table } from 'antd';

// Transform code by vite
import { Button, Table } from 'antd';
import 'antd/es/button/style/index';
import 'antd/es/table/style/index';
```

# Extend Options
#### antdTheme
Type: `object`. Default: `{}`

The less variables from [antd](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less) you can override.

```typescript
{
  antdTheme: {
    '@body-background': '#ff0000',
    '@font-size-sm': '13px',
  }
}
```

#### antdMobileTheme
Type: `object`. Default: `{}`

The less variables from [antd-mobile](https://github.com/ant-design/ant-design-mobile/blob/master/components/style/themes/default.less) you can override.

```typescript
{
  antdMobileTheme: {
    '@color-text-base': '#ff0000',
  }
}
```

#### enableLegacy
Type: `boolean` | `(env) => boolean`. Default: `true`

#### enableReactRefresh
Type: `boolean` | `(env) => boolean`. Default: `true` for serve, `false` for build
