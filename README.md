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

# Features

#### Hot module replacement

Official plugin `@vitejs/plugin-react-refresh` is builtin.

#### Legacy building

Official plugin `@vitejs/plugin-legacy` is builtin.

#### CSS preprocessor

Recommended plugins `scss`, `less` and `postcss` are builtin.

#### HTML handler

Third plugin `vite-plugin-html` is builtin, that can compress html file and helpful to inject dynamic data.

#### {JS|TS} lint

Third plugin `vite-plugin-eslint` is builtin, feel free to focus on your rules.

#### Dynamic style import

Third plugin `vite-plugin-style-import` is builtin.

# Options

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

SEE [vite-plugin-eslint](https://github.com/gxmari007/vite-plugin-eslint)

#### reactRefresh.enable

Type: `boolean` | `(env) => boolean`. Default: `true` for serve

#### reactRefresh.options

Type: `object` | `(options, env) => options | undefined`.

#### styleImport.enable

Type: `boolean` | `(env) => boolean`. Default: `true`

Load dynamic style.

#### styleImport.options

Type: `object` | `(options, env) => options | undefined`.

For example the **antd** ui library, you can do it like this:

```typescript
import { defineConfig, styleResolves } from 'vite-react';

export default defineConfig({
  styleImport: {
    options: {
      resolves: [styleResolves.antd()];
    }
  }
});
```

let's see the magic:

```typescript
// Your code
import { Button, Table } from 'antd';

// Compiled code
import { Button, Table } from 'antd';
import 'antd/es/button/style/index';
import 'antd/es/table/style/index';
```

For more ui library, do it like this:

```typescript
import { defineConfig } from 'vite-react';

export default defineConfig({
  styleImport: {
    options: {
      libs: [
        {
          libraryName: 'xxx',
          esModule: true,
          resolveStyle: (name) => `xxx/es/${name}/style/index`,
        },
        ...
      ];
    }
  }
});
```

# Tips:

- For css-modules, you'd better install extension `clinyong.vscode-css-modules` to make vscode happy.
- Consider to install `lodash-es` instead of `lodash` in favor of tree-shaking.
- For unsupported extensions, append `?url` or `?raw` to path, such as: `import mydata from '../xx.pdf?url`.
