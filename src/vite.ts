import { ConfigEnv, defineConfig as origin, UserConfig, UserConfigExport } from 'vite';
import { handleBuild } from './handler/build';
import { handleCss } from './handler/css';
import { handleHtml, OverrideHtml } from './handler/html';
import { handleLegacy, OverrideLegacy } from './handler/legacy';
import { handleMix, OverrideMix } from './handler/mix';
import { handleReact, OverrideReact } from './handler/react';
import { handleResolve, OverrideResolve } from './handler/resolve';
import { handleServer, OverrideServer } from './handler/server';

type OverrideKeys = 'legacy' | 'server' | 'resolve';

export interface Config
  extends OverrideMix,
    OverrideReact,
    OverrideLegacy,
    OverrideHtml,
    OverrideServer,
    OverrideResolve,
    Omit<UserConfig, OverrideKeys> {}

export type ConfigFn = (env: ConfigEnv) => Config;
export type ConfigExport = Config | ConfigFn;

export const defineConfig = (config: ConfigExport = {}): UserConfigExport => {
  return origin((env) => {
    return parseConfig(typeof config === 'function' ? config(env) : config, env);
  });
};

const parseConfig = (config: Config, env: ConfigEnv): Omit<Config, OverrideKeys> => {
  handleReact(config);
  delete config.react;
  handleLegacy(config);
  delete config.legacy;
  handleCss(config, env);
  handleBuild(config);
  handleMix(config);
  handleServer(config);
  delete config.server?.watchExtend;
  delete config.server?.qrcode;
  handleHtml(config, env);
  delete config.html;
  handleResolve(config);
  delete config.resolve?.aliasFromTsconfig;

  return config;
};
