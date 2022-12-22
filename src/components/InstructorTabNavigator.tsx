import ManageStudents from './EnrolledStudents';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import InstructorView from './views/InstructorView';
import React from 'react';
import Settings from './Settings';
import AddStudentsForInstructor from './AddStudentsForInstructor';

const Tab = createBottomTabNavigator();

export default function InstructorTabNavigator(){
    return(
        <Tab.Navigator
            initialRouteName='Instructor'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'ios-home'
                      : 'ios-home-outline';
                  } else if (route.name === 'Student List') {
                    iconName = focused ? 'ios-list' : 'ios-list-outline';
                  } else if (route.name === 'Add Students') {
                    iconName = focused ? 'add-circle' : 'add-circle-outline';
                  }
                  else if (route.name === 'Settings') {
                    iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#7464bc",
                tabBarInactiveTintColor: 'gray',
              })} 
        >
            <Tab.Screen name="Home" component={InstructorView} ></Tab.Screen>
            <Tab.Screen name="Student List" component={ManageStudents} ></Tab.Screen>
            <Tab.Screen name="Add Students" component={AddStudentsForInstructor} ></Tab.Screen>
            <Tab.Screen name="Settings" component={Settings} ></Tab.Screen>

        </Tab.Navigator>
    )
}


