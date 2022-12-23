import * as secureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import { Api } from '../constants/constants';

const jwtKey = "AuthData";

export async function isUserLoggedIn(): Promise<boolean> {
  return !!(await getJwt()) 
}

export async function login(jwt: string): Promise<void> {
  await secureStore.setItemAsync(jwtKey, jwt);
}

export async function getJwt() : Promise<string> {
  return JSON.parse(await secureStore.getItemAsync(jwtKey))["jwt"];
}

export async function logout() : Promise<void> {
  await secureStore.deleteItemAsync(jwtKey)
}

export async function getUserRole(role: string): Promise<string> {
    const token = await secureStore.getItemAsync(jwtKey);
    if(!token) {
      throw new Error("User not logged in");
    }

    var decoded = jwt_decode<any>(token);
    return decoded[Api.RoleClaim];
}

export async function getUserId() : Promise<string | null> {
  const token = await secureStore.getItemAsync(jwtKey);
    if(!token) {
      throw new Error("User not logged in");
    }

    var decoded = jwt_decode<any>(token);
    return decoded[Api.IdClaim];
}

export default  {
  isUserLoggedIn, 
  login,
  getJwt,
  logout,
  getUserRole,
  getUserId
}