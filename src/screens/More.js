import React, {useState, useEffect} from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import AsyncStorage from '@react-native-community/async-storage';

import DataError from '../components/DataError';
import SettingsItem from '../components/SettingsItem';
import { TextContainer, Paragraph, Separator, Title } from '../theme/Styles';

const APP_SETTINGS = gql`
  {
    appSettings {
      website_pages {
        pages {
          ... on Page {
            id
            title
            databaseId
          }
        }
      }
      school_settings {
        schoolName
      }
    }
  }
`

const STORAGE_KEY = '@save_notifications';

const More = props => {
  //Handle notifications
  const [notifications, setNotifications] = useState('');

  useEffect(() => {
    readData()
  }, [])

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, notifications);
      alert(`Data successfully saved to ${notifications}`);
    } catch (error) {
      console.log(error);
      alert('Failed to save the data to the storage');
    }
  }

  const readData = async () => {
    try {
      const showNotifications = await AsyncStorage.getItem(STORAGE_KEY);

      console.log(showNotifications === null ? 'empty' : showNotifications);

      if (showNotifications !== null) {
        setNotifications(showNotifications);
      }

    } catch (error) {
      console.log(error)
    }
  }

  
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert('Storage cleared!')
    } catch (error) {
      console.log(error)
      alert('Error clearing storage!')
    }
  }
  
  function handleNotifications() {
    if(notifications !== 'enabled') {
      console.log('needs to be enabled');
      setNotifications('enabled');
      saveData(notifications);
    } else {
      console.log('needs to be disabled');
      setNotifications('');
      saveData(notifications);
    }
  }
  //Navigation props
  const navigation = useNavigation();

  const { loading, error, data } = useQuery(APP_SETTINGS);
  const ListSeparator = () => <Separator />
  if (loading) return <Paragraph>Loading...</Paragraph>
  if (error) return <DataError />

  const handlePress = (databaseId) => navigation.navigate('Full Page', { id: databaseId });

  const pages = data.appSettings.website_pages.pages;
  const school = data.appSettings.school_settings;

  return (
    <SettingsLayout>
      <TextContainer>
        <Title>About {school.schoolName}</Title>
      </TextContainer>
      <ListContainer>
        <FlatList
          data={pages}
          renderItem={({ item }) => <SettingsItem type='page' handlePress={handlePress} {...item}>{item.title}</SettingsItem>}
          ItemSeparatorComponent={ListSeparator}
        />
      </ListContainer>
      <TextContainer>
        <Title>Notifications and feed</Title>
      </TextContainer>
      <ListContainer>
        <SettingsItem
          type='settings'
          settingsName='notifications'
          handleSettings={handleNotifications}
          active={notifications}
        >
          Turn on notifications
        </SettingsItem>
        <Separator />
        <SettingsItem type='page' handlePress={handlePress}>Preferences</SettingsItem>
      </ListContainer>
    </SettingsLayout >
  );
};

const SettingsLayout = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex:1 1 100%;
`
const ListContainer = styled.View`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-top-width: 1px;
`
const border = styled.View`
  border-color: ${({ theme }) => theme.colors.border};
  border-top-width: 1px;
`
export default More;