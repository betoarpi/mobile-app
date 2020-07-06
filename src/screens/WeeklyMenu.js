import React from 'react';
import {Text} from 'react-native';
import TheMenu from '../containers/Menu';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PostSkeleton from '../components/Post/PostSkeleton';
import DataError from '../components/DataError';
import {Ionicons} from '@expo/vector-icons';


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
const WeeklyMenu = ({theme}) => {
  return (
    <Query query={WEEKLY_MENU_POSTS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <PostSkeleton />;
        if (error) return <DataError />;
        if (!data.tags.edges.length) return <Text>There are no posts.</Text>;

        return (
            <TheMenu data={data} theme={theme} />
          );
        }}
    </Query>
  );
};

export default WeeklyMenu;