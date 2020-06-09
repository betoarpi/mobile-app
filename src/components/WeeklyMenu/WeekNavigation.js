import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import * as Icons from '../Icons';
import { Navigation, WeekDay, Day, Date } from './Styles';
import Theme from '../../theme/Theme';

const WeekNavigation = ({ weekDates, calendarDate, handleDateToShow, handleIsWeek }) => {

  const week = Object.entries(weekDates).map((key) => {
    const day = key[0];
    const date = key[1];

    return (
      <TouchableWithoutFeedback
        key={key[0]}
        dataDay={key[0]}
        onPress={() => {
          handleDateToShow(key[0], key[1])
        }}
        style={{ borderWidth: 1, borderColor: 'red' }}
      >
        <WeekDay active={calendarDate}>
          <Day>{day}</Day>
          <Date active={calendarDate}>{date}</Date>
        </WeekDay>
      </TouchableWithoutFeedback>
    )
  })

  return (
    <Navigation style={styles.shadow}>
      <TouchableWithoutFeedback
        onPress={() => handleIsWeek('left')}
      >
        <Icons.ArrowLeft fill={Theme.colors.primary} />
      </TouchableWithoutFeedback>
      {week}
      <TouchableWithoutFeedback
        onPress={() => handleIsWeek('right')}
      >
        <Icons.ArrowRight fill={Theme.colors.primary} />
      </TouchableWithoutFeedback>
    </Navigation>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgb(138, 138, 138)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.21,
    shadowRadius: 4,

    elevation: 4,
  }
})
export default WeekNavigation;