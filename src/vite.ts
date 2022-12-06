import { ConfigEnv, defineConfig as origin, UserConfig, UserConfigExport } from 'vite';
import { handleBuild } from './handler/build';
import { handleCss } from './handler/css';
import { handleHtml, OverrideHtml } from './handler/html';
import { handleLegacy, OverrideLegacy } from './handler/legacy';
import { handleMix, OverrideMix } from './handler/mix';
import { handleReact, OverrideReact } from './handler/react';
import { handleServer } from './handler/server';
import { handleStartOver, OverrideStartOver } from './handler/startOver';
import { handleStyleImport, OverrideStyleImport } from './handler/styleImport';

export interface Config
  extends OverrideMix,
    OverrideReact,
    OverrideLegacy,
    OverrideHtml,
    OverrideStyleImport,
    OverrideStartOver,
    Omit<UserConfig, 'legacy'> {}

export type ConfigFn = (env: ConfigEnv) => Config;
export type ConfigExport = Config | ConfigFn;

export const defineConfig = (config: ConfigExport = {}): UserConfigExport => {
  return origin((env) => {
    return parseConfig(typeof config === 'function' ? config(env) : config, env);
  });
};

const parseConfig = (config: Config, env: ConfigEnv): Omit<Config, 'legacy'> => {
  handleReact(config);
  delete config.react;
  handleLegacy(config);
  delete config.legacy;
  handleCss(config, env);
  handleStyleImport(config);
  delete config.styleImport;
  handleBuild(config);
  handleMix(config);
  handleServer(config);
  handleHtml(config, env);
  delete config.html;
  handleStartOver(config);
  delete config.startOver;

  return config;
};
