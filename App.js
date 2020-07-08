import 'react-native-gesture-handler';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';

import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';

import { ApolloProvider } from 'react-apollo';
import client from './src/apollo/client';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import AsyncStorage from '@react-native-community/async-storage';

import { AppearanceProvider } from 'react-native-appearance';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import Theme from './src/theme/Theme';

import Splash from './src/screens/Splash';
import { Ionicons, Feather} from '@expo/vector-icons';
import {SplashScreen} from 'expo';

import Navigator from './src/navigation/Navigator';

const APP_SETTINGS = gql`
  {
    appSettings {
      color_settings {
        backgroundColor
        borderColor
        cardColor
        iconColor
        primaryColor
        primaryLighter
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

// AsyncStorage Keys
const SETTINGS_KEY = '@save_settings';
const LOGO_KEY = '@save_logo';
const THEME = '@save_theme';

export default function App(props) {
  const [userPreferences, setUserPreferences] = useState([]);
  const [appSettings, setAppSettings] = useState({});

  
  const [schoolTheme, setSchoolTheme] = useState({
        dark: false,
        colors: {
          primary: 'red',
          background: 'blue',
          card: 'yellow',
          text: 'white',
          border: 'green',
          icon: 'black',
        }
      });

  useEffect(() => {
    readData();
  }, []);

  useEffect(() => {
    readDataTheme();
  }, []);
  
  useEffect(() => {
    saveData(SETTINGS_KEY, appSettings);
    //
    setLogo(appSettings.school_settings && appSettings.school_settings.schoolLogo.sourceUrl);
    console.log(appSettings);
  }, [appSettings]);

  const readData = async () => {
    try {
      //Retrive alrady stored key from Preferences view
      let storedPreferences = await AsyncStorage.getItem('@save_preferences');
      
      if (storedPreferences !== null) {
        let preferencesList = JSON.parse(storedPreferences);
        let newList = [];
        for (const [key, value] of Object.entries(preferencesList)) {
          const filterKey = key.replace(/_/g, '-');
          value === true ? newList.push(filterKey) : null
        }
        setUserPreferences(newList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      //alert('Settings succesfully saved to the store.')
    } catch (error) {
      console.log(error);
      //alert('Fail to save Settings to the store.')
    }
  }

  //Theme Storage
  const readDataTheme = async () => {
    try {
      //Retrive alrady stored key from Preferences view
      let storedTheme = await AsyncStorage.getItem('@save_theme');

      if (storedTheme.length > 0) {
        setSchoolTheme(JSON.parse(storedTheme));
      }
              

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    saveData(THEME, schoolTheme);
  }, [schoolTheme]);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert('Storage cleared!')
    } catch (error) {
      console.log(error)
      alert('Error clearing storage!')
    }
  }

  //clearStorage() //helper function to clear ALL storage, not of real use in PROD

  //funtion to save settings once query is complete
  const handleSettings = (data) => {
    setAppSettings(data.appSettings);
  }

  //funtion to save settings once query is complete
  const handleTheme = (theme) => {
    setSchoolTheme(theme);
    saveData(THEME, theme);
  }


  //Retriving Logo ------------------------
  const [logo, setLogo] = useState('');

  useState(() => {
    saveData(LOGO_KEY, logo);
  }, [logo]);

  //Load resources
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        // setInitialNavigationState(await getInitialState());

        // Load assets
        await Asset.loadAsync([

        ]);
        // Load fonts
        await Font.loadAsync({
          //Ionicons.font,
          'Lato-Regular': require('./src/fonts/Lato-Regular.ttf'),
          'Lato-Black': require('./src/fonts/Lato-Black.ttf'),
          'Lato-Bold': require('./src/fonts/Lato-Bold.ttf'),
          'Lato-Italic': require('./src/fonts/Lato-Italic.ttf'),
          'Lato-Light': require('./src/fonts/Lato-Light.ttf'),
          
          'Lato-Thin': require('./src/fonts/Lato-Thin.ttf'),
          'Muli-Bold': require('./src/fonts/Muli-Bold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Query query={APP_SETTINGS}>
        {({ loading, error, data }) => {
          if (loading) return <Splash data={data ? true : false} logo={
            data ? data.appSettings.school_settings.schoolLogo.sourceUrl : 'Loading...'
          } />;
          if (error) return <Text>Error! {error.message}</Text>;


          const theme = {
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
          handleSettings(data);
          handleTheme(theme);

          console.log(schoolTheme.colors.background);
          return (
            <AppearanceProvider>
              <ThemeProvider theme={theme}>
                  <Navigator data={data} {...props} />
              </ThemeProvider>
            </AppearanceProvider>
          );
        }}
      </Query>
    </ApolloProvider >
  );

};
