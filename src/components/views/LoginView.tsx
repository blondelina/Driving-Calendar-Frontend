import React, {  useState } from 'react';

import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { loginStyle } from '../../styles/LoginStyles'
import { Link } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const { logInAsync } = useAuth();

  async function login() {
    await logInAsync(email, password);
  }

  return (
    <SafeAreaView style={loginStyle.login}>
      <ImageBackground source={require('../../styles/backgroundCar.png')} resizeMode='contain' style={{
        flex: 1, height: 250,
        width: 250, opacity: 0.2
      }} />
      <View>
        <Text style={loginStyle.loginHeader}>
          Login
        </Text>

        <View style={loginStyle.textbox}>
          <MaterialIcons name="email" size={20}></MaterialIcons>
          <TextInput
            placeholder='Email'
            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }} keyboardType="email-address"
            onChangeText={value => setEmail(value)}
          ></TextInput>
        </View>

        <View style={loginStyle.textbox}>
          <MaterialIcons name="lock" size={20}></MaterialIcons>
          <TextInput
            blurOnSubmit={false}
            placeholder='Password'
            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }}
            secureTextEntry
            onChangeText={value => setPassword(value)}
          >
          </TextInput>
          <TouchableOpacity onPress={() => { }} >
            <Text style={{ color: '#795F80' }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={login} style={{ backgroundColor: '#795F80', borderRadius: 10, marginBottom: 20 }}>
          <Text style={loginStyle.button}>Login</Text>
        </TouchableOpacity>

        <View style={loginStyle.registerbox}>
          <Text style={{ paddingRight: 10 }}>Don't have an account?</Text>
          <Link to={'/Register'} children={"Register here "} style={{ color: '#795F80' }}></Link>
        </View>
      </View>
    </SafeAreaView >

  );
};

export default Login