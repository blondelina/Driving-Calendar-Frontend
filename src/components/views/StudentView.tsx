import React from "react"
import { View,Text, Button } from "react-native"
import { useAuth } from "../contexts/AuthProvider"

const StudentView = () => {
    const { logOutAsync } = useAuth();
    const logOut = async () => {
        await logOutAsync();
    }
    return(
        <View>
            <Text>Student view</Text>
            <Button
             title="Sign out"
             onPress={logOut}
             ></Button>
        </View>
    )
}

export default StudentView