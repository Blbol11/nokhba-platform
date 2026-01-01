import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import SEO from '../components/SEO';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [stats, setStats] = useState({
    students: 0,
    files: 0,
    courses: 0,
    hours: 0
  });
  const [openFaq, setOpenFaq] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // استخدام الإحصائيات الافتراضية مباشرة
    const targetStats = { students: 1250, files: 3400, courses: 85, hours: 12500 };

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

    // محاولة جلب البيانات الحقيقية في الخلفية (اختياري)
    try {
      const response = await axios.get(`${API_URL}/api/public/stats`);
      if (response.data && response.data.data) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.log('Using default stats');
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'كيف أبدأ استخدام المنصة؟',
      answer: 'سجّل الدخول باستخدام حسابك الجامعي، ثم اختر الخدمة المناسبة من القائمة الرئيسية.'
    },
    {
      question: 'هل الخدمات مجانية؟',
      answer: 'نعم، جميع الخدمات الأساسية متاحة مجاناً لجميع طلاب وطالبات الجامعة.'
    },
    {
      question: 'كيف أرفع ملفاتي الدراسية؟',
      answer: 'انتقل إلى صفحة الملفات، ثم اضغط على زر "رفع ملف جديد" واتبع التعليمات.'
    },
    {
      question: 'هل يمكنني التسجيل في الدورات؟',
      answer: 'نعم، تصفح قسم التفوق المستمر واختر الدورة المناسبة، ثم اضغط على "التسجيل في الدورة".'
    },
    {
      question: 'كيف أتواصل مع الدعم الفني؟',
      answer: 'يمكنك إرسال استفسارك من خلال صفحة الاستفسارات أو التواصل معنا عبر البريد الإلكتروني.'
    }
  ];

  return (
    <div className="home-page">
      <SEO
        title="نُخبة - منصة التميز الأكاديمي"
        description="منصة نخبة - خدمات رقمية تسهّل التسجيل والمتابعة وإدارة النماذج في مكان واحد لطلاب وطالبات جامعة الملك سعود"
        keywords="نخبة، جامعة الملك سعود، خدمات رقمية، ملفات دراسية، دورات، محتوى إثرائي، KSU، Nokhba"
        url="https://nokhba-platform.pages.dev"
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">منصة نخبة</h1>
            <p className="hero-description">
              خدمات رقمية تسهّل التسجيل والمتابعة وإدارة النماذج في مكان واحد.
            </p>

            {!isAuthenticated ? (
              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary">
                  ابدأ الآن
                </Link>
                <Link to="/excellence" className="btn btn-secondary">
                  استكشف الخدمات
                </Link>
              </div>
            ) : (
              <div className="hero-buttons">
                <Link to="/files" className="btn btn-primary">
                  مكتبة الملفات
                </Link>
                <Link to="/excellence" className="btn btn-secondary">
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
              <div className="stat-item">
                <div className="stat-number">{stats.files.toLocaleString('ar')}</div>
                <div className="stat-label">ملف دراسي</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats.courses.toLocaleString('ar')}</div>
                <div className="stat-label">دورة تدريبية</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">مميزات المنصة</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>واجهة سهلة</h3>
              <p>تصميم بسيط وعصري يجعل التنقل والاستخدام سهلاً وسريعاً</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>متابعة فورية</h3>
              <p>تابع حالة طلباتك ونماذجك في الوقت الفعلي</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>نماذج ذكية</h3>
              <p>نماذج إلكترونية تفاعلية تملأ وتُرسل بضغطة زر</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📁</div>
              <h3>تنظيم وتوثيق</h3>
              <p>احفظ جميع ملفاتك ونماذجك في مكان واحد منظم</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2 className="section-title">خدماتنا</h2>

          <div className="services-grid">
            <Link to="/files" className="service-card">
              <div className="service-icon">📚</div>
              <h3>مكتبة الملفات</h3>
              <p>محاضرات، واجبات، مشاريع، وملخصات دراسية شاملة</p>
            </Link>

            <Link to="/excellence/courses" className="service-card">
              <div className="service-icon">🎓</div>
              <h3>الدورات التدريبية</h3>
              <p>دورات احترافية في مختلف المجالات التقنية والأكاديمية</p>
            </Link>

            <Link to="/excellence/enrichment" className="service-card">
              <div className="service-icon">💡</div>
              <h3>المحتوى الإثرائي</h3>
              <p>فيديوهات تعليمية ومواد إثرائية لتعزيز المعرفة</p>
            </Link>

            <Link to="/excellence/research" className="service-card">
              <div className="service-icon">🔬</div>
              <h3>الدعم البحثي</h3>
              <p>مساعدة في مشاريع التخرج والأبحاث العلمية</p>
            </Link>

            <Link to="/excellence/inquiries" className="service-card">
              <div className="service-icon">💬</div>
              <h3>الاستفسارات</h3>
              <p>فريق دعم جاهز للإجابة على استفساراتك</p>
            </Link>

            <Link to="/profile" className="service-card">
              <div className="service-icon">👤</div>
              <h3>الملف الشخصي</h3>
              <p>إدارة حسابك ومتابعة نشاطك وإنجازاتك</p>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">كيف تعمل المنصة؟</h2>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>سجّل الدخول</h3>
              <p>استخدم حسابك الجامعي للدخول إلى المنصة</p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>اختر الخدمة</h3>
              <p>تصفح الخدمات المتاحة واختر ما يناسب احتياجك</p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>عبّئ البيانات</h3>
              <p>أكمل النموذج أو قم بالعملية المطلوبة</p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3>تابع الحالة</h3>
              <p>راقب تقدم طلبك واحصل على النتائج</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <h2 className="section-title">الأسئلة الشائعة</h2>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="container">
          <h2 className="cta-title">جاهز تبدأ؟</h2>
          <p className="cta-description">
            انضم إلى آلاف الطلاب الذين يستخدمون منصة نخبة
          </p>
          {!isAuthenticated ? (
            <Link to="/register" className="btn btn-primary">
              ابدأ الآن مجاناً
            </Link>
          ) : (
            <Link to="/files" className="btn btn-primary">
              استكشف المحتوى
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
