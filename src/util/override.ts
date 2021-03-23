import { ConfigEnv } from 'vite';

export const override = <T extends object>(fn: ((options: T, env: ConfigEnv) => T | undefined) | (T | undefined), env: ConfigEnv, options: T): T => {
  if (typeof fn === 'object') {
    return fn;
  }

  if (typeof fn === 'function') {
    const result = fn(options, env);
    return result === undefined ? options : result;
  }

  return options;
};
