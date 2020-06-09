import React from 'react';

import { View, FlatList, StyleSheet } from 'react-native';
import WeekNavigation from '../components/WeeklyMenu/WeekNavigation';
import { FeaturedImage, MainImg, IconContainer, PostHeader, PostHeaderContainer, PostDetails, Title, Paragraph, Note, LikesRow, LikesText } from '../theme/Styles';
import {Ionicons} from '@expo/vector-icons';
import Theme from '../theme/Theme';

import TheMenu from '../containers/Menu';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PostSkeleton from '../components/Post/PostSkeleton';
import DataError from '../components/DataError';

const WEEKLY_MENU_POSTS_QUERY = gql`
  query WEEKLY_MENU_POSTS_QUERY {
    tags(where: {name: ["lunch", "breakfast"]}, last: 10) {
      edges {
        node {
          slug
          events {
            edges {
              node {
                databaseId
                title
                content
                start_date
                tags {
                  edges {
                    node {
                      slug
                      name
                    }
                  }
                }
                featuredImage {
                  sourceUrl(size: MEDIUM)
                }
              }
            }
          }
        }
      }
    }
  }
`

const WeeklyMenu = () => {
  return (

    <>
      <FeaturedImage>
        <MainImg source={require('../images/pizza-menu.jpg')}/>
        <WeekNavigation/>
      </FeaturedImage >
      <PostHeader style={styles.shadow}>
        <IconContainer>
          <Ionicons name={'md-restaurant'} size={24} color={'#ffffff'} />
        </IconContainer>
        <PostHeaderContainer>
          <Title>This is the menu</Title>
          <PostDetails>These are post details</PostDetails>
        </PostHeaderContainer>
      </PostHeader>
      <View style={styles.paddingH}>
        <Title>Description</Title>
        <Paragraph>Pepperonni pizza with carrots, and caesar salad. Strawberry sauce for dessert.</Paragraph>
        <Title>Allergens information</Title>
        <Paragraph>Allergens information</Paragraph>
        <Title>Notes</Title>
        <FlatList
          data={Notes}
          renderItem={({ item }) => <Note>{`• ${item.note}`}</Note>}
          keyExtractor={item => item.id}
        />
        <LikesRow>
          <Ionicons name={'ios-thumbs-up'} size={24} color={Theme.colors.primary} />
          <LikesText>
            22 Likes
          </LikesText>
        </LikesRow>
      </View>
    

    <Query query={WEEKLY_MENU_POSTS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <PostSkeleton />;
        if (error) return <DataError />;
        if (!data.tags.edges.length) return <Text>There are no posts.</Text>;
        return (
          <TheMenu data={data} />
        );
      }}
    </Query>
    </>
  );
};

export default WeeklyMenu;