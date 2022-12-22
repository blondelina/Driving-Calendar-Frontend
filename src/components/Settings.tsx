import React from "react"
import { Button, View } from "react-native"
import { instructorStyle } from "../styles/InstructorStyle"
import { useAuth } from "./contexts/AuthProvider"

const Settings = ({ navigation }: { navigation: any }) => {
    const { logOutAsync } = useAuth();
    const logOut = async () => {
        await logOutAsync();
    }
    return (
        <View style={instructorStyle.instructorView}>
            <Button
                color={"#7464bc"}
                title="Sign out"
                onPress={logOut}
            />
        </View>
    )
}

export default Settings;