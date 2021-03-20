import { ConfigEnv } from 'vite';
import reactRefresh, { Options as ReactRefreshOptions } from '@vitejs/plugin-react-refresh';
import { override } from '../util/override';
import { Config } from '../vite';

export interface OverrideReactRefresh {
  enableReactRefresh?: (env: ConfigEnv) => boolean;
  reactRefreshOptions?: (originalOptions: ReactRefreshOptions) => ReactRefreshOptions | undefined;
}

const defaultEnableFn = (env: ConfigEnv) => {
  return env.command === 'serve';
};

export const handleReactRefresh = (config: Config, env: ConfigEnv) => {
  config.plugins ||= [];

  if ((config.enableReactRefresh || defaultEnableFn)(env)) {
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
