# vite-react

基于 [Vite](https://github.com/vitejs/vite) 工具的 react 专属版本

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
- import alias from 'vite-tsconfig-paths';
+ import { defineConfig } from 'vite-react';

export default defineConfig({
  ...
- plugins: [
-   react(), legacy(), createHtmlPlugin(), alias(),
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
- 未配置 `resolve.alias` 时，使用 `vite-tsconfig-paths` 插件自动识别路径别名
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
