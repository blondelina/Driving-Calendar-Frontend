import React from "react"
import { Button, TouchableOpacity, View, Text } from "react-native"
import { instructorStyle } from "../styles/InstructorStyle"
import { useAuth } from "./contexts/AuthProvider"

const Settings = ({ navigation }: { navigation: any }) => {
    const { logOutAsync } = useAuth();
    const logOut = async () => {
        await logOutAsync();
    }
    return (
        <View style={instructorStyle.instructorView}>
            <TouchableOpacity onPress={logOut} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginBottom: 20 }}>
                <Text style={instructorStyle.button}>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Settings;