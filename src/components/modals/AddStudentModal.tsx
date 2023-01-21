import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, Alert } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import qs from 'qs';
import { instructorStyle } from '../../styles/InstructorStyle';
import { SearchBar } from 'react-native-elements'
import { StudentResponse } from '../../models/responses/StudentResponse';
import { useAxios } from '../../config/AxiosConfig';
import { Api } from '../../constants/constants';
import StudentSearchCard from '../cards/StudentSearchCard';
import { GetStudentParams } from '../../models/requests/GetStudentsParams';
import { useAuth } from '../contexts/AuthProvider';

const AddStudentModal = ({ modalVisible, setModalVisible } : { modalVisible: boolean, setModalVisible: (arg0: boolean) => void })  => {
  const { authData } = useAuth();
  const axios = useAxios();

  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<StudentResponse[]>([]);

  useEffect(() => {
    if(!modalVisible) {
      return;
    }
    loadStudents();
  }, [modalVisible]);

  useEffect(() => loadStudents(), [searchQuery]);

  const loadStudents = () => {
    axios.get<StudentResponse[]>(Api.Routes.Students, 
      { 
        params: { 
          searchString: searchQuery,
          notAssignedToInstructors: [authData.id]
        } as GetStudentParams,
        paramsSerializer: {
          serialize: params => {
            return qs.stringify(params);
          }
        }
      })
      .then(response => setStudents(response.data))
      .catch(error => { 
        Alert.alert("Something went wrong."); 
        console.error(error) 
      });
  }

  const onAddedStudent = (student: StudentResponse) => {
    setStudents(students.filter(s => s.id !== student.id));
  };

  const renderStudents = () => {
    if(students.length === 0) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>No students found.</Text>
        </View>
      );
    }
    return (
      <>
        {students.map(s => <StudentSearchCard key={s.id} student={s} addedCallback={onAddedStudent}/>)}
      </>
    );
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
                <Text style={styles.modalText}>Search students: </Text>
                <SearchBar
                    placeholder='Search'
                    onChangeText={(search) => setSearchQuery(search)}
                    value={searchQuery}
                    platform='ios'
                />
                <ScrollView>
                    {renderStudents()}
                </ScrollView>
                <TouchableHighlight
                    style={[instructorStyle.confirmButton, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
            </View>
        </View>
    </Modal>
    )
}

export default AddStudentModal

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
      shadowColor: '#000',
      padding: '7%',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: '60%'
    },
    buttonClose: {
      backgroundColor: '#a3a0a3',
      marginTop: 5
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