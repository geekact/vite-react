import { ConfigEnv } from 'vite';
import {
  VitePluginOptions as StyleImportOptions,
  createStyleImportPlugin,
} from 'vite-plugin-style-import';
import { override } from '../util/override';
import { enable } from '../util/enable';
import { Config } from '../vite';
import { AntdResolve } from 'vite-plugin-style-import';

export const styleResolves = {
  antd: AntdResolve,
};

export interface OverrideStyleImport {
  styleImport?: {
    enable?: boolean | ((env: ConfigEnv) => boolean);
    options?:
      | StyleImportOptions
      | ((originalOptions: StyleImportOptions, env: ConfigEnv) => StyleImportOptions | undefined);
  };
}

export const handleStyleImport = (config: Config, env: ConfigEnv) => {
  config.plugins ||= [];

  if (enable(config.styleImport?.enable, env, true)) {
    config.plugins.push(createStyleImportPlugin(override(config.styleImport?.options, env, {})));
  }
};
