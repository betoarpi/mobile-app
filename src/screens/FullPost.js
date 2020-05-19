import React from 'react';
import {
  View,
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

const POST_QUERY = gql`
  query POST_QUERY($postId: Int) {
    postBy(postId: $postId) {
      databaseId
      title
      date
      content
      featuredImage {
        id
        sourceUrl
      }
      categories {
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

const FullPost = ({ route }) => {
  const postId = route.params.postId;
  return (
    <Query query={POST_QUERY} variables={{ postId }}>
      {({ loading, error, data }) => {
        if (loading) return <PostSkeleton />;
        if (error) return <DataError />;
        if (!data) return <Text>There is no data.</Text>

        const {
          categories,
          date,
          featuredImage,
          title,
          content,
        } = data.postBy;

        console.log(featuredImage.sourceUrl);
        return (
          <ScrollView>
            {featuredImage && <Image source={{ uri: featuredImage.sourceUrl }} style={styles.mainImage} />}
            <PostHeader style={styles.shadow}>
              {categories.edges.length > 0 &&
                <IconContainer>
                  <Icon style={{ width: 24, height: 24 }} source={{ uri: categories.edges[0].node.categoryIcon.categoryIcon.sourceUrl }} />
                </IconContainer>
              }
              <PostHeaderContainer>
                <Title>{title}</Title>
                <PostDetails>{moment(date).format('MMM DD, YYYY')}</PostDetails>
                <PostDetails>Location Missing</PostDetails>
              </PostHeaderContainer>
            </PostHeader>
            <Container>
              <HTML html={content} baseFontStyle={{ fontFamily: 'Lato-Regular' }} {...htmlStyles} />
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

export default FullPost;
