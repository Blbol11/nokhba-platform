import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SubPage.css';

const Enrichment = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // محتوى تجريبي
  const content = {
    videos: [
      {
        id: 1,
        title: 'مهارات التفكير النقدي والإبداعي',
        description: 'سلسلة فيديوهات تعليمية عن تطوير مهارات التفكير',
        duration: '45 دقيقة',
        lessons: 8,
        category: 'مهارات',
        thumbnail: '🎥',
        level: 'متوسط'
      },
      {
        id: 2,
        title: 'أساسيات البحث العلمي',
        description: 'دورة شاملة في منهجية البحث العلمي',
        duration: '1 ساعة و 20 دقيقة',
        lessons: 12,
        category: 'بحث علمي',
        thumbnail: '📹',
        level: 'مبتدئ'
      },
      {
        id: 3,
        title: 'الذكاء العاطفي والقيادة',
        description: 'تطوير مهارات الذكاء العاطفي والقيادة الفعالة',
        duration: '55 دقيقة',
        lessons: 10,
        category: 'قيادة',
        thumbnail: '🎬',
        level: 'متقدم'
      }
    ],
    pdfs: [
      {
        id: 4,
        title: 'دليل كتابة البحث العلمي',
        description: 'دليل شامل لكتابة البحث العلمي بطريقة احترافية',
        pages: 85,
        category: 'بحث علمي',
        size: '2.5 MB',
        thumbnail: '📄'
      },
      {
        id: 5,
        title: 'مهارات إدارة الوقت',
        description: 'كتيب عملي لتحسين مهارات إدارة الوقت',
        pages: 42,
        category: 'مهارات',
        size: '1.8 MB',
        thumbnail: '📋'
      },
      {
        id: 6,
        title: 'استراتيجيات التعلم الفعال',
        description: 'أساليب وتقنيات التعلم الفعال والمثمر',
        pages: 65,
        category: 'تعليم',
        size: '3.2 MB',
        thumbnail: '📚'
      }
    ],
    materials: [
      {
        id: 7,
        title: 'حقيبة تدريبية: مهارات العرض والتقديم',
        description: 'حقيبة تدريبية متكاملة لتطوير مهارات العرض',
        type: 'حقيبة تدريبية',
        category: 'مهارات',
        files: 15,
        thumbnail: '💼'
      },
      {
        id: 8,
        title: 'قوالب وأدوات البحث العلمي',
        description: 'مجموعة من القوالب والأدوات المساعدة للباحثين',
        type: 'أدوات',
        category: 'بحث علمي',
        files: 8,
        thumbnail: '🛠️'
      }
    ]
  };

  const categories = ['الكل', 'مهارات', 'بحث علمي', 'قيادة', 'تعليم'];

  const filterContent = (items) => {
    if (selectedCategory === 'all' || selectedCategory === 'الكل') {
      return items;
    }
    return items.filter(item => item.category === selectedCategory);
  };

  return (
    <div className="enrichment-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <Link to="/excellence" className="back-link">
            ← العودة إلى مبادرة التفوق المستمر
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
        <section className="content-section">
          <h2 className="section-title">
            <span className="section-icon">🎥</span>
            الفيديوهات التعليمية
          </h2>
          <div className="content-grid">
            {filterContent(content.videos).map(video => (
              <div key={video.id} className="content-card video-card">
                <div className="card-thumbnail">{video.thumbnail}</div>
                <div className="card-content">
                  <span className="content-badge">{video.category}</span>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>

                  <div className="content-meta">
                    <span>⏱️ {video.duration}</span>
                    <span>📚 {video.lessons} دروس</span>
                    <span className={`level-badge ${video.level}`}>{video.level}</span>
                  </div>

                  <button className="btn btn-primary btn-block">
                    مشاهدة الدورة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PDFs Section */}
        <section className="content-section">
          <h2 className="section-title">
            <span className="section-icon">📄</span>
            ملفات PDF
          </h2>
          <div className="content-grid">
            {filterContent(content.pdfs).map(pdf => (
              <div key={pdf.id} className="content-card pdf-card">
                <div className="card-thumbnail">{pdf.thumbnail}</div>
                <div className="card-content">
                  <span className="content-badge">{pdf.category}</span>
                  <h3>{pdf.title}</h3>
                  <p>{pdf.description}</p>

                  <div className="content-meta">
                    <span>📖 {pdf.pages} صفحة</span>
                    <span>💾 {pdf.size}</span>
                  </div>

                  <div className="card-actions">
                    <button className="btn btn-primary">
                      عرض
                    </button>
                    <button className="btn btn-secondary">
                      تحميل
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Materials Section */}
        <section className="content-section">
          <h2 className="section-title">
            <span className="section-icon">📦</span>
            مواد داعمة
          </h2>
          <div className="content-grid">
            {filterContent(content.materials).map(material => (
              <div key={material.id} className="content-card material-card">
                <div className="card-thumbnail">{material.thumbnail}</div>
                <div className="card-content">
                  <span className="content-badge">{material.category}</span>
                  <h3>{material.title}</h3>
                  <p>{material.description}</p>

                  <div className="content-meta">
                    <span>📁 {material.type}</span>
                    <span>📄 {material.files} ملفات</span>
                  </div>

                  <button className="btn btn-primary btn-block">
                    تحميل الحزمة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

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
