import React, { useEffect } from "react"
import { useState } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
// import { getAxios } from "../config/AxiosConfig"
import Status from "../constants/Status"
import { instructorStyle } from "../styles/InstructorStyle"
// import { getJwt, getUserId } from "../utils/AuthUtils"
import { useAxios } from "../config/AxiosConfig";

const DrivingLessons = () => {
    const [lessons, setLessons] = useState<string | undefined>("")
    const [refresh, setRefresh] = useState<boolean>(false)
    const axios = useAxios();

    useEffect(() => {
        getLessons()
    }, [refresh,])

    async function getLessons() {
        const response = await axios.get("/driving-lessons")
        setLessons(response.data)
    }

    return (
        <View style={instructorStyle.instructorView}>
            {lessons.length === 0 ?
                <Text style={instructorStyle.headerStyle}>No lessons yet...</Text>
                :
                <View style={instructorStyle.lessonsList}>
                    <TouchableOpacity onPress={() => {
                    refresh === false ? setRefresh(true) : setRefresh(false)
                }} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginBottom: 20 }}>
                    <Text style={instructorStyle.button}>Refresh</Text>
                </TouchableOpacity>
                    <Text style={instructorStyle.headerStyle}>Current driving lessons:</Text>
                        <FlatList
                            data={lessons as any}
                            renderItem={({ item }) =>
                            <View style={instructorStyle.driveLessonElement}>
                                <View style={instructorStyle.textContent}>
                                    <Text style={{ padding: 5, width: 300 }}><Text style={{ fontWeight: 'bold' }}>Name: </Text>{item['studentName']}</Text>
                                    <Text style={{ padding: 5, width: 300 }}><Text style={{ fontWeight: 'bold' }}>Start: </Text>
                                    {(new Date(item['startDate'])).toUTCString()}
                                    </Text>
                                    <Text style={{ padding: 5, width: 300 }}><Text style={{ fontWeight: 'bold' }}>End: </Text>
                                    {(new Date(item['endDate'])).toUTCString()}
                                    </Text>
                                    <Text style={instructorStyle[Status[item['studentStatus']]]}><Text style={{ fontWeight: 'bold' }}>Status: </Text>{Status[item['studentStatus']]}</Text>
                                </View>
                                </View>
                            } />
                </View>
            }
        </View>
    );
}

export default DrivingLessons;
