# vite-react

[Vite](https://github.com/vitejs/vite) based tooling for react explicitly.

# Installation
```bash
yarn add vite-react --dev
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
+ import { defineConfig } from 'vite-react';
- import legacy from '@vitejs/plugin-legacy';
- import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  ...
- plugins: [reactRefresh(), legacy()],
  ...
});
```

# Features
#### HMR
Recommended plugin `@vitejs/plugin-react-refresh` is builtin.

#### Legacy build
Recommended plugin `@vitejs/plugin-legacy` is builtin.

#### CSS preprocessor
Recommended plugins `scss`, `less` and `postcss` are builtin.

#### {JS|TS} lint
Third plugin `vite-plugin-eslint` is builtin, feel free to focus on your rules.

#### Antd style
`antd` component style will be imported dynamically.
```typescript
// Your code
import { Button, Table } from 'antd';

// Transform code by vite
import { Button, Table } from 'antd';
import 'antd/es/button/style/index';
import 'antd/es/table/style/index';
```

# Extend Options

#### legacy.enable
Type: `boolean` | `(env) => boolean`. Default: `false`

#### legacy.options
Type: `object` | `(options, env) => options | undefined`.

#### html.minify
Type: `boolean` | `(env) => boolean`. Default: `true` for build

#### html.injectData
Type: `object`. Default: `{}`

Inject custom data into html:
```typescript
{
  html: {
    injectData: {
      hello: 'world',
      now: Date.now(),
    }
  }
}
```
And in html file:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="test" content="<%=hello%>" />
    <meta name="deploy-time" content="<%=now%>" />
  </head>
</html>
```

#### eslint.enable
Type: `boolean` | `(env) => boolean`. Default: `false`

A vite plugin to execute eslint rules when serve or build your project.

#### eslinit.options
Type: `object` | `(options, env) => options | undefined`. Default: `{}`

@see [@rollup/plugin-eslint](https://github.com/rollup/plugins/tree/master/packages/eslint)

#### reactRefresh.enable
Type: `boolean` | `(env) => boolean`. Default: `true` for serve

#### reactRefresh.options
Type: `object` | `(options, env) => options | undefined`.

#### antd.theme
Type: `object`. Default: `{}`

The less variables from [antd](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less) you can override.

```typescript
{
  antd: {
    theme: {
      '@body-background': '#ff0000',
      '@font-size-sm': '13px',
    }
  }
}
```

# Tips:
* For css-modules, you'd better install extension `clinyong.vscode-css-modules` to make vscode happy.
* Consider to install `lodash-es` instead of `lodash` in favor of tree-shaking.
* For unsupported extensions, append `?url` or `?raw` to path, such as: `import mydata from '../xx.pdf?url`.
