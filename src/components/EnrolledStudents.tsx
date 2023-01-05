import React, { useEffect, useState } from "react"
import { View, Text, FlatList, TouchableOpacity, Modal, Platform } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { instructorStyle } from "../styles/InstructorStyle";
import { getUserId, getJwt } from "../utils/AuthUtils";
import { getAxios } from "../config/AxiosConfig";

const EnrolledStudents = () => {
    const [students, setStudents] = useState<string | undefined>("")
    const [refresh, setRefresh] = useState<boolean>(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const [studentId, setStudentId] = useState();
    const [pickerVisible, setPickerVisible] = useState(false);
    const [startPickerVisible, setStartPickerVisible] = useState(false);

    useEffect(() => {
        getStudents()
    }, [refresh,]);


    async function getStudents() {
        const jwt = await getJwt();
        const id = await getUserId();
        const axios = await getAxios();
        const response = await axios.get("/instructors/" + id + "/students", { headers: { 'Authorization': 'Bearer ' + jwt } })
        setStudents(response.data)
    }

    async function requestDrivingLesson(studentId) {
        const jwt = await getJwt();
        const id = await getUserId();
        const axios = await getAxios();
        var endTime = new Date()
        date.setHours(date.getHours() + 3)
        endTime.setHours(date.getHours() + 2)
        endTime.setMinutes(date.getMinutes())
        endTime.setFullYear(date.getFullYear())
        endTime.setMonth(date.getMonth())
        endTime.setDate(date.getDate())
        const startDate = date.toISOString();
        const endDate = endTime.toISOString();
        axios.post("/instructors/" + id + "/driving-lessons", { studentId, startDate, endDate }, { headers: { 'Authorization': 'Bearer ' + jwt } })
    }

    return (
        <View style={instructorStyle.instructorView}>
            <TouchableOpacity onPress={() => {
                refresh === false ? setRefresh(true) : setRefresh(false)
            }} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginBottom: 20 }}>
                <Text style={instructorStyle.button}>Refresh</Text>
            </TouchableOpacity>

            <Text style={instructorStyle.headerStyle}>Current enrolled students:</Text>

            {students.length === 0 ?
                <View>
                    <Text style={instructorStyle.headerStyle}>No students added</Text>
                </View> :
                <View style={instructorStyle.studentList}>
                    <FlatList
                        data={students as any}
                        renderItem={({ item }) =>
                            <View style={instructorStyle.studentElement}>
                                <View style={instructorStyle.textContent}>
                                    <Text style={{ padding: 5, width: 250 }}>{item['studentName']}</Text>
                                </View>

                                <TouchableOpacity onPress={() => { setModalVisible(!modalVisible); setStudentId(item['studentId']) }} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginBottom: 20 }}>
                                    <Text style={instructorStyle.button}>Request lesson</Text>
                                </TouchableOpacity>

                                <Modal
                                    animationType="fade"
                                    visible={modalVisible}
                                    onRequestClose={() => setModalVisible(!modalVisible)}>
                                    <View style={instructorStyle.instructorView}>
                                        <TouchableOpacity onPress={() => setPickerVisible(true)} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginBottom: 20, width: 150 }}>
                                            <Text style={instructorStyle.dateButton}>Choose date</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => setStartPickerVisible(true)} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginBottom: 20, width: 150 }}>
                                            <Text style={instructorStyle.dateButton}>Choose start time</Text>
                                        </TouchableOpacity>

                                        {pickerVisible && (<DateTimePicker
                                            value={date}
                                            onChange={(event, date: Date) => { setPickerVisible(Platform.OS === 'ios'); setDate(date) }}
                                            display="default"
                                        />)
                                        }

                                        {startPickerVisible && (<DateTimePicker
                                            value={date}
                                            mode='time'
                                            onChange={(event, time: Date) => {
                                                setStartPickerVisible(Platform.OS === 'ios');
                                                setDate(time)
                                            }}
                                            display="default"
                                        />)
                                        }

                                        <View style={instructorStyle.dateTimeView}>
                                            <View style={instructorStyle.date}>
                                                <Text style={{ color: "white", fontWeight: 'bold' }}>{date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}</Text>
                                                <Ionicons name="calendar" size={20} color={'white'} style={{ alignSelf: "center" }} />
                                            </View>
                                            <View style={instructorStyle.timeView}>
                                                <View style={instructorStyle.time}>
                                                    <Text style={{ color: "white", fontWeight: 'bold' }}>{date.getHours() + ":" + date.getMinutes()}</Text>
                                                    <MaterialIcons name="schedule" size={20} color={"white"}></MaterialIcons>
                                                </View>
                                                <Ionicons name="arrow-forward" size={20} color={'#414a4c'} style={{ alignSelf: "center" }} />
                                                <View style={instructorStyle.time}>
                                                    <Text style={{ color: "white", fontWeight: 'bold' }}>{(date.getHours() + 2) % 24 + ":" + date.getMinutes()}</Text>
                                                    <MaterialIcons name="schedule" size={20} color={"white"}></MaterialIcons>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => requestDrivingLesson(studentId)} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginTop: 20, width: 150 }}>
                                            <Text style={instructorStyle.dateButton}>Submit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ backgroundColor: "grey", borderRadius: 10, marginTop: 20, width: 150 }}>
                                            <Text style={instructorStyle.dateButton}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </View>
                        }
                    />
                </View>
            }
        </View>
    )
}

export default EnrolledStudents;