import AsyncStorage from "@react-native-async-storage/async-storage";

export type StorageResponse = {
  status: "success" | "error";
  message: string;
};

export const storeData = async (
  key: string,
  value: any
): Promise<StorageResponse> => {
  try {
    await AsyncStorage.setItem(key, value);
    return {
      status: "success",
      message: `${key} 셋 성공`,
    };
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      message: String(e),
    };
  }
};

export const getData = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const removeData = async (key: string): Promise<StorageResponse> => {
  try {
    await AsyncStorage.removeItem(key);
    return {
      status: "success",
      message: "성공",
    };
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      message: String(e),
    };
  }
};
