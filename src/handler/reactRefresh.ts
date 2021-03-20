import { ConfigEnv } from 'vite';
import reactRefresh, { Options as ReactRefreshOptions } from '@vitejs/plugin-react-refresh';
import { override } from '../util/override';
import { Config } from '../vite';
import { enable } from '../util/enable';

export interface OverrideReactRefresh {
  /**
   * enable Hot Module Reload.
   *
   *
   * @default true for serve.
   * @default false for build.
   */
  enableReactRefresh?: boolean | ((env: ConfigEnv) => boolean);
  reactRefreshOptions?: ReactRefreshOptions | ((originalOptions: ReactRefreshOptions) => ReactRefreshOptions | undefined);
}

export const handleReactRefresh = (config: Config, env: ConfigEnv) => {
  config.plugins ||= [];

  if (enable(config.enableReactRefresh, env, env.command === 'serve')) {
    const defaultOptions: ReactRefreshOptions = {
      parserPlugins: [
        'classProperties',
        'classPrivateProperties',
      ],
    };

    config.plugins.push(
      reactRefresh(
        override(config.reactRefreshOptions, defaultOptions)
      )
    );
  }
};
