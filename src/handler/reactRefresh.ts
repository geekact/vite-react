import { ConfigEnv, UserConfig } from 'vite';
import { Override } from '../vite';
import reactRefresh, { Options as ReactRefreshOptions } from '@vitejs/plugin-react-refresh';
import { override } from '../util/override';

export interface OverrideReactRefresh {
  enableReactRefresh?: (env: ConfigEnv) => boolean;
  reactRefresh?: (original: ReactRefreshOptions) => ReactRefreshOptions | undefined;
}

const defaultEnableFn = (env: ConfigEnv) => {
  return env.command === 'serve';
};

export const handleReactRefresh = (config: UserConfig, overrides: Override = {}, env: ConfigEnv) => {
  config.plugins ||= [];

  if ((overrides.enableReactRefresh || defaultEnableFn)(env)) {
    const defaultOptions: ReactRefreshOptions = {
      parserPlugins: [
        'classProperties',
        'classPrivateProperties',
      ],
    };

    config.plugins.push(
      reactRefresh(
        override(overrides.reactRefresh, defaultOptions)
      )
    );
  }
};
