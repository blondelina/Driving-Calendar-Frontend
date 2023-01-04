import React from "react"
import { Button, View } from "react-native"
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
            <Button
                color={"#7464bc"}
                title="Sign out"
                onPress={logOut}
            />
        </SafeAreaView>
    )
}

export default Settings;