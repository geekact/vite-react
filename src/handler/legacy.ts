import { ConfigEnv } from 'vite';
import legacy, { Options as LegacyOptions } from '@vitejs/plugin-legacy';
import { Config } from '../vite';
import { override } from '../util/override';
import { enable } from '../util/enable';

export interface OverrideLegacy {
  /**
   * For browsers which doesn't support es module.
   *
   * @see https://caniuse.com/es6-module
   * @default false
   */
  enableLegacy?: boolean | ((env: ConfigEnv) => boolean);
  legacyOptions?: LegacyOptions | ((originalOptions: LegacyOptions) => LegacyOptions | undefined);
}

export const handleLegacy = (config: Config, env: ConfigEnv) => {
  config.plugins ||= [];

  if (enable(config.enableLegacy, env, false)) {
    config.plugins.push(legacy(
      override(config.legacyOptions, {})
    ));
  }
};
