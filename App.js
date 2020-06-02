import 'react-native-gesture-handler';
import React from 'react';
import { Text } from 'react-native';

import { ApolloProvider } from 'react-apollo';
import client from './src/apollo/client';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { AppearanceProvider } from 'react-native-appearance';

import { ThemeProvider } from 'styled-components';
import Theme from './src/theme/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Layout from './src/containers/Layout';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import FullPost from './src/screens/FullPost';
import FullEvent from './src/screens/FullEvent';

import WeeklyMenu from './src/screens/WeeklyMenu';
import UpcomingEvents from './src/screens/UpcomingEvents';
import Settings from './src/screens/Settings';

const MenuTabs = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

const APP_SETTINGS = gql`
  {
    appSettings {
      color_settings {
        backgroundColor
        borderColor
        cardColor
        iconColor
        primaryColor
        textColor
      }
      school_settings {
        schoolName
        schoolLogo {
          sourceUrl
        }
      }
    }
  }
`

function App() {

  return (
    <ApolloProvider client={client}>
      <Query query={APP_SETTINGS}>
        {({ loading, error, data }) => {
          if (loading) return <Splash data={data ? true : false} logo={
            data ? data.appSettings.school_settings.schoolLogo.sourceUrl : 'Loading...'
          } />;
          if (error) return <Text>Error! {error.message}</Text>;

          //console.log(data);

          const schoolTheme = {
            dark: false,
            colors: {
              primary: data.appSettings.color_settings.primaryColor,
              background: data.appSettings.color_settings.backgroundColor,
              card: data.appSettings.color_settings.cardColor,
              text: data.appSettings.color_settings.textColor,
              border: data.appSettings.color_settings.borderColor,
              icon: data.appSettings.color_settings.iconColor,
            }
          };

          const HomeStack = () => {
            return (
              <Stack.Navigator>
                <Stack.Screen name='Home'
                  options={{
                    title: `${data.appSettings.school_settings.schoolName}`,
                    headerStyle: {
                      backgroundColor: schoolTheme.colors.primary
                    },
                    headerTintColor: schoolTheme.colors.card,
                  }}
                >
                  {props => <Layout><Home {...props} theme={Theme} /></Layout>}
                </Stack.Screen>
                <Stack.Screen name='Full Post'
                  options={{
                    title: 'Back to Feed',
                    headerStyle: {
                      backgroundColor: schoolTheme.colors.primary
                    },
                    headerTintColor: schoolTheme.colors.card,
                  }}
                >
                  {props => <Layout><FullPost {...props} theme={Theme} /></Layout>}
                </Stack.Screen>
              </Stack.Navigator>
            )
          }

          const EventsStack = () => {
            return (
              <Stack.Navigator>
                <Stack.Screen name='Events'
                  options={{
                    title: 'Upcoming Events',
                    headerStyle: {
                      backgroundColor: schoolTheme.colors.primary
                    },
                    headerTintColor: schoolTheme.colors.card,
                  }}
                >
                  {props => <Layout><UpcomingEvents {...props} theme={Theme} /></Layout>}
                </Stack.Screen>
                <Stack.Screen name='Full Event'
                  options={{
                    title: 'Back to Events Calendar',
                    headerStyle: {
                      backgroundColor: schoolTheme.colors.primary
                    },
                    headerTintColor: schoolTheme.colors.card,
                  }}
                >
                  {props => <Layout><FullEvent {...props} theme={Theme} /></Layout>}
                </Stack.Screen>
              </Stack.Navigator>
            )
          }

          return (
            <AppearanceProvider>
              <ThemeProvider theme={Theme}>
                <NavigationContainer theme={schoolTheme}>
                  <MenuTabs.Navigator
                    barStyle={{ backgroundColor: schoolTheme.colors.card }}
                    activeColor={schoolTheme.colors.primary}
                    inactiveColor={schoolTheme.colors.icon}
                  >
                    <MenuTabs.Screen name="Home"
                      component={HomeStack}
                      options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                          <Icon color={color} size={24} name={'home'} />
                        )
                      }}
                    />
                    <MenuTabs.Screen name="Menu"
                      options={{
                        tabBarLabel: 'Weekly Menu',
                        tabBarIcon: ({ color }) => (
                          <Icon color={color} size={24} name={'room-service'} />
                        )
                      }}
                    >
                      {props => <Layout><WeeklyMenu {...props} theme={Theme} /></Layout>}
                    </MenuTabs.Screen>
                    <MenuTabs.Screen name="Events"
                      component={EventsStack}
                      options={{
                        tabBarLabel: 'Events',
                        tabBarIcon: ({ color }) => (
                          <Icon color={color} size={24} name={'calendar-today'} />
                        )
                      }}
                    />
                    <MenuTabs.Screen name="Settings"
                      options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: ({ color }) => (
                          <Icon color={color} size={24} name={'dots-horizontal-circle'} />
                        )
                      }}
                    >
                      {props => <Layout><Settings {...props} theme={Theme} /></Layout>}
                    </MenuTabs.Screen>
                  </MenuTabs.Navigator>
                </NavigationContainer>
              </ThemeProvider>
            </AppearanceProvider>
          );
        }}
      </Query>
    </ApolloProvider>
  );

};

export default App;
