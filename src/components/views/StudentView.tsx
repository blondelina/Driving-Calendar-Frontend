import React from "react"
import { Text, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthProvider"

const StudentView = () => {
    const { logOutAsync } = useAuth();
    const logOut = async () => {
        await logOutAsync();
    }
    return(
        <SafeAreaView>
            <Text>Student view</Text>
            <Button
             title="Sign out"
             onPress={logOut}
             ></Button>
        </SafeAreaView>
    )
}

export default StudentView