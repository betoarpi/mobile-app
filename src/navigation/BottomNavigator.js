import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import * as React from 'react';
import Home from '../screens/Home';
import FullPost from '../screens/FullPost';
import FullEvent from '../screens/FullEvent';
import FullPage from '../screens/FullPage';
import Preferences from '../screens/Preferences';

import WeeklyMenu from '../screens/WeeklyMenu';
import UpcomingEvents from '../screens/UpcomingEvents';
import More from '../screens/More';
import {useState, useEffect} from 'react';
/*import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';*/
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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

const MenuTabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function BottomNavigator({navigation, props}) {

	

	function HomeStack ()  {
		console.log(onboarding);
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
		      {props => <Layout><Home {...props} theme={schoolTheme} preferences={preferences} /></Layout>}
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
		      {props => <Layout><FullPost {...props} theme={schoolTheme} /></Layout>}
		    </Stack.Screen>
		  </Stack.Navigator>
		)
	}

	function EventsStack ()  {
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

	function SettingsStack () {
		return (
		  <Stack.Navigator>
		    <Stack.Screen name='More'
		      options={{
		        title: 'More About our School',
		        headerStyle: {
		          backgroundColor: schoolTheme.colors.primary
		        },
		        headerTintColor: schoolTheme.colors.card,
		      }}
		    >
		      {props => <Layout><More {...props} theme={schoolTheme} /></Layout>}
		    </Stack.Screen>
		    <Stack.Screen name='Full Page'
		      options={{
		        title: 'Back to More About the School',
		        headerStyle: {
		          backgroundColor: schoolTheme.colors.primary
		        },
		        headerTintColor: schoolTheme.colors.card,
		      }}
		    >
		      {props => <Layout><FullPage {...props} theme={schoolTheme} /></Layout>}
		    </Stack.Screen>
		    <Stack.Screen name='Preferences'
		      options={{
		        title: 'Select your interests',
		        headerStyle: {
		          backgroundColor: schoolTheme.colors.primary
		        },
		        headerTintColor: schoolTheme.colors.card,
		      }}
		    >
		      {props => <Layout><Preferences {...props} theme={schoolTheme} /></Layout>}
		    </Stack.Screen>
		  </Stack.Navigator>
		)
	}

	function BottomNavigator () {
		return(
		<MenuTabs.Navigator
	       barStyle={{ backgroundColor: schoolTheme.colors.card }}
	       activeColor={schoolTheme.colors.primary}
	       inactiveColor={schoolTheme.colors.icon}>
	       <MenuTabs.Screen name="Home"
	         component={HomeStack}
	         options={{
	           tabBarLabel: 'Home',
	           tabBarIcon: ({ color }) => (
	             <Ionicons name={'md-home'} size={24} color={schoolTheme.colors.primary} />
	           )
	         }}
	       />
	       <MenuTabs.Screen name="Menu"
	         options={{
	           tabBarLabel: 'Weekly Menu',
	           tabBarIcon: ({ color }) => (
	             <Ionicons name={'md-restaurant'} size={24} color={schoolTheme.colors.primary} />
	           )
	         }}
	       >
	         {props => <Layout><WeeklyMenu {...props} theme={schoolTheme} /></Layout>}
	       </MenuTabs.Screen>
	       <MenuTabs.Screen name="Events"
	         component={EventsStack}
	         options={{
	           tabBarLabel: 'Events',
	           tabBarIcon: ({ color }) => (
	             <Ionicons name={'md-calendar'} size={24} color={schoolTheme.colors.primary} />
	           )
	         }}
	       />
	       <MenuTabs.Screen name="More"
	         component={SettingsStack}
	         style={{borderRadius: 30}}
	         options={{
	           tabBarLabel: 'More',
	           tabBarIcon: ({ color }) => (
	             <Feather name="more-horizontal" size={22} color={schoolTheme.colors.primary} />                        )
	         }}
	       />
	   </MenuTabs.Navigator>
		);
	}
  return (
   <Query query={APP_SETTINGS}>
        {({ loading, error, data }) => {
          if (loading) return <Splash data={data ? true : false} logo={
            data ? data.appSettings.school_settings.schoolLogo.sourceUrl : 'Loading...'
          } />;
          if (error) return <Text>Error! {error.message}</Text>;

          

          return (
            <Stack.Navigator
			      screenOptions={{
			      }}>
			      <Stack.Screen
			        name="App"
			        component={BottomNavigator}
			        schoolTheme={schoolTheme}
			      />
			      
 				</Stack.Navigator>
          );
        }}
   </Query>

  );
}
