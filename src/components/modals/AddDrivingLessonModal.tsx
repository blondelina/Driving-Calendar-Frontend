import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Alert } from 'react-native';
import DropDownPicker, { ItemType, ValueType } from 'react-native-dropdown-picker';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useAxios } from '../../config/AxiosConfig';
import { Api } from '../../constants/constants';
import { StudentResponse } from '../../models/responses/StudentResponse';
import { instructorStyle } from '../../styles/InstructorStyle';
import { formatString } from '../../utils/StringUtils';
import { useAuth } from '../contexts/AuthProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';
import { CreateDrivingLesson } from '../../models/requests/CreateDrivingLesson';
import { DrivingLessonResponse } from '../../models/responses/DrivingLessonResponse';

const AddDrivingLessonModal = ({ modalVisible, setModalVisible, createCallback, initialDate } : 
{ 
    modalVisible: boolean, 
    setModalVisible: (arg0: boolean) => void, 
    createCallback?: (arg0: DrivingLessonResponse) => void,
    initialDate?: DateTime
})  => {
    const axios = useAxios();
    const { authData } = useAuth();
    const [openDropdown, setOpenDropdown] = useState(false);
    const [studentId, setStudentId] = useState<number | null>(null);
    const [students, setStudents] = useState<StudentResponse[]>([]);

    const [startDate, setStartDate] = useState<DateTime>(DateTime.now());
    const [endDate, setEndDate] = useState<DateTime>(DateTime.now());
    useEffect(() => {
        const date = initialDate || DateTime.now();
        setStartDate(DateTime.local(date.year, date.month, date.day, 8));
        setEndDate(DateTime.local(date.year, date.month, date.day, 8));
    }, [,initialDate]);

    useEffect(() => {
        if(!modalVisible) {
            return;
        }

        axios.get<StudentResponse[]>(formatString(Api.Routes.GetInstructorStudents, authData.id))
             .then(response => setStudents(response.data))
             .catch(e => {
                Alert.alert("Something went wrong");
                console.error(e);
             });
    }, [modalVisible])


    const createDrivingLesson = async () => {
        if(startDate > endDate) {
            Alert.alert("Start date has to be before end date");
            return;
        }

        const response = await axios.post<DrivingLessonResponse>(formatString(Api.Routes.CreateDrivingLesson, authData.id), 
        {
            studentId, startDate, endDate
        } as CreateDrivingLesson);

        if(createCallback) {
            createCallback(response.data);
        }
        Alert.alert("Driving lesson successfully created");

    }
    return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => 
        setModalVisible(!modalVisible)
        }>
    <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Text style={styles.modalText}>Add a new driving lesson</Text>
            <DropDownPicker
                placeholder='Select a student'
                
                open={openDropdown}
                value={studentId}
                items={students.map(s => { return { label: s.name, value: s.id } as ItemType<number> })}
                setOpen={setOpenDropdown}
                setValue={setStudentId}
            />
            <DateTimePicker
                mode='datetime'
                value={startDate.toJSDate()}
                onChange={(event, selectedDate) => setStartDate(DateTime.fromJSDate(selectedDate))}
            />
            <DateTimePicker
                mode='datetime'
                value={endDate.toJSDate()}
                onChange={(event, selectedDate) => setEndDate(DateTime.fromJSDate(selectedDate))}
            />
            <TouchableHighlight
                style={[instructorStyle.confirmButton, styles.modalButton]}
                onPress={createDrivingLesson}
                disabled={!studentId || !startDate || !endDate}
            >
                <Text style={styles.textStyle}>Create</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={[instructorStyle.confirmButton, styles.buttonClose, styles.modalButton]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
        </View>
    </View>
    </Modal>
    )
}

export default AddDrivingLessonModal

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      //alignItems: 'center'
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalButton: {
        width: 300
    },
    buttonClose: {
      backgroundColor: '#a3a0a3'
    },
    textStyle: {
      color: 'white',
      textAlign: 'center',
      fontSize: 15
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontWeight: 'bold'
    },
  });