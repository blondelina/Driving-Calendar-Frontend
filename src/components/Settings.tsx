import React from "react"
import { Button, TouchableOpacity, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { instructorStyle } from "../styles/InstructorStyle"
import { useAuth } from "./contexts/AuthProvider"

const Settings = ({ navigation }: { navigation: any }) => {
    const { logOutAsync } = useAuth();
    const logOut = async () => {
        await logOutAsync();
    }
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={logOut} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginBottom: 20 }}>
                <Text style={instructorStyle.button}>Sign out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Settings;