import { ConfigEnv, UserConfig } from 'vite';

export const handleBuild = (config: UserConfig, env: ConfigEnv) => {
  config.build ||= {};
  config.build.outDir ||= `dist/${env.mode}`;
};
