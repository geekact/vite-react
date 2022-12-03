import { Config } from '../vite';

export interface OverrideMix {
  /**
   * Base public path when served in development or production.
   * @default './'
   */
  base?: string;
  /**
   * @default false
   */
  clearScreen?: boolean;
}

export const handleMix = (config: Config) => {
  config.base ??= './';
  config.clearScreen ??= false;
};
