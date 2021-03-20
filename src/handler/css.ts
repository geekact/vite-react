import { ConfigEnv } from 'vite';
import styleImport from 'vite-plugin-style-import';
import { toArray } from '../util/toArray';
import { Config } from '../vite';

type Options = Parameters<typeof styleImport>[0];

export interface OverrideStyleImport {
  styleImports?: Options | Options[];
}

export const handleCss = (config: Config, env: ConfigEnv) => {
  config.plugins ??= [];
  config.css ||= {};
  config.css.modules ||= {};

  if (config.css.modules !== false) {
    config.css.modules.generateScopedName ??= env.command === 'build'
      ? '[hash:base64]'
      : '[path][name]__[local]';
  }

  if (config.styleImports) {
    for (const option of toArray(config.styleImports)) {
      config.plugins.push(styleImport(option));
    }
  }
}
