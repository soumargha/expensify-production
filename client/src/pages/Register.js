import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import Spinner from "../components/Spinner";
import '../css/Register.css'; // Make sure to create and import a CSS file for custom styles

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      console.log(values); // Log the values to see what is being sent
      await axios.post('https://expensify-production.vercel.app/api/v1/users/register', values); // Corrected URL to match proxy setup
      message.success('Registration successful');
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      console.error(error.response.data); // Log the error response
      message.error('Something went wrong');
    }
  };

  // Prevent for logged-in user
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <><div className="parallax min-h-screen bg-gray-200 text-gray-900 flex justify-center ">
      {loading && <Spinner />}
      <div className=" max-w-screen-xl m-0 sm:m-10 bg-emerald-100  shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://www.svgrepo.com/show/301692/login.svg"
              className="w-20 mx-auto"
              alt="Logo" />
          </div>
          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-2xl mt-[-1rem] xl:text-3xl font-extrabold">
              Sign up to Expensify
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                {/* Form for registration */}
                <Form layout="vertical" onFinish={submitHandler}>
                  {/* Name field */}
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                  >
                    <Input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Name" />
                  </Form.Item>
                  {/* Email field */}
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                    <Input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      placeholder="Email" />
                  </Form.Item>
                  {/* Password field */}
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password" />
                  </Form.Item>
                  {/* Submit button */}
                  <button
                    className="mt-5 tracking-wide font-semibold bg-lime-500 text-gray-100 w-full py-4 rounded-lg hover:bg-lime-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    type="submit"
                  >
                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign Up</span>
                  </button>
                </Form>
                {/* Agreement text */}

                {/* Login link */}
                <p className="mt-[-6rem] text-xs text-gray-600 text-center">
                  Already Registered? <Link to="/login" className="border-b border-gray-500 border-dotted">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")' }} />
        </div>
      </div>
    </div><Footer /></>
  );
};

export default Register;
