import routes from '../constants/routes.json';
import React, { useEffect, useState } from 'react';

import {
  View,
  Button,
  Text,
  TextInput,
  Alert,
  ImageBackground
} from 'react-native';

import { loginStyle } from '../styles/LoginStyles'
import { Link } from '@react-navigation/native';
import { decodeItem, setItem } from '../utils/TokenHandler';

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string | undefined>("")
  const [password, setPassword] = useState<string | undefined>("")
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

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
        if (await decodeItem(response.accessToken) === 'instructor')
          navigation.navigate("Instructor")
        else
          navigation.navigate("Student")
      }
    })
      .catch(error => console.log(error.message))
  }

  const image = { uri: "" };
  return (
      <View style={loginStyle.login}> 
        <ImageBackground source={require('../styles/backgroundCar.png')} resizeMode='contain' style={{flex:1, height: 250,
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
              onPress={() => login()}
              color={"#7464bc"}
              title="Login"
              disabled={buttonDisabled} />
          </View>
          <Link to={'/Register'} children={"Don't have an account?"} style={loginStyle.linkToRegister}></Link>
        </View>
      </View>

  );
};

export default Login