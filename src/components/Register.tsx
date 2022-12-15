import { Link } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { View, Text, TextInput, Button, Alert, ImageBackground } from "react-native"
import { loginStyle } from "../styles/LoginStyles"
import routes from '../constants/routes.json';

const Register = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState<string | undefined>("")
    const [username, setUsername] = useState<string | undefined>("")
    const [firstName, setFirstName] = useState<string | undefined>("")
    const [lastName, setLastName] = useState<string | undefined>("")
    const [password, setPassword] = useState<string | undefined>("")
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

    async function register() {
        let response = await fetch(routes.BaseURL + "/api/" + 'student' + "s/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
            },
            body: JSON.stringify({ "username": username, "email": email, "password": password, "firstName": firstName, "lastName":lastName })
        });
        let status = response.status
        await response.json().then(response => {
            console.log(response)
            if (status === 400) {
                if(response.errors!=null)
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
        <View style={loginStyle.login}>
            <ImageBackground source={require('../styles/backgroundCar.png')} resizeMode='contain' style={{flex:1, height: 250,
            width: 250, opacity:0.2 }} />
            <Text
                style={loginStyle.loginHeader}>
                Sign up
            </Text>
            <View>
                <Text
                style={loginStyle.labels}>
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
                    First name:
                </Text>
                <TextInput
                    value={firstName}
                    style={loginStyle.textbox}
                    placeholder="first name"
                    placeholderTextColor="#000000"
                    onChangeText={newText => setFirstName(newText)}
                ></TextInput>
                <Text
                style={loginStyle.labels}>
                   Last name:
                </Text>
                <TextInput
                    value={lastName}
                    style={loginStyle.textbox}
                    placeholder="last name"
                    placeholderTextColor="#000000"
                    onChangeText={newText => setLastName(newText)}
                ></TextInput>
                <Text
                style={loginStyle.labels}>
                    Username:
                </Text>
                <TextInput
                    value={username}
                    style={loginStyle.textbox}
                    placeholder="username"
                    placeholderTextColor="#000000"
                    onChangeText={newText => setUsername(newText)}
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
                        onPress={() => register()}
                        color={"#7464bc"}
                        title="Register"
                        disabled={buttonDisabled}
                    />
                </View>
                <Link to={'/Login'} children={"Already have an account?"} style={loginStyle.linkToRegister}></Link>
            </View>
        </View>

    )
}

export default Register;