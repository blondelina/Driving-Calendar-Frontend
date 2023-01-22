import React, { useEffect, useState } from "react"
import { View, Text, Alert, FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableHighlight } from "react-native"
import qs from 'qs';
import { Api } from '../../constants/constants';
import { useAxios } from "../../config/AxiosConfig";
import Octicons from 'react-native-vector-icons/Octicons';
import { StudentResponse } from "../../models/responses/StudentResponse";
import { useAuth } from "../contexts/AuthProvider";
import { formatString } from "../../utils/StringUtils";
import { StatusBar } from "react-native";
import StudentDrivingLessonCard from "../cards/StudentDrivingLessonCard";
import { instructorStyle } from "../../styles/InstructorStyle";
import AddStudentModal from "../modals/AddStudentModal";
import { SearchBar } from "react-native-elements";
import { GetStudentParams } from "../../models/requests/GetStudentsParams";
import { mainStyles } from "../../styles/MainStyles";

const EnrolledStudents = () => {
    const { authData } = useAuth();
    const axios = useAxios();

    const [students, setStudents] = useState<StudentResponse[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect( () => {
      setLoading(true);
        axios.get<StudentResponse[]>(formatString(Api.Routes.GetInstructorStudents, authData.id))
             .then(response => {
                setStudents(response.data);
                setLoading(false);
             });
    }, [refreshing,]);

    useEffect(() => {
      axios.get<StudentResponse[]>(formatString(Api.Routes.GetInstructorStudents, authData.id), 
            { 
              params: { 
                searchString: searchQuery
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
    }, [searchQuery]);

    const onRefresh = async () => {
      if(refreshing) {
        return;
      }
      
      setRefreshing(true);

      const response = await axios.get<StudentResponse[]>(formatString(Api.Routes.GetInstructorStudents, authData.id));
      setStudents(response.data);
      setRefreshing(false);
    }

    const onDeletedStudent = (student: StudentResponse) => {
      setStudents(students.filter(s => s.id != student.id));
    }

    const renderStudents = () => {
      if(students.length === 0 && loading) {
        return;
      }

      if(students.length === 0 && searchQuery === '') {
        return (
          <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text>No students enrolled.</Text>
          </View>
        );
      }

      if(students.length === 0 && searchQuery !== '') {
        return (
          <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text>No students enrolled with this name.</Text>
          </View>
        );
      }

      return <>
        {students.map(s => <StudentDrivingLessonCard key={s.id} student={s} deleteCallback={onDeletedStudent}/>)}
      </>
    }

    return (
        <SafeAreaView style={mainStyles.container}>
          <AddStudentModal 
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible}
          />
          <ScrollView
            refreshControl={
              <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
              />
          }>
            <View style={{marginLeft: 'auto', marginRight: 0, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableHighlight 
                style={instructorStyle.confirmButton}
                onPress={() => setModalVisible(true)}
              >
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{fontSize: 15, color: 'white'}}>Add student </Text>
                    <Octicons name={'plus'} size={15} color={'white'}/>
                </View>
              </TouchableHighlight>
            </View>
            <SearchBar
              placeholder='Search'
              onChangeText={(search) => setSearchQuery(search)}
              value={searchQuery}
              platform='ios'
              containerStyle={{backgroundColor: 'transparent'}}
            />
            <Text style={[mainStyles.headerStyle, { textAlign: 'center' }]}>Students: </Text>
              {renderStudents()}
          </ScrollView>
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