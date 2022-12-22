import routes from '../constants/routes.json';
import React, { useEffect, useState } from 'react';

import {
  View,
  Button,
  Text,
  TextInput,
  Alert,
  ImageBackground,
  Touchable,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { loginStyle } from '../styles/LoginStyles'
import { Link } from '@react-navigation/native';
import { decodeItemRole, setItem } from '../utils/TokenHandler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string | undefined>("")
  const [password, setPassword] = useState<string | undefined>("")
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  emailRef = React.createRef();
  passwordRef = React.createRef();

  useEffect(() => {
    if (password != "" && email != "")
      setButtonDisabled(false)
    else
      setButtonDisabled(true)
  }, [password, email])


  function login() {
    fetch(routes.BaseURL + "/api/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
      body: JSON.stringify({ "email": email, "password": password })
    }).then(
      response => response.json()
    ).then(async response => {
      console.log(response);
      if (response.status === 400) {
        Alert.alert(response.errors.Email[0])
      }
      else if (response.status === 401) {
        Alert.alert("Couldn't find account with these credentials")
      }
      else {
        setItem(response.accessToken);
        if (await decodeItemRole(response.accessToken) === 'instructor')
          navigation.navigate("Instructor")
        else
          navigation.navigate("Student")
      }
    })
      .catch(error => console.log(error.message))
  }

  return (
    <SafeAreaView style={loginStyle.login}>
      <ImageBackground source={require('../styles/backgroundCar.png')} resizeMode='contain' style={{
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
            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }} keyboardType="email-address"></TextInput>
        </View>

        <View style={loginStyle.textbox}>
          <MaterialIcons name="lock" size={20}></MaterialIcons>
          <TextInput
            blurOnSubmit={false}
            placeholder='Password'
            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }}
            secureTextEntry>
          </TextInput>
          <TouchableOpacity onPress={() => { }} >
            <Text style={{ color: '#795F80' }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => login()} style={{ backgroundColor: '#795F80', borderRadius: 10, marginBottom: 20 }}>
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