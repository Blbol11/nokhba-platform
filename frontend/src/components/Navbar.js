import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import NotificationCenter from './NotificationCenter';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotificationCount();
      const interval = setInterval(fetchNotificationCount, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const fetchNotificationCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/notifications/unread-count`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotificationCount(response.data.count);
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/logo.jpg" alt="شعار البرنامج" className="navbar-logo" />
          <span className="navbar-title">نُخبة</span>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="القائمة"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            الرئيسية
          </Link>
          <Link to="/files" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            الملفات
          </Link>
          <Link to="/excellence" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            التفوق المستمر
          </Link>
          {isAuthenticated && (
            <Link to="/profile" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              الملف الشخصي
            </Link>
          )}
          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin" className="nav-link nav-link-admin" onClick={() => setMobileMenuOpen(false)}>
              لوحة التحكم
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          {isAuthenticated && (
            <button
              onClick={() => setShowNotifications(true)}
              className="notification-btn"
              title="الإشعارات"
            >
              🔔
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </button>
          )}

          {isAuthenticated ? (
            <button onClick={handleLogout} className="btn btn-logout">
              تسجيل الخروج
            </button>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary">
                تسجيل الدخول
              </Link>
              <Link to="/register" className="btn btn-primary">
                إنشاء حساب
              </Link>
            </div>
          )}
        </div>
      </div>

      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => {
          setShowNotifications(false);
          fetchNotificationCount();
        }}
      />
    </nav>
  );
};

export default Navbar;
