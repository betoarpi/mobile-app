import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Image
} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import HTML from 'react-native-render-html';

import { Icon, IconContainer, PostHeader, PostHeaderContainer, PostDetails, Title, Container } from '../theme/Styles';
import PostSkeleton from '../components/Post/PostSkeleton';
import DataError from '../components/DataError';

const EVENT_QUERY = gql`
  query EVENT_QUERY($eventId: Int) {
    eventBy(eventId: $eventId) {
      eventId
      title
      date
      content
      start_date
      end_date
      all_day
      venue
      organizer
      featuredImage {
        id
        sourceUrl
      }
      eventCategories {
        edges {
          node {
            categoryIcon {
              categoryIcon {
                sourceUrl(size: MEDIUM)
              }
            }
            slug
          }
        }
      }
    }
  }
`

const FullEvent = ({ route }) => {
  const eventId = route.params.eventId;
  return (
    <Query query={EVENT_QUERY} variables={{ eventId }}>
      {({ loading, error, data }) => {
        if (loading) return <PostSkeleton />;
        if (error) return <DataError />;
        if (!data) return <Text>There is no data.</Text>

        const {
          eventId,
          title,
          date,
          content,
          start_date,
          end_date,
          all_day,
          venue,
          venuesList,
          selectedDate,
          organizers,
          featuredImage,
          eventCategories,
        } = data.eventBy;

        console.log(featuredImage.sourceUrl);
        return (
          <ScrollView>
            {featuredImage !== null && <Image source={{ uri: featuredImage.sourceUrl }} style={styles.mainImage} />}
            <PostHeader style={styles.shadow}>
              {!eventCategories === null &&
                <IconContainer>
                  <Icon style={{ width: 24, height: 24 }} source={{ uri: eventCategories.edges[0].node.categoryIcon.categoryIcon.sourceUrl }} />
                </IconContainer>
              }
              <PostHeaderContainer>
                <Title>{title}</Title>
                <PostDetails>{moment(date).format('MMM DD, YYYY')}</PostDetails>
                <PostDetails>Location Missing</PostDetails>
              </PostHeaderContainer>
            </PostHeader>
            <Container>
              {content && <HTML html={content} baseFontStyle={{ fontFamily: 'Lato-Regular' }} {...htmlStyles} />}
            </Container>
          </ScrollView>
        )
      }}
    </Query>
  );
};

const styles = StyleSheet.create({
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
  mainImage: {
    height: 212,
    resizeMode: 'cover',
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
};

export default FullEvent;
