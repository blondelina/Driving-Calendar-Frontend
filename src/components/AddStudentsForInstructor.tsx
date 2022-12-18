import { View, Text, TextInput, Button, Alert } from "react-native";
import { instructorStyle } from "../styles/InstructorStyle";
import { decodeItemId, getItem } from "../utils/TokenHandler";
import routes from '../constants/routes.json';
import { useEffect, useState } from "react";

const AddStudentsForInstructor = ({ navigation }: { navigation: any }) => {
    const [studentId, setStudentId] = useState<string | undefined>("")
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

    function addStudent() {
        getItem().then(result => decodeItemId(result).then(instructorId => fetch(routes.BaseURL + "/api/instructors/" + instructorId + "/student", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                'Authorization': 'Bearer ' + result,
            },
            body: JSON.stringify({ "studentId": studentId })
        }
        ).then(async response => {
            const responseText = await response.text()
            if (response.status !== 200) {
                if (responseText.length === 0)
                    Alert.alert("User cannot be added!")
                else
                    Alert.alert(responseText)
            }
            else {
                Alert.alert("Student added!")
            }
        })
            .catch(error => console.log(error))))
    }

    useEffect(() => {
        if (studentId != "")
            setButtonDisabled(false)
        else
            setButtonDisabled(true)
    }, [studentId])

    return (
        <View style={instructorStyle.instructorSearch}>
            <Text>Search students:</Text>
            <TextInput
                value={studentId}
                style={instructorStyle.textboxStyle}
                placeholder="enter student id..."
                placeholderTextColor="#000000"
                onChangeText={newText => setStudentId(newText)}
            ></TextInput>
            <Button
                color={"#7464bc"}
                title="Confirm"
                disabled={buttonDisabled}
                onPress={() => addStudent()}
            />
        </View>
    )
}

export default AddStudentsForInstructor;