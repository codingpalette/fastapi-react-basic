import React from 'react';
import { HeaderBox } from './styles';
import { Button, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';

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
        <Button>
          <Link to="/login">로그인</Link>
        </Button>
        {/* <Dropdown overlay={menu} placement="bottomRight" arrow> */}
        {/*  <Button>bottomRight</Button> */}
        {/* </Dropdown> */}
      </HeaderBox>
    </>
  );
};

export default Header;
