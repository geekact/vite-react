import { ConfigEnv } from 'vite';
import reactRefresh, { Options as ReactRefreshOptions } from '@vitejs/plugin-react-refresh';
import { override } from '../util/override';
import { Config } from '../vite';
import { enable } from '../util/enable';

export interface OverrideReactRefresh {
  reactRefresh?: {
    /**
     * enable Hot Module Reload by use @vitejs/plugin-react-refresh.
     *
     * @default true for serve.
     * @default false for build.
     */
    enable?: boolean | ((env: ConfigEnv) => boolean);
    options?: ReactRefreshOptions | ((originalOptions: ReactRefreshOptions, env: ConfigEnv) => ReactRefreshOptions | undefined);
  }
}

const defaultOptions: ReactRefreshOptions = {
  parserPlugins: [],
};

export const handleReactRefresh = (config: Config, env: ConfigEnv) => {
  config.plugins ||= [];

  if (enable(config.reactRefresh?.enable, env, env.command === 'serve')) {
    config.plugins.push(
      reactRefresh(
        override(config.reactRefresh?.options, env, defaultOptions)
      )
    );
  }
};
