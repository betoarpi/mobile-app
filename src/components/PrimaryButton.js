import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 28px;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  height: 58px;
  flex-grow: 1;
  margin:0 auto;
`
const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.overPrimary};
  font-family: 'Muli-Bold';
  font-size: 20px;
  line-height:22px;
  margin-right:8px;
`

const PrimaryButton = props => {
  const { text, children, onPress } = props;
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{text}</ButtonText>
      {children}
    </ButtonContainer>
  );
};

export default PrimaryButton;