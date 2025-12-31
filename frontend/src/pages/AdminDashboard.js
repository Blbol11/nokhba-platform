import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (user?.role !== 'admin') {
      setError('ليس لديك صلاحيات الوصول لهذه الصفحة');
      setLoading(false);
      return;
    }
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في جلب البيانات');
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في جلب المستخدمين');
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/files`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFiles(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في جلب الملفات');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'users' && users.length === 0) {
      fetchUsers();
    } else if (tab === 'files' && files.length === 0) {
      fetchFiles();
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/users/${userId}/status`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'حدث خطأ');
    }
  };

  const changeUserRole = async (userId, newRole) => {
    if (!window.confirm('هل أنت متأكد من تغيير الصلاحية؟')) return;

    try {
      await axios.put(
        `${API_URL}/api/admin/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'حدث خطأ');
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

    try {
      await axios.delete(`${API_URL}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'حدث خطأ');
    }
  };

  const deleteFile = async (fileId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الملف؟')) return;

    try {
      await axios.delete(`${API_URL}/api/admin/files/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFiles();
    } catch (err) {
      alert(err.response?.data?.message || 'حدث خطأ');
    }
  };

  if (loading) {
    return <div className="admin-loading">جاري التحميل...</div>;
  }

  if (error && !stats) {
    return <div className="admin-error">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>لوحة تحكم المدير</h1>
        <p>مرحباً، {user?.name}</p>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => handleTabChange('dashboard')}
        >
          الإحصائيات
        </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => handleTabChange('users')}
        >
          المستخدمين
        </button>
        <button
          className={activeTab === 'files' ? 'active' : ''}
          onClick={() => handleTabChange('files')}
        >
          الملفات
        </button>
      </div>

      {activeTab === 'dashboard' && stats && (
        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>إجمالي المستخدمين</h3>
              <p className="stat-number">{stats.stats.totalUsers}</p>
            </div>
            <div className="stat-card">
              <h3>إجمالي الملفات</h3>
              <p className="stat-number">{stats.stats.totalFiles}</p>
            </div>
            <div className="stat-card">
              <h3>الطلاب</h3>
              <p className="stat-number">{stats.stats.totalStudents}</p>
            </div>
            <div className="stat-card">
              <h3>المدراء</h3>
              <p className="stat-number">{stats.stats.totalAdmins}</p>
            </div>
            <div className="stat-card">
              <h3>المستخدمين النشطين</h3>
              <p className="stat-number">{stats.stats.activeUsers}</p>
            </div>
          </div>

          <div className="recent-section">
            <h2>آخر المستخدمين</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>البريد الإلكتروني</th>
                  <th>الدور</th>
                  <th>تاريخ التسجيل</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role === 'admin' ? 'مدير' : 'طالب'}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString('ar')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="recent-section">
            <h2>آخر الملفات</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>اسم الملف</th>
                  <th>رافع الملف</th>
                  <th>الحجم</th>
                  <th>تاريخ الرفع</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentFiles.map((file) => (
                  <tr key={file._id}>
                    <td>{file.title || file.filename}</td>
                    <td>{file.uploadedBy?.name || 'غير معروف'}</td>
                    <td>{(file.size / 1024).toFixed(2)} KB</td>
                    <td>{new Date(file.createdAt).toLocaleDateString('ar')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="users-content">
          <h2>إدارة المستخدمين</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>الدور</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <select
                      value={u.role}
                      onChange={(e) => changeUserRole(u._id, e.target.value)}
                      className="role-select"
                    >
                      <option value="student">طالب</option>
                      <option value="admin">مدير</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className={`status-btn ${u.isActive ? 'active' : 'inactive'}`}
                      onClick={() => toggleUserStatus(u._id, u.isActive)}
                    >
                      {u.isActive ? 'نشط' : 'معطل'}
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(u._id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'files' && (
        <div className="files-content">
          <h2>إدارة الملفات</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>اسم الملف</th>
                <th>رافع الملف</th>
                <th>الحجم</th>
                <th>تاريخ الرفع</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file._id}>
                  <td>{file.title || file.filename}</td>
                  <td>{file.uploadedBy?.name || 'غير معروف'}</td>
                  <td>{(file.size / 1024).toFixed(2)} KB</td>
                  <td>{new Date(file.createdAt).toLocaleDateString('ar')}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteFile(file._id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
