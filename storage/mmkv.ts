
export const storage = new MMKV();

export const setItem = (key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const v = storage.getString(key);
  return v ? JSON.parse(v) : null;
};

export const removeItem = (key: string) => storage.delete(key);