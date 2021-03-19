export const override = <T>(fn: ((options: T) => T | undefined) | undefined, options: T): T => {
  if (fn) {
    const result = fn(options);
    return result === undefined ? options : result;
  }

  return options;
};
