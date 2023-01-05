import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Modal, Platform,  FlatList, RefreshControl, SafeAreaView, StyleSheet, Animated } from "react-native"
import { Api } from '../constants/constants';
import { useAxios } from "../config/AxiosConfig";
import { StudentResponse } from "../models/responses/StudentResponse";
import { useAuth } from "./contexts/AuthProvider";
import { formatString } from "../utils/StringUtils";
import { StatusBar } from "react-native";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { instructorStyle } from "../styles/InstructorStyle";
// import { getUserId, getJwt } from "../utils/AuthUtils";
// import { getAxios } from "../config/AxiosConfig";

const ExpandedItem = ({ student } : { student: StudentResponse }) => (
    <View style={styles.item}>
        <Text style={styles.expandedStudent}>{student.name}</Text>
        <View
            style={{
                marginTop: 20,
                marginBottom: 20,
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }}
        />
        <Text style={styles.expandedStudent}>{student.name}</Text>
    </View>
);

const EnrolledStudents = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const [studentId, setStudentId] = useState();
    const [pickerVisible, setPickerVisible] = useState(false);
    const [startPickerVisible, setStartPickerVisible] = useState(false);
    const { authData } = useAuth();
    const axios = useAxios();

    const [students, setStudents] = useState<StudentResponse[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [clickedItemId, setClickedItemId] = useState<number | null>(null);

    const renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-20, 0, 0, 1],
        });
        return (
          <RectButton onPress={() => console.log("abcd")}>
            <Animated.Text
              style={[
                {
                  transform: [{ translateX: trans }],
                },
              ]}>
              Archive
            </Animated.Text>
          </RectButton>
        );
      };

    const Item = ({ student } : { student: StudentResponse }) => (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.item}>
                <Text style={styles.student}>{student.name}</Text>
            </View>
        </Swipeable>
    );

    useEffect( () => {
        axios.get<StudentResponse[]>(formatString(Api.Routes.GetInstructorStudents, authData.id))
             .then(response => {
                setStudents(response.data);
                setClickedItemId(null);
             });
    }, [refreshing,]);

    const onRefresh = async () => {
        setRefreshing(true);

        const response = await axios.get<StudentResponse[]>(formatString(Api.Routes.GetInstructorStudents, authData.id));
        setStudents(response.data);
        setRefreshing(false);
    }

    async function requestDrivingLesson(studentId) {
        var endTime = new Date()
        date.setHours(date.getHours() + 3)
        endTime.setHours(date.getHours() + 2)
        endTime.setMinutes(date.getMinutes())
        endTime.setFullYear(date.getFullYear())
        endTime.setMonth(date.getMonth())
        endTime.setDate(date.getDate())
        const startDate = date.toISOString();
        const endDate = endTime.toISOString();
        axios.post("/instructors/" + authData.id + "/driving-lessons", { studentId, startDate, endDate })
    }

    const renderItem = ({ item } : { item: StudentResponse }) => {
        return <Item student={item}/>
    };

    return (
        // <View style={instructorStyle.instructorView}>
        //     <TouchableOpacity onPress={() => {
        //         refresh === false ? setRefresh(true) : setRefresh(false)
        //     }} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginBottom: 20 }}>
        //         <Text style={instructorStyle.button}>Refresh</Text>
        //     </TouchableOpacity>

        //     <Text style={instructorStyle.headerStyle}>Current enrolled students:</Text>

        //     {students.length === 0 ?
        //         <View>
        //             <Text style={instructorStyle.headerStyle}>No students added</Text>
        //         </View> :
        //         <View style={instructorStyle.studentList}>
        //             <FlatList
        //                 data={students as any}
        //                 renderItem={({ item }) =>
        //                     <View style={instructorStyle.studentElement}>
        //                         <View style={instructorStyle.textContent}>
        //                             <Text style={{ padding: 5, width: 250 }}>{item['studentName']}</Text>
        //                         </View>

        //                         <TouchableOpacity onPress={() => { setModalVisible(!modalVisible); setStudentId(item['studentId']) }} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginBottom: 20 }}>
        //                             <Text style={instructorStyle.button}>Request lesson</Text>
        //                         </TouchableOpacity>

        //                         <Modal
        //                             animationType="fade"
        //                             visible={modalVisible}
        //                             onRequestClose={() => setModalVisible(!modalVisible)}>
        //                             <View style={instructorStyle.instructorView}>
        //                                 <TouchableOpacity onPress={() => setPickerVisible(true)} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginBottom: 20, width: 150 }}>
        //                                     <Text style={instructorStyle.dateButton}>Choose date</Text>
        //                                 </TouchableOpacity>

        //                                 <TouchableOpacity onPress={() => setStartPickerVisible(true)} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginBottom: 20, width: 150 }}>
        //                                     <Text style={instructorStyle.dateButton}>Choose start time</Text>
        //                                 </TouchableOpacity>

        //                                 {pickerVisible && (<DateTimePicker
        //                                     value={date}
        //                                     onChange={(event, date: Date) => { setPickerVisible(Platform.OS === 'ios'); setDate(date) }}
        //                                     display="default"
        //                                 />)
        //                                 }

        //                                 {startPickerVisible && (<DateTimePicker
        //                                     value={date}
        //                                     mode='time'
        //                                     onChange={(event, time: Date) => {
        //                                         setStartPickerVisible(Platform.OS === 'ios');
        //                                         setDate(time)
        //                                     }}
        //                                     display="default"
        //                                 />)
        //                                 }

        //                                 <View style={instructorStyle.dateTimeView}>
        //                                     <View style={instructorStyle.date}>
        //                                         <Text style={{ color: "white", fontWeight: 'bold' }}>{date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}</Text>
        //                                         <Ionicons name="calendar" size={20} color={'white'} style={{ alignSelf: "center" }} />
        //                                     </View>
        //                                     <View style={instructorStyle.timeView}>
        //                                         <View style={instructorStyle.time}>
        //                                             <Text style={{ color: "white", fontWeight: 'bold' }}>{date.getHours() + ":" + date.getMinutes()}</Text>
        //                                             <MaterialIcons name="schedule" size={20} color={"white"}></MaterialIcons>
        //                                         </View>
        //                                         <Ionicons name="arrow-forward" size={20} color={'#414a4c'} style={{ alignSelf: "center" }} />
        //                                         <View style={instructorStyle.time}>
        //                                             <Text style={{ color: "white", fontWeight: 'bold' }}>{(date.getHours() + 2) % 24 + ":" + date.getMinutes()}</Text>
        //                                             <MaterialIcons name="schedule" size={20} color={"white"}></MaterialIcons>
        //                                         </View>
        //                                     </View>
        //                                 </View>
        //                                 <TouchableOpacity onPress={() => requestDrivingLesson(studentId)} style={{ backgroundColor: "#7464bc", borderRadius: 10, marginTop: 20, width: 150 }}>
        //                                     <Text style={instructorStyle.dateButton}>Submit</Text>
        //                                 </TouchableOpacity>
        //                                 <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ backgroundColor: "grey", borderRadius: 10, marginTop: 20, width: 150 }}>
        //                                     <Text style={instructorStyle.dateButton}>Close</Text>
        //                                 </TouchableOpacity>
        //                             </View>
        //                         </Modal>
        //                     </View>
        //                 }
        //             }
        <SafeAreaView style={styles.container}>
            <FlatList
                data={students}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
            
            }
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={<Text>No students enrolled.</Text>}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#D6D6D6',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 15
    },
    expandedItem: {
      backgroundColor: '#D6D6D6',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 15,
      flexDirection: 'row'
    },
    student: {
      fontSize: 20,
      textAlign: 'center'
    },
    expandedStudent: {
      fontSize: 20,
      textAlign: 'center',
      height: '50%',
      flex: 1
    }
  });
    
export default EnrolledStudents;