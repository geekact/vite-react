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
-   "vite-plugin-restart": "*",
-   "vite-tsconfig-paths": "*",
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
- import restart from 'vite-plugin-restart';
- import tsconfigPaths from 'vite-tsconfig-paths';
+ import { defineConfig } from 'vite-react';

export default defineConfig({
  ...
- plugins: [
-   react(),
-   legacy(),
-   createHtmlPlugin(),
-   restart(),
-   tsconfigPaths(),
- ],
+ react: {},
+ legacy: {},
+ html: {},
  server: {
+   watchExtend: {}
  },
  resolve: {
+   aliasFromTsconfig: true | false | {}
  },
  ...
});
```

# 最佳实践

- 自动使用 react 插件
- 自动引入 `vite/client.d.ts` 类型文件，无需在 tsconfig.json 中指定
- 自动识别在 `tsconfig.json` 中设置的路径别名
- 启动 vite 服务时默认打开浏览器
- 打包后的资源按照后缀放置到不同的文件夹
- 配置 `server.https=true` 时，使用 **SSL** 插件自动生成证书
- css-modules 在开发模式下显示具体文件和类名，在打包时则使用哈希值
- 在指定 `host` 时显示链接二维码以便在手机上快速扫描访问

# react

React 项目基础插件，自动引入配置。

默认使用[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)插件，其在开发环境使用 swc 替换 babel，速度会快好几倍。如果要使用基于 babel 的[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react)，则可以这么配置：

```typescript
export default defineConfig({
  react: {
    swc: false,
  },
});
```

# legacy

使用官方 [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) 插件兼容不支持 `<script type="module">` 标签引入 JS 文件的浏览器。

列举主流浏览器的支持情况：

| 浏览器   | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt="IE" width="24px" height="24px" /><br/>IE | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" /><br/>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /><br/>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /><br/>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /><br/>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /><br/>Opera |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 开始版本 | ❌                                                                                                                                                                                        | 16                                                                                                                                                | 61                                                                                                                                                        | 60                                                                                                                                                            | 10.1                                                                                                                                                      | 48                                                                                                                                                    |
| 发布时间 | ❌                                                                                                                                                                                        | 2017.10.17                                                                                                                                        | 2017.09.05                                                                                                                                                | 2018.05.09                                                                                                                                                    | 2017.05.27                                                                                                                                                | 2017.09.27                                                                                                                                            |

更多浏览器以及手机浏览器兼容性可参考 https://caniuse.com/es6-module

开启 legacy 方式：

```typescript
export default defineConfig({
  legacy: true,
});
```

当然也可以配置一些参数。具体配置请参考 [官方文档](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy#options)

```typescript
export default defineConfig({
  legacy: {
    targets: ['chrome >= 50', 'not dead'],
  },
});
```

# html

对 html 文件进行打包、压缩、传值、实现多页面等处理。请查看官方文档 [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html#useroptions)

```typescript
export default defineConfig({
  html: {
    // ...
  },
});
```

# server.watchExtend

使用插件 [vite-plugin-restart](https://github.com/antfu/vite-plugin-restart) 额外监听文件变化，可重启 vite 服务或者刷新页面。

```typescript
export default defineConfig({
  server: {
    watchExtend: {
      restart: [], // 重启服务
      reload: [], // 刷新页面
    },
  },
});
```

# server.qrcode

默认值：`true`

在开发时使用了 `host` 时，使用插件 [vite-plugin-qrcode](https://github.com/svitejs/vite-plugin-qrcode) 在终端生成二维码，方便手机立即扫码访问。

```typescript
export default defineConfig({
  server: {
    qrcode: true | false | {},
  },
});
```

# resolve.aliasFromTsconfig

默认值：`true`

使用插件 [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths) 自动识别`tsconfig.json`配置中设置的路径别名，省去了重复配置别名的麻烦。

```typescript
export default defineConfig({
  resolve: {
    aliasFromTsconfig: true | false | {},
  },
});
```

# 温馨提示

- 使用 css-modules 时，建议安装 vscode 插件 `clinyong.vscode-css-modules` 以获得更多提示
- 尽量使用 `lodash-es` 代替 `lodash` 以获得 tree-shaking 优化
