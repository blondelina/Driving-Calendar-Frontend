import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

export async function getItem() {
  const value = await AsyncStorage.getItem('@storage_Key');
  return value ? JSON.parse(value) : null;
}

export async function setItem(value: any) {
  return AsyncStorage.setItem('@storage_Key', JSON.stringify(value));
}

export async function removeItem() {
  return AsyncStorage.clear();
}

export async function decodeItem(value: any) {
    var decoded = jwt_decode<any>(value);
    return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
}