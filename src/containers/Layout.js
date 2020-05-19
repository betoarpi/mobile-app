import React from 'react';
import { StatusBar } from 'react-native';
import { ApolloProvider } from 'react-apollo';

import client from '../apollo/client';
import { MainLayout } from '../theme/Styles';

const Layout = (props) => {
  const { children } = props;
  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="light-content" />
      <MainLayout>
        {children}
      </MainLayout>
    </ApolloProvider>
  );
};

export default Layout;