import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import HTML from 'react-native-render-html';

import WeekNavigation from '../components/WeeklyMenu/WeekNavigation';
import {
  FeaturedImage,
  MainImg,
  IconContainer,
  PostHeader,
  PostHeaderContainer,
  Title,
  Container
} from '../theme/Styles';
import { Date } from '../components/Post/Styles';
import * as Icons from '../components/Icons';
import Theme from '../theme/Theme';
import moment from 'moment';

const TheMenu = ({ data }) => {
  const tagEvents = data.tags.edges;
  const currentDate = moment().format('MM DD, YYYY')
  let calendarDate = moment().format('DD');
  const currentTime = moment().format('HH');
  const [dayTime, setDayTime] = useState(currentTime > 14 ? 'afternoon' : 'morning');

  const menuArray = [];
  (function mapping() {
    tagEvents.map(item => {
      item.node.events.edges.map(i => {
        menuArray.push(i.node)
      })
    })
  })();

  const activeMenus = [];
  function currentMenu(date) {
    menuArray.filter(filtered => {
      const filteredDate = moment(filtered.start_date).format('MM DD, YYYY');
      if (filteredDate === date) {
        activeMenus.push(filtered)
      }
    })
  };
  currentMenu('06 02, 2020');

  let menuToShow;
  (function filterMenu() {
    if (dayTime === 'afternoon') {
      menuToShow = activeMenus.filter(filtered => filtered.tags.edges[0].node.slug === 'lunch');
    } else {
      menuToShow = activeMenus.filter(filtered => filtered.tags.edges[0].node.slug === 'breakfast');
    }
  })();

  const weekDates = {
    Mon: moment(moment().day('Monday')._d).format('DD'),
    Tue: moment(moment().day('Tuesday')._d).format('DD'),
    Wed: moment(moment().day('Wednesday')._d).format('DD'),
    Thue: moment(moment().day('Thursday')._d).format('DD'),
    Fri: moment(moment().day('Friday')._d).format('DD'),
  };

  const handleDateToShow = (() => {
    //something
  })

  return (
    <ScrollView style={styles.wrapper}>
      <FeaturedImage style={{ height: 300 }}>
        <MainImg source={
          require('../images/pizza-menu.jpg')
        }
          style={{ height: 320 }}
        />
        <WeekNavigation
          weekDates={weekDates}
          calendarDate={calendarDate}
          handleDateToShow={handleDateToShow}
        />
      </FeaturedImage >
      <PostHeader style={styles.shadow}>
        <IconContainer>
          <Icons.Food fill='#ffffff' />
        </IconContainer>
        <PostHeaderContainer>
          <Title>{menuToShow[0].title}</Title>
          <Date>{`${menuToShow[0].tags.edges[0].node.name} Menu for ${moment(menuToShow[0].start_date).format('MMM DD')}`}</Date>
        </PostHeaderContainer>
      </PostHeader>
      <Container>
        <HTML html={menuToShow[0].content} baseFontStyle={{ fontFamily: 'Lato-Regular' }} {...htmlStyles} />
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  paddingH: {
    paddingHorizontal: 24
  },
  shadow: {
    shadowColor: 'rgb(138, 138, 138)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.21,
    shadowRadius: 4,

    elevation: 4,
  },
  wrapper: {
    flex: 1,
  }
});

//HTML Component Styles
const htmlStyles = {
  tagsStyles: {
    p: {
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26
    },
    a: {
      color: Theme.colors.primary,
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26
    },
    img: {
      borderRadius: 10,
      overflow: 'hidden',
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      marginBottom: 32,
      marginTop: 16,
    },
    ul: {
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26
    },
    ol: {
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26
    },
    h1: {
      fontSize: 32.44,
      marginBottom: 16
    },
    h2: {
      fontSize: 28.83,
      marginBottom: 16
    },
    h3: {
      fontSize: 25.63,
      marginBottom: 16
    },
    h4: {
      fontSize: 22.78,
      marginBottom: 16
    },
    h5: {
      fontSize: 20.25,
      marginBottom: 16
    },
    h6: {
      fontSize: 18,
      marginBottom: 16
    }
  }
};

export default TheMenu;