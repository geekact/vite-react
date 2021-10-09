import { ConfigEnv } from 'vite';
import eslint from 'vite-plugin-eslint';
import { override } from '../util/override';
import { enable } from '../util/enable';
import { Config } from '../vite';

type EslintOptions = NonNullable<Parameters<typeof eslint>[number]>;

export interface OverrideEslint {
  eslint?: {
    enable?: boolean | ((env: ConfigEnv) => boolean);
    options?:
      | EslintOptions
      | ((originalOptions: EslintOptions, env: ConfigEnv) => EslintOptions | undefined);
  };
}

export const handleEslint = (config: Config, env: ConfigEnv) => {
  config.plugins ||= [];

  if (enable(config.eslint?.enable, env, false)) {
    config.plugins.push(eslint(override(config.eslint?.options, env, {})));
  }
};
