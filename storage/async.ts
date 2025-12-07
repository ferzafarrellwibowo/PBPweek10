import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getItem = async (key: string) => {
  const item = await AsyncStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
