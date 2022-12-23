import React, { useEffect, useState } from "react"
import { View, Text, Button, FlatList, VirtualizedList } from "react-native"
import { instructorStyle } from "../styles/InstructorStyle";
import { getUserId, getJwt } from "../utils/AuthUtils";
import { getAxios } from "../config/AxiosConfig";

const EnrolledStudents = () => {
    const [students, setStudents] = useState<string | undefined>("")
    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => {
        getStudents()
    }, [refresh,]);
    
    async function getStudents() {
        const jwt = await getJwt();
        const id = await getUserId();
        const axios = await getAxios();
        const response = await axios.get("/instructors/"+id+"/students", { headers: { 'Authorization': 'Bearer ' + jwt } })
        setStudents(response.data)
    }

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