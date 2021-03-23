import { ConfigEnv } from 'vite';
import { injectHtml, minifyHtml } from 'vite-plugin-html';
import { enable } from '../util/enable';
import { Config } from '../vite';

export interface OverrideHtml {
  html?: {
    /**
     * Inject data into html by using `<%=KEY%>`
     * @default {}
     */
    injectData?: Record<string, any>;
    /**
     * @default true for build
     */
    minify?: boolean | ((env: ConfigEnv) => boolean);
  }
}

export const handleHtml = (config: Config, env: ConfigEnv) => {
  config.plugins ||= [];

  if (enable(config.html?.minify, env, env.command === 'build')) {
    config.plugins.push(minifyHtml());
  }

  const injectData = config.html?.injectData;

  if (injectData && Object.keys(injectData).length) {
    config.plugins.push(injectHtml({ injectData }));
  }
};
