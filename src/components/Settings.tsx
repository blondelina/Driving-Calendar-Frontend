import React from "react"
import { Button, View } from "react-native"
import { instructorStyle } from "../styles/InstructorStyle"
import { getItem, removeItem } from "../utils/TokenHandler"

const Settings = ({ navigation }: { navigation: any }) => {
    const signOut = async () => {
        removeItem()
        console.log(getItem())
        navigation.navigate("Login")
    }
    return (
        <View style={instructorStyle.instructorView}>
            <Button
                color={"#7464bc"}
                title="Sign out"
                onPress={() => signOut()}
            />
        </View>
    )
}

export default Settings;