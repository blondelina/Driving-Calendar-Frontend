import React, { View, Text, Button, Alert, FlatList } from "react-native";
import { instructorStyle } from "../styles/InstructorStyle";
import { Api } from '../constants/constants';
import { useEffect, useState } from "react";
import { useAxios } from "../config/AxiosConfig";
import { StudentResponse } from "../models/responses/StudentResponse";
import { useAuth } from "./contexts/AuthProvider";
import { formatString } from "../utils/StringUtils";

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
                data={students}
                renderItem={({ item }) => 
                <View style={instructorStyle.studentElement}>
                    <View style={instructorStyle.textContent}>
                        <Text style={{padding:5}}><Text style={{fontWeight:'bold'}}>Username: </Text>{item.userName}</Text>
                        <Text style={{padding:5}}><Text>Full name: </Text>{item.name}</Text>
                    </View>
                    <Button title="Add" onPress={async () => await addStudent(item.id)} color={"#7464bc"}></Button>
                </View>
            }
        />
    </View>
)
}

export default AddStudentsForInstructor;