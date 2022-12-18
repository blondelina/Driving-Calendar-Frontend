import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import apiConstants from '../constants/apiConstants';
import { getItem, removeItem } from '../utils/TokenHandler';
import { instructorStyle } from '../styles/InstructorStyle';

const InstructorView = ({ navigation }: { navigation: any }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [formattedEndDate, setFormattedEndDate] = useState<String>();
  const [formattedStartDate, setFormattedStartDate] = useState<String>();
  const [changePeriodOk, setChangePeriodOk] = useState(false);
  const [pastMarkedDates, setPastMarkedDates] = useState({});

  async function postData() {
    getItem().then(result =>
      fetch(apiConstants.BaseURL + "/api/users/4/availabilities", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + result,
          'accept': '*/*',
        },
        body: JSON.stringify({
          "startDate": startDate,
          "endDate": endDate,
          "repeat": 0
        })
      }).then(response => response.json())
        .then(response => console.log(response))
        .catch(error => {
          console.log(error.message);
        })
    )
  }

  function createDateRange(fStartDate: String, fEndDate: String) {
    const dateRange = {
      [fStartDate as string]: {
        selected: true,
        startingDay: true,
        color: 'green',
      },
      [fEndDate as string]: { selected: true, endingDay: true, color: 'green' },
    };
    if (fStartDate && fEndDate) {
      let start = moment(fStartDate as string)
        .startOf('day')
        .add(1, 'days');
      const end = moment(fEndDate as string).startOf('day');
      while (end.isAfter(start)) {
        Object.assign(dateRange, {
          [start.format('YYYY-MM-DD')]: { selected: true, color: 'green' },
        });
        start = start.add(1, 'days');
      }
    }
    setPastMarkedDates(dateRange);
    setChangePeriodOk(false);
    return dateRange;
  }

  useEffect(() => {
    var changedDate = '';
    changedDate = startDate.getFullYear().toString() + '-';
    if (startDate.getMonth() + 1 < 10)
      changedDate =
        changedDate + '0' + (startDate.getMonth() + 1).toString() + '-';
    else
      changedDate = changedDate + (startDate.getMonth() + 1).toString() + '-';
    if (startDate.getDate() < 10)
      changedDate = changedDate + '0' + startDate.getDate().toString();
    else changedDate = changedDate + startDate.getDate().toString();
    setFormattedStartDate(changedDate);
  }, [, startDate]);

  useEffect(() => {
    var changedDate = '';
    changedDate = endDate.getFullYear().toString() + '-';
    if (endDate.getMonth() + 1 < 10)
      changedDate =
        changedDate + '0' + (endDate.getMonth() + 1).toString() + '-';
    else changedDate = changedDate + (endDate.getMonth() + 1).toString() + '-';
    if (endDate.getDate() < 10)
      changedDate = changedDate + '0' + endDate.getDate().toString();
    else changedDate = changedDate + endDate.getDate().toString();
    setFormattedEndDate(changedDate);
  }, [, endDate]);

  return (
    <View>
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={instructorStyle.instructorView}>
          <Text>Pick start date and time.</Text>
          <DateTimePicker
            value={startDate}
            onChange={e => {
              console.log(e);
            }}
            textColor="#000000"
          />
          <Text>Pick end date and time.</Text>
          <DateTimePicker
            value={endDate}
            onChange={date => {
              console.log(date)
            }}
            textColor="#000000"
          />
          <Button
            title="Submit"
            onPress={() => {
              startDate.setHours(startDate.getHours() - (startDate.getTimezoneOffset() / 60))
              endDate.setHours(endDate.getHours() - (endDate.getTimezoneOffset() / 60))
              postData()
              setModalVisible(!modalVisible);
              setChangePeriodOk(true);
            }}
          />
          <Button
            title="Cancel"
            onPress={() => {
              setModalVisible(!modalVisible);
              setChangePeriodOk(false);
            }}
          />
        </View>
      </Modal>
      <Calendar
        style={instructorStyle.calendarStyle}
        markingType={'period'}
        markedDates={
          changePeriodOk
            ? createDateRange(
              formattedStartDate as String,
              formattedEndDate as String,
            )
            : pastMarkedDates
        }></Calendar>

      <View style={instructorStyle.buttonsViewStyle}>
        <Button
          color={"#7464bc"}
          title="Manage schedule"
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>

    </View>
  );
};

export default InstructorView;
