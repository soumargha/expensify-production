import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import LandingpageNew from './LandingpageNew';
import Footer from '../components/Footer';
import mobile from '../images/mobile.png';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { VanishList } from './VanishList';


const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post('https://expensify-production.vercel.app/api/v1/users/login', values);
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
      <LandingpageNew />
     <VanishList/>

     

      <div id="login-section" className="relative min-h-screen bg-blend-multiply bg-zinc-950 text-white flex justify-center items-center pb-20 pt-32">
        {/* Stars Effect */}
        <div className="absolute inset-0 z-0">
          <Canvas>
            <Stars radius={50} count={2500} factor={4} fade speed={2} />
          </Canvas>
        </div>



        {/* Login Form */}
        <div className="relative z-10 mt-2 max-w-screen-xl m-0 sm:m-10  shadow sm:rounded-lg flex justify-center flex-1 rounded-lg">
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

          <div className="flex-1 bg-tranparent text-center hidden lg:flex rounded-lg rounded-br-lg justify-center items-center">
            <img
              className="rounded-lg mt-4 mb-4 shadow-xl"
              style={{ maxWidth: '40rem', maxHeight: '44rem' }}
              src={mobile}
              alt="Mobile Illustration"
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
