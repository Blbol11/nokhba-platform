import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SubPage.css';

const Inquiries = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inquiry submitted:', formData);
    setSubmitted(true);

    // إعادة تعيين النموذج بعد 3 ثواني
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  const faqData = [
    {
      question: 'كيف يمكنني التسجيل في الدورات؟',
      answer: 'يمكنك التسجيل في الدورات من خلال الضغط على زر "التسجيل" في صفحة الدورات واتباع الخطوات المطلوبة.'
    },
    {
      question: 'هل الدورات مجانية؟',
      answer: 'نعم، جميع الدورات المقدمة من خلال مبادرة التفوق المستمر مجانية للطلاب المتفوقين.'
    },
    {
      question: 'كيف أحصل على دعم في البحث العلمي؟',
      answer: 'يمكنك تقديم طلب دعم من خلال صفحة "دعم البحث العلمي والابتكار" وسيتم التواصل معك من قبل الفريق المختص.'
    },
    {
      question: 'هل أحصل على شهادة بعد إكمال الدورة؟',
      answer: 'نعم، يحصل جميع المتدربين على شهادة حضور معتمدة عند إكمال الدورة بنجاح.'
    },
    {
      question: 'كيف يمكنني الوصول إلى المحتوى الإثرائي؟',
      answer: 'يمكنك الوصول إلى جميع المحتويات الإثرائية من خلال صفحة "الدروس الإثرائية" في أي وقت.'
    },
    {
      question: 'من يمكنه الاستفادة من المبادرة؟',
      answer: 'المبادرة موجهة للطلاب والطالبات المتفوقين أكاديمياً الذين يرغبون في تطوير مهاراتهم وقدراتهم.'
    }
  ];

  const contactMethods = [
    {
      icon: '📧',
      title: 'البريد الإلكتروني',
      value: 'excellence@university.edu.sa',
      link: 'mailto:excellence@university.edu.sa'
    },
    {
      icon: '📱',
      title: 'الهاتف',
      value: '+966 11 123 4567',
      link: 'tel:+966111234567'
    },
    {
      icon: '💬',
      title: 'واتساب',
      value: '+966 50 123 4567',
      link: 'https://wa.me/966501234567'
    },
    {
      icon: '📍',
      title: 'الموقع',
      value: 'عمادة شؤون الطلاب - المبنى الإداري',
      link: '#'
    }
  ];

  return (
    <div className="inquiries-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <Link to="/excellence" className="back-link">
            ← العودة إلى مبادرة التفوق المستمر
          </Link>
          <h1>الاستفسارات والدعم</h1>
          <p>نحن هنا للإجابة على جميع استفساراتك ومساعدتك</p>
        </div>

        {/* Contact Methods */}
        <section className="contact-methods">
          <h2 className="section-title">طرق التواصل</h2>
          <div className="methods-grid">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="method-card"
                target={method.link.startsWith('http') ? '_blank' : undefined}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <span className="method-icon">{method.icon}</span>
                <h3>{method.title}</h3>
                <p>{method.value}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="inquiry-form-section">
          <h2 className="section-title">أرسل استفسارك</h2>

          {submitted && (
            <div className="alert alert-success">
              ✓ تم إرسال استفسارك بنجاح! سنتواصل معك قريباً
            </div>
          )}

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
                    placeholder="أدخل اسمك الكامل"
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
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">رقم الجوال</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="05xxxxxxxx"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">فئة الاستفسار *</label>
                  <select
                    name="category"
                    className="form-control"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">اختر الفئة</option>
                    <option value="courses">الدورات التعليمية</option>
                    <option value="research">البحث العلمي</option>
                    <option value="enrichment">الدروس الإثرائية</option>
                    <option value="technical">دعم فني</option>
                    <option value="general">استفسار عام</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">عنوان الاستفسار *</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="عنوان مختصر للاستفسار"
                />
              </div>

              <div className="form-group">
                <label className="form-label">تفاصيل الاستفسار *</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="اكتب استفسارك بالتفصيل..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-block">
                إرسال الاستفسار
              </button>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2 className="section-title">الأسئلة الشائعة</h2>
          <div className="faq-container">
            {faqData.map((faq, index) => (
              <details key={index} className="faq-item">
                <summary className="faq-question">
                  <span className="question-icon">❓</span>
                  {faq.question}
                </summary>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Support Hours */}
        <section className="support-hours">
          <h2 className="section-title">ساعات العمل</h2>
          <div className="hours-card">
            <div className="hours-item">
              <span className="day">الأحد - الخميس</span>
              <span className="time">8:00 صباحاً - 4:00 مساءً</span>
            </div>
            <div className="hours-item weekend">
              <span className="day">الجمعة - السبت</span>
              <span className="time">إجازة</span>
            </div>
            <div className="response-note">
              <span className="note-icon">⏰</span>
              <p>سنرد على استفساراتك خلال 24-48 ساعة عمل</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Inquiries;
