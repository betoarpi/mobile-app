import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import HTML from 'react-native-render-html';

import { CardContainer, FeaturedImage, Header, Container, Title, Date, Location, LikesRow } from './Styles';
import { IconContainer, Icon } from '../../theme/Styles';
import * as Icons from '../Icons';

const Post = (props) => {
  const {
    eventId,
    title,
    start_date,
    end_date,
    all_day,
    eventCategories,
    featuredImage,
    excerpt,
    venue,
    venuesList,
    selectedDate,
    show
  } = props;
  const navigation = useNavigation();
  const handlePress = () => navigation.navigate('Full Event', { eventId: eventId });

  const eventVenue = venuesList.edges.filter(filtered => filtered.node.eventId === parseInt(venue));

  //validate category is not "lunch-menu"
  const validCategory = eventCategories.edges[0].node.slug !== 'lunch-menu';

  if (show === true && validCategory === true) {
    return (
      <CardContainer style={styles.shadow}>
        {featuredImage && <FeaturedImage source={{ uri: featuredImage.sourceUrl }} />}
        <View style={{ paddingHorizontal: 21 }}>
          <Header>
            {!eventCategories === null &&
              <IconContainer>
                <Icon style={{ width: 24, height: 24 }} source={{ uri: eventCategories.edges[0].node.categoryIcon.categoryIcon.sourceUrl }} />
              </IconContainer>
            }
            <Container style={{ paddingHorizontal: 0 }}>
              <Title onPress={handlePress}>{title}</Title>
              {all_day !== 'yes' ?
                <Date>{moment(start_date).format('MMM DD, YYYY')}</Date>
                :
                <Date>All Day</Date>
              }
              {venue && <Location>{eventVenue.map(element => element.node.title)}</Location>}
            </Container>
            {eventCategories.edges.length > 0 &&
              eventCategories.edges[0].node.slug === 'food' && <Icons.ArrowRight style={{ alignSelf: 'flex-start' }} fill={theme.colors.primary} />
            }
          </Header>
          <Container>
            {excerpt !== "" &&
              <HTML html={excerpt} baseFontStyle={{ fontFamily: 'Lato-Regular' }} {...htmlStyles} />
            }
            {/* <LikesRow>
              <Icons.Like fill={likes ? theme.colors.primary : theme.colors.icon} />
              {likes &&
                <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>
                  {likes} Likes
                </Text>
              }
            </LikesRow> */}
          </Container>
        </View>
      </CardContainer >
    );
  } else {
    return null
  }

};

const styles = StyleSheet.create({
  shadow: {
    margin: 4,
    shadowColor: 'rgb(138, 138, 138)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.21,
    shadowRadius: 4,

    elevation: 3,
  }
});

//HTML Component Styles
const htmlStyles = {
  tagsStyles: {
    p: {
      fontSize: 18,
      marginBottom: 16,
    }
  }
}

export default Post;