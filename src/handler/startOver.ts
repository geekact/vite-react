import VitePluginRestart from 'vite-plugin-restart';
import { Config } from '../vite';

export interface OverrideStartOver {
  /**
   * Restart vite server or full reload page when given files matched.
   */
  startOver?: Parameters<typeof VitePluginRestart>[0];
}

export const handleStartOver = (config: Config) => {
  if (!config.startOver) return;
  config.plugins ||= [];
  config.plugins.push(VitePluginRestart(config.startOver));
};
