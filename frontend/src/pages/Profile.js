import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('info');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    studentId: user?.studentId || '',
    major: user?.major || '',
    university: user?.university || '',
    bio: user?.bio || ''
  });
  const [userStats, setUserStats] = useState({
    uploadedFiles: 0,
    downloads: 0,
    enrolledCourses: 0,
    completedCourses: 0,
    achievements: 0,
    points: 0
  });
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/users/stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserStats(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/api/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // تحديث بيانات المستخدم في السياق
        localStorage.setItem('user', JSON.stringify(response.data.user));
        alert('تم تحديث الملف الشخصي بنجاح');
        setIsEditing(false);
        window.location.reload(); // إعادة تحميل الصفحة لتحديث البيانات
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('حدث خطأ في تحديث الملف الشخصي');
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <h2>يرجى تسجيل الدخول أولاً</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Cover & Avatar Section */}
        <div className="profile-cover">
          <div className="cover-gradient"></div>
          <div className="profile-avatar-section">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-large">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <div className="avatar-placeholder-large">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                <div className="avatar-status-indicator"></div>
              </div>
              <div className="profile-info-header">
                <h1 className="profile-name">{user.name}</h1>
                <p className="profile-email">{user.email}</p>
                <div className="profile-badges">
                  <span className={`role-badge-new ${user.role}`}>
                    {user.role === 'admin' ? 'مدير المنصة' : 'طالب'}
                  </span>
                  {user.isActive && <span className="status-badge-new">نشط</span>}
                </div>
              </div>
            </div>

            {!isEditing && (
              <button
                className="btn-edit-profile"
                onClick={() => setIsEditing(true)}
              >
                تعديل الملف الشخصي
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="profile-stats-grid">
          <div className="stat-card-profile">
            <div className="stat-icon-wrapper">
              <div className="stat-number-profile">{userStats.uploadedFiles}</div>
            </div>
            <div className="stat-label-profile">ملف مرفوع</div>
          </div>
          <div className="stat-card-profile">
            <div className="stat-icon-wrapper">
              <div className="stat-number-profile">{userStats.downloads}</div>
            </div>
            <div className="stat-label-profile">تحميل</div>
          </div>
          <div className="stat-card-profile">
            <div className="stat-icon-wrapper">
              <div className="stat-number-profile">{userStats.enrolledCourses}</div>
            </div>
            <div className="stat-label-profile">دورة مسجلة</div>
          </div>
          <div className="stat-card-profile">
            <div className="stat-icon-wrapper">
              <div className="stat-number-profile">{userStats.points}</div>
            </div>
            <div className="stat-label-profile">نقطة</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="profile-tabs">
          <button
            className={`profile-tab ${activeSection === 'info' ? 'active' : ''}`}
            onClick={() => setActiveSection('info')}
          >
            المعلومات الشخصية
          </button>
          <button
            className={`profile-tab ${activeSection === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveSection('activity')}
          >
            النشاطات
          </button>
          <button
            className={`profile-tab ${activeSection === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveSection('achievements')}
          >
            الإنجازات
          </button>
        </div>

        {/* Content Section */}
        <div className="profile-content-card">{activeSection === 'info' && (

        <div className="profile-body">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>الاسم</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>الرقم الجامعي</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>التخصص</label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>الجامعة</label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>نبذة عني</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  maxLength="500"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  حفظ التغييرات
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  إلغاء
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-section">
                <h3>المعلومات الأساسية</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">الاسم:</span>
                    <span className="info-value">{user.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">البريد الإلكتروني:</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">الرقم الجامعي:</span>
                    <span className="info-value">{user.studentId || 'غير محدد'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">التخصص:</span>
                    <span className="info-value">{user.major || 'غير محدد'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">الجامعة:</span>
                    <span className="info-value">{user.university || 'غير محددة'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">الحالة:</span>
                    <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                      {user.isActive ? 'نشط' : 'معطل'}
                    </span>
                  </div>
                </div>
              </div>

              {user.bio && (
                <div className="info-section">
                  <h3>نبذة عني</h3>
                  <p className="bio-text">{user.bio}</p>
                </div>
              )}

              <div className="info-section">
                <h3>معلومات الحساب</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">تاريخ التسجيل:</span>
                    <span className="info-value">
                      {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">نوع الحساب:</span>
                    <span className="info-value">
                      {user.role === 'admin' ? 'مدير' : 'طالب'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
        )}

        {activeSection === 'activity' && (
          <div className="activity-section">
            <h3 className="section-title-profile">النشاطات الأخيرة</h3>
            <div className="activity-timeline">
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <h4>رفع ملف جديد</h4>
                  <p>تم رفع ملف "محاضرة 5 - قواعد البيانات"</p>
                  <span className="activity-time">منذ ساعتين</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <h4>التسجيل في دورة</h4>
                  <p>تم التسجيل في دورة "تطوير تطبيقات الويب"</p>
                  <span className="activity-time">منذ 5 ساعات</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <h4>تحميل ملف</h4>
                  <p>تم تحميل "ملخص مادة الخوارزميات"</p>
                  <span className="activity-time">منذ يوم</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'achievements' && (
          <div className="achievements-section">
            <h3 className="section-title-profile">الإنجازات والشارات</h3>
            <div className="achievements-grid">
              <div className="achievement-card">
                <div className="achievement-icon gold">🏆</div>
                <h4>الملف الأول</h4>
                <p>رفع أول ملف في المنصة</p>
              </div>
              <div className="achievement-card">
                <div className="achievement-icon silver">⭐</div>
                <h4>طالب نشط</h4>
                <p>10 ملفات مرفوعة</p>
              </div>
              <div className="achievement-card">
                <div className="achievement-icon bronze">📚</div>
                <h4>متعلم دؤوب</h4>
                <p>التسجيل في 3 دورات</p>
              </div>
              <div className="achievement-card locked">
                <div className="achievement-icon">🔒</div>
                <h4>الخبير</h4>
                <p>رفع 50 ملف</p>
              </div>
            </div>

            <div className="progress-section">
              <h4>مستوى التقدم</h4>
              <div className="level-bar">
                <div className="level-progress" style={{width: '65%'}}></div>
              </div>
              <p className="level-text">المستوى 3 - 650/1000 نقطة للمستوى التالي</p>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
