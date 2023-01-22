import { StyleSheet, StatusBar } from 'react-native';

export const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    headerStyle: {
      fontSize: 25,
      fontWeight: 'bold',
      padding: 40
    },
    contentStyle: {
      fontSize: 20,
      padding: 20,
      marginLeft: 20,
    }
})