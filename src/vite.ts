import {
  type ConfigEnv,
  defineConfig as origin,
  type UserConfig,
  type UserConfigExport,
} from 'vite';
import { handleBuild } from './handler/build';
import { handleCss } from './handler/css';
import { handleHtml, type OverrideHtml } from './handler/html';
import { handleLegacy, type OverrideLegacy } from './handler/legacy';
import { handleMix, type OverrideMix } from './handler/mix';
import { handleReact, type OverrideReact } from './handler/react';
import { handleResolve, type OverrideResolve } from './handler/resolve';
import { handleServer, type OverrideServer } from './handler/server';

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
