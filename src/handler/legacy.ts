import legacy from '@vitejs/plugin-legacy';
import { Config } from '../vite';

export type LegacyOptions = NonNullable<Parameters<typeof legacy>[0]>;

export interface OverrideLegacy {
  /**
   * For browsers which doesn't support es module by use @vitejs/plugin-legacy.
   * @see https://caniuse.com/es6-module
   */
  legacy?: true | LegacyOptions;
}

export const handleLegacy = (config: Config) => {
  if (!config.legacy) return;

  config.plugins ||= [];
  config.plugins.push(legacy(config.legacy === true ? void 0 : config.legacy));
};
