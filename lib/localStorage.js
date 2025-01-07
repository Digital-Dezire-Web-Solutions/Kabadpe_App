import AsyncStorage from "@react-native-async-storage/async-storage";

export const setInLocalStorage = async (key, value) => {
  const json = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(key, json);
  } catch (error) {
    console.log("error in data saving asyncStorage", error, key, value);
  }
};

export const getFromLocalStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    return "";
  }
};

export const removeFromLocalStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("error in data remove asyncStorage", error);
  }
};
