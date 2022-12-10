import alias from 'vite-tsconfig-paths';
import { Config } from '../vite';

export const handleAlias = (config: Config) => {
  config.resolve ||= {};

  if (config.resolve.alias === undefined) {
    config.plugins ||= [];
    config.plugins.push(alias());
  }
};
