import React from 'react';
import { Link } from 'react-router-dom';
import './Excellence.css';

const Excellence = () => {
  return (
    <div className="excellence-page">
      {/* Hero Section */}
      <section className="excellence-hero">
        <div className="container">
          <div className="excellence-header">
            <h1 className="excellence-title">مبادرة التفوق المستمر</h1>
            <div className="excellence-subtitle">
              <p>توفير منصة تفاعلية تسهّل وصول الطلبة المتفوقين إلى</p>
              <p>الدورات التعليمية ودعم البحث العلمي والدروس الإثرائية،</p>
              <p>بما يلبّي احتياجاتهم ويحفّز قدراتهم، في بيئة تعليمية</p>
              <p>داعمة ومحفّزة، تسهم في تحسين التجربة التعليمية.</p>
            </div>

            <div className="excellence-meta">
              <p><strong>تنفيذ:</strong> مريم العتيبي</p>
              <p><strong>مسار التقنية والابتكار – مبادرة التفوق المستمر</strong></p>
              <p><strong>عمادة شؤون الطلاب</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="excellence-sections">
        <div className="container">
          <h2 className="section-title">الخدمات الرئيسية</h2>

          <div className="excellence-grid">
            {/* الدورات */}
            <Link to="/excellence/courses" className="excellence-card">
              <div className="card-icon">📚</div>
              <h3>الدورات التعليمية</h3>
              <p>دورات عن بُعد وحضورية ومسجلة</p>
              <ul className="card-features">
                <li>دورات عن بُعد</li>
                <li>دورات حضورية</li>
                <li>دورات مسجلة</li>
              </ul>
              <span className="card-arrow">←</span>
            </Link>

            {/* دعم البحث العلمي */}
            <Link to="/excellence/research" className="excellence-card">
              <div className="card-icon">🔬</div>
              <h3>دعم البحث العلمي والابتكار</h3>
              <p>دعم شامل للباحثين والمبتكرين</p>
              <ul className="card-features">
                <li>الإرشاد الأكاديمي</li>
                <li>دعم الأفكار البحثية</li>
                <li>مساعدة في إعداد الأبحاث</li>
              </ul>
              <span className="card-arrow">←</span>
            </Link>

            {/* الدروس الإثرائية */}
            <Link to="/excellence/enrichment" className="excellence-card">
              <div className="card-icon">🎓</div>
              <h3>الدروس الإثرائية</h3>
              <p>محتوى إثرائي متنوع وشامل</p>
              <ul className="card-features">
                <li>فيديوهات تعليمية</li>
                <li>ملفات PDF</li>
                <li>مواد داعمة للتعلّم</li>
              </ul>
              <span className="card-arrow">←</span>
            </Link>

            {/* الاستفسارات */}
            <Link to="/excellence/inquiries" className="excellence-card">
              <div className="card-icon">💬</div>
              <h3>الاستفسارات</h3>
              <p>نحن هنا للإجابة على جميع أسئلتك</p>
              <ul className="card-features">
                <li>طرح الأسئلة</li>
                <li>الدعم الفني</li>
                <li>استفسارات المحتوى</li>
              </ul>
              <span className="card-arrow">←</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="excellence-features">
        <div className="container">
          <h2 className="section-title">لماذا مبادرة التفوق المستمر؟</h2>

          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon">🎯</div>
              <h3>دعم التفوق الأكاديمي</h3>
              <p>برامج متخصصة لدعم المتفوقين وتنمية قدراتهم</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">💡</div>
              <h3>تعزيز الابتكار</h3>
              <p>بيئة محفزة للإبداع والابتكار والتفكير النقدي</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🔍</div>
              <h3>البحث العلمي</h3>
              <p>دعم شامل للبحث العلمي والمشاريع البحثية</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">📱</div>
              <h3>منصة رقمية</h3>
              <p>وصول سهل وسريع لجميع الخدمات والموارد</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">👨‍🏫</div>
              <h3>إرشاد أكاديمي</h3>
              <p>مرشدون أكاديميون لمساعدتك في رحلتك التعليمية</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🏆</div>
              <h3>رؤية 2030</h3>
              <p>متوافقة مع رؤية المملكة العربية السعودية 2030</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="excellence-vision">
        <div className="container">
          <div className="vision-content">
            <h2>رؤيتنا</h2>
            <p>
              تأتي مبادرة التفوق المستمر لدعم الطلبة في التفوق الأكاديمي والبحث العلمي
              من خلال منصة رقمية تسهم في تعزيز التعلم والابتكار وتنمية القدرات،
              بما يتوافق مع رؤية المملكة 2030.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="excellence-cta">
        <div className="container">
          <h2>هل أنت مستعد للانطلاق؟</h2>
          <p>انضم إلى مبادرة التفوق المستمر وابدأ رحلتك نحو التميز</p>
          <div className="cta-buttons">
            <Link to="/excellence/courses" className="btn btn-primary btn-lg">
              تصفح الدورات
            </Link>
            <Link to="/excellence/inquiries" className="btn btn-secondary btn-lg">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Excellence;
