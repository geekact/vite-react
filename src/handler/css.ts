import { ConfigEnv } from 'vite';
import styleImport from 'vite-plugin-style-import';
import { hasInstallPackage } from '../util/pkgInfo';
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

  if (hasInstallPackage('antd') || hasInstallPackage('antd-mobile')) {
    config.css.preprocessorOptions ??= {};
    config.css.preprocessorOptions.less = {
      javascriptEnabled: true,
    };
  }

  const libs: Parameters<typeof styleImport>[0]['libs'] = [];

  ['antd', 'antd-mobile'].forEach((pkg) => {
    if (hasInstallPackage(pkg)) {
      libs.push({
        libraryName: pkg,
        esModule: true,
        resolveStyle: (name) => `${pkg}/es/${name}/style/index`,
      });
    }
  });

  if (libs.length) {
    config.plugins.push(styleImport({ libs }));
  }

  if (config.styleImports) {
    for (const option of toArray(config.styleImports)) {
      config.plugins.push(styleImport(option));
    }
  }
}
