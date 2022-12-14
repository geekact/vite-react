import restart from 'vite-plugin-restart';
import ssl from '@vitejs/plugin-basic-ssl';
import { ConfigEnv, UserConfig } from 'vite';
import { Config } from '../vite';

export interface OverrideServer {
  server?: UserConfig['server'] & {
    /**
     * vite目前自动重启的条件有：
     * 1. 修改了 `vite.config.[tj]s` 文件
     *
     * 这里可以添加额外的监听文件。设置`restart`可重启服务，设置`reload`可刷新页面
     */
    watchExtend?: Parameters<typeof restart>[0];
  };
}

export const handleServer = (config: Config, env: ConfigEnv) => {
  config.server ||= {};
  config.preview ||= {};
  config.server.open ??= true;
  config.plugins ||= [];

  if (config.server.https === true || config.preview.https === true) {
    config.plugins.push(ssl());
  }

  const watchExtend = config.server.watchExtend;
  if (env.command === 'serve' && watchExtend) {
    config.plugins.push(restart(watchExtend));
  }
};
