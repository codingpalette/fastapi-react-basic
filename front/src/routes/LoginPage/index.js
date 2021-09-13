import React, { useCallback, useEffect, useState } from 'react';
import AuthTemplate from '../../components/templates/AuthTemplate';
import { Button, Card, Form, Input, message } from 'antd';
import { Link, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

const LoginPage = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${JSON.parse(window.localStorage.getItem('access_token'))}`;
  const { data: userData, error, revalidate } = useSWR('/users', fetcher);

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(async (values) => {
    console.log('Success:', values);
    setLoading(true);
    try {
      const res = await axios.post('/users/login', values);
      console.log(res);
      if (res.data.result === 'success') {
        message.info(res.data.message);

        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
        window.localStorage.setItem('access_token', JSON.stringify(res.data.access_token));
        history.push('/');
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    return () => setLoading(false); // cleanup function을 이용
  }, []);

  if (!error && userData) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <AuthTemplate>
        <Card title="로그인" bordered={false}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="이메일"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: '이메일을 정확히 입력해주세요',
                },
                { required: true, message: '이메일을 입력해주세요' },
              ]}
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="비밀번호"
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
              required
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                로그인
              </Button>
            </Form.Item>
            <div>
              <Link to="/join">회원가입</Link>
            </div>
          </Form>
        </Card>
      </AuthTemplate>
    </>
  );
};

export default LoginPage;
