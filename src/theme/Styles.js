import styled from 'styled-components';

export const MainLayout = styled.View`
  background: ${({ theme }) => theme.colors.background};
`
export const Paragraph = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.regular};
  font-size:18px;
  margin-bottom:13px;
  line-height: 26px;
`
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size:18px;
  font-weight: bold;
  margin-bottom:5px;
`
export const Content = styled.Text`
  font-size:18px;
  margin-bottom:13px;
  line-height: 26px;
`
export const Icon = styled.View`
  align-self: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  border-radius:24px;
  justify-content: center;
  height:48px;
  margin-right:12px;
  width:48px;
`
export const FeaturedImage = styled.View`
  background: ${({ theme }) => theme.colors.primaryLighten};
  flex:0 0 320px;
  overflow: hidden;
  width: 100%;
`
export const MainImg = styled.Image`
  height:100%;
  left:0;
  position: absolute;
  top:0;
  width:100%;
`
export const PostHeader = styled.View`
  align-items: center;
  background: ${({ theme }) => theme.colors.overPrimary};
  border-radius:10px;
  flex-direction: row;
  justify-content: space-between;
  margin: 24px;
  padding:8px;
  elevation:2;
  padding:16px;
  margin-top: -16px;
`
export const PostHeaderContainer = styled.View`
  flex-direction: column;
  flex:1;
`
export const PostDetails = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size:12px;
`
export const Note = styled.Text`
  font-size:18px;
`
export const LikesRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top:16px;
`
//Skeleton styles
export const Circle = styled.View`
  background: #d8d8d8;
  border-radius:24px;
  height:48px;
  margin-right:12px;
  width:48px;
`
export const Bar = styled.View`
  background: #d8d8d8;
  border-radius: 5px;
  height: ${props => (props.sizeV ? props.sizeV : '13px')};
  opacity: ${props => (props.opacity ? props.opacity : '1')};
  max-width:${props => (props.sizeH ? props.sizeH : '100%')};
  margin:6px;
`
export const SkeletonHeader = styled.View`
  /* border:1px solid red; */
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom:24px;
  opacity: ${props => (props.opacity ? props.opacity : '1')};
`
export const BarContainer = styled.View`
  justify-content: center;
  flex-direction: column;
  opacity: ${props => (props.opacity ? props.opacity : '1')};
`