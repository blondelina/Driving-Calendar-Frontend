import { View, Text, Button, Alert, FlatList, TouchableOpacity } from "react-native";
import { instructorStyle } from "../styles/InstructorStyle";
import { getUserId, getJwt } from "../utils/AuthUtils";
import { Api } from '../constants/constants';
import { useEffect, useState } from "react";
import React from "react";
import { getAxios } from "../config/AxiosConfig";
import Ionicons from '@expo/vector-icons/Ionicons';


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
        axios.post("/instructors/" + id + "/student", { studentId }, { headers: { 'Authorization': 'Bearer ' + jwt } })
    }

    return (
        <View style={instructorStyle.instructorSearch}>
            <Text style={instructorStyle.headerStyle}>Add students:</Text>
            <FlatList
                data={students as any}
                renderItem={({ item }) =>
                    <View style={instructorStyle.studentElement}>
                        <View style={instructorStyle.textContent}>
                            <Text style={{ padding: 5 , width: 250}}><Text style={{ fontWeight: 'bold' }}>Username: </Text>{item['studentUserName']}</Text>
                            <Text style={{ padding: 5 , width: 250}}><Text>Full name: </Text>{item['studentName']}</Text>
                        </View>
                        <TouchableOpacity onPress={() => addStudent(item['studentId'])} style={{ backgroundColor: "#7464bc", borderRadius: 30, marginBottom: 20 }}>
                            <Ionicons name="add" size={20} color={'white'} style={{ padding:10 }} />
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    )
}

export default AddStudentsForInstructor;