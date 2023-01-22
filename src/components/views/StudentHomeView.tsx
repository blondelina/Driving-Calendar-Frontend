import { DateTime } from "luxon";
import React, { useState, useEffect } from "react";
import { Text, Alert, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RefreshControl, ScrollView, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAxios } from "../../config/AxiosConfig";
import { Api } from "../../constants/constants";
import { StudentDetailResponse } from "../../models/responses/StudentDetailResponse";
import { mainStyles } from "../../styles/MainStyles";
import { formatString } from "../../utils/StringUtils";
import { useAuth } from "../contexts/AuthProvider";
import UpdateExamDateModal from "../modals/UpdateExamDateModal";
import { UpdateStudentExamDateRequest } from "../../models/requests/UpdateStudentExamDateRequest";
import { DrivingLessonResponse } from "../../models/responses/DrivingLessonResponse";
import { StudentDrivingLessonParams } from "../../models/requests/StudentDrivingLessonParams";
import { Status } from "../../models/enums/Status";
import ConfirmDrivingLessonCard from "../cards/ConfirmDrivingLessonCard";

const StudentHomeView = () => {
  const { authData } = useAuth();
  const axios = useAxios();

  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [student, setStudent] = useState({} as StudentDetailResponse);
  const [drivingLessons, setDrivingLessons] = useState<DrivingLessonResponse[]>([]);

  useEffect(() => {
    loadStudentDetails();
    loadStudentConfirmedDrivingLessons();
  }, []);

  const onRefresh = () => {
    if(refreshing) {
      return;
    }
    
    setRefreshing(true);
    loadStudentDetails();
    loadStudentConfirmedDrivingLessons();
  };

  const updateExamDate = async (newExamDate: DateTime | null) => {
    const response = await axios.put(formatString(Api.Routes.UpdateExamDate, authData.id), {
      examDate: newExamDate
    } as UpdateStudentExamDateRequest);

    if(response) {
      setStudent({...student, examDate: newExamDate ? newExamDate.toISO() : null});
    }
  };

  const loadStudentDetails = () => {
    axios.get<StudentDetailResponse>(formatString(Api.Routes.StudentDetails, authData.id))
         .then(response => {
            if(response) {
              setStudent(response.data);
            }
         })
         .catch(error => {
            Alert.alert("Something went wrong.");
            console.error(error);
         });
  };

  const loadStudentConfirmedDrivingLessons = () => {
    axios.get<DrivingLessonResponse[]>(formatString(Api.Routes.StudentDrivingLessons, authData.id), {
      params: {
        status: Status.Confirmed
      } as StudentDrivingLessonParams
    })
    .then(response => {
      if(response) {
        setDrivingLessons(response.data);
      }
    })
    .catch(error => {
      Alert.alert("Something went wrong.");
      console.error(error);
    })
    .finally(() => setRefreshing(false));
  };

  const renderScheduledDrivingLessons = () => {
    if(refreshing && drivingLessons.length === 0) {
      return <></>;
    }

    if(drivingLessons.length === 0) {
      return (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text>No scheduled future driving lessons.</Text>
        </View>
      )
    }

    return (
      <>
        {drivingLessons
          .filter(dl => DateTime.fromISO(dl.endDate) >= DateTime.now())
          .sort((a, b) => DateTime.fromISO(a.startDate) <= DateTime.fromISO(b.startDate) ? -1 : 1)
          .map(dl => 
            <ConfirmDrivingLessonCard 
              key={dl.id + dl.status} 
              drivingLesson={dl} 
              showActions={false}/>
          )
        }
      </>
    )
  };

  return (
    <SafeAreaView style={mainStyles.container}>
      <UpdateExamDateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onUpdatedExamDate={async (newExamDate) => await updateExamDate(newExamDate)}
        onDeletedExamDate={async () => await updateExamDate(null)}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
          />
      }>
        <Text style={mainStyles.headerStyle}>Home</Text>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: 'white',
          justifyContent: 'center',
          marginTop: 20
        }}>
          <Text style={mainStyles.contentStyle}>
            {"Exam date: "} 
            <Text style={{ fontWeight: 'bold' }}>
              {student.examDate ? 
              DateTime.fromISO(student.examDate).toFormat("dd MMM yyyy") :
              "Not fixed"}
            </Text>
          </Text> 
          <TouchableOpacity 
            onPress={() => setModalVisible(true)}
            style={{ paddingTop: 15 }}
          >
            <MaterialIcons name={'edit'} size={30} color={'#7464bc'}/>
          </TouchableOpacity>
        </View> 

        <View style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: 'white',
          justifyContent: 'center',
          marginTop: 20
        }}>
          <Text style={mainStyles.contentStyle}>
            {"Completed lessons: "} 
            <Text style={{ fontWeight: 'bold' }}>
              {drivingLessons.filter(dl => DateTime.fromISO(dl.endDate) < DateTime.now()).length}/15
            </Text>
          </Text> 
        </View>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          padding: 40
        }}>Scheduled driving lessons</Text>
        {renderScheduledDrivingLessons()}
      </ScrollView>
    </SafeAreaView>
  )
}

export default StudentHomeView;