import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import LandingPage from './LandingPage';
import Footer from '../components/Footer'
import mobile from '../images/mobile.png'

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/users/login', values);
      setLoading(false);
      message.success('Login successful');
      localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));
      navigate('/');
    } catch (error) {
      setLoading(false);
      message.error('Login failed. Please check your credentials.');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <LandingPage />
      <div id="login-section" className="parallax min-h-screen bg-blend-multiply bg-slate-400 text-gray-900 flex justify-center items-center ">
        <div className="mt-2  max-w-screen-xl m-0 sm:m-10  bg-white shadow sm:rounded-lg flex justify-center flex-1 rounded-lg">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-6">Login to your account</h1>
              <img src="https://www.svgrepo.com/show/301692/login.svg" className="w-24 mx-auto mb-8" alt="logo" />
            </div>
            <Form
              form={form}
              layout="vertical"
              onFinish={submitHandler}
              initialValues={{ email: '', password: '' }}
              className="mt-8 space-y-6"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input type="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Enter your password" className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
              </Form.Item>

              <div className="flex items-center justify-between mt-6">
                <div className="text-sm">
                  <Link to="/register" className="font-medium text-green-600 hover:text-green-700">
                    Not a user? Click here to register
                  </Link>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  loading={loading}
                >
                  Sign In
                </Button>
              </div>
            </Form>
          </div>

          <div className="flex-1 bg-emerald-600 text-center hidden lg:flex rounded-tr-lg rounded-br-lg justify-center items-center">
  <img
    className="rounded-lg mt-4 mb-4 shadow-xl"
    style={{ maxWidth: '40rem', maxHeight: '44rem' }}
    src={mobile}
    alt="Cute cat with blue eyes"
  />
</div>

        </div>

        {loading && <Spinner />}
      </div>
      <Footer />
    </>
  );
};

export default Login;
