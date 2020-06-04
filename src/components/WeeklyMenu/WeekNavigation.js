import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import * as Icons from '../Icons';
import { Navigation, WeekDay, Day, Date } from './Styles';
import Theme from '../../theme/Theme';

const WeekNavigation = ({ weekDates, calendarDate, handleDateToShow }) => {

  const week = Object.entries(weekDates).map((key) => {
    const day = key[0];
    const date = key[1];
    const isActive = calendarDate === key[1];

    return (
      <TouchableWithoutFeedback
        key={key[0]}
        dataDay={key[0]}
        onPress={() => {
          handleDateToShow(key[0])
        }}
        style={{ borderWidth: 1, borderColor: 'red' }}
      >
        <WeekDay active={isActive}>
          <Day>{day}</Day>
          <Date active={isActive}>{date}</Date>
        </WeekDay>
      </TouchableWithoutFeedback>
    )
  })

  return (
    <Navigation style={styles.shadow}>
      <Icons.ArrowLeft fill={Theme.colors.primary} />
      {week}
      <Icons.ArrowRight fill={Theme.colors.primary} />
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