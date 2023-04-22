import tsconfigPaths, { type PluginOptions } from 'vite-tsconfig-paths';
import restart from 'vite-plugin-restart';
import type { UserConfig } from 'vite';
import type { Config } from '../vite';

export interface OverrideResolve {
  resolve?: UserConfig['resolve'] & {
    /**
     * 从`tsconfig.json`中获取路径别名。默认值：`true`
     *
     * 插件：[vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths)
     */
    aliasFromTsconfig?: boolean | PluginOptions;
  };
}

export const handleResolve = (config: Config) => {
  const { aliasFromTsconfig = true } = config.resolve || {};

  if (aliasFromTsconfig) {
    config.plugins ||= [];
    config.plugins.push(
      tsconfigPaths(aliasFromTsconfig === true ? void 0 : aliasFromTsconfig),
      restart({ restart: ['**/tsconfig.json'], glob: true }),
    );
  }
};
