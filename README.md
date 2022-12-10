# vite-react

基于 [Vite](https://github.com/vitejs/vite) 工具的 react 专属配置

[![npm peer dependency vite version](https://img.shields.io/npm/dependency-version/vite-react/peer/vite?logo=vite)](https://github.com/vitejs/vite)
[![npm](https://img.shields.io/npm/v/vite-react?logo=npm)](https://www.npmjs.com/package/vite-react)
[![License](https://img.shields.io/github/license/geekact/vite-react?logo=open-source-initiative)](https://github.com/geekact/vite-react/blob/master/LICENSE)
[![Code Style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier)](https://github.com/prettier/prettier)

# 安装

```bash
# npm
npm install vite vite-react --save-dev
# yarn
yarn add vite vite-react --dev
# pnpm
pnpm add vite vite-react -D
```

# 配置迁移

### package.json

```diff
{
  "devDependencies": {
-   "@vitejs/plugin-legacy": "*",
-   "@vitejs/plugin-react": "*",
-   "less": "*",
-   "sass": "*",
    "vite": "*",
-   "vite-plugin-html": "*",
+   "vite-react": "*"
    ...
  },
  ...
}
```

### tsconfig.json

```diff
{
  "compilerOptions": {
    ...
-   "types": ["vite/client"]
    ...
  }
}
```

### vite.config.ts

```diff
- import { defineConfig } from 'vite';
- import legacy from '@vitejs/plugin-legacy';
- import react from '@vitejs/plugin-react';
- import { createHtmlPlugin } from 'vite-plugin-html';
+ import { defineConfig } from 'vite-react';

export default defineConfig({
  ...
- plugins: [
-   react(), legacy(), createHtmlPlugin()
- ],
+ react: {},
+ legacy: {},
+ html: {},
  ...
});
```

# 最佳实践

- 自动使用 react 插件
- 自动引入 `vite/client.d.ts` 类型文件，无需在 tsconfig.json 中指定
- 启动 vite 服务时默认打开浏览器
- 打包后的资源按照后缀放置到不同的文件夹
- 配置 `server.https=true` 时，使用 **SSL** 插件自动生成证书
- css-modules 在开发模式下显示具体文件和类名，在打包时则使用哈希值

# react

React 项目基础插件。具体配置请查看官方文档 [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react)

# legacy

兼容不支持 ES 模块的浏览器。请查看官方文档 [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy#options)

# html

对 html 文件的动态处理。请查看官方文档 [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html#useroptions)

# 温馨提示

- 使用 css-modules 时，建议安装 vscode 插件 `clinyong.vscode-css-modules` 以获得更多提示
- 尽量使用 `lodash-es` 代替 ~~`lodash`~~ 以获得 tree-shaking 优化
- 对于 vite 无法识别的文件后缀，在路径后面增加 `?url` 或者 `?raw`。比如：`import mydata from '../xx.pdf?url`
