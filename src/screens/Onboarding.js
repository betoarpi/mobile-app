import React, {useState, useEffect} from 'react';
import { View, 
         Image, 
         StyleSheet, 
         Dimensions, 
         SafeAreaView } from 'react-native';
import styled from 'styled-components';
import PrimaryButton from '../components/PrimaryButton';
import { Bold, Paragraph } from '../theme/Styles';
import { Ionicons, Entypo} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { scaleText } from 'react-native-text';
import * as Animatable from "react-native-animatable";
import { useNavigation } from '@react-navigation/native';
import Home from './Home';
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
//sizes for responsive
const iconCircleHeight =  Dimensions.get('window').width / 6;
const fontSize =  Math.round(iconCircleHeight / 3.2);
const lineHeight =  Math.round(fontSize * 1.3);

//onboarding_key
const ONBOARDING_KEY = '@save_onboarding';

const Onboarding = ({navigation}) => {
  const [onboarding, setOnboarding] = useState(false);
  const [schoolTheme, setSchoolTheme] = useState([]);

  useEffect(() => {
    readDataTheme();
    console.log('entro useEffect theme');
  }, [schoolTheme]);

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

  const saveDataOnboarding = async (onboarding) => {
    try {
      console.log('save onboarding'+onboarding);
      await AsyncStorage.setItem(ONBOARDING_KEY, JSON.stringify(onboarding));
      //alert(`Data successfully saved to ${onboarding}`);
    } catch (error) {
      console.log(error);
      //alert('Failed to save the data to the storage');
    }
  }

  useEffect(() => {
    readDataOnboarding();
    console.log('read onboa');
  }, []);

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
  
  

  function hexToRgb(hex, opacity){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+', '+opacity+')';
    }
    throw new Error('Bad Hex');
  }

  //Navigation props
  const handleOnboarding = () => {
    setOnboarding(true);
    saveDataOnboarding(true);
    navigation.navigate('MainNavigator');
  }
  readDataTheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fafafa'}}>
      <View style={styles.OnboardingLayout}>
        <Animatable.View style={styles.card} animation="slideInDown" iterationCount={1} direction="alternate">
          <View style={styles.Logo}>
            <Image source={require('../images/ogs_logo.png')} style={styles.LogoImg}/>
          </View>
        </Animatable.View>
        <TipsContainer>

          <Animatable.View style={styles.card} animation="slideInDown" delay={4}>
            <Tip>
              <IconLayer3 iconHeight={iconCircleHeight+"px"} color={hexToRgb(schoolTheme.colors.primary, 0.1)}>
                <IconLayer2 iconHeight={(iconCircleHeight - 10)+"px"} color={hexToRgb(schoolTheme.colors.primary, 0.2)}>
                  <IconLayer1 iconHeight={(iconCircleHeight - 20)+"px"} color={hexToRgb(schoolTheme.colors.primary, 0.3)}>
                    <Ionicons name={'md-home'} size={iconCircleHeight/2.5} color={schoolTheme.colors.primary} />
                  </IconLayer1>
                </IconLayer2>
              </IconLayer3>
              <Paragraph fontSize={fontSize+"px"} lineHeight={lineHeight+"px"}>
                  <Bold fontSize={fontSize+"px"} 
                        lineHeight={lineHeight+"px"} 
                        style={styles.tipText}>
                  Never miss a thing!
                  </Bold>Get your school's daily news and updates. </Paragraph>
            </Tip>
          </Animatable.View>
          <Animatable.View style={styles.card} animation="slideInDown" delay={8}>
            <Tip>
               <IconLayer3 iconHeight={iconCircleHeight+"px"} color={hexToRgb(schoolTheme.colors.primary, 0.1)}>
                <IconLayer2 iconHeight={(iconCircleHeight - 10)+"px"} color={hexToRgb(schoolTheme.colors.primary, 0.2)}>
                  <IconLayer1 iconHeight={(iconCircleHeight - 20)+"px"} color={hexToRgb(schoolTheme.colors.primary, 0.3)}>
                    <Ionicons name={'md-restaurant'} size={iconCircleHeight/2.5} color={schoolTheme.colors.primary} />
                  </IconLayer1>
                </IconLayer2>
              </IconLayer3>
              <Paragraph fontSize={fontSize+"px"} lineHeight={lineHeight+"px"}>
                <Bold fontSize={fontSize+"px"} 
                        lineHeight={lineHeight+"px"} 
                        style={styles.tipText}>Plan ahead</Bold> and discover the daily menus serving in your school.
              </Paragraph>
            </Tip>
          </Animatable.View>
          <Animatable.View style={styles.card} animation="slideInDown" delay={16}>
            <Tip>
              <IconLayer3 iconHeight={iconCircleHeight+"px"} color={hexToRgb(schoolTheme.colors.primary, 0.1)}>
                <IconLayer2 iconHeight={(iconCircleHeight - 10)+"px"} color={hexToRgb(schoolTheme.colors.primary, 0.2)}>
                  <IconLayer1 iconHeight={(iconCircleHeight - 20)+"px"} color={hexToRgb(schoolTheme.colors.primary, 0.3)}>
                    <Ionicons name={'md-calendar'} size={iconCircleHeight/2.5} color={schoolTheme.colors.primary} />
                  </IconLayer1>
                </IconLayer2>
              </IconLayer3>
              <Paragraph fontSize={fontSize+"px"} lineHeight={lineHeight+"px"}>
                <Bold fontSize={fontSize+"px"} 
                        lineHeight={lineHeight+"px"} 
                        style={styles.tipText}>Stay on track,</Bold> get a schedule for all social and academic events.
              </Paragraph>
            </Tip>
          </Animatable.View>
        </TipsContainer>

        <Animatable.View style={styles.card} animation="slideInLeft" delay={60}>
          <PrimaryButton text='Continue' onPress={handleOnboarding} color={schoolTheme.colors.primary}>
            <Entypo name={'chevron-small-right'} size={24} color={'white'} />
          </PrimaryButton>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

