import restart from 'vite-plugin-restart';
import mkcert from 'vite-plugin-mkcert';
import { qrcode as qrcodePlugin, type PluginOptions as QrcodeOptions } from 'vite-plugin-qrcode';
import type { ServerOptions } from 'vite';
import type { Config } from '../vite';

export interface OverrideServer {
  server?: Omit<ServerOptions, 'https'> & {
    /**
     * 证书配置。
     *
     * 如果设置`true`，则自动生成信任证书，并使用http2访问。
     *
     * 插件：[vite-plugin-mkcert](https://github.com/liuweiGL/vite-plugin-mkcert)
     */
    https?: true | ServerOptions['https'];
    /**
     * vite目前自动重启的条件有：
     * - 修改了 `vite.config.[tj]s` 文件
     * - 修改了 `.env[.*]` 文件
     *
     * 这里可以添加额外的监听文件。设置`restart`可重启服务，设置`reload`可刷新页面。
     *
     * 插件：[vite-plugin-restart](https://github.com/antfu/vite-plugin-restart)
     */
    watchExtend?: Parameters<typeof restart>[0];
    /**
     * 开发启动时传递`--host`或者配置了`server.host`时，将展示二维码。
     *
     * 默认值：`true`
     *
     * 插件：[vite-plugin-qrcode](https://github.com/svitejs/vite-plugin-qrcode)
     */
    qrcode?: boolean | QrcodeOptions;
  };
}

export const handleServer = (config: Config) => {
  config.server ||= {};
  config.preview ||= {};
  config.server.open ??= true;
  config.plugins ||= [];

  if (config.server.https === true) {
    config.server.https = undefined;
    config.plugins.push(mkcert({ source: 'coding' }));
  }

  const { watchExtend } = config.server;
  if (watchExtend) {
    config.plugins.push(restart(watchExtend));
  }

  const { qrcode = true } = config.server;
  if (qrcode) {
    config.plugins.push(qrcodePlugin(qrcode === true ? void 0 : qrcode));
  }
};
