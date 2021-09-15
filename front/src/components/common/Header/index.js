import React from 'react';
import { HeaderBox } from './styles';
import { Button, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/login">로그인</Link>
    </Menu.Item>
  </Menu>
);

const Header = () => {
  return (
    <>
      <HeaderBox>
        <div>Home</div>
        <Button type="text">
          <MenuOutlined />
        </Button>

        {/* <Dropdown overlay={menu} placement="bottomRight" arrow> */}
        {/*  <Button>bottomRight</Button> */}
        {/* </Dropdown> */}
      </HeaderBox>
    </>
  );
};

export default Header;
