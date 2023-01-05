import { View, Text, Button, Alert, FlatList, TouchableOpacity } from "react-native";
import { instructorStyle } from "../styles/InstructorStyle";
import { Api } from '../constants/constants';
import { useEffect, useState } from "react";
import { useAxios } from "../config/AxiosConfig";
import { StudentResponse } from "../models/responses/StudentResponse";
import { useAuth } from "./contexts/AuthProvider";
import { formatString } from "../utils/StringUtils";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';


const AddStudentsForInstructor = () => {
    const { authData } = useAuth();
    const axios = useAxios();

    const [students, setStudents] = useState<StudentResponse[]>([]);

    useEffect(() => {
        getStudents()
    }, [])
    async function getStudents() {
        const students = await axios.get<StudentResponse[]>(Api.Routes.Students, {
            params: {
                notAssignedToInstructors: authData.id
            }
        });
        setStudents(students.data);
        console.log(students)
    }

    async function addStudent(studentId: number) {
        await axios.post(formatString(Api.Routes.AddStudentToInstructor, authData.id, studentId));
        Alert.alert("Student successfully added!");
        await getStudents();
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