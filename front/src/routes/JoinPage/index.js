import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import AuthTemplate from '../../components/templates/AuthTemplate';

const JoinPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(async (values) => {
    // console.log('Success:', values);
    setLoading(true);
    try {
      const res = await axios.post('/users/join', {
        email: values.email,
        nickname: values.nickname,
        password: values.password,
      });
      if (res.data.result === 'success') {
        message.info(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
      // console.error(e);
      message.error('서버 에러가 발생했습니다');
    } finally {
      setLoading(false);
    }
  }, []);

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <>
      <AuthTemplate>
        <Card title="회원가입" bordered={false}>
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
              label="닉네임"
              name="nickname"
              rules={[{ required: true, message: '닉네임을 입력해주세요' }]}
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="비밀번호"
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
              hasFeedback
              required
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="비밀번호 확인"
              name="password-check"
              rules={[
                { required: true, message: '비밀번호를 입력해주세요' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('비밀번호가 서로 다릅니다'));
                  },
                }),
              ]}
              hasFeedback
              required
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                회원가입
              </Button>
            </Form.Item>
            <div>
              <Link to="/login">로그인</Link>
            </div>
          </Form>
        </Card>
      </AuthTemplate>
    </>
  );
};

export default JoinPage;
