import styled from 'styled-components';
import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

export const LayoutBox = styled(Layout)`
  width: 100%;
  min-height: 100%;
`;

export const ContentBox = styled(Content)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const RowBox = styled(Row)`
  width: 100%;
`;

export const ColBox = styled(Col)`
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
  padding: 1rem;
`;
