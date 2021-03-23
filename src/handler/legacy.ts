import { ConfigEnv } from 'vite';
import legacy, { Options as LegacyOptions } from '@vitejs/plugin-legacy';
import { Config } from '../vite';
import { override } from '../util/override';
import { enable } from '../util/enable';

export interface OverrideLegacy {
  /**
   * For browsers which doesn't support es module by use @vitejs/plugin-legacy.
   * @see https://caniuse.com/es6-module
   */
  legacy?: {
    /**
     * @default true for build
     */
    enable?: boolean | ((env: ConfigEnv) => boolean);
    options?: LegacyOptions | ((originalOptions: LegacyOptions, env: ConfigEnv) => LegacyOptions | undefined);
  }
}

export const handleLegacy = (config: Config, env: ConfigEnv) => {
  config.plugins ||= [];

  if (enable(config.legacy?.enable, env, env.command === 'build')) {
    config.plugins.push(legacy(
      override(config.legacy?.options, env, {})
    ));
  }
};
