import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <SEO
        title="الصفحة غير موجودة - 404"
        description="عذراً، الصفحة التي تبحث عنها غير موجودة."
      />

      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1 className="error-title">الصفحة غير موجودة</h1>
          <p className="error-message">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>

          <div className="error-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              العودة للرئيسية
            </Link>
            <Link to="/files" className="btn btn-outline btn-lg">
              تصفح الملفات
            </Link>
          </div>

          <div className="helpful-links">
            <h3>روابط مفيدة:</h3>
            <div className="links-grid">
              <Link to="/" className="helpful-link">
                <span className="link-icon">🏠</span>
                <span>الرئيسية</span>
              </Link>
              <Link to="/files" className="helpful-link">
                <span className="link-icon">📚</span>
                <span>الملفات</span>
              </Link>
              <Link to="/excellence" className="helpful-link">
                <span className="link-icon">⭐</span>
                <span>التفوق المستمر</span>
              </Link>
              <Link to="/profile" className="helpful-link">
                <span className="link-icon">👤</span>
                <span>الملف الشخصي</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
