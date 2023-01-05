import {
    StyleSheet
} from 'react-native';

const instructorStyle = StyleSheet.create({
    instructorView: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%'
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
        marginBottom: '10%',
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
        height: '70%'
    },
    studentElement: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 5,
        borderRadius: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.3,
        
        elevation: 1,
    },
    driveLessonElement:{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        margin: 5,
        borderRadius: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.3,
        
        elevation: 1,
    },
    textContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    headerStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20
    },
    button: {
        padding: 10,
        width: 80,
        textAlign: 'center',
        color: "white"
    },
    dateButton: {
        padding: 10,
        textAlign: 'center',
        color: "white"
    },
    date:{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        margin: 5,
        borderRadius: 4,
        width:250,
        backgroundColor: '#414a4c',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.3,
        
        elevation: 1,
    },
    time:{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        margin: 5,
        borderRadius: 4,
        width:110,
        backgroundColor: '#414a4c',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.3,
        
        elevation: 1,
    },
    timeView:{
        display: 'flex',
        flexDirection: 'row',
    },
    dateTimeView:{
        alignItems: 'center',
        padding: 15,
        margin: 5,
        borderRadius: 15,
    },
    lessonsList: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '80%'
    },
    Pending:{
        padding: 5, 
        backgroundColor: "#FFD580",
        borderRadius: 7,
        width: 150
    },
    Confirmed:{
        padding: 5, 
        backgroundColor: "#99e599",
        borderRadius: 7,
        width: 150
    },
    Rejected:{
        padding: 5, 
        backgroundColor: "#D2686E",
        borderRadius: 7,
        width: 150
    }
});

export { instructorStyle }