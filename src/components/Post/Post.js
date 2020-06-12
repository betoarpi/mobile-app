import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import HTML from 'react-native-render-html';
import ScalableText from 'react-native-text';
import { scaleText } from 'react-native-text';
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

  const regex = /(<([^>]+)>)/ig;
  var resultExce = excerpt.replace(regex, '');

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
            <Title numberOfLines={1} onPress={handlePress}>
              <ScalableText style={styleTitle}>
                {title}
              </ScalableText>
            </Title>
            <Date>
              <ScalableText style={styleTitle}>
                {moment(date).format('MMM DD, YYYY')}
              </ScalableText>
            </Date>
            <Location>
              <ScalableText style={styleTitle}>
                Location missing
              </ScalableText>
            </Location>
          </Container>
          {categories.edges.length > 0 &&
            categories.edges[0].node.slug === 'food' && <Icons.ArrowRight style={{ alignSelf: 'flex-start' }} fill={theme.colors.primary} />
          }
        </Header>
        <Container>
          {excerpt &&
            <ScalableText numberOfLines={2} style={paragraph} >{resultExce}</ScalableText>
          }

          <LikesRow>
            
            {likes &&
              <ScalableText style={{ marginLeft: 8, fontWeight: 'bold' }}>
                {likes} Likes
              </ScalableText>
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
const paragraph = {
  fontFamily: 'Lato-Light',
  fontSize: 17,
  marginBottom: 0, 
  color: '#202020',
  lineHeight: 24,
}

const styleTitle = scaleText({
  fontSize: 18,
  lineHeight: 18 * 1.2,
});

const styleDate = scaleText({
  fontSize: 16,
  lineHeight: 16 * 1.1,
});
  

export default Post;