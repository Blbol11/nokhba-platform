import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <h1>نخبة</h1>
          </Link>

          <div className="navbar-links">
            <Link to="/" className="nav-link">الرئيسية</Link>
            <Link to="/files" className="nav-link">الملفات</Link>
            <Link to="/excellence" className="nav-link nav-link-excellence">مبادرة التفوق المستمر</Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="nav-link admin-link">لوحة التحكم</Link>
            )}

            <button onClick={toggleTheme} className="theme-toggle" aria-label="تبديل الوضع">
              {isDark ? '☀️' : '🌙'}
            </button>

            {isAuthenticated ? (
              <>
                <div className="user-menu">
                  <Link to="/profile" className="profile-btn" title="الملف الشخصي">
                    <span className="profile-icon">{user?.name?.charAt(0)?.toUpperCase()}</span>
                  </Link>
                  <span className="user-name">مرحباً، {user?.name}</span>
                  <button onClick={handleLogout} className="btn btn-secondary">
                    تسجيل الخروج
                  </button>
                </div>
              </>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="btn btn-primary">تسجيل الدخول</Link>
                <Link to="/register" className="btn btn-secondary">إنشاء حساب</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
