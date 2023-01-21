import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Octicons from 'react-native-vector-icons/Octicons';
import { instructorStyle } from '../../styles/InstructorStyle';
import { useAxios } from '../../config/AxiosConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshControl, ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { DateData, MarkedDates } from 'react-native-calendars/src/types';
import { DrivingLessonResponse } from '../../models/responses/DrivingLessonResponse';
import { DateTime } from 'luxon';
import { Api } from '../../constants/constants';
import { DrivingLessonsParams } from '../../models/requests/DrivingLessonsParams';
import { useAuth } from '../contexts/AuthProvider';
import DrivingLessonCard from '../cards/DrivingLessonCard';
import AddDrivingLessonModal from '../modals/AddDrivingLessonModal';
import { formatString } from '../../utils/StringUtils';
import { StudentResponse } from '../../models/responses/StudentResponse';

const InstructorView = () => {
  const axios = useAxios();
  const { authData } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [drivingLessons, setDrivingLessons] = useState<DrivingLessonResponse[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if(!selectedDate) {
      setMarkedDates({});
      return;
    }
    loadDrivingLessons(selectedDate);
    
    const markedDates = {} as MarkedDates;
    markedDates[selectedDate.toFormat('yyyy-MM-dd')] = {
      selected: true,
      selectedColor: "#7464bc"
    };
    setMarkedDates(markedDates);
  }, [selectedDate]);

  const onRefresh = async () => {
    if(refreshing) {
      return;
    }
    
    setRefreshing(true);
    if(selectedDate) {
      loadDrivingLessons(selectedDate);
    }
    setRefreshing(false);
  }

  const loadDrivingLessons = (selectedDate: DateTime): void => {
    axios.get<DrivingLessonResponse[]>(formatString(Api.Routes.InstructorDrivingLessons, authData.id), {
      params: {
        instructorId: authData.id,
        startDate: selectedDate,
        endDate: selectedDate.endOf('day')
      } as DrivingLessonsParams
    })
    .then(response => {
      if(response) {
        setDrivingLessons(response.data);
      }
    })
    .catch(e => {
      Alert.alert("Something went wrong");
      console.error(e);
    });
  }

  const onSelectDate = (date: DateData): void => {
    setSelectedDate(DateTime.fromISO(date.dateString).startOf('day'));
  }

  const onDeletedDrivingLesson = (drivingLesson: DrivingLessonResponse) => {
    setDrivingLessons(drivingLessons.filter(dl => dl.id != drivingLesson.id));
  }

  const onCreatedDrivingLesson = (drivingLesson: DrivingLessonResponse) => {
    if(DateTime.fromISO(drivingLesson.startDate).startOf('day') !== selectedDate.startOf('day')) {
      return;
    }

    setDrivingLessons([...drivingLessons, drivingLesson]);
  }

  const renderDrivingLessonsView = (): JSX.Element => {
    if(!selectedDate) {
      return (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text>Select a day to see lessons</Text>
        </View>);
    }

    if(drivingLessons.length) {
      return (
      <>
        {drivingLessons.sort((a, b) => a.startDate <= b.startDate ? -1 : 1)
                       .map(dl => <DrivingLessonCard key={dl.id.toString() + dl.status} drivingLessonResponse={dl} deleteCallback={onDeletedDrivingLesson}/>)}
      </>
      )
    }

    return (
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text>No driving lessons for that day</Text>
      </View>
    );
    
  }

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <AddDrivingLessonModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible}/>
      <ScrollView
        contentContainerStyle = {{ alignItems: 'stretch'}}
        refreshControl={
          <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
          />
      }
      >
        <View style={{marginLeft: 'auto', marginRight: 0, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight 
            style={instructorStyle.confirmButton}
            onPress={() => setModalVisible(true)}
          >
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={{fontSize: 15, color: 'white'}}>New lesson </Text>
              <Octicons name={'plus'} size={15} color={'white'}/>
            </View>
          </TouchableHighlight>
        </View>
        
        <Calendar
          markedDates={markedDates}
          onDayPress={onSelectDate}
          onMonthChange={() => setSelectedDate(null)}
          firstDay={1}
        />
        <View style={{ width: '100%', height: '100%' }}>
          {renderDrivingLessonsView()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InstructorView;
