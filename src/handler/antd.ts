import { ConfigEnv } from 'vite';
import styleImport from 'vite-plugin-style-import';
import { hasInstallPackage } from '../util/pkgInfo';
import { Config } from '../vite';

export interface OverrideAntd {
  antd?: {
    /**
     * @see node_modules/antd/es/style/themes/default.less
     */
    theme?: object;
  };
}

export const handleAntd = (config: Config, _env: ConfigEnv) => {
  config.plugins ||= [];
  config.css ||= {};
  config.css.preprocessorOptions ||= {};
  const libs: Parameters<typeof styleImport>[0]['libs'] = [];

  if (hasInstallPackage('antd')) {
    config.css.preprocessorOptions.less = {
      ...config.css.preprocessorOptions.less,
      javascriptEnabled: true,
      modifyVars: config.antd?.theme,
    };
    libs.push({
      libraryName: 'antd',
      esModule: true,
      resolveStyle: (name) => `antd/es/${name}/style/index`,
    });
  }

  if (libs.length) {
    config.plugins.push(styleImport({ libs }));
  }
}
