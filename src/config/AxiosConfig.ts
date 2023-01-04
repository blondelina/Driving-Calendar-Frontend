import { Alert } from "react-native";
import axios, { AxiosInstance } from "axios";
import { Api } from '../constants/constants';
import { useAuth } from "../components/contexts/AuthProvider";

export function useAxios(): AxiosInstance {
    const { logOutAsync, authData } = useAuth();

    const instance = axios.create({
        baseURL: Api.BaseURL
    });

    if(authData?.jwt) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${authData.jwt}`;
    }

    instance.interceptors.response.use(response => response, async error => {
        if(error.response.status === 401) {
            await logOutAsync();
            return;
        }
        if(error.response.status === 400) {
            Alert.alert(error.response);
            return;
        }
        throw new Error(error);
    })

    return instance;
}