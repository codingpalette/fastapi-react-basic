import React from 'react';
import { Layout } from 'antd';
import Header from '../../common/Header';
import { Content } from 'antd/es/layout/layout';

const MainTemplate = ({ children }) => {
  return (
    <>
      <Layout>
        <Header />
        <Content>{children}</Content>
      </Layout>
    </>
  );
};

export default MainTemplate;
