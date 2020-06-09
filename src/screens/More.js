import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';

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

const More = props => {
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
        <SettingsItem type='settings'>Turn on notifications</SettingsItem>
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