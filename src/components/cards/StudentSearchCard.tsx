import React from "react";
import { Animated, View, Text, StyleSheet, Alert } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { instructorStyle } from "../../styles/InstructorStyle";
import { useAxios } from "../../config/AxiosConfig";
import { formatString } from "../../utils/StringUtils";
import { Api } from "../../constants/constants";
import { StudentResponse } from "../../models/responses/StudentResponse";
import { useAuth } from "../contexts/AuthProvider";

const StudentSearchCard = ({ student, addedCallback }: { student: StudentResponse, addedCallback?: (student: StudentResponse) => void }) => {
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
    <View style={{ width: '30%', flexDirection: 'row' }}>
      {renderRightAction('Add', '#40ab30', 0, progress, addStudentToInstructor)}
    </View>
  );

  const addStudentToInstructor = () => {
    axios.post(formatString(Api.Routes.AddStudentToInstructor, authData.id, student.id))
         .then(response => {
            if(response) {
                addedCallback(student);
                Alert.alert("Student was successfully added!");
            }
         })
         .catch(error => {
            Alert.alert("Something went wrong");
            console.error(error);
         })
  }

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View style={[instructorStyle.studentCard, { backgroundColor: '#e8e8e8', width: '95%' }]}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', padding: 5 }}>
                {student.name}   {student.email}
            </Text>
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

export default StudentSearchCard;