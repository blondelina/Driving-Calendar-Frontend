import { StatusBar } from "expo-status-bar"
import React from "react"
import { View, Text, Button, Modal } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { getItem, removeItem } from '../utils/TokenHandler'

const StudentView = ({ navigation }: { navigation: any }) => {
    const signOut = async () => {
        removeItem()
        console.log(getItem())
        navigation.navigate("Login")
    }
    return (
        <SafeAreaView>
            <StatusBar></StatusBar>
            <Modal>
                <Text>test</Text>
                <Button
                    title="Sign out"
                    onPress={() => signOut()}
                ></Button>
            </Modal>
        </SafeAreaView>
    )
}

export default StudentView