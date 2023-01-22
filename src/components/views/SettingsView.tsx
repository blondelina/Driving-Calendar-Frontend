import React from "react"
import { Button, TouchableOpacity, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { instructorStyle } from "../../styles/InstructorStyle"
import { useAuth } from "../contexts/AuthProvider"

const SettingsView = () => {
    const { logOutAsync } = useAuth();
    const logOut = async () => {
        await logOutAsync();
    }
    return (
        <SafeAreaView style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '95%'
        }}>
            <TouchableOpacity onPress={logOut} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginBottom: 20 }}>
                <Text style={instructorStyle.button}>Sign out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SettingsView;