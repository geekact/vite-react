import { ConfigEnv, defineConfig as origin, UserConfig } from 'vite';
import { handleBuild } from './handler/build';
import { handleCss } from './handler/css';
import { handleReactRefresh, OverrideReactRefresh } from './handler/reactRefresh';

export interface Override extends OverrideReactRefresh {}

export interface Config extends UserConfig {
  overrides?: Override;
}

export type ConfigFn = (env: ConfigEnv) => Config;
export type ConfigExport = Config | ConfigFn;

export const defineConfig = (config: ConfigExport = {}) => {
  return origin((env) => {
    return parseConfig(typeof config === 'function' ? config(env) : config, env);
  });
};

const parseConfig = (options: Config, env: ConfigEnv) => {
  const { overrides = {}, ...config } = options;

  handleReactRefresh(config, overrides, env);
  handleCss(config, env);
  handleBuild(config, env);

  return config;
};
