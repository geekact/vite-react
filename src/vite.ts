import { ConfigEnv, defineConfig as origin, UserConfig, UserConfigExport } from 'vite';
import { handleAntd, OverrideAntd } from './handler/antd';
import { handleBuild } from './handler/build';
import { handleCss } from './handler/css';
import { handleEslint, OverrideEslint } from './handler/eslint';
import { handleHtml, OverrideHtml } from './handler/html';
import { handleLegacy, OverrideLegacy } from './handler/legacy';
import { handleMix, OverrideMix } from './handler/mix';
import { handleReactRefresh, OverrideReactRefresh } from './handler/reactRefresh';
import { handleServer } from './handler/server';

export interface Config extends
OverrideAntd,
OverrideMix,
OverrideReactRefresh,
OverrideLegacy,
OverrideHtml,
OverrideEslint,
UserConfig
{}

export type ConfigFn = (env: ConfigEnv) => Config;
export type ConfigExport = Config | ConfigFn;

export const defineConfig = (config: ConfigExport = {}): UserConfigExport => {
  return origin((env) => {
    return parseConfig(typeof config === 'function' ? config(env) : config, env);
  });
};

const parseConfig = (config: Config, env: ConfigEnv) => {
  /**
   * Plugin eslint should inject before react-refresh.
   * @see https://github.com/vitejs/vite/issues/2663
   */
  handleEslint(config, env);
  handleReactRefresh(config, env);
  handleLegacy(config, env);
  handleCss(config, env);
  handleAntd(config, env);
  handleBuild(config, env);
  handleMix(config, env);
  handleServer(config, env);
  handleHtml(config, env);

  return config;
};
