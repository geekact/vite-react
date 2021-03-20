import { ConfigEnv } from 'vite';
import { Config } from '../vite';

export interface OverrideBase {
  /**
   * Base public path when served in development or production.
   * @default './'
   */
  base?: string;
}

export const handleMix = (config: Config, _env: ConfigEnv) => {
  config.base ??= './';
};
