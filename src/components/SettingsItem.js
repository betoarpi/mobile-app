import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Switch } from 'react-native';
import styled from 'styled-components';
import { Paragraph } from '../theme/Styles';
import * as Icons from '../components/Icons';
import {Ionicons} from '@expo/vector-icons';
import Theme from '../theme/Theme';

const SettingsItem = (props) => {
  const { children, selected, type, handlePress, databaseId } = props;
  const [isEnabled, setIsEnabled] = useState(selected);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
        <ListText>
          {children}
        </ListText>
        {type === 'settings' ?
          <Switch
            trackColor={{ false: "#7e7e7e", true: `${Theme.colors.primary}` }}
            thumbColor="#ffffff"
            ios_backgroundColor="#7e7e7e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          :
          <Ionicons name={'ios-arrow-dropright-circle'} size={24} color={Theme.colors.primary} />
        }
      </ListItem>
    </TouchableWithoutFeedback>
  );
};

const ListItem = styled.View`
  background-color: #ffffff;
  padding:16px 24px;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`
const ListText = styled(Paragraph)`
  margin-bottom: 0;
`
export default SettingsItem;