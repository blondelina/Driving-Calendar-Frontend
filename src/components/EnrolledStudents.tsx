import React, { useEffect, useState } from "react"
import { View, Text, Button, FlatList, VirtualizedList } from "react-native"
import { instructorStyle } from "../styles/InstructorStyle";
import { Api } from '../constants/constants';
import { getUserId, getJwt } from "../utils/AuthUtils";

const EnrolledStudents = ({ navigation }: { navigation: any }) => {
    const [students, setStudents] = useState<string | undefined>("")
    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => {
        getJwt().then(result => getUserId().then(instructorId => fetch(Api.BaseURL + "/api/instructors/" + instructorId + "/students", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                'Authorization': 'Bearer ' + result,
            }
        }).then(
            response => response.json()
        ).then(async response => {
            setStudents(response)
            console.log(students)
        })
            .catch(error => console.log(error.message))))
    }, [refresh,]);

    return (
        <View style={instructorStyle.instructorView}>
            <Button
                title="Refresh"
                onPress={() => {
                    refresh === false ? setRefresh(true) : setRefresh(false)
                }}
                color={"#7464bc"}
            ></Button>
            <Text style={instructorStyle.headerStyle}>Current enrolled students:</Text>
            
            {students.length === 0 ?
                <View>
                    <Text style={instructorStyle.headerStyle}>No students added</Text>
                </View> :
                <View style={instructorStyle.studentList}>
                    <FlatList
                        data={students as any}
                        renderItem={({item}) => <Text style={instructorStyle.studentElement}>{item['studentName']}</Text>}
                    />
                </View>
            }
        </View>
    )
}

export default EnrolledStudents;