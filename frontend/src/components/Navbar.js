import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/files?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <div className="brand-logo">
              <img src="/logo.jpg" alt="شعار البرنامج" className="program-logo" />
              <div className="brand-text">
                <h1>نُخبة</h1>
                <span className="brand-subtitle">منصة التميز الأكاديمي</span>
              </div>
            </div>
          </Link>

          <div className="navbar-center">
            <Link to="/" className="nav-link">
              <span className="nav-icon">🏠</span>
              <span>الرئيسية</span>
            </Link>
            <Link to="/files" className="nav-link">
              <span className="nav-icon">📚</span>
              <span>الملفات</span>
            </Link>
            <Link to="/excellence" className="nav-link nav-link-special">
              <span className="nav-icon">⭐</span>
              <span>التفوق المستمر</span>
            </Link>
          </div>

          <div className="navbar-end">
            {/* Search */}
            <div className="search-container">
              {showSearch ? (
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث في الملفات..."
                    className="search-input"
                    autoFocus
                  />
                  <button type="submit" className="search-btn">
                    🔍
                  </button>
                  <button type="button" onClick={() => setShowSearch(false)} className="search-close">
                    ✕
                  </button>
                </form>
              ) : (
                <button onClick={() => setShowSearch(true)} className="search-toggle" title="بحث">
                  🔍
                </button>
              )}
            </div>

            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="nav-link admin-badge">
                <span className="nav-icon">⚙️</span>
                <span>لوحة التحكم</span>
              </Link>
            )}

            <button onClick={toggleTheme} className="theme-toggle" aria-label="تبديل الوضع" title={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}>
              {isDark ? '☀️' : '🌙'}
            </button>

            {isAuthenticated ? (
              <div className="user-menu">
                <Link to="/profile" className="user-avatar" title="الملف الشخصي">
                  <span className="avatar-text">{user?.name?.charAt(0)?.toUpperCase()}</span>
                  <span className="avatar-status"></span>
                </Link>
                <div className="user-info">
                  <span className="user-greeting">مرحباً</span>
                  <span className="user-name">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="btn btn-logout" title="تسجيل الخروج">
                  <span>خروج</span>
                  <span className="logout-icon">→</span>
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline">تسجيل الدخول</Link>
                <Link to="/register" className="btn btn-primary">إنشاء حساب</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
