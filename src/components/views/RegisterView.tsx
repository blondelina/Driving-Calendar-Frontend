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
  ScrollView,
  KeyboardAvoidingView
} from "react-native"
import { loginStyle } from "../../styles/LoginStyles"
import { Api } from '../../constants/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAxios } from "../../config/AxiosConfig";

const Register = ({ navigation }: { navigation: any }) => {
  const axios = useAxios();
  const [email, setEmail] = useState<string | undefined>("")
  const [username, setUsername] = useState<string | undefined>("")
  const [firstName, setFirstName] = useState<string | undefined>("")
  const [lastName, setLastName] = useState<string | undefined>("")
  const [password, setPassword] = useState<string | undefined>("")

  async function register() {
    const response = await axios.post(Api.Routes.StudentRegister, {
      email, username, firstName, lastName, password
    });

    if(response.status === 201) {
      navigation.navigate("Login");
      Alert.alert("Account created successfully!")
    }
  }

  return (
    <SafeAreaView style={loginStyle.register}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground 
          source={require('../../styles/backgroundCar.png')} 
          resizeMode='contain' 
          style={{
            flex: 1, 
            height: 250,
            width: 250, 
            opacity: 0.2
        }}/>
        <Text style={loginStyle.loginHeader}>
          Sign up
        </Text>

        <View style={loginStyle.textbox}>
          <MaterialIcons name="email" size={20}></MaterialIcons>
          <TextInput 
            placeholder='Email' 
            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }} 
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={loginStyle.textbox}>
          <MaterialIcons name="person" size={20}></MaterialIcons>
          <TextInput 
            placeholder='First Name' 
            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }} 
            onChangeText={x => setFirstName(x)}
          />
          <TextInput 
            placeholder='Surname' 
            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }} 
            onChangeText={x => setLastName(x)}
          />
        </View>
        <View style={loginStyle.textbox}>
          <MaterialIcons name="person" size={20}></MaterialIcons>
          <TextInput 
            placeholder='Username' 
            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }} 
            autoCapitalize="none"
            onChangeText={x => setUsername(x)}
          />
        </View>

        <View style={loginStyle.textbox}>
          <MaterialIcons name="lock" size={20}></MaterialIcons>
          <TextInput
            placeholder='Password'
            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }}
            secureTextEntry
            onChangeText={x => setPassword(x)}
          />
        </View>
        <TouchableOpacity 
          onPress={register} 
          style={{ backgroundColor: '#795F80', borderRadius: 10, marginBottom: 20 }}
        >
          <Text style={loginStyle.button}>Register</Text>
        </TouchableOpacity>

        <View style={loginStyle.registerbox}>
          <Text style={{ paddingRight: 10 }}>Already have an account?</Text>
          <Link to={'/Login'} children={"Login here."} style={{ color: '#795F80' }}></Link>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Register;