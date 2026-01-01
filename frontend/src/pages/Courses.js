import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import axios from 'axios';
import './Courses.css';

const Courses = () => {
  const { token } = useAuth();
  const { showError, showSuccess } = useToast();
  const [activeTab, setActiveTab] = useState('remote');
  const [loading, setLoading] = useState(true);
  const [coursesData, setCoursesData] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/courses`);
      setCoursesData(response.data.data || []);
    } catch (err) {
      showError(err.response?.data?.message || 'حدث خطأ في جلب الدورات');
    } finally {
      setLoading(false);
    }
  };

  // تصنيف الدورات حسب النوع
  const remoteCourses = coursesData.filter(c => c.type === 'remote');
  const inPersonCourses = coursesData.filter(c => c.type === 'inPerson');
  const recordedCourses = coursesData.filter(c => c.type === 'recorded');

  const renderCourseCard = (course) => {
    const isRemote = course.type === 'remote';
    const isInPerson = course.type === 'inPerson';
    const isRecorded = course.type === 'recorded';
    const enrolledCount = course.enrolledCount || 0;
    const isFull = course.seats && enrolledCount >= course.seats;

    return (
      <div key={course._id} className="course-card">
        <div className="course-header">
          <h3>{course.title}</h3>
          <span className={`course-type ${course.type}`}>
            {isRemote && '🌐 عن بُعد'}
            {isInPerson && '🏫 حضوري'}
            {isRecorded && '📹 مسجل'}
          </span>
        </div>

        <p className="course-description">{course.description}</p>

        <div className="course-info">
          {course.instructor && (
            <div className="info-item">
              <strong>المحاضر:</strong>
              <span>{course.instructor}</span>
            </div>
          )}

          {course.duration && (
            <div className="info-item">
              <strong>المدة:</strong>
              <span>{course.duration}</span>
            </div>
          )}

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

          {course.price !== undefined && (
            <div className="info-item">
              <strong>السعر:</strong>
              <span>{course.price === 0 ? 'مجاني' : `${course.price} ريال`}</span>
            </div>
          )}

          {course.seats && (
            <div className="seats-info">
              <div className="seats-bar">
                <div
                  className="seats-filled"
                  style={{width: `${(enrolledCount / course.seats) * 100}%`}}
                ></div>
              </div>
              <span className="seats-text">
                {enrolledCount} / {course.seats} مقعد
              </span>
            </div>
          )}
        </div>

        <div className="course-actions">
          {isRecorded ? (
            <button className="btn btn-primary btn-block">
              مشاهدة الآن
            </button>
          ) : (
            <button
              className="btn btn-primary btn-block"
              disabled={isFull}
            >
              {isFull ? 'المقاعد ممتلئة' : 'التسجيل في الدورة'}
            </button>
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
            العودة إلى ← مبادرة التفوق المستمر
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
        {loading ? (
          <div className="loading-spinner">جاري التحميل...</div>
        ) : (
          <>
            <div className="courses-grid">
              {activeTab === 'remote' && remoteCourses.map(course => renderCourseCard(course))}
              {activeTab === 'inPerson' && inPersonCourses.map(course => renderCourseCard(course))}
              {activeTab === 'recorded' && recordedCourses.map(course => renderCourseCard(course))}
            </div>

            {/* Empty State */}
            {((activeTab === 'remote' && remoteCourses.length === 0) ||
              (activeTab === 'inPerson' && inPersonCourses.length === 0) ||
              (activeTab === 'recorded' && recordedCourses.length === 0)) && (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3>لا توجد دورات في هذا القسم حالياً</h3>
                <p>سيتم إضافة دورات جديدة قريباً</p>
              </div>
            )}
          </>
        )}

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
