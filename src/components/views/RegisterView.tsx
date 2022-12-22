import { Link } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from "react-native"
import { loginStyle } from "../../styles/LoginStyles"
import { Api } from '../../constants/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Register = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string | undefined>("")
  const [username, setUsername] = useState<string | undefined>("")
  const [firstName, setFirstName] = useState<string | undefined>("")
  const [lastName, setLastName] = useState<string | undefined>("")
  const [password, setPassword] = useState<string | undefined>("")
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  async function register() {
    let response = await fetch(Api.BaseURL + '/students' + "/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
      body: JSON.stringify({ "username": username, "email": email, "password": password, "firstName": firstName, "lastName": lastName })
    });
    let status = response.status
    await response.json().then(response => {
      console.log(response)
      if (status === 400) {
        if (response.errors != null)
          Alert.alert(response.errors.Email[0])
        else
          Alert.alert(response[0].description)
      }
      else {
        navigation.navigate("Login")
        Alert.alert("Account created successfully!")
      }
    })
  }

  useEffect(() => {
    if (username != "" && password != "" && email != "" && lastName != "" && firstName != "")
      setButtonDisabled(false)
    else
      setButtonDisabled(true)
  }, [username, password, email, lastName, firstName])

  return (
    <SafeAreaView style={loginStyle.register}>
      <ImageBackground source={require('../../styles/backgroundCar.png')} resizeMode='contain' style={{
        flex: 1, height: 250,
        width: 250, opacity: 0.2
      }} />
      <ScrollView>
        <Text style={loginStyle.loginHeader}>
          Sign up
        </Text>

        <View style={loginStyle.textbox}>
          <MaterialIcons name="email" size={20}></MaterialIcons>
          <TextInput placeholder='Email' style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }} keyboardType="email-address"></TextInput>
        </View>
        <View style={loginStyle.textbox}>
          <MaterialIcons name="person" size={20}></MaterialIcons>
          <TextInput placeholder='First Name' style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }} keyboardType="email-address"></TextInput>
          <TextInput placeholder='Surname' style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }} keyboardType="email-address"></TextInput>
        </View>
        <View style={loginStyle.textbox}>
          <MaterialIcons name="person" size={20}></MaterialIcons>
          <TextInput placeholder='User' style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }} keyboardType="email-address"></TextInput>
        </View>

        <View style={loginStyle.textbox}>
          <MaterialIcons name="lock" size={20}></MaterialIcons>
          <TextInput
            blurOnSubmit={false}
            placeholder='Password'
            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }}
            secureTextEntry>
          </TextInput>
        </View>
        <TouchableOpacity onPress={() => register()} style={{ backgroundColor: '#795F80', borderRadius: 10, marginBottom: 20 }}>
          <Text style={loginStyle.button}>Register</Text>
        </TouchableOpacity>

        <View style={loginStyle.registerbox}>
          <Text style={{ paddingRight: 10 }}>Already have an account?</Text>
          <Link to={'/Login'} children={"Login here."} style={{ color: '#795F80' }}></Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register;