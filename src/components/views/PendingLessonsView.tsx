import { DateTime } from 'luxon';
import React, { useState, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAxios } from '../../config/AxiosConfig';
import { Api } from '../../constants/constants';
import { Status } from '../../models/enums/Status';
import { PatchDrivingLessonRequest } from '../../models/requests/PatchDrivingLessonRequest';
import { StudentDrivingLessonParams } from '../../models/requests/StudentDrivingLessonParams';
import { DrivingLessonResponse } from '../../models/responses/DrivingLessonResponse';
import { mainStyles } from '../../styles/MainStyles';
import { formatString } from '../../utils/StringUtils';
import ConfirmDrivingLessonCard from '../cards/ConfirmDrivingLessonCard';
import { useAuth } from '../contexts/AuthProvider';

const PendingLessonsView = ({ updateNotificationsCount } : { updateNotificationsCount?: (_: number) => void }) => {
  const axios = useAxios();
  const { authData } = useAuth();
  const [refreshing, setRefreshing] = useState(true);
  const [drivingLessons, setDrivingLessons] = useState<DrivingLessonResponse[]>([]);

  useEffect(() => {
    axios.get<DrivingLessonResponse[]>(formatString(Api.Routes.StudentDrivingLessons, authData.id), {
            params: {
              status: Status.Pending
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
  }, [refreshing,]);

  useEffect(() => {
    if(updateNotificationsCount) {
      updateNotificationsCount(drivingLessons.filter(dl => dl.status == Status.Pending).length);
    };
  }, [drivingLessons]);

  const onRefresh = () => {
    if(refreshing) {
      return;
    }
  
    setRefreshing(true);
  }

  const respondToDrivingLessonRequest = async (drivingLesson: DrivingLessonResponse, newStatus: Status) => {
    const response = await axios.patch(formatString(Api.Routes.StudentPatchDrivingLesson, drivingLesson.id), {
      status: newStatus
    } as PatchDrivingLessonRequest);

    if(response && response.status == 204) {
      setDrivingLessons([
        ...drivingLessons.filter(dl => dl.id !== drivingLesson.id),
        {
          ...drivingLesson,
          status: newStatus
        } as DrivingLessonResponse
      ]);
    }
  };

  const confirmDrivingLesson = async (drivingLesson: DrivingLessonResponse) => {
    await respondToDrivingLessonRequest(drivingLesson, Status.Confirmed);
  };

  const rejectDrivingLesson = async (drivingLesson: DrivingLessonResponse) => {
    await respondToDrivingLessonRequest(drivingLesson, Status.Rejected);
  };

  const renderDrivingLessons = () => {
    if(refreshing && drivingLessons.length === 0) {
      return <></>;
    }

    if(drivingLessons.length === 0) {
      return (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text>No more pending driving lessons.</Text>
        </View>
      )
    }

    return (
      <>
        {drivingLessons
          .sort((a, b) => DateTime.fromISO(a.startDate) <= DateTime.fromISO(b.startDate) ? -1 : 1)
          .map(dl => 
            <View key={dl.id + dl.status}  style={{ opacity: dl.status === Status.Pending ? 1 : 0.5 }}>
              <ConfirmDrivingLessonCard 
                drivingLesson={dl} 
                showActions={dl.status === Status.Pending}
                onConfirm={confirmDrivingLesson}
                onReject={rejectDrivingLesson}/>
            </View>
          )
        }
      </>
    );
  };

  return (
      <SafeAreaView style={mainStyles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            /> 
        }>
          <Text style={mainStyles.headerStyle}>Pending driving lessons</Text>
          {renderDrivingLessons()}
        </ScrollView>
      </SafeAreaView>
  );
}

export default PendingLessonsView;