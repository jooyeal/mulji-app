import AsyncStorage from "@react-native-async-storage/async-storage";

type StorageResponse = {
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

export const getData = async (
  key: string
): Promise<StorageResponse & { value?: string | null }> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return {
      status: "success",
      value,
      message: `${key} get 성공`,
    };
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      message: String(e),
    };
  }
};
