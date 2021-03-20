import { ConfigEnv } from 'vite';
import { Config } from '../vite';
import legacy, { Options as LegacyOptions } from '@vitejs/plugin-legacy';
import { override } from '../util/override';
import { enable } from '../util/enable';

export interface OverrideLegacy {
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
