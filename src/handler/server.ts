import { Config } from '../vite';
import ssl from '@vitejs/plugin-basic-ssl';

export const handleServer = (config: Config) => {
  config.server ||= {};
  config.server.open ??= true;

  if (config.server.https === true || config.preview?.https === true) {
    config.plugins ||= [];
    config.plugins.push(ssl());
  }
};
