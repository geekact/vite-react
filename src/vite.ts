import { ConfigEnv, defineConfig as origin, UserConfig } from 'vite';
import { handleAntd, OverrideAntd } from './handler/antd';
import { handleBuild } from './handler/build';
import { handleCss } from './handler/css';
import { handleLegacy, OverrideLegacy } from './handler/legacy';
import { handleMix, OverrideMix } from './handler/mix';
import { handleReactRefresh, OverrideReactRefresh } from './handler/reactRefresh';
import { handleServer } from './handler/server';

export interface Config extends
OverrideAntd,
OverrideMix,
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
  handleAntd(config, env);
  handleBuild(config, env);
  handleMix(config, env);
  handleServer(config, env);

  return config;
};
