import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">منصة نخبة</h3>
            <p className="footer-description">
              خدمات رقمية تسهّل التسجيل والمتابعة وإدارة النماذج في مكان واحد.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">روابط سريعة</h4>
            <ul className="footer-links">
              <li><Link to="/">الرئيسية</Link></li>
              <li><Link to="/files">الملفات</Link></li>
              <li><Link to="/excellence">التفوق المستمر</Link></li>
              <li><Link to="/profile">الملف الشخصي</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">تواصل معنا</h4>
            <p className="footer-text">جامعة الملك سعود</p>
            <p className="footer-text">الرياض، المملكة العربية السعودية</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 منصة نخبة. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
