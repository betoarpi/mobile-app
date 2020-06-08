import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { Navigation, WeekDay, Day, Date } from './Styles';
import Theme from '../../theme/Theme';

const WeekNavigation = () => {
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