## [2.4.2](https://github.com/geekact/vite-react/compare/v2.4.1...v2.4.2)&nbsp;&nbsp;(2023-03-02)

- aliasFromTsconfig 启用时监听tsconfig.json文件
- 打包后尺寸警告阈值提升到800K
- 升级依赖包到最新版本

## [2.4.1](https://github.com/geekact/vite-react/compare/v2.4.0...v2.4.1)&nbsp;&nbsp;(2023-01-06)

- react-swc 支持传递更多选项
- 修复 html 未配置时插件不启用的问题
- 更新打包文件名

## [2.4.0](https://github.com/geekact/vite-react/compare/v2.3.0...v2.4.0)&nbsp;&nbsp;(2023-01-04)

- 在终端生成链接二维码

## [2.3.0](https://github.com/geekact/vite-react/compare/v2.2.0...v2.3.0)&nbsp;&nbsp;(2023-01-03)

- 自动识别来自 `tsconfig.json` 配置的路径别名

## [2.2.0](https://github.com/geekact/vite-react/compare/v2.1.0...v2.2.0)&nbsp;&nbsp;(2022-12-14)

- 可通过设置 `server.watchExtend` 自定义监听文件以重启服务
- 取消 `build.reportCompressedSize` 配置，不再阻止展示 gzip 大小
- 完善 css-modules 在开发环境下的名称

## [2.1.0](https://github.com/geekact/vite-react/compare/v2.0.0...v2.1.0)&nbsp;&nbsp;(2022-12-14)

- 重新支持 commonjs
- react 插件默认使用 @vitejs/plugin-react-swc

## [2.0.0](https://github.com/geekact/vite-react/compare/v1.0.0...v2.0.0)&nbsp;&nbsp;(2022-12-10)

- 要求最低 vite 版本为 4.0
- 为本地 https 自动生成证书

## [1.0.0](https://github.com/geekact/vite-react/compare)&nbsp;&nbsp;(2022-12-09)

- 删除插件`babel-plugin-style-import`，antd 升级到 5.0 之后不再需要按需引入了
