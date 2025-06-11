type PickProperties<T, K extends keyof T> = {
  [P in K]: T[P];
};

export function pickProperties<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): PickProperties<T, K> {
  const result = {} as PickProperties<T, K>;

  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });

  return result;
}
