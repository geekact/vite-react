import react, { Options as ReactOptions } from '@vitejs/plugin-react';
import reactSWC from '@vitejs/plugin-react-swc';
import { Config } from '../vite';

export interface OverrideReact {
  /**
   *  默认使用插件 @vitejs/plugin-react-swc，如果要使用兼容性更强的 @vitejs/plugin-react，则设置 swc=false
   */
  react?:
    | (ReactOptions & { swc: false })
    | {
        swc?: true;
      };
}

export const handleReact = (config: Config) => {
  config.plugins ||= [];
  const { swc, ...reactOptions } = config.react || {};

  if (swc !== false) {
    config.plugins.push(reactSWC());
  } else {
    config.plugins.push(react(reactOptions));
  }
};
