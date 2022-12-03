import {
  VitePluginOptions as StyleImportOptions,
  createStyleImportPlugin,
} from 'vite-plugin-style-import';
import { Config } from '../vite';
import { AntdResolve } from 'vite-plugin-style-import';

type Resolves = 'antd';

export interface OverrideStyleImport {
  styleImport?: Omit<StyleImportOptions, 'resolves'> & { resolves: Resolves[] };
}

export const handleStyleImport = (config: Config) => {
  if (!config.styleImport || Object.keys(config.styleImport).length === 0) return;

  config.plugins ||= [];
  config.plugins.push(
    createStyleImportPlugin({
      ...config.styleImport,
      resolves: config.styleImport.resolves.map((key) => {
        switch (key) {
          case 'antd':
            return AntdResolve();
          default:
            throw new TypeError(`Unknown style resolve key: ${key}`);
        }
      }),
    }),
  );
};
