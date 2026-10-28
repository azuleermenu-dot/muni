import AsyncStorage from '@react-native-async-storage/async-storage';
export async function getJSON<T>(key: string, fallback: T): Promise<T> {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) as T : fallback;
}
export async function setJSON(key: string, value: unknown) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}
