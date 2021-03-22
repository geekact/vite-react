import { ConfigEnv } from 'vite';
import { Config } from '../vite';

export const handleServer = (config: Config, _env: ConfigEnv) => {
  config.server ||= {};
  config.server.open ??= true;
};
