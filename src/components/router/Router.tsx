import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../contexts/AuthProvider";
import Register from "../Register";
import Login from "../views/LoginView";
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
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
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
        <Stack.Navigator>
          {renderStack()}
        </Stack.Navigator>
    </NavigationContainer>
  );
};