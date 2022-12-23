import { View, Text, Button, Alert, FlatList } from "react-native";
import { instructorStyle } from "../styles/InstructorStyle";
import { getUserId, getJwt } from "../utils/AuthUtils";
import { Api } from '../constants/constants';
import { useEffect, useState } from "react";
import React from "react";
import { getAxios } from "../config/AxiosConfig";

const AddStudentsForInstructor = () => {
    const [students, setStudents] = useState<string | undefined>("");

    useEffect(() => {
        getStudents()
    }, [])

    async function getStudents() {
        const jwt = await getJwt();
        const axios = await getAxios();
        const response = await axios.get(Api.Routes.GetStudents, { headers: { 'Authorization': 'Bearer ' + jwt } })
        setStudents(response.data)
    }

    async function addStudent(studentId) {
        const jwt = await getJwt();
        const id = await getUserId();
        const axios = await getAxios();

        axios.post("/instructors/" + id + "/student", { studentId }, { headers: { 'Authorization': 'Bearer ' + jwt } }).then(res => {
            Alert.alert("Student added!")
        }).catch(error => {console.log(error)
            Alert.alert("User cannot be added!")
        });
    }

return (
    <View style={instructorStyle.instructorSearch}>
        <Text style={instructorStyle.headerStyle}>Add students:</Text>
        <FlatList
            data={students as any}
            renderItem={({ item }) =>
                <View style={instructorStyle.studentElement}>
                    <View style={instructorStyle.textContent}>
                        <Text style={{ padding: 5 }}><Text style={{ fontWeight: 'bold' }}>Username: </Text>{item['studentUserName']}</Text>
                        <Text style={{ padding: 5 }}><Text>Full name: </Text>{item['studentName']}</Text>
                    </View>
                    <Button title="Add" onPress={() => addStudent(item['studentId'])} color={"#7464bc"}></Button>
                </View>
            }
        />
    </View>
)
}

export default AddStudentsForInstructor;