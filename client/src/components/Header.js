import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Header = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('user');
    message.success('Logged out successfully');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-200 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://www.svgrepo.com/show/301692/login.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-emerald-900">Expense Management</span>
        </Link>
        <div className="flex md:hidden">
          <button onClick={toggleMenu} className="text-emerald-900 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
        <div className={`flex-col md:flex md:flex-row md:items-center w-full md:w-auto ${isMenuOpen ? 'flex' : 'hidden'} mt-4 md:mt-0`}>
          {loginUser && (
            <span className="block px-4 py-2 text-sm rounded bg-emerald-600 text-white md:mr-4">
              {loginUser?.name}
            </span>
          )}
          <button
            onClick={logoutHandler}
            className="px-4 py-2 text-sm text-white bg-emerald-600 rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
