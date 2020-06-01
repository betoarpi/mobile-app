import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';

const Logo = styled.View`
  flex: 0 0 100%;
  justify-content: center;
  align-items: center;
`
const LoadingText = styled.Text`
  font-size: 24px;
`

const Splash = (props) => {
  const { data, logo } = props;
  if (data) {
    return (
      <Logo>
        <Image source={logo} />
      </Logo>
    );
  } else {
    return (
      <Logo>
        <LoadingText>
          {logo}
        </LoadingText>
      </Logo>
    )
  }
};

export default Splash;