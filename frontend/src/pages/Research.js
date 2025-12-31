import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import './SubPage.css';

const Research = () => {
  const { showSuccess } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    researchType: '',
    topic: '',
    description: '',
    supportNeeded: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (value) => {
    const current = formData.supportNeeded;
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    setFormData({ ...formData, supportNeeded: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Research Support Request:', formData);
    showSuccess('تم إرسال طلبك بنجاح! سنتواصل معك قريباً');
    setFormData({
      name: '',
      email: '',
      studentId: '',
      researchType: '',
      topic: '',
      description: '',
      supportNeeded: []
    });
  };

  return (
    <div className="research-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <Link to="/excellence" className="back-link">
            ← العودة إلى مبادرة التفوق المستمر
          </Link>
          <h1>دعم البحث العلمي والابتكار</h1>
          <p>نوفر لك الدعم الشامل لتحقيق أهدافك البحثية والابتكارية</p>
        </div>

        {/* Services Section */}
        <section className="research-services">
          <h2 className="section-title">خدماتنا</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">👨‍🏫</div>
              <h3>الإرشاد الأكاديمي</h3>
              <p>مرشدون أكاديميون متخصصون لتوجيهك في رحلتك البحثية</p>
              <ul>
                <li>استشارات فردية</li>
                <li>توجيه منهجي</li>
                <li>متابعة مستمرة</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">💡</div>
              <h3>دعم الأفكار البحثية</h3>
              <p>نساعدك في تطوير وتنقيح أفكارك البحثية</p>
              <ul>
                <li>تقييم الأفكار</li>
                <li>تحديد الجدوى</li>
                <li>تطوير المقترحات</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">📝</div>
              <h3>مساعدة في إعداد الأبحاث</h3>
              <p>دعم شامل في جميع مراحل كتابة البحث العلمي</p>
              <ul>
                <li>البحث عن المراجع</li>
                <li>الصياغة الأكاديمية</li>
                <li>المراجعة اللغوية</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">❓</div>
              <h3>الإجابة على الاستفسارات</h3>
              <p>فريق متخصص للإجابة على جميع استفساراتك العلمية</p>
              <ul>
                <li>استفسارات منهجية</li>
                <li>استشارات فنية</li>
                <li>دعم تقني</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="research-areas">
          <h2 className="section-title">المجالات البحثية</h2>
          <div className="areas-grid">
            <div className="area-card">
              <span className="area-icon">🔬</span>
              <h4>العلوم التطبيقية</h4>
            </div>
            <div className="area-card">
              <span className="area-icon">💻</span>
              <h4>تقنية المعلومات</h4>
            </div>
            <div className="area-card">
              <span className="area-icon">🏥</span>
              <h4>العلوم الصحية</h4>
            </div>
            <div className="area-card">
              <span className="area-icon">📊</span>
              <h4>إدارة الأعمال</h4>
            </div>
            <div className="area-card">
              <span className="area-icon">🎨</span>
              <h4>الفنون والتصميم</h4>
            </div>
            <div className="area-card">
              <span className="area-icon">⚖️</span>
              <h4>القانون</h4>
            </div>
            <div className="area-card">
              <span className="area-icon">🌍</span>
              <h4>العلوم الاجتماعية</h4>
            </div>
            <div className="area-card">
              <span className="area-icon">🔧</span>
              <h4>الهندسة</h4>
            </div>
          </div>
        </section>

        {/* Request Support Form */}
        <section className="support-request">
          <h2 className="section-title">طلب دعم بحثي</h2>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">الاسم الكامل *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">الرقم الجامعي *</label>
                  <input
                    type="text"
                    name="studentId"
                    className="form-control"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">نوع البحث *</label>
                  <select
                    name="researchType"
                    className="form-control"
                    value={formData.researchType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">اختر نوع البحث</option>
                    <option value="thesis">رسالة ماجستير</option>
                    <option value="dissertation">أطروحة دكتوراه</option>
                    <option value="project">مشروع تخرج</option>
                    <option value="paper">ورقة بحثية</option>
                    <option value="innovation">مشروع ابتكاري</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">عنوان البحث / الفكرة *</label>
                <input
                  type="text"
                  name="topic"
                  className="form-control"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">وصف البحث / الفكرة *</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">نوع الدعم المطلوب *</label>
                <div className="checkbox-group">
                  {[
                    'إرشاد أكاديمي',
                    'مساعدة في اختيار الموضوع',
                    'البحث عن المراجع',
                    'المراجعة والتدقيق',
                    'التحليل الإحصائي',
                    'الصياغة الأكاديمية',
                    'دعم فني',
                    'أخرى'
                  ].map((item) => (
                    <label key={item} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.supportNeeded.includes(item)}
                        onChange={() => handleCheckboxChange(item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                إرسال الطلب
              </button>
            </form>
          </div>
        </section>

        {/* Success Stories */}
        <section className="success-stories">
          <h2 className="section-title">قصص نجاح</h2>
          <div className="stories-grid">
            <div className="story-card">
              <div className="story-quote">"</div>
              <p>
                "ساعدني فريق دعم البحث العلمي في تطوير فكرتي البحثية وتحويلها إلى مشروع متكامل. الدعم كان استثنائياً!"
              </p>
              <div className="story-author">
                <strong>أحمد العتيبي</strong>
                <span>طالب دكتوراه - علوم الحاسب</span>
              </div>
            </div>

            <div className="story-card">
              <div className="story-quote">"</div>
              <p>
                "الإرشاد الأكاديمي والدعم المستمر ساعدني في نشر ورقتي البحثية في مجلة علمية مرموقة."
              </p>
              <div className="story-author">
                <strong>نورة السعيد</strong>
                <span>طالبة ماجستير - إدارة أعمال</span>
              </div>
            </div>

            <div className="story-card">
              <div className="story-quote">"</div>
              <p>
                "من خلال المبادرة تمكنت من تحويل فكرتي الابتكارية إلى مشروع ريادي ناجح."
              </p>
              <div className="story-author">
                <strong>خالد الغامدي</strong>
                <span>طالب بكالوريوس - هندسة</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Research;
