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
        padding: 10,
        alignSelf: 'center',
        marginTop: 10,
        width: '97%',
        backgroundColor: 'white',
        shadowColor: "#000",
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.3,
        
        elevation: 1,
    },
    studentCard:{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 10,
        alignSelf: 'center',
        marginTop: 10,
        width: '97%',
        backgroundColor: 'white',
        shadowColor: "#000",
        borderRadius: 7,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.3,
        
        elevation: 1,
    },
    textContent: {
    
    },
    button: {
        padding: 10,
        width: 80,
        textAlign: 'center',
        color: "white"
    },
    confirmButton: {
        padding: '3%', 
        backgroundColor: '#7464bc', 
        margin: '3%', 
        borderRadius: 4
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
        color: "#f5c242"
    },
    Confirmed:{
        color: "#99e599"
    },
    Rejected:{
        color: "#D2686E"
    }
});

export { instructorStyle }