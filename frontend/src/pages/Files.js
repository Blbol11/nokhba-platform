import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getFiles, uploadFile, downloadFile, deleteFile } from '../services/fileService';
import './Files.css';

const Files = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: 'أخرى',
    subject: '',
    file: null
  });

  const categories = ['محاضرات', 'واجبات', 'مشاريع', 'كتب', 'ملخصات', 'أخرى'];

  useEffect(() => {
    fetchFiles();
  }, [searchTerm, selectedCategory]);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory) params.category = selectedCategory;

      const data = await getFiles(params);
      setFiles(data.files);
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setUploadData({ ...uploadData, file: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    setUploadData({ ...uploadData, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!uploadData.file) {
      setMessage({ type: 'danger', text: 'الرجاء اختيار ملف' });
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadData.file);
    formData.append('title', uploadData.title);
    formData.append('description', uploadData.description);
    formData.append('category', uploadData.category);
    formData.append('subject', uploadData.subject);

    try {
      setUploading(true);
      await uploadFile(formData);
      setMessage({ type: 'success', text: 'تم رفع الملف بنجاح' });
      setShowUploadModal(false);
      setUploadData({
        title: '',
        description: '',
        category: 'أخرى',
        subject: '',
        file: null
      });
      fetchFiles();
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الملف؟')) return;

    try {
      await deleteFile(id);
      setMessage({ type: 'success', text: 'تم حذف الملف بنجاح' });
      fetchFiles();
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="files-page">
      <div className="container">
        <div className="files-header">
          <h1>مكتبة الملفات</h1>
          {isAuthenticated && (
            <button
              className="btn btn-primary"
              onClick={() => setShowUploadModal(true)}
            >
              + رفع ملف جديد
            </button>
          )}
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="files-filters">
          <input
            type="text"
            className="form-control search-input"
            placeholder="ابحث عن ملف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="form-control category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">جميع التصنيفات</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : files.length === 0 ? (
          <div className="no-files">
            <p>لا توجد ملفات متاحة حالياً</p>
          </div>
        ) : (
          <div className="files-grid">
            {files.map(file => (
              <div key={file._id} className="file-card">
                <div className="file-header">
                  <span className="file-category">{file.category}</span>
                  <span className="file-size">{formatFileSize(file.fileSize)}</span>
                </div>

                <h3 className="file-title">{file.title}</h3>

                {file.description && (
                  <p className="file-description">{file.description}</p>
                )}

                {file.subject && (
                  <div className="file-subject">
                    <strong>المادة:</strong> {file.subject}
                  </div>
                )}

                <div className="file-meta">
                  <div className="file-uploader">
                    <strong>رفع بواسطة:</strong> {file.uploadedBy?.name}
                  </div>
                  <div className="file-date">{formatDate(file.createdAt)}</div>
                </div>

                <div className="file-stats">
                  <span>👁️ {file.views} مشاهدة</span>
                  <span>📥 {file.downloads} تحميل</span>
                </div>

                <div className="file-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => downloadFile(file._id, file.fileName)}
                  >
                    تحميل
                  </button>

                  {isAuthenticated && user?.id === file.uploadedBy?._id && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(file._id)}
                    >
                      حذف
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showUploadModal && (
          <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>رفع ملف جديد</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowUploadModal(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleUpload}>
                <div className="form-group">
                  <label className="form-label">عنوان الملف *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={uploadData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">الوصف</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="3"
                    value={uploadData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">التصنيف *</label>
                  <select
                    name="category"
                    className="form-control"
                    value={uploadData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">المادة</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    value={uploadData.subject}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">الملف *</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    required
                  />
                  <small>الحد الأقصى للحجم: 10 ميجابايت</small>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowUploadModal(false)}
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={uploading}
                  >
                    {uploading ? 'جاري الرفع...' : 'رفع الملف'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Files;
