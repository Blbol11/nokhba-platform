import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
  const [activeTab, setActiveTab] = useState('remote');

  // بيانات تجريبية للدورات
  const courses = {
    remote: [
      {
        id: 1,
        title: 'مهارات البحث العلمي المتقدم',
        description: 'دورة شاملة في مهارات البحث العلمي وكتابة الأوراق البحثية',
        instructor: 'د. أحمد محمد',
        duration: '4 أسابيع',
        schedule: 'الأحد والثلاثاء - 7:00 مساءً',
        startDate: '2024-02-01',
        seats: 30,
        registered: 18,
        platform: 'Zoom'
      },
      {
        id: 2,
        title: 'الذكاء الاصطناعي وتطبيقاته',
        description: 'مقدمة شاملة للذكاء الاصطناعي والتعلم الآلي',
        instructor: 'د. سارة العتيبي',
        duration: '6 أسابيع',
        schedule: 'الاثنين والأربعاء - 8:00 مساءً',
        startDate: '2024-02-05',
        seats: 25,
        registered: 20,
        platform: 'Microsoft Teams'
      }
    ],
    inPerson: [
      {
        id: 3,
        title: 'ورشة الابتكار وريادة الأعمال',
        description: 'ورشة عملية لتطوير مهارات الابتكار وريادة الأعمال',
        instructor: 'د. خالد السعيد',
        duration: 'يومان',
        schedule: 'السبت والأحد - 9:00 صباحاً',
        startDate: '2024-02-10',
        seats: 20,
        registered: 12,
        location: 'قاعة المؤتمرات - المبنى الإداري'
      },
      {
        id: 4,
        title: 'مهارات العرض والتقديم',
        description: 'تطوير مهارات العرض والتقديم الفعال',
        instructor: 'أ. منى القحطاني',
        duration: '3 أيام',
        schedule: 'الثلاثاء - الخميس - 10:00 صباحاً',
        startDate: '2024-02-15',
        seats: 15,
        registered: 8,
        location: 'مركز التدريب - الطابق الثاني'
      }
    ],
    recorded: [
      {
        id: 5,
        title: 'أساسيات تحليل البيانات',
        description: 'دورة مسجلة في أساسيات تحليل البيانات باستخدام Python',
        instructor: 'د. عبدالله الزهراني',
        duration: '8 ساعات',
        videos: 24,
        downloadable: true
      },
      {
        id: 6,
        title: 'كتابة البحث العلمي',
        description: 'دورة مسجلة شاملة في كتابة البحث العلمي',
        instructor: 'د. فاطمة النمر',
        duration: '6 ساعات',
        videos: 18,
        downloadable: true
      },
      {
        id: 7,
        title: 'مهارات التفكير النقدي',
        description: 'تطوير مهارات التفكير النقدي والتحليلي',
        instructor: 'د. محمد الغامدي',
        duration: '5 ساعات',
        videos: 15,
        downloadable: false
      }
    ]
  };

  const renderCourseCard = (course, type) => {
    const isRemote = type === 'remote';
    const isInPerson = type === 'inPerson';
    const isRecorded = type === 'recorded';

    return (
      <div key={course.id} className="course-card">
        <div className="course-header">
          <h3>{course.title}</h3>
          <span className={`course-type ${type}`}>
            {isRemote && '🌐 عن بُعد'}
            {isInPerson && '🏫 حضوري'}
            {isRecorded && '📹 مسجل'}
          </span>
        </div>

        <p className="course-description">{course.description}</p>

        <div className="course-info">
          <div className="info-item">
            <strong>المحاضر:</strong>
            <span>{course.instructor}</span>
          </div>

          <div className="info-item">
            <strong>المدة:</strong>
            <span>{course.duration}</span>
          </div>

          {course.schedule && (
            <div className="info-item">
              <strong>المواعيد:</strong>
              <span>{course.schedule}</span>
            </div>
          )}

          {course.startDate && (
            <div className="info-item">
              <strong>تاريخ البدء:</strong>
              <span>{new Date(course.startDate).toLocaleDateString('ar-SA')}</span>
            </div>
          )}

          {course.platform && (
            <div className="info-item">
              <strong>المنصة:</strong>
              <span>{course.platform}</span>
            </div>
          )}

          {course.location && (
            <div className="info-item">
              <strong>المكان:</strong>
              <span>{course.location}</span>
            </div>
          )}

          {course.videos && (
            <div className="info-item">
              <strong>عدد الفيديوهات:</strong>
              <span>{course.videos} فيديو</span>
            </div>
          )}

          {course.seats && (
            <div className="seats-info">
              <div className="seats-bar">
                <div
                  className="seats-filled"
                  style={{width: `${(course.registered / course.seats) * 100}%`}}
                ></div>
              </div>
              <span className="seats-text">
                {course.registered} / {course.seats} مقعد
              </span>
            </div>
          )}
        </div>

        <div className="course-actions">
          {isRecorded ? (
            <>
              <button className="btn btn-primary">
                مشاهدة الآن
              </button>
              {course.downloadable && (
                <button className="btn btn-secondary">
                  تحميل المحتوى
                </button>
              )}
            </>
          ) : (
            <>
              <button className="btn btn-primary">
                التسجيل في الدورة
              </button>
              <button className="btn btn-secondary">
                التفاصيل
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="courses-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <Link to="/excellence" className="back-link">
            ← العودة إلى مبادرة التفوق المستمر
          </Link>
          <h1>الدورات التعليمية</h1>
          <p>اختر من بين مجموعة واسعة من الدورات المصممة لدعم تفوقك الأكاديمي</p>
        </div>

        {/* Tabs */}
        <div className="courses-tabs">
          <button
            className={`tab ${activeTab === 'remote' ? 'active' : ''}`}
            onClick={() => setActiveTab('remote')}
          >
            🌐 دورات عن بُعد
          </button>
          <button
            className={`tab ${activeTab === 'inPerson' ? 'active' : ''}`}
            onClick={() => setActiveTab('inPerson')}
          >
            🏫 دورات حضورية
          </button>
          <button
            className={`tab ${activeTab === 'recorded' ? 'active' : ''}`}
            onClick={() => setActiveTab('recorded')}
          >
            📹 دورات مسجلة
          </button>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {activeTab === 'remote' && courses.remote.map(course => renderCourseCard(course, 'remote'))}
          {activeTab === 'inPerson' && courses.inPerson.map(course => renderCourseCard(course, 'inPerson'))}
          {activeTab === 'recorded' && courses.recorded.map(course => renderCourseCard(course, 'recorded'))}
        </div>

        {/* Info Section */}
        <div className="courses-info">
          <h2>معلومات هامة</h2>
          <div className="info-cards">
            <div className="info-card">
              <h3>📝 التسجيل</h3>
              <p>يمكنك التسجيل في الدورات من خلال الضغط على زر "التسجيل في الدورة"</p>
            </div>
            <div className="info-card">
              <h3>🎓 الشهادات</h3>
              <p>يحصل المتدرب على شهادة حضور معتمدة عند إكمال الدورة بنجاح</p>
            </div>
            <div className="info-card">
              <h3>💬 الدعم</h3>
              <p>فريق الدعم متاح للإجابة على استفساراتك طوال فترة الدورة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
