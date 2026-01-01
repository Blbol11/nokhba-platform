import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import axios from 'axios';
import './Enrichment.css';

const Enrichment = () => {
  const { token } = useAuth();
  const { showError } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [enrichmentData, setEnrichmentData] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchEnrichmentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEnrichmentData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/enrichment`);
      setEnrichmentData(response.data.data || []);
    } catch (err) {
      showError(err.response?.data?.message || 'حدث خطأ في جلب المحتوى الإثرائي');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['الكل', 'مهارات', 'بحث علمي', 'قيادة', 'تعليم'];

  const filterByCategory = (items) => {
    if (selectedCategory === 'all' || selectedCategory === 'الكل') {
      return items;
    }
    return items.filter(item => item.category === selectedCategory);
  };

  // تصنيف المحتوى حسب النوع
  const videos = enrichmentData.filter(item => item.type === 'video');
  const pdfs = enrichmentData.filter(item => item.type === 'pdf');
  const materials = enrichmentData.filter(item => item.type === 'material');

  const getThumbnail = (type) => {
    switch(type) {
      case 'video': return '🎥';
      case 'pdf': return '📄';
      case 'material': return '💼';
      default: return '📦';
    }
  };

  return (
    <div className="enrichment-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <Link to="/excellence" className="back-link">
            العودة إلى ← مبادرة التفوق المستمر
          </Link>
          <h1>الدروس الإثرائية</h1>
          <p>محتوى إثرائي متنوع يشمل فيديوهات تعليمية، ملفات PDF، ومواد داعمة للتعلّم والتفوق</p>
        </div>

        {/* Categories Filter */}
        <div className="categories-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat || (selectedCategory === 'all' && cat === 'الكل') ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat === 'الكل' ? 'all' : cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Videos Section */}
        {filterByCategory(videos).length > 0 && (
          <section className="content-section">
            <h2 className="section-title">
              <span className="section-icon">🎥</span>
              الفيديوهات التعليمية
            </h2>
            {loading ? (
              <div className="loading-spinner">جاري التحميل...</div>
            ) : (
              <div className="content-grid">
                {filterByCategory(videos).map(video => (
                  <div key={video._id} className="content-card video-card">
                    <div className="card-thumbnail">{getThumbnail(video.type)}</div>
                    <div className="card-content">
                      <span className="content-badge">{video.category || 'عام'}</span>
                      <h3>{video.title}</h3>
                      <p>{video.description}</p>

                      <div className="content-meta">
                        {video.duration && <span>⏱️ {video.duration}</span>}
                        {video.level && <span className={`level-badge ${video.level}`}>{video.level}</span>}
                        <span>👁️ {video.views || 0} مشاهدة</span>
                      </div>

                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-block"
                      >
                        مشاهدة الدورة
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* PDFs Section */}
        {filterByCategory(pdfs).length > 0 && (
          <section className="content-section">
            <h2 className="section-title">
              <span className="section-icon">📄</span>
              ملفات PDF
            </h2>
            {loading ? (
              <div className="loading-spinner">جاري التحميل...</div>
            ) : (
              <div className="content-grid">
                {filterByCategory(pdfs).map(pdf => (
                  <div key={pdf._id} className="content-card pdf-card">
                    <div className="card-thumbnail">{getThumbnail(pdf.type)}</div>
                    <div className="card-content">
                      <span className="content-badge">{pdf.category || 'عام'}</span>
                      <h3>{pdf.title}</h3>
                      <p>{pdf.description}</p>

                      <div className="content-meta">
                        {pdf.level && <span className={`level-badge ${pdf.level}`}>{pdf.level}</span>}
                        <span>📥 {pdf.downloads || 0} تحميل</span>
                      </div>

                      <div className="card-actions">
                        <a
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          عرض
                        </a>
                        <a
                          href={pdf.url}
                          download
                          className="btn btn-secondary"
                        >
                          تحميل
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Materials Section */}
        {filterByCategory(materials).length > 0 && (
          <section className="content-section">
            <h2 className="section-title">
              <span className="section-icon">📦</span>
              مواد داعمة
            </h2>
            {loading ? (
              <div className="loading-spinner">جاري التحميل...</div>
            ) : (
              <div className="content-grid">
                {filterByCategory(materials).map(material => (
                  <div key={material._id} className="content-card material-card">
                    <div className="card-thumbnail">{getThumbnail(material.type)}</div>
                    <div className="card-content">
                      <span className="content-badge">{material.category || 'عام'}</span>
                      <h3>{material.title}</h3>
                      <p>{material.description}</p>

                      <div className="content-meta">
                        {material.level && <span className={`level-badge ${material.level}`}>{material.level}</span>}
                        <span>📥 {material.downloads || 0} تحميل</span>
                      </div>

                      <a
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-block"
                      >
                        تحميل الحزمة
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Empty State */}
        {!loading && enrichmentData.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>لا يوجد محتوى إثرائي حالياً</h3>
            <p>سيتم إضافة محتوى إثرائي قريباً</p>
          </div>
        )}

        {/* Benefits Section */}
        <section className="benefits-section">
          <h2 className="section-title">فوائد المحتوى الإثرائي</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">🎯</span>
              <h3>تعزيز المعرفة</h3>
              <p>محتوى إثرائي يوسع آفاقك المعرفية</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">⚡</span>
              <h3>التعلم الذاتي</h3>
              <p>تعلم بالسرعة التي تناسبك</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🏆</span>
              <h3>تطوير المهارات</h3>
              <p>مهارات عملية قابلة للتطبيق</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📱</span>
              <h3>وصول سهل</h3>
              <p>محتوى متاح في أي وقت ومكان</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Enrichment;
