import axios from 'axios';
import { Alert } from 'react-native';
import { useAuth } from '../components/contexts/AuthProvider';

const axiosInterceptor = axios.interceptors.response.use((response) => {
  const { logOutAsync } = useAuth();

  if (response.status === 401) {
    logOutAsync();
    Alert.alert("Unauthorized. You need to log in.");
    return;
  }

  if (response.status === 400) {
    console.log(response.data);
    return;
  }

  return response;
}, (error) => {
  if (error.response && error.response.data) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
});

export { axiosInterceptor };