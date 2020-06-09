import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import HTML from 'react-native-render-html';

import { CardContainer, FeaturedImage, Header, Container, Title, Date, Location, LikesRow } from './Styles';
import { IconContainer, Icon } from '../../theme/Styles';
/*import * as Icons from '../Icons';*/

const Post = (props) => {
  const {
    categories,
    date,
    featuredImage,
    title,
    excerpt,
    likes,
    postId,
    theme,
  } = props;
  const navigation = useNavigation();
  const handlePress = () => navigation.navigate('Full Post', { postId: postId, theme: theme });
  return (
    <CardContainer style={styles.shadow}>
      {featuredImage &&
        <TouchableWithoutFeedback onPress={handlePress}>
          <FeaturedImage source={{ uri: featuredImage.sourceUrl }} />
        </TouchableWithoutFeedback>
      }
      <View style={{ paddingHorizontal: 21 }}>
        <Header>
          {categories.edges.length > 0 &&
            <IconContainer>
              <Icon style={{ width: 24, height: 24 }} source={{ uri: categories.edges[0].node.categoryIcon.categoryIcon.sourceUrl }} />
            </IconContainer>
          }
          <Container style={{ paddingHorizontal: 0 }}>
            <Title onPress={handlePress}>{title}</Title>
            <Date>{moment(date).format('MMM DD, YYYY')}</Date>
            <Location>Location missing</Location>
          </Container>
          {categories.edges.length > 0 &&
            categories.edges[0].node.slug === 'food' && <Icons.ArrowRight style={{ alignSelf: 'flex-start' }} fill={theme.colors.primary} />
          }
        </Header>
        <Container>
          {excerpt &&
            <HTML html={excerpt} baseFontStyle={{ fontFamily: 'Lato-Regular' }} {...htmlStyles} />
          }
          <LikesRow>
            
            {likes &&
              <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>
                {likes} Likes
              </Text>
            }
          </LikesRow>
        </Container>
      </View>
    </CardContainer >
  );
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