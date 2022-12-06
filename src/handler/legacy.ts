import legacy from '@vitejs/plugin-legacy';
import { Config } from '../vite';

export interface OverrideLegacy {
  /**
   * For browsers which doesn't support es module by use @vitejs/plugin-legacy.
   * @see https://caniuse.com/es6-module
   */
  legacy?: true | Parameters<typeof legacy>[0];
}

export const handleLegacy = (config: Config) => {
  if (!config.legacy) return;

  config.plugins ||= [];
  config.plugins.push(legacy(config.legacy === true ? void 0 : config.legacy));
};
