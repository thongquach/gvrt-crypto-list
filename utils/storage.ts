import AsyncStorage from '@react-native-async-storage/async-storage';

const ASYNC_STORAGE_KEY = 'reactQueryCache';

export const setItem = async <T>(key: string, value: T) => {
  try {
    await AsyncStorage.setItem(
      `${ASYNC_STORAGE_KEY}-${key}`,
      JSON.stringify(value),
    );
  } catch (error) {
    console.error('AsyncStorage setItem error: ', error);
  }
};

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(`${ASYNC_STORAGE_KEY}-${key}`);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('AsyncStorage getItem error: ', error);
    return null;
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(`${ASYNC_STORAGE_KEY}-${key}`);
  } catch (error) {
    console.error('AsyncStorage removeItem error: ', error);
  }
};
