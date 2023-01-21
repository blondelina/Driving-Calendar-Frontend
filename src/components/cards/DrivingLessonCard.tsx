import React, { useState } from "react";
import { Animated, View, Text, StyleSheet, Alert } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { DrivingLessonResponse } from "../../models/responses/DrivingLessonResponse";
import { DateTime } from "luxon";
import { instructorStyle } from "../../styles/InstructorStyle";
import { useAxios } from "../../config/AxiosConfig";
import { formatString } from "../../utils/StringUtils";
import { Api } from "../../constants/constants";
import { DrivingLesson } from "../../models/DrivingLesson";
import { Status } from "../../models/enums/Status";

const DrivingLessonCard = ({ drivingLessonResponse, deleteCallback }: { drivingLessonResponse: DrivingLessonResponse, deleteCallback?: (_: DrivingLessonResponse) => void }) => {
  const axios = useAxios();
  console.log(drivingLessonResponse.status);
  const [drivingLesson] = useState({
    id: drivingLessonResponse.id,
    instructorId: drivingLessonResponse.instructorId,
    studentId: drivingLessonResponse.studentId,
    instructorName: drivingLessonResponse.instructorName,
    studentName: drivingLessonResponse.studentName,
    startDate: DateTime.fromISO(drivingLessonResponse.startDate),
    endDate: DateTime.fromISO(drivingLessonResponse.endDate),
    status: drivingLessonResponse.status
  } as DrivingLesson);

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
      {renderRightAction('View student', '#40ab30', 192, progress, showStudentDrivingLessons)}
      {renderRightAction('Delete', '#dd2c00', 128, progress, popUpDeleteDrivingLesson)}
    </View>
  );

  const showStudentDrivingLessons = () => {
    console.log("Show student driving lessons");
  }

  const deleteDrivingLesson = async () => {
    try {
      const response = await axios.delete(formatString(Api.Routes.DeleteDrivingLesson, drivingLesson.id));
      if(deleteCallback) {
        deleteCallback(drivingLessonResponse);
      }
    }
    catch(e) {
      Alert.alert("Something went wrong.")
    }
  }

  const popUpDeleteDrivingLesson = () => {
    Alert.alert('Delete driving lesson', 'Are you sure you want to delete the driving lesson?', [
      {
        text: 'Delete',
        onPress: deleteDrivingLesson,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      }
    ]);
  }

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View style={
          [
            instructorStyle.driveLessonElement, 
            { opacity: drivingLesson.endDate >= DateTime.now() ? 1 : 0.5 }]}>
          <View style={{ marginTop: 5}}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
              {drivingLesson.studentName}
            </Text>
            <Text style={{...instructorStyle[drivingLesson.status], fontWeight: 'bold'}}>
                {drivingLesson.status == Status.Confirmed && drivingLesson.endDate < DateTime.now() ? 'Completed' : drivingLesson.status}
            </Text>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ marginBottom: 5 }}>
              {drivingLesson.startDate.toFormat("HH:mm")}
            </Text>
            <Text>
              {drivingLesson.endDate.toFormat("HH:mm")}
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
  }
});

export default DrivingLessonCard;