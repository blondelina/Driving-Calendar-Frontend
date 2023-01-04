import React, { useEffect, useState } from "react"
import { View, Text, Button, FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableHighlight, TouchableOpacity, ActivityIndicator, Animated } from "react-native"
import { Api } from '../constants/constants';
import { useAxios } from "../config/AxiosConfig";
import { StudentResponse } from "../models/responses/StudentResponse";
import { useAuth } from "./contexts/AuthProvider";
import { formatString } from "../utils/StringUtils";
import { StatusBar } from "react-native";
import { Swipeable, RectButton } from "react-native-gesture-handler";

const ExpandedItem = ({ student } : { student: StudentResponse }) => (
    <View style={styles.item}>
        <Text style={styles.expandedStudent}>{student.name}</Text>
        <View
            style={{
                marginTop: 20,
                marginBottom: 20,
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }}
        />
        <Text style={styles.expandedStudent}>{student.name}</Text>
    </View>
);

const EnrolledStudents = () => {
    const { authData } = useAuth();
    const axios = useAxios();

    const [students, setStudents] = useState<StudentResponse[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [clickedItemId, setClickedItemId] = useState<number | null>(null);

    const renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-20, 0, 0, 1],
        });
        return (
          <RectButton onPress={() => console.log("abcd")}>
            <Animated.Text
              style={[
                {
                  transform: [{ translateX: trans }],
                },
              ]}>
              Archive
            </Animated.Text>
          </RectButton>
        );
      };

    const Item = ({ student } : { student: StudentResponse }) => (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.item}>
                <Text style={styles.student}>{student.name}</Text>
            </View>
        </Swipeable>
    );

    useEffect( () => {
        axios.get<StudentResponse[]>(formatString(Api.Routes.GetInstructorStudents, authData.id))
             .then(response => {
                setStudents(response.data);
                setClickedItemId(null);
             });
    }, [refreshing,]);

    const onRefresh = async () => {
        setRefreshing(true);

        const response = await axios.get<StudentResponse[]>(formatString(Api.Routes.GetInstructorStudents, authData.id));
        setStudents(response.data);
        setRefreshing(false);
    }

    const renderItem = ({ item } : { item: StudentResponse }) => {
        return <Item student={item}/>
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={students}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<Text>No students enrolled.</Text>}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#D6D6D6',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 15
    },
    expandedItem: {
      backgroundColor: '#D6D6D6',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 15,
      flexDirection: 'row'
    },
    student: {
      fontSize: 20,
      textAlign: 'center'
    },
    expandedStudent: {
      fontSize: 20,
      textAlign: 'center',
      height: '50%',
      flex: 1
    }
  });

export default EnrolledStudents;