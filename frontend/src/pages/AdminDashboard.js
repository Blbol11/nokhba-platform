import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const { showSuccess, showError } = useToast();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [enrichment, setEnrichment] = useState([]);
  const [courses, setCourses] = useState([]);
  const [research, setResearch] = useState([]);
  const [inquiries, setInquiries] = useState([]);
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

  const fetchEnrichment = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/enrichment`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnrichment(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في جلب محتوى الإثراء');
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في جلب الدورات');
    }
  };

  const fetchResearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/research`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResearch(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في جلب طلبات الدعم البحثي');
    }
  };

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/inquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في جلب الاستفسارات');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'users' && users.length === 0) {
      fetchUsers();
    } else if (tab === 'files' && files.length === 0) {
      fetchFiles();
    } else if (tab === 'enrichment' && enrichment.length === 0) {
      fetchEnrichment();
    } else if (tab === 'courses' && courses.length === 0) {
      fetchCourses();
    } else if (tab === 'research' && research.length === 0) {
      fetchResearch();
    } else if (tab === 'inquiries' && inquiries.length === 0) {
      fetchInquiries();
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/users/${userId}/status`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showSuccess('تم تحديث حالة المستخدم بنجاح');
      fetchUsers();
    } catch (err) {
      showError(err.response?.data?.message || 'حدث خطأ في تحديث الحالة');
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
      showSuccess('تم تغيير صلاحية المستخدم بنجاح');
      fetchUsers();
    } catch (err) {
      showError(err.response?.data?.message || 'حدث خطأ في تغيير الصلاحية');
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

    try {
      await axios.delete(`${API_URL}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSuccess('تم حذف المستخدم بنجاح');
      fetchUsers();
    } catch (err) {
      showError(err.response?.data?.message || 'حدث خطأ في حذف المستخدم');
    }
  };

  const deleteFile = async (fileId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الملف؟')) return;

    try {
      await axios.delete(`${API_URL}/api/admin/files/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSuccess('تم حذف الملف بنجاح');
      fetchFiles();
    } catch (err) {
      showError(err.response?.data?.message || 'حدث خطأ في حذف الملف');
    }
  };

  const deleteEnrichment = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المحتوى؟')) return;

    try {
      await axios.delete(`${API_URL}/api/enrichment/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSuccess('تم حذف المحتوى بنجاح');
      fetchEnrichment();
    } catch (err) {
      showError(err.response?.data?.message || 'حدث خطأ في حذف المحتوى');
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الدورة؟')) return;

    try {
      await axios.delete(`${API_URL}/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSuccess('تم حذف الدورة بنجاح');
      fetchCourses();
    } catch (err) {
      showError(err.response?.data?.message || 'حدث خطأ في حذف الدورة');
    }
  };

  const deleteResearch = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;

    try {
      await axios.delete(`${API_URL}/api/research/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSuccess('تم حذف الطلب بنجاح');
      fetchResearch();
    } catch (err) {
      showError(err.response?.data?.message || 'حدث خطأ في حذف الطلب');
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الاستفسار؟')) return;

    try {
      await axios.delete(`${API_URL}/api/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSuccess('تم حذف الاستفسار بنجاح');
      fetchInquiries();
    } catch (err) {
      showError(err.response?.data?.message || 'حدث خطأ في حذف الاستفسار');
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
        <button
          className={activeTab === 'enrichment' ? 'active' : ''}
          onClick={() => handleTabChange('enrichment')}
        >
          محتوى الإثراء
        </button>
        <button
          className={activeTab === 'courses' ? 'active' : ''}
          onClick={() => handleTabChange('courses')}
        >
          الدورات
        </button>
        <button
          className={activeTab === 'research' ? 'active' : ''}
          onClick={() => handleTabChange('research')}
        >
          الدعم البحثي
        </button>
        <button
          className={activeTab === 'inquiries' ? 'active' : ''}
          onClick={() => handleTabChange('inquiries')}
        >
          الاستفسارات
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

      {activeTab === 'enrichment' && (
        <div className="enrichment-content">
          <h2>إدارة محتوى الإثراء</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>العنوان</th>
                <th>النوع</th>
                <th>المستوى</th>
                <th>المشاهدات</th>
                <th>التحميلات</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {enrichment.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.type === 'video' ? 'فيديو' : item.type === 'pdf' ? 'PDF' : 'مادة'}</td>
                  <td>{item.level || '-'}</td>
                  <td>{item.views || 0}</td>
                  <td>{item.downloads || 0}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteEnrichment(item._id)}
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

      {activeTab === 'courses' && (
        <div className="courses-content">
          <h2>إدارة الدورات</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>العنوان</th>
                <th>النوع</th>
                <th>المدة</th>
                <th>المقاعد</th>
                <th>المسجلين</th>
                <th>السعر</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>
                    {course.type === 'remote' ? 'عن بعد' :
                     course.type === 'inPerson' ? 'حضوري' : 'مسجل'}
                  </td>
                  <td>{course.duration}</td>
                  <td>{course.seats}</td>
                  <td>{course.enrolledCount || 0}</td>
                  <td>{course.price === 0 ? 'مجاني' : `${course.price} ريال`}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteCourse(course._id)}
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

      {activeTab === 'research' && (
        <div className="research-content">
          <h2>إدارة طلبات الدعم البحثي</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th>البريد الإلكتروني</th>
                <th>نوع البحث</th>
                <th>الموضوع</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {research.map((item) => (
                <tr key={item._id}>
                  <td>{item.student?.name}</td>
                  <td>{item.student?.email}</td>
                  <td>{item.researchType}</td>
                  <td>{item.topic}</td>
                  <td>
                    <span className={`status-badge ${item.status}`}>
                      {item.status === 'pending' ? 'قيد الانتظار' :
                       item.status === 'inProgress' ? 'قيد المعالجة' :
                       item.status === 'completed' ? 'مكتمل' : 'مرفوض'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteResearch(item._id)}
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

      {activeTab === 'inquiries' && (
        <div className="inquiries-content">
          <h2>إدارة الاستفسارات</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>الموضوع</th>
                <th>الأولوية</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry._id}>
                  <td>{inquiry.name}</td>
                  <td>{inquiry.email}</td>
                  <td>{inquiry.subject}</td>
                  <td>
                    <span className={`priority-badge ${inquiry.priority}`}>
                      {inquiry.priority === 'high' ? 'عالية' :
                       inquiry.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${inquiry.status}`}>
                      {inquiry.status === 'pending' ? 'قيد الانتظار' : 'تم الرد'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteInquiry(inquiry._id)}
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
