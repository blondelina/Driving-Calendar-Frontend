import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../contexts/AuthProvider";
import RegisterView from "../views/RegisterView";
import LoginView from "../views/LoginView";
import { Roles } from '../../constants/constants';
import StudentView from "../views/StudentView";
import InstructorTabNavigator from "../InstructorTabNavigator";
import Settings from "../Settings";
import Loading from "../Loading";

const Stack = createNativeStackNavigator();

export const Router = () => {
  const { authData, loading } = useAuth();

  if(loading) {
    return <Loading />;
  }

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
        return <Stack.Screen name="Student" component={StudentView} />;
      case Roles.Instructor:
        return <Stack.Screen name="Instructor" component={InstructorTabNavigator} />;
      default:
        Alert.alert("No view for company yet");
        return <Stack.Screen name="Settings" component={Settings} />;
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