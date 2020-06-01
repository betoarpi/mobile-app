import React from 'react';
import { StatusBar } from 'react-native';

import { MainLayout } from '../theme/Styles';

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainLayout>
        {children}
      </MainLayout>
    </>
  );
};

export default Layout;