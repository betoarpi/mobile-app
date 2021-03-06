import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components';
import * as Icons from './Icons';

const EventsCalendar = (props) => {
  const { theme } = props;
  const renderArrow = (direction) => {
    if (direction === 'left') {
      return <Icons.ArrowLeft fill={`${theme.colors.primary}`} />
    } else {
      return <Icons.ArrowRight fill={`${theme.colors.primary}`} />
    }
  };
  return (
    <CalendarContainer style={styles.shadow}>
      <Calendar
        onDayPress={(day) => { console.log('selected day', day) }}
        markedDates={{
          '2020-04-16': { selected: true, marked: true },
          '2020-04-17': { marked: true },
          '2020-04-18': { marked: true, activeOpacity: 0 },
          '2020-04-19': { disabled: true, disableTouchEvent: true }
        }}
        renderArrow={renderArrow}
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: '#353535',
          selectedDayBackgroundColor: `${theme.colors.primaryLighten}`,
          selectedDayTextColor: `${theme.colors.primary}`,
          todayTextColor: `${theme.colors.primary}`,
          dayTextColor: '#4a4a4a',
          textDisabledColor: '#d9e1e8',
          dotColor: `${theme.colors.primary}`,
          selectedDotColor: `${theme.colors.primary}`,
          arrowColor: `${theme.colors.primary}`,
          disabledArrowColor: '#d9e1e8',
          monthTextColor: `${theme.colors.primary}`,
          indicatorColor: `${theme.colors.primary}`,
          textDayFontFamily: 'Lato-Bold',
          textMonthFontFamily: 'Muli-Bold',
          textDayHeaderFontFamily: 'Lato-Regular',
          textDayFontWeight: 'normal',
          textDayHeaderFontWeight: 'normal',
          textDayFontSize: 14,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 12
        }}
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.View`
  background-color: white;
  border-radius: 10px;
  margin-bottom: 28px;
`
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
export default EventsCalendar;