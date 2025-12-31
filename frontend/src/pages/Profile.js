import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    studentId: user?.studentId || '',
    major: user?.major || '',
    university: user?.university || '',
    bio: user?.bio || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: إضافة API call لتحديث البيانات
    console.log('Update profile:', formData);
    setIsEditing(false);
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
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>
          <div className="profile-header-info">
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <span className={`role-badge ${user.role}`}>
              {user.role === 'admin' ? 'مدير' : 'طالب'}
            </span>
          </div>
        </div>

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

              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                تعديل البيانات
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
