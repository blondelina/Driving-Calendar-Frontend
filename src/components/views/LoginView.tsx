import React, { useState } from 'react';

import {
  View,
  Button,
  Text,
  TextInput,
  ImageBackground
} from 'react-native';

import { loginStyle } from '../../styles/LoginStyles'
import { Link } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const { logInAsync } = useAuth();

  async function login() {
    await logInAsync(email, password);
  }

  return (
      <View style={loginStyle.login}> 
        <ImageBackground source={require('../../styles/backgroundCar.png')} resizeMode='contain' style={{flex:1, height: 250,
            width: 250, opacity:0.2 }} />
        <Text
          style={loginStyle.loginHeader}>
          Log in
        </Text>
        <View>
          <Text
            style={loginStyle.labels}
          >
            Email:
          </Text>
          <TextInput
            value={email}
            style={loginStyle.textbox}
            placeholder="email"
            placeholderTextColor="#000000"
            onChangeText={newText => setEmail(newText)}
          ></TextInput>
          <Text
          style={loginStyle.labels}>
            Password:
          </Text>
          <TextInput
            style={loginStyle.textbox}
            placeholder="password"
            secureTextEntry={true}
            placeholderTextColor="#000000"
            value={password}
            onChangeText={newText => setPassword(newText)}
          ></TextInput>
          <View style={loginStyle.button}>
            <Button
              onPress={login}
              color={"#7464bc"}
              title="Login"
              disabled={email === "" || password === ""} />
          </View>
          <Link to={'/Register'} children={"Don't have an account?"} style={loginStyle.linkToRegister}></Link>
        </View>
      </View>

  );
};

export default Login