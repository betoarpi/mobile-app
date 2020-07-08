import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity }from 'react-native';
import PrimaryButton from './src/components/PrimaryButton';
import * as Icons from './src/components/Icons';

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

const SchoolApp = () => {
    const {loading, error, data} = useQuery(SCHOOL_QUERY);
    if(loading) return <Text>Loading...</Text>;
    if(error) return <Text>Error!</Text>;
    
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
    const [value, onChangeText] = React.useState('Useless Placeholder');
    const [pass, setPass] = React.useState('');

    const {loading, error, data} = useQuery(
        KEYSTONE_QUERY,
        { client: newClient}
    );

    const onPress = () => console.log('press')
    
    if(loading) return <Text>Loading...</Text>;
    if(error) return <Text>Error!</Text>;
    
    return(
        <>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300 }}
                onChange={text => onChangeText(text)}
                value={value}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300 }}
                onChange={text => setPass(text)}
                value={pass}
                secureTextEntry={true}
            />
            <TouchableOpacity>
                <Text>Submit</Text>
            </TouchableOpacity>
        </>
    );
}

export default function App() {

    return (
      <ApolloProvider client={client}>
          <View style={styles.container}>
              <KeystoneData />
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