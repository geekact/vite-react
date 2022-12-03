import { Config } from '../vite';

export const handleServer = (config: Config) => {
  config.server ||= {};
  config.server.open ??= true;
};
