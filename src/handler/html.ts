import { ConfigEnv, HtmlTagDescriptor } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { Options as MinifyOptions } from 'html-minifier-terser';
import { Config } from '../vite';

export interface OverrideHtml {
  html?: {
    /**
     * Inject data into html by using `<%=KEY%>`
     */
    injectData?: Record<string, any>;
    /**
     * Inject tag into html:
     * [
     *   {
     *      tag: 'div',
     *      injectTo: 'body-prepend',
     *       attrs: {
     *         id: 'tag',
     *       },
     *   },
     *   {...}
     * ]
     */
    injectTags?: HtmlTagDescriptor[];
    /**
     * @default true for build
     */
    minify?: boolean | MinifyOptions;
    /**
     * Where to search `index.html` file.
     * @default index.html
     */
    template?: string;
  };
}

export const handleHtml = (config: Config, env: ConfigEnv) => {
  const html = config.html;

  if (!html) {
    return;
  }

  let minify = html.minify;
  if (minify === undefined) {
    minify = env.command === 'build';
  }

  config.plugins ||= [];
  config.plugins.push(
    createHtmlPlugin({
      minify: minify,
      inject: {
        data: html.injectData,
        tags: html.injectTags,
      },
      template: html.template,
    }),
  );
};
