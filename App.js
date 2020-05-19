import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from 'styled-components';
import Theme from './src/theme/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Layout from './src/containers/Layout';

import Home from './src/screens/Home';
import FullPost from './src/screens/FullPost';

import WeeklyMenu from './src/screens/WeeklyMenu';
import UpcomingEvents from './src/screens/UpcomingEvents';
import Settings from './src/screens/Settings';

const MenuTabs = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();


const App = () => {
  const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Home'
          options={{
            title: 'School Name'
          }}
        >
          {props => <Layout><Home {...props} theme={Theme} /></Layout>}
        </Stack.Screen>
        <Stack.Screen name='Full Post'
          options={{
            title: 'Back to Feed'
          }}
        >
          {props => <Layout><FullPost {...props} theme={Theme} /></Layout>}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }
  return (
    <ThemeProvider theme={Theme}>
      <NavigationContainer>
        <MenuTabs.Navigator
          barStyle={{ backgroundColor: '#ffffff' }}
        >
          <MenuTabs.Screen name="Home"
            component={HomeStack}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: () => (
                <Icon style={styles.icon} size={24} name={'home'} />
              )
            }}
          />
          <MenuTabs.Screen name="Menu"
            options={{
              tabBarLabel: 'Menus',
              tabBarIcon: () => (
                <Icon style={styles.icon} size={24} name={'room-service'} />
              )
            }}
          >
            {props => <Layout><WeeklyMenu {...props} theme={Theme} /></Layout>}
          </MenuTabs.Screen>
          <MenuTabs.Screen name="Events"
            options={{
              tabBarLabel: 'Menus',
              tabBarIcon: () => (
                <Icon style={styles.icon} size={24} name={'calendar-today'} />
              )
            }}
          >
            {props => <Layout><UpcomingEvents {...props} theme={Theme} /></Layout>}
          </MenuTabs.Screen>
          <MenuTabs.Screen name="Settings"
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: () => (
                <Icon style={styles.icon} size={24} name={'dots-horizontal-circle'} />
              )
            }}
          >
            {props => <Layout><Settings {...props} theme={Theme} /></Layout>}
          </MenuTabs.Screen>
        </MenuTabs.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: 'gray',
  }
});

export default App;
