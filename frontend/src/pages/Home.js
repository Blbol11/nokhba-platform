import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    students: 0,
    files: 0,
    courses: 0,
    hours: 0
  });

  useEffect(() => {
    // Animated counter effect
    const targetStats = {
      students: 1250,
      files: 3400,
      courses: 85,
      hours: 12500
    };

    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    Object.keys(targetStats).forEach(key => {
      let current = 0;
      const target = targetStats[key];
      const step = target / steps;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, increment);
    });
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="container">
          <div className="hero-content animate-fade-in-up">
            <div className="hero-badge">منصة التميز الأكاديمي</div>
            <h1 className="hero-title">
              مرحباً بك في
              <span className="hero-highlight"> نُخبة</span>
            </h1>
            <p className="hero-subtitle">
              منصة تعليمية متكاملة تجمع بين التعليم والإثراء المعرفي
              <br />
              لتمكين الطلاب والطالبات من التفوق الأكاديمي المستمر
            </p>

            {!isAuthenticated ? (
              <div className="hero-actions">
                <Link to="/register" className="btn-hero btn-hero-primary">
                  ابدأ رحلتك الآن
                </Link>
                <Link to="/files" className="btn-hero btn-hero-outline">
                  استكشف المحتوى
                </Link>
              </div>
            ) : (
              <div className="hero-actions">
                <div className="welcome-box">
                  <span className="welcome-greeting">مرحباً بعودتك</span>
                  <span className="welcome-name">{user?.name}</span>
                </div>
                <Link to="/files" className="btn-hero btn-hero-primary">
                  تصفح الملفات
                </Link>
                <Link to="/excellence" className="btn-hero btn-hero-gold">
                  التفوق المستمر
                </Link>
              </div>
            )}

            {/* Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">{stats.students.toLocaleString('ar')}</div>
                <div className="stat-label">طالب وطالبة</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">{stats.files.toLocaleString('ar')}</div>
                <div className="stat-label">ملف دراسي</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">{stats.courses.toLocaleString('ar')}</div>
                <div className="stat-label">دورة تدريبية</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">{stats.hours.toLocaleString('ar')}</div>
                <div className="stat-label">ساعة محتوى</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">لماذا تختار نُخبة؟</h2>
            <p className="section-subtitle">منصة متكاملة تجمع كل ما تحتاجه للتفوق الأكاديمي</p>
          </div>

          <div className="features-grid">
            <div className="feature-card card-premium">
              <div className="feature-number">01</div>
              <h3>مكتبة شاملة</h3>
              <p>الوصول إلى آلاف الملفات الدراسية والمحاضرات المنظمة حسب المواد والتخصصات</p>
            </div>

            <div className="feature-card card-premium">
              <div className="feature-number">02</div>
              <h3>دورات تدريبية</h3>
              <p>دورات احترافية عن بعد وحضورياً في مختلف المجالات التقنية والأكاديمية</p>
            </div>

            <div className="feature-card card-premium">
              <div className="feature-number">03</div>
              <h3>محتوى إثرائي</h3>
              <p>فيديوهات تعليمية ومواد إثرائية لتعزيز المعرفة وتطوير المهارات</p>
            </div>

            <div className="feature-card card-premium">
              <div className="feature-number">04</div>
              <h3>دعم بحثي</h3>
              <p>مساعدة في مشاريع التخرج والأبحاث العلمية من خلال فريق متخصص</p>
            </div>

            <div className="feature-card card-premium">
              <div className="feature-number">05</div>
              <h3>آمن وموثوق</h3>
              <p>نظام حماية متقدم لبياناتك مع نسخ احتياطي مستمر لجميع الملفات</p>
            </div>

            <div className="feature-card card-premium">
              <div className="feature-number">06</div>
              <h3>سهل الاستخدام</h3>
              <p>واجهة عصرية وبسيطة تجعل التنقل والبحث عن المحتوى أمراً سهلاً</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">خدماتنا المتكاملة</h2>
            <p className="section-subtitle">كل ما تحتاجه في مكان واحد</p>
          </div>

          <div className="services-grid">
            <Link to="/files" className="service-card">
              <div className="service-header">
                <h3>مكتبة الملفات</h3>
                <span className="service-count">3400+ ملف</span>
              </div>
              <p>محاضرات، واجبات، مشاريع، كتب، وملخصات دراسية شاملة</p>
              <div className="service-link">استكشف الملفات ←</div>
            </Link>

            <Link to="/excellence" className="service-card service-highlight">
              <div className="service-header">
                <h3>التفوق المستمر</h3>
                <span className="service-badge">مميز</span>
              </div>
              <p>محتوى إثرائي متنوع ودورات تدريبية ودعم بحثي متخصص</p>
              <div className="service-link">ابدأ التفوق ←</div>
            </Link>

            <div className="service-card">
              <div className="service-header">
                <h3>استفسارات واستشارات</h3>
              </div>
              <p>فريق دعم جاهز للإجابة على استفساراتك الأكاديمية</p>
              <div className="service-link">تواصل معنا ←</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-shapes">
          <div className="cta-shape cta-shape-1"></div>
          <div className="cta-shape cta-shape-2"></div>
        </div>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">هل أنت مستعد للانضمام إلى نُخبة؟</h2>
            <p className="cta-subtitle">انضم إلى آلاف الطلاب الذين يحققون التميز الأكاديمي</p>
            {!isAuthenticated ? (
              <div className="cta-actions">
                <Link to="/register" className="btn-cta btn-cta-primary">
                  ابدأ مجاناً الآن
                </Link>
                <Link to="/files" className="btn-cta btn-cta-outline">
                  تصفح المحتوى
                </Link>
              </div>
            ) : (
              <div className="cta-actions">
                <Link to="/profile" className="btn-cta btn-cta-primary">
                  انتقل إلى ملفك الشخصي
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
