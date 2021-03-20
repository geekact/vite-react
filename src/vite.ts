import { ConfigEnv, defineConfig as origin, UserConfig } from 'vite';
import { handleBuild } from './handler/build';
import { handleCss, OverrideStyleImport } from './handler/css';
import { handleLegacy, OverrideLegacy } from './handler/legacy';
import { handleMix, OverrideBase } from './handler/mix';
import { handleReactRefresh, OverrideReactRefresh } from './handler/reactRefresh';

export interface Config extends
OverrideStyleImport,
OverrideBase,
OverrideReactRefresh,
OverrideLegacy,
UserConfig
{}

export type ConfigFn = (env: ConfigEnv) => Config;
export type ConfigExport = Config | ConfigFn;

export const defineConfig = (config: ConfigExport = {}) => {
  return origin((env) => {
    return parseConfig(typeof config === 'function' ? config(env) : config, env);
  });
};

const parseConfig = (config: Config, env: ConfigEnv) => {
  handleReactRefresh(config, env);
  handleLegacy(config, env);
  handleCss(config, env);
  handleBuild(config, env);
  handleMix(config, env);

  return config;
};
