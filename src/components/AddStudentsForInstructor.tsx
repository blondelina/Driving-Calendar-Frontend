import { View, Text, TextInput, Button, Alert, FlatList } from "react-native";
import { instructorStyle } from "../styles/InstructorStyle";
import { decodeItemId, getItem } from "../utils/TokenHandler";
import routes from '../constants/routes.json';
import { useEffect, useState } from "react";

const AddStudentsForInstructor = ({ navigation }: { navigation: any }) => {
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
    const [students, setStudents] = useState<string | undefined>("");

    useEffect(() => {
        getStudents()
    }, [])
    function getStudents() {
        getItem().then(result => fetch(routes.BaseURL + "/students", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                'Authorization': 'Bearer ' + result,
            },
        }
        ).then(response =>
            response.json()
        ).then(response => {
            console.log(response)
            setStudents(response)
        })
            .catch(error => console.log(error)))
    }

    function addStudent(studentId) {
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


    return (
        <View style={instructorStyle.instructorSearch}>
            <Text style={instructorStyle.headerStyle}>Add students:</Text>
            <FlatList
                data={students as any}
                renderItem={({ item }) => 
                <View style={instructorStyle.studentElement}>
                    <View style={instructorStyle.textContent}>
                        <Text style={{padding:5}}><Text style={{fontWeight:'bold'}}>Username: </Text>{item['studentUserName']}</Text>
                        <Text style={{padding:5}}><Text>Full name: </Text>{item['studentName']}</Text>
                    </View>
                    <Button title="Add" onPress={()=>addStudent(item['studentId'])} color={"#7464bc"}></Button>
                </View>
            }
            />
        </View>
    )
}

export default AddStudentsForInstructor;