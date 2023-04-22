import reactBabel, { type Options as ReactBabelOptions } from '@vitejs/plugin-react';
import reactSWC from '@vitejs/plugin-react-swc';
import type { Config } from '../vite';

export interface OverrideReact {
  /**
   * 默认使用插件 [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) 提升编译速度。
   *
   * 如果要使用兼容性更强的 [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)，则设置 `swc=false`
   */
  react?: (ReactBabelOptions & { swc: false }) | (Parameters<typeof reactSWC>[0] & { swc?: true });
}

export const handleReact = (config: Config) => {
  config.plugins ||= [];
  config.react ||= {};

  if (config.react.swc !== false) {
    config.plugins.push(reactSWC(omit(config.react)));
  } else {
    config.plugins.push(reactBabel(omit(config.react)));
  }
};

const omit = <T>(config: T & { swc?: boolean }): Omit<T, 'swc'> => {
  delete config.swc;
  return config;
};
