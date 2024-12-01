// Navbar.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, Row, Col, Button, Space } from 'antd';
import zooLogo from './static/media/zoo-logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/slices/authSlice';
import './static/css/Navbar.css'; // Import the CSS file

const { Search } = Input;

const Navbar = ({ onSearch }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userRole = useSelector((state) => state.auth.role); // 'admin', 'manager', 'user'
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    setSearchValue('');
    navigate('/productlist', { replace: true });
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSearch = (value) => {
    if (onSearch) {
      onSearch(value);
    }
  };

  // Function to check if a menu item is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar">
      <Row align="middle" justify="space-between">
        {/* Logo */}
        <Col>
          <div className="logo" onClick={handleLogoClick}>
            <img src={zooLogo} alt="Logo" />
          </div>
        </Col>

        {/* Search Bar */}
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          className="searchBar"
          style={{ textAlign: 'center' }}
        >
          <Search
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            allowClear
            style={{
              maxWidth: '300px',
              width: '100%',
            }}
          />
        </Col>

        {/* Navigation Items */}
        <Col>
          <Space size="middle" className="navItems">
            {/* Products */}
            <Button
              type="text"
              onClick={() => navigate('/productlist')}
              className={`navButton ${isActive('/productlist') ? 'active' : ''}`}
            >
              Products
            </Button>

            {/* Contacts */}
            <Button
              type="text"
              onClick={() => navigate('/contacts')}
              className={`navButton ${isActive('/contacts') ? 'active' : ''}`}
            >
              Contacts
            </Button>

            {/* Cart (only if authenticated) */}
            {isAuth && (
              <Button
                type="text"
                onClick={() => navigate('/cart')}
                className={`navButton ${isActive('/cart') ? 'active' : ''}`}
              >
                Cart
              </Button>
            )}

            {/* Admin Dashboard (only if admin) */}
            {isAuth && userRole === 'admin' && (
              <Button
                type="text"
                onClick={() => navigate('/admin-dashboard')}
                className={`navButton ${isActive('/admin-dashboard') ? 'active' : ''}`}
              >
                Admin Dashboard
              </Button>
            )}

            {/* Login/Logout and Profile */}
            {isAuth ? (
              <>
                {/* Profile */}
                <Button
                  type="text"
                  onClick={() => navigate('/user-profile')}
                  className={`navButton ${isActive('/user-profile') ? 'active' : ''}`}
                >
                  Profile
                </Button>
                {/* Logout */}
                <Button
                  type="text"
                  onClick={() => {
                    dispatch(logout());
                    navigate('/login'); // Redirect to login after logout
                  }}
                  className="navButton"
                >
                  Logout
                </Button>
              </>
            ) : (
              // Login
              <Button
                type="text"
                onClick={() => navigate('/login')}
                className={`navButton ${isActive('/login') ? 'active' : ''}`}
              >
                Login
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
