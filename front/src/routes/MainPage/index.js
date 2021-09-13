import React from 'react';
import MainTemplate from '../../components/templates/MainTemplate';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const MainPage = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${JSON.parse(window.localStorage.getItem('access_token'))}`;
  const { data: userData, error, revalidate } = useSWR('/users', fetcher);

  if (error && !userData) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <MainTemplate>
        <div>sdfs</div>
      </MainTemplate>
    </>
  );
};

export default MainPage;
