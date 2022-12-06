import { ConfigEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { Config } from '../vite';

export interface OverrideHtml {
  html?: Parameters<typeof createHtmlPlugin>[0];
}

export const handleHtml = (config: Config, env: ConfigEnv) => {
  if (!config.html) return;

  const html = config.html;
  html.minify ??= env.command === 'build';

  config.plugins ||= [];
  config.plugins.push(createHtmlPlugin(html));
};
