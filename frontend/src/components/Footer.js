import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/logo.jpg" alt="نُخبة" className="footer-logo-img" />
              <h3>نُخبة</h3>
            </div>
            <p className="footer-desc">
              منصة تعليمية متكاملة تجمع بين التعليم والإثراء المعرفي لتمكين الطلاب والطالبات من التفوق الأكاديمي المستمر.
            </p>
            <div className="footer-social">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="تويتر">
                <span>🐦</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="لينكد إن">
                <span>💼</span>
              </a>
              <a href="mailto:info@nokhba.sa" aria-label="البريد الإلكتروني">
                <span>✉️</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">روابط سريعة</h4>
            <ul className="footer-links">
              <li><Link to="/">الرئيسية</Link></li>
              <li><Link to="/files">الملفات</Link></li>
              <li><Link to="/excellence">التفوق المستمر</Link></li>
              <li><Link to="/about">من نحن</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h4 className="footer-title">السياسات</h4>
            <ul className="footer-links">
              <li><Link to="/privacy">سياسة الخصوصية</Link></li>
              <li><Link to="/terms">الشروط والأحكام</Link></li>
              <li><Link to="/contact">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4 className="footer-title">تواصل معنا</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📧</span>
                <a href="mailto:info@nokhba.sa">info@nokhba.sa</a>
              </li>
              <li>
                <span className="contact-icon">🌐</span>
                <span>جامعة الملك سعود</span>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>© {currentYear} نُخبة - جميع الحقوق محفوظة</p>
            <p className="footer-university">برنامج نخبة - جامعة الملك سعود</p>
          </div>
          <div className="footer-credits">
            <p>تم التطوير بكل ❤️ من أجل التميز الأكاديمي</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
