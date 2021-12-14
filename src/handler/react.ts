import { ConfigEnv } from 'vite';
import react, { Options as ReactOptions } from '@vitejs/plugin-react';
import { override } from '../util/override';
import { Config } from '../vite';

export interface OverrideReact {
  react?:
    | ReactOptions
    | ((originalOptions: ReactOptions, env: ConfigEnv) => ReactOptions | undefined);
}

export const handleReact = (config: Config, env: ConfigEnv) => {
  config.plugins ||= [];
  config.plugins.push(react(override(config.react, env, {})));
};
