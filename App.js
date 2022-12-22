import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import StudentView from './src/views/StudentView';
import Login from './src/components/Login';
import Register from './src/components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import InstructorTabNavigator from './src/components/InstructorTabNavigator';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar></StatusBar>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Instructor" component={InstructorTabNavigator} />
        <Stack.Screen name="Student" component={StudentView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
