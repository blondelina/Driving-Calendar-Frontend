import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAxios } from '../config/AxiosConfig';
import { useAuth } from './contexts/AuthProvider';
import { formatString } from '../utils/StringUtils';
import { Api } from '../constants/constants';
import { StudentDrivingLessonParams } from '../models/requests/StudentDrivingLessonParams';
import { Status } from '../models/enums/Status';
import { DrivingLessonResponse } from '../models/responses/DrivingLessonResponse';
import SettingsView from './views/SettingsView';
import PendingLessonsView from './views/PendingLessonsView';
import StudentHomeView from './views/StudentHomeView';

const Tab = createBottomTabNavigator();

export default function StudentTabNavigator(){
    const { authData } = useAuth();
    const axios = useAxios();
    const [pendingLessonsNumber, setPendingLessonsNumber] = useState<number>(0);

    useEffect(() => {
        axios.get<DrivingLessonResponse[]>(formatString(Api.Routes.StudentDrivingLessons, authData.id), {
            params: {
                status: Status.Pending
            } as StudentDrivingLessonParams
        })
        .then(response => {
            if(response) {
                setPendingLessonsNumber(response.data.length);
            }
        })
        .catch(error => {
            Alert.alert("Something went wrong.");
            console.error(error);
        })
    }, []);

    const updateNotificationsCount = (notificationsCount: number) => {
      setPendingLessonsNumber(notificationsCount);
    }

    return(
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#7464bc",
                tabBarInactiveTintColor: 'gray',
            }} 
        >
            <Tab.Screen 
              name="Home" 
              component={StudentHomeView}
              options={{
                tabBarIcon: ({focused, color, size}) => {
                  const iconName = focused ? 'ios-home' : 'ios-home-outline';
                  return <Ionicons name={iconName} size={size} color={color} />;
                }
              }}/>
            <Tab.Screen 
              name='Pending'
              children={() => <PendingLessonsView updateNotificationsCount={updateNotificationsCount}/>}
              options={{
                tabBarBadge: pendingLessonsNumber ? pendingLessonsNumber : null,
                tabBarIcon: ({focused, color, size}) => {
                  const iconName = focused ? 'ios-car' : 'ios-car-outline';
                  return <Ionicons name={iconName} size={size} color={color} />;
                }
              }}/>
              <Tab.Screen 
              name="Settings" 
              component={SettingsView} 
              options={{
                tabBarIcon: ({focused, color, size}) => {
                  const iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                  return <Ionicons name={iconName} size={size} color={color} />;
                }
              }}/>
        </Tab.Navigator>
    )
}