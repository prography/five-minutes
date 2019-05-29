export function pick<T extends object, U extends keyof T>(
  obj: T,
  paths: Array<U>,
): Pick<T, U> {
  return paths.reduce((o, k) => {
    o[k] = obj[k];
    return o;
  }, Object.create(null));
}

export function removeEmpty<T extends object, K extends keyof T>(
  obj: T,
): Partial<T> {
  const o = Object.create(null);
  Object.entries(obj).forEach(([key, value]) => {
    if (value) {
      o[key] = value;
    }
  });
  return o;
}
