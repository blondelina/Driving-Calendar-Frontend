import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextData, AuthData } from '../../models/AuthContextModels';
import * as secureStore from 'expo-secure-store';
import { LoginResponse } from '../../models/responses/LoginResponse';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({children}) => {
    const [authData, setAuthData] = useState<AuthData>();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadStorageData();
      }, []);

    const loadStorageData = async (): Promise<void> => {
        try {
          const authDataSerialized = await secureStore.getItemAsync('AuthData');
          if (authDataSerialized) {
            const _authData: AuthData = JSON.parse(authDataSerialized);
            setAuthData(_authData);
          }
        } catch (error) {
            console.error(error);
            await logOutAsync();
        } finally {
          setLoading(false);
        }
    };

    const logInAsync = async (response: LoginResponse): Promise<void> => {
        const _authData: AuthData = {
            id: response.userId,
            email: response.email,
            role: response.role,
            firstName: "",
            lastName: "",
            jwt: response.accessToken
        };
        setAuthData(_authData);
        await secureStore.setItemAsync("AuthData", JSON.stringify(_authData));
    };

    const logOutAsync = async () => {
        setAuthData(null);
        await secureStore.deleteItemAsync("AuthData");
    }
    
    return (
        <AuthContext.Provider value={{authData, loading, logInAsync, logOutAsync}}>
          {children}
        </AuthContext.Provider>
      );
}

export default AuthProvider;

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}