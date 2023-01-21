import React from "react";
import { Animated, View, Text, StyleSheet, Alert } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { instructorStyle } from "../../styles/InstructorStyle";
import { useAxios } from "../../config/AxiosConfig";
import { formatString } from "../../utils/StringUtils";
import { Api } from "../../constants/constants";
import { StudentResponse } from "../../models/responses/StudentResponse";
import { useAuth } from "../contexts/AuthProvider";

const StudentDrivingLessonCard = ({ student, deleteCallback }: { student: StudentResponse, deleteCallback?: (_: StudentResponse) => void }) => {
  const axios = useAxios();
  const { authData } = useAuth();

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
    <View style={{ width: '50%', flexDirection: 'row' }}>
      {renderRightAction('View student', '#40ab30', 128, progress, showStudentDrivingLessons)}
      {renderRightAction('Delete', '#dd2c00', 128, progress, popUpDeleteDrivingLesson)}
    </View>
  );

  const showStudentDrivingLessons = () => {
    console.log("Show student driving lessons");
  }

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