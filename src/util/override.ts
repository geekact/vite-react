export const override = <T extends object>(fn: ((options: T) => T | undefined) | (T | undefined), options: T): T => {
  if (typeof fn === 'object') {
    return fn;
  }

  if (typeof fn === 'function') {
    const result = fn(options);
    return result === undefined ? options : result;
  }

  return options;
};
