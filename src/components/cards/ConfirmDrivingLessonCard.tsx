import React, { useState } from "react";
import { Animated, View, Text, StyleSheet, Alert } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { DrivingLessonResponse } from "../../models/responses/DrivingLessonResponse";
import { DateTime } from "luxon";
import { instructorStyle } from "../../styles/InstructorStyle";
import { Status } from "../../models/enums/Status";

const ConfirmDrivingLessonCard = ({ drivingLesson, showActions = true, onConfirm, onReject }: 
    { drivingLesson: DrivingLessonResponse, 
      showActions?: boolean, 
      onConfirm?: (_: DrivingLessonResponse) => void,
      onReject?: (_: DrivingLessonResponse) => void
    }) => {

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

  const renderRightActions = (progress) => {
    if(!showActions) {
      return <></>;
    }

    return (
      <View style={{ width: '50%', flexDirection: 'row' }}>
        {renderRightAction('Confirm', '#40ab30', 192, progress, () => onConfirm(drivingLesson))}
        {renderRightAction('Reject', '#dd2c00', 128, progress, () => onReject(drivingLesson))}
      </View>
    );
  };

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View style={instructorStyle.driveLessonElement}>
          <View style={{ marginTop: 5}}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
              {drivingLesson.instructor.name}
            </Text>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
              {drivingLesson.instructor.company.companyName}
            </Text>
            <Text style={{...instructorStyle[drivingLesson.status], fontWeight: 'bold'}}>
                {drivingLesson.status}
            </Text>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ marginBottom: 5 }}>
              {DateTime.fromISO(drivingLesson.startDate).toFormat("dd MMM yyyy HH:mm ")}
            </Text>
            <Text>
              {DateTime.fromISO(drivingLesson.endDate).toFormat("dd MMM yyyy HH:mm")}
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

export default ConfirmDrivingLessonCard;