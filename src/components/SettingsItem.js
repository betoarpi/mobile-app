import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Switch } from 'react-native';
import styled from 'styled-components';
import { Paragraph } from '../theme/Styles';
import ScalableText from 'react-native-text';
import { Entypo } from '@expo/vector-icons';
import Theme from '../theme/Theme';

const SettingsItem = (props) => {
  const { children, type, handlePress, databaseId, handleSettings, active } = props;

  return (
    <TouchableWithoutFeedback
      onPress={
        type === 'settings' ? null
          :
          () => {
            handlePress(databaseId)
          }
      }>
      <ListItem>
        <ScalableText style={listText}>
          {children}
        </ScalableText>
        {type === 'settings' ?
          <Switch
            trackColor={{ false: "#7e7e7e", true: `${Theme.colors.primary}` }}
            thumbColor="#ffffff"
            ios_backgroundColor="#7e7e7e"
            onValueChange={handleSettings}
            value={active}
          />
          :
          <Entypo name={'chevron-small-right'} size={24} color={Theme.colors.primary} />
        }
      </ListItem>
    </TouchableWithoutFeedback>
  );
};

const ListItem = styled.View`
  background-color: #ffffff;
  padding:15px 24px;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`
const listText = {
  fontSize: 18,
  lineHeight: 18 * 1.33,
  fontFamily: 'Lato-Light',
  color: '#202020',
}
export default SettingsItem;