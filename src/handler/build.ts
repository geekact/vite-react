import { ConfigEnv } from 'vite';
import { Config } from '../vite';

export const handleBuild = (config: Config, _env: ConfigEnv) => {
  config.build ||= {};
  // Unnecessary to show this and improve build speed.
  config.build.brotliSize ??= false;
};
