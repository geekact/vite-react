import { ConfigEnv } from 'vite';
import { Config } from '../vite';
import legacy, { Options as LegacyOptions } from '@vitejs/plugin-legacy';
import { override } from '../util/override';

export interface OverrideLegacy {
  enableLegacy?: (env: ConfigEnv) => boolean;
  legacyOptions?: (originalOptions: LegacyOptions) => LegacyOptions | undefined;
}

export const handleLegacy = (config: Config, env: ConfigEnv) => {
  config.plugins ||= [];

  if (config.enableLegacy && config.enableLegacy(env)) {
    config.plugins.push(legacy(
      override(config.legacyOptions, {})
    ));
  }
};
