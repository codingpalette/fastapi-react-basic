import React from 'react';
import { ColBox, ContentBox, LayoutBox, RowBox } from './styles';
import { Col, Row } from 'antd';

const AuthTemplate = ({ children }) => {
  return (
    <>
      <LayoutBox>
        <ContentBox>
          <RowBox>
            <ColBox>{children}</ColBox>
          </RowBox>
        </ContentBox>
      </LayoutBox>
    </>
  );
};

export default AuthTemplate;
