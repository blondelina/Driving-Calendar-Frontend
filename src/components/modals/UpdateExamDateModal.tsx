import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { DateTime } from 'luxon';
import { TouchableHighlight } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { instructorStyle } from '../../styles/InstructorStyle';


const UpdateExamDateModal = ({modalVisible, setModalVisible, onUpdatedExamDate, onDeletedExamDate}: {
  modalVisible: boolean, 
  setModalVisible: (_: boolean) => void,
  onUpdatedExamDate?: (_: DateTime) => void,
  onDeletedExamDate?: () => void
}) => {
  const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now());

  const updateExamDate = () => {
    if(onUpdatedExamDate) {
      onUpdatedExamDate(selectedDate);
    }
    
    setModalVisible(false);
  }

  const removeExamDate = () => {
    if(onDeletedExamDate) {
      onDeletedExamDate();
    }
    
    setModalVisible(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => 
        setModalVisible(!modalVisible)
    }>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Text style={styles.modalText}>Update exam date</Text>
            <DateTimePicker
                mode='date'
                value={selectedDate.toJSDate()}
                onChange={(event, selectedDate) => setSelectedDate(DateTime.fromJSDate(selectedDate))}
                style={{
                  marginBottom: 10
                }}
            />
            <TouchableHighlight
                style={[instructorStyle.confirmButton, styles.modalButton]}
                onPress={updateExamDate}
            >
                <Text style={styles.textStyle}>Update</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={[instructorStyle.confirmButton, styles.modalButton, { backgroundColor: '#D2686E' }]}
                onPress={removeExamDate}
            >
                <Text style={styles.textStyle}>Remove</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={[instructorStyle.confirmButton, styles.buttonClose, styles.modalButton]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

export default UpdateExamDateModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
      width: 300
  },
  buttonClose: {
    backgroundColor: '#a3a0a3'
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});