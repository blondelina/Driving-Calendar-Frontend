import { Alert } from "react-native";
import axios, { all, AxiosInstance } from "axios";
import { Api } from '../constants/constants';

export async function getAxios(jwt: string | null = null): Promise<AxiosInstance> {
    const instance = axios.create({
        baseURL: Api.BaseURL
    });

    if(jwt) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    }

    instance.interceptors.response.use(response => response, error => {
        if(error.response.status === 401) {
            Alert.alert("Wrong credentials");
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