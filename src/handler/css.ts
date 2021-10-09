import { ConfigEnv } from 'vite';
import { Config } from '../vite';

export const handleCss = (config: Config, env: ConfigEnv) => {
  config.css ||= {};
  config.css.modules ||= {};

  if (config.css.modules !== false) {
    config.css.modules.generateScopedName ??=
      env.command === 'build' ? '[hash:base64]' : '[path][name]__[local]';
  }
};
