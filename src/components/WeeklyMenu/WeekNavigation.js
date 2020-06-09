import React from 'react';

import { StyleSheet, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
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
    <SafeAreaView style={{flex: 1}}>
    <Navigation style={styles.shadow}>
      <Ionicons name={'ios-arrow-dropleft-circle'} size={24} color={Theme.colors.primary} />
      <WeekDay>
        <Day>Mon</Day>
        <Date>13</Date>
      </WeekDay>
      <WeekDay active={true}>
        <Day>Tue</Day>
        <Date active={true}>14</Date>
      </WeekDay>
      <WeekDay>
        <Day>Mie</Day>
        <Date>15</Date>
      </WeekDay>
      <WeekDay>
        <Day>Jue</Day>
        <Date>16</Date>
      </WeekDay>
      <WeekDay>
        <Day>Vie</Day>
        <Date>17</Date>
      </WeekDay>
      <Ionicons name={'ios-arrow-dropright-circle'} size={24} color={Theme.colors.primary} />
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
    </SafeAreaView>
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