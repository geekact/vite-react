import { ConfigEnv } from 'vite';

export const enable = (
  fn: boolean | ((env: ConfigEnv) => boolean) | undefined,
  env: ConfigEnv,
  defaultEnalbe: boolean | ((env: ConfigEnv) => boolean),
) => {
  if (typeof fn === 'function') {
    return fn(env);
  }

  if (typeof fn === 'boolean') {
    return fn;
  }

  if (typeof defaultEnalbe === 'function') {
    return defaultEnalbe(env);
  }

  return defaultEnalbe;
};
