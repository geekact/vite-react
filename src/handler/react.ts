import react, { Options as ReactOptions } from '@vitejs/plugin-react';
import { Config } from '../vite';

export interface OverrideReact {
  react?: ReactOptions;
}

export const handleReact = (config: Config) => {
  config.plugins ||= [];
  config.plugins.push(react(config.react));
};
