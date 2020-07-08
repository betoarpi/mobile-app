import 'react-native-gesture-handler';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';

import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AppearanceProvider } from 'react-native-appearance';

import { ThemeProvider } from 'styled-components';
/*import Icon from 'react-native-vector-icons/MaterialCommunityIcons';*/

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/*import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';*/
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {SplashScreen} from 'expo';

import OnboardingScreen from '../screens/Onboarding';
import Layout from '../containers/Layout';
import Splash from '../screens/Splash';

import MainNavigator from './MainNavigator';


const MenuTabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const ONBOARDING_KEY = '@save_onboarding';

function Navigator(props) {
  const data = props.data;
  const [onboarding, setOnboarding] = useState(false);

  const readDataOnboarding = async () => {
    try {
      const showOnboarding = await AsyncStorage.getItem(ONBOARDING_KEY);

      if (showOnboarding !== null) {
        setOnboarding(JSON.parse(showOnboarding));
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    readDataOnboarding();
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!onboarding ? (
            <Stack.Screen name="onboarding"
              component={OnboardingScreen}
              options={{header: () => null, headerTransparent: true}} />
          ) : (
            <Stack.Screen name="MainNavigator"
              component={MainNavigator}
              options={{
                title: `${data.appSettings.school_settings.schoolName}`,
                headerStyle: {
                  backgroundColor: data.appSettings.color_settings.primaryColor
                },
                headerTintColor: data.appSettings.color_settings.card,
              }}
            />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
