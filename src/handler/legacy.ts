import { ConfigEnv } from 'vite';
import { LegacyOptions as OriginLegacyOptions } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { Config } from '../vite';
import { override } from '../util/override';
import { enable } from '../util/enable';

export type LegacyOptions = NonNullable<Parameters<typeof legacy>[0]>;

export interface OverrideLegacy {
  /**
   * For browsers which doesn't support es module by use @vitejs/plugin-legacy.
   * @see https://caniuse.com/es6-module
   */
  legacy?: {
    /**
     * @default false
     */
    enable?: boolean | ((env: ConfigEnv) => boolean);
    options?:
      | LegacyOptions
      | ((originalOptions: LegacyOptions, env: ConfigEnv) => LegacyOptions | undefined);
  } & OriginLegacyOptions;
}

export const handleLegacy = (config: Config, env: ConfigEnv) => {
  config.plugins ||= [];

  if (enable(config.legacy?.enable, env, false)) {
    config.plugins.push(legacy(override(config.legacy?.options, env, {})));
  }
};
