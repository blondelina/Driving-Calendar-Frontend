import ManageStudents from './views/EnrolledStudentsView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import InstructorView from './views/InstructorView';
import React from 'react';
import SettingsView from './views/SettingsView';

const Tab = createBottomTabNavigator();

export default function InstructorTabNavigator(){
    return(
        <Tab.Navigator
            initialRouteName='Instructor'
            screenOptions={() => ({
                headerShown: false,
                tabBarActiveTintColor: "#7464bc",
                tabBarInactiveTintColor: 'gray',
              })} 
        >
            <Tab.Screen 
              name="Home" 
              component={InstructorView}
              options={{
                tabBarIcon: ({focused, color, size}) => {
                  const iconName = focused ? 'ios-home' : 'ios-home-outline';
                  return <Ionicons name={iconName} size={size} color={color} />;
                }
              }}/>
            <Tab.Screen 
              name="Student List" 
              component={ManageStudents}
              options={{
                tabBarIcon: ({focused, color, size}) => {
                  const iconName = focused ? 'ios-list' : 'ios-list-outline';
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