const IconLayer1 = styled.View`
  background-color: ${props => props.color || "rgba(0,0,0,0.3)"};
  border-radius: 60px;
  height: ${props => props.iconHeight || "50px"};
  width: ${props => props.iconHeight || "50px"};
  justify-content: center;
  align-items: center;
  opacity: 1;
`
const IconLayer2 = styled.View`
  background-color: ${props => props.color || "rgba(0,0,0,0.1)"};
  border-radius: 60px;
  height: ${props => props.iconHeight || "70px"};
  width: ${props => props.iconHeight || "70px"};
  justify-content: center;
  align-items: center;
`
const IconLayer3 = styled.View`
  background-color: ${props => props.color || "rgba(0,0,0,0.1)"};
  border-radius: 60px;
  height: ${props => props.iconHeight || "90px"};
  width: ${props => props.iconHeight || "90px"};
  justify-content: center;
  align-items: center;
  margin-right: 14px;
`
const TipsContainer = styled.View`
  flex:0 0 auto;
  margin: 20px 0;
`
const Tip = styled.View`
  flex-direction: row;
  padding: 0;
  margin: 10px 0;
  width:100%;
  align-items: center;
`

const styles = StyleSheet.create({
  OnboardingLayout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 30,
  },
  Logo: {
    width: '100%',
    flex: 0,
    justifyContent:'center',
    flexDirection: 'row',
  },
  LogoImg: {
    width: Dimensions.get('window').width / 2.2,
    resizeMode: 'contain',
    padding: 0
  },
  tipText: {
    color: '#4a4a4a',
    lineHeight: 20 * 1.2,
    marginBottom: 0,
  }
});

const styleParagraph = scaleText({
  fontSize: 16,
  lineHeight: 16 * 1.1,
});


export default Onboarding;