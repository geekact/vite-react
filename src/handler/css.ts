import type { ConfigEnv } from 'vite';
import type { Config } from '../vite';

export const handleCss = (config: Config, env: ConfigEnv) => {
  config.css ||= {};
  if (config.css.modules === false) return;
  config.css.modules ||= {};
  config.css.modules.generateScopedName ??=
    env.command === 'build' ? '[hash:base64]' : '[path][name]-[ext]___[local]';
};
