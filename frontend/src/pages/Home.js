import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">مرحباً بك في منصة نخبة</h1>
            <p className="hero-subtitle">
              منصة تعليمية متكاملة لمشاركة المعرفة والملفات الدراسية بين الطلاب والطالبات
            </p>

            {!isAuthenticated ? (
              <div className="hero-actions">
                <Link to="/register" className="btn btn-primary btn-lg">
                  ابدأ الآن
                </Link>
                <Link to="/files" className="btn btn-secondary btn-lg">
                  تصفح الملفات
                </Link>
              </div>
            ) : (
              <div className="hero-actions">
                <p className="welcome-message">مرحباً {user?.name}!</p>
                <Link to="/files" className="btn btn-primary btn-lg">
                  تصفح الملفات
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">مميزات المنصة</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>مكتبة شاملة</h3>
              <p>الوصول إلى مكتبة واسعة من الملفات الدراسية والمحاضرات</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>آمنة وموثوقة</h3>
              <p>نظام مصادقة قوي لحماية بياناتك وملفاتك</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>تواصل فعال</h3>
              <p>منصة سهلة للتواصل ومشاركة المعرفة مع زملائك</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📤</div>
              <h3>مشاركة سهلة</h3>
              <p>رفع ومشاركة ملفاتك الدراسية بسهولة وبساطة</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>بحث متقدم</h3>
              <p>ابحث عن الملفات حسب المادة والتصنيف بسرعة</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>تنظيم ذكي</h3>
              <p>ملفات منظمة حسب التصنيفات والمواد الدراسية</p>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2 className="section-title">التصنيفات المتاحة</h2>

          <div className="categories-grid">
            <div className="category-card">
              <h3>محاضرات</h3>
              <p>ملفات المحاضرات والدروس</p>
            </div>

            <div className="category-card">
              <h3>واجبات</h3>
              <p>الواجبات والتمارين الدراسية</p>
            </div>

            <div className="category-card">
              <h3>مشاريع</h3>
              <p>المشاريع والأبحاث</p>
            </div>

            <div className="category-card">
              <h3>كتب</h3>
              <p>الكتب والمراجع الدراسية</p>
            </div>

            <div className="category-card">
              <h3>ملخصات</h3>
              <p>ملخصات المواد الدراسية</p>
            </div>

            <div className="category-card">
              <h3>أخرى</h3>
              <p>ملفات ومواد متنوعة</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>هل أنت مستعد للبدء؟</h2>
            <p>انضم إلى منصة نخبة الآن وابدأ رحلتك التعليمية</p>
            {!isAuthenticated && (
              <Link to="/register" className="btn btn-primary btn-lg">
                سجل الآن مجاناً
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
