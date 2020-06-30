import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet }from 'react-native';

import { ApolloProvider, useQuery } from "react-apollo";
import ApolloClient from "apollo-boost";

import gql from "graphql-tag";

const client = new ApolloClient({
  uri: 'https://wschoolsdev.wpengine.com/graphql',
});

const SCHOOL_QUERY = gql`
    query appSettings {
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
`;

const SchoolApp = ({handleSettings}) => {
    const {loading, error, data} = useQuery(SCHOOL_QUERY);
    if(loading) return <Text>Loading...</Text>;
    if(error) return <Text>Error!</Text>;

    handleSettings(data);
    
    return(
        <Text>School Component</Text>
    );
}

const newClient = new ApolloClient({
    uri: 'http://keystone.wschoolsdev.wpengine.com/graphql',
});

const KEYSTONE_QUERY = gql`
    query posts {
        posts {
            edges {
                node {
                    databaseId
                    title
                }
            }
        }
    }
`;

const KeystoneData = ({theme}) => {
    const {loading, error, data} = useQuery(
        KEYSTONE_QUERY,
        { client: newClient}
    );
    
    if(loading) return <Text>Loading...</Text>;
    if(error) return <Text>Error!</Text>;

    console.log(theme) // Ya se pudo! Ahora a pasar los settings a los dos components
    
    return(
        <Text>Keystone Data is here!</Text>
    );
}

export default function App() {
    const [schoolTheme, setSchoolTheme] = useState();
    const [isLoadingComplete, setLoadingComplete] = useState(false);
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

    /* const schoolTheme = {
        dark: false,
        colors: {
          primary: data.appSettings.color_settings.primaryColor,
          background: data.appSettings.color_settings.backgroundColor,
          card: data.appSettings.color_settings.cardColor,
          text: data.appSettings.color_settings.textColor,
          border: data.appSettings.color_settings.borderColor,
          icon: data.appSettings.color_settings.iconColor,
        }
    }; */

    async function handleSettings(settings){
        const dataSettings = await settings;
        setSchoolTheme(dataSettings.appSettings.color_settings);
    }

    return (
      <ApolloProvider client={client}>
          <View style={styles.container}>
              <SchoolApp handleSettings={handleSettings}/>
              <KeystoneData theme={schoolTheme}/>
          </View>
      </ApolloProvider>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});