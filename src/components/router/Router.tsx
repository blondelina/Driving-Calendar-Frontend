import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../contexts/AuthProvider";
import RegisterView from "../views/RegisterView";
import LoginView from "../views/LoginView";
import { Roles } from '../../constants/constants';
import InstructorTabNavigator from "../InstructorTabNavigator";
import SettingsView from "../views/SettingsView";
import StudentTabNavigator from '../StudentTabNavigator';

const Stack = createNativeStackNavigator();

export const Router = () => {
  const { authData, loading } = useAuth();

  const renderStack = () => {
    if(!authData?.jwt) {
      return (
        <>
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="Register" component={RegisterView} />
        </>
      );
    }

    switch(authData.role) {
      
      case Roles.Student:
        
        return <Stack.Screen name="Student" component={StudentTabNavigator} />;
      case Roles.Instructor:
        return <Stack.Screen name="Instructor" component={InstructorTabNavigator} />;
      default:
        Alert.alert("No view for company yet");
        return <Stack.Screen name="Settings" component={SettingsView} />;
    }
  }

  return (
    <NavigationContainer>
        <StatusBar></StatusBar>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          {renderStack()}
        </Stack.Navigator>
    </NavigationContainer>
  );
};