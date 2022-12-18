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
        height: '85%'
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
        height: '50%'
    },
});

export { instructorStyle }