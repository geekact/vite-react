import { ConfigEnv, defineConfig as origin, UserConfig, UserConfigExport } from 'vite';
import { handleBuild } from './handler/build';
import { handleCss } from './handler/css';
import { handleEslint, OverrideEslint } from './handler/eslint';
import { handleHtml, OverrideHtml } from './handler/html';
import { handleLegacy, OverrideLegacy } from './handler/legacy';
import { handleMix, OverrideMix } from './handler/mix';
import { handleReact, OverrideReact } from './handler/react';
import { handleServer } from './handler/server';
import { handleStyleImport, OverrideStyleImport } from './handler/styleImport';

export interface Config
  extends OverrideMix,
    OverrideReact,
    OverrideLegacy,
    OverrideHtml,
    OverrideEslint,
    OverrideStyleImport,
    UserConfig {}

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
  handleReact(config, env);
  handleLegacy(config, env);
  handleCss(config, env);
  handleStyleImport(config, env);
  handleBuild(config, env);
  handleMix(config, env);
  handleServer(config, env);
  handleHtml(config, env);

  return config;
};
