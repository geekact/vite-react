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
-   "vite-plugin-restart": "*",
-   "vite-plugin-style-import": "*",
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
- import { createStyleImportPlugin } from 'vite-plugin-style-import';
- import VitePluginRestart from 'vite-plugin-restart';
+ import { defineConfig } from 'vite-react';

export default defineConfig({
  ...
- plugins: [
-   react(), legacy(), createHtmlPlugin(), createStyleImportPlugin(), VitePluginRestart()
- ],
+ react: {},
+ legacy: {},
+ html: {},
+ styleImport: {},
+ startOver: {},
  ...
});
```

# 最佳实践

- 自动引入 `vite/client.d.ts` 类型文件
- 启动 vite 服务时默认打开浏览器
- css-modules 在开发模式下显示具体文件和类名，在打包时则使用哈希值
- 打包后的资源按照后缀放置到不同的文件夹

# react

React 项目基础插件。具体配置请查看官方文档 [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react)

# legacy

兼容不支持 ES 模块的浏览器。请查看官方文档 [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy#options)

# html

对 html 文件的动态蛇者

#### html.minify [boolean]

是否压缩 html 文件，在 `build` 阶段默认打开

#### html.injectData [object]

注入动态数据

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

接着你可以在 html 文件中接收动态数据

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="test" content="<%=hello%>" />
    <meta name="deploy-time" content="<%=now%>" />
  </head>
</html>
```

# styleImport

按需加载 UI 库的样式，最常见的 reactUI 框架是`antd`，你可以这么做：

```typescript
import { defineConfig } from 'vite-react';

export default defineConfig({
  styleImport: {
    resolves: ['antd'],
  },
});
```

按需加载的转译方式如下所示：

```typescript
// 源代码
import { Button, Table } from 'antd';

// 转译后的代码
import { Button, Table } from 'antd';
import 'antd/es/button/style/index';
import 'antd/es/table/style/index';
```

对于更多样式设置，请参考官方文档 [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html#useroptions)

# startOver

指定文件变化时**重启 vite 服务**或者**全量刷新页面**，和`nodemon`说拜拜。

### startOver.restart [string | Array<string>]

给定文件变化时，重启 vite 服务，比如 `['my.config.[jt]s']`

### startOver.reload [string | Array<string>]

给定文件变化时，刷新页面，比如 `['my.config.[jt]s']`

### startOver.delay [number=500]

延时生效的毫秒数

### startOver.glob [bool=true]

restart|reload 列举的文件是否允许使用匹配符号

# 温馨提示

- 使用 css-modules 时，建议安装 vscode 插件 `clinyong.vscode-css-modules` 以获得更多提示
- 尽量使用 `lodash-es` 代替 ~~`lodash`~~ 以获得 tree-shaking 优化
- 对于 vite 无法识别的文件后缀，在路径后面增加 `?url` 或者 `?raw`。比如：`import mydata from '../xx.pdf?url`
