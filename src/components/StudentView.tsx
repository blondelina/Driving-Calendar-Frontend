import React from "react"
import { View,Text, Button } from "react-native"
import { getItem, removeItem } from '../utils/TokenHandler'

const StudentView = ({ navigation }: { navigation: any }) => {
    const signOut = async () => {
        removeItem()
        console.log(getItem())
        navigation.navigate("Login")
      }
    return(
        <View>
            <Text>Student view</Text>
            <Button
             title="Sign out"
             onPress={()=>signOut()}
             ></Button>
        </View>
    )
}

export default StudentView