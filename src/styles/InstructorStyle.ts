import {
    StyleSheet
} from 'react-native';

const instructorStyle = StyleSheet.create({
    instructorView: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '85%'
    },
    buttonsViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '50%'
    },
    calendarStyle: {
        marginTop: '10%'
    },
    signOutStyle: {
        marginTop: '5%',
        display: 'flex',
        alignItems: 'flex-start',
    },
    instructorSearch: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '15%',
        marginBottom: '3%',
    },
    textboxStyle: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10, 
        backgroundColor: 'white',
        padding: 10,
        textAlign: 'left',
        margin: 10,
        width: 200
    },
    studentList: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '57%'
    },
    studentElement:{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding:10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    textContent:{
        display: 'flex',
        flexDirection: 'column',
    },
    headerStyle:{
        fontSize:20,
        fontWeight: 'bold',
        padding:20
    }
});

export { instructorStyle }