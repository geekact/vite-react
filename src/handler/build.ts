import { ConfigEnv } from 'vite';
import { Config } from '../vite';

export const handleBuild = (config: Config, env: ConfigEnv) => {
  config.build ||= {};
  config.build.outDir ||= `dist/${env.mode}`;
};
