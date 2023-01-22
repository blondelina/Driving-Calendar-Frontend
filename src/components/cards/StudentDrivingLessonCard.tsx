import React, { useState, useEffect } from "react";
import { Animated, View, Text, StyleSheet, Alert } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { instructorStyle } from "../../styles/InstructorStyle";
import { useAxios } from "../../config/AxiosConfig";
import { formatString } from "../../utils/StringUtils";
import { Api } from "../../constants/constants";
import { useAuth } from "../contexts/AuthProvider";
import { StudentDetailResponse } from "../../models/responses/StudentDetailResponse";
import { DateTime } from "luxon";
import { StudentResponse } from "../../models/responses/StudentResponse";

const StudentDrivingLessonCard = ({ student, deleteCallback }: { student: StudentResponse, deleteCallback?: (_: StudentResponse) => void }) => {
  const axios = useAxios();
  const { authData } = useAuth();

  const [studentDetails, setStudentDetails] = useState({} as StudentDetailResponse);
  useEffect(() => {
    axios.get<StudentDetailResponse>(formatString(Api.Routes.StudentDetails, student.id))
         .then(response => {
          if(response) {
            setStudentDetails(response.data);
          }
         })
         .catch(error => console.error(error));
  }, [student]);

  const renderRightAction = (text: string, color: string, x: number, progress, action: () => void) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    return (
      <Animated.View style={{ flex:1,  transform: [{ translateX: trans }] }}>
        <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={action}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress) => (
    <View style={{ width: '20%', flexDirection: 'row' }}>
      {renderRightAction('Delete', '#dd2c00', 0, progress, popUpDeleteDrivingLesson)}
    </View>
  );


  const deleteStudentFromInstructor = async () => {
    try {
      const response = await axios.delete(formatString(Api.Routes.DeleteStudentFromInstructor, authData.id, student.id));
      if(response && deleteCallback) {
        deleteCallback(student);
      }
    }
    catch(e) {
      Alert.alert("Something went wrong.")
    }
  }

  const popUpDeleteDrivingLesson = () => {
    Alert.alert('Delete driving lesson', 'Are you sure you want to remove the student? Driving lessons will also be deleted', [
      {
        text: 'Delete',
        onPress: deleteStudentFromInstructor,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      }
    ]);
  }

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View style={instructorStyle.studentCard}>
          <View style={{ marginTop: 5}}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
              {student.name}
            </Text>
            <Text style={{ marginBottom: 5 }}>
              {"Exam date: "}
              <Text style={{ fontWeight: 'bold' }}>
                {studentDetails.examDate ? DateTime.fromISO(studentDetails.examDate).toFormat("yyyy MMM dd") : "Not fixed"}
              </Text>
            </Text>
          </View>
        </View>
      </Swipeable>
    )
}

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flex: 1
  },
});

export default StudentDrivingLessonCard;