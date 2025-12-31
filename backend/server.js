const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv');
const path = require('path');

// تحميل متغيرات البيئة
dotenv.config();

const app = express();

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  noSniff: true,
  xssFilter: true,
  hidePoweredBy: true
}));

// Compression middleware
app.use(compression());

// إعداد CORS
const corsOptions = {
  origin: function (origin, callback) {
    // السماح بالطلبات بدون origin (مثل mobile apps أو curl)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5000',
      process.env.FRONTEND_URL,
      'https://nokhba-platform.pages.dev'
    ].filter(Boolean);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // في Development، اسمح بكل الطلبات
      if (process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// مجلد الملفات المرفوعة
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nokhba')
  .then(() => console.log('✓ تم الاتصال بقاعدة البيانات بنجاح'))
  .catch((err) => console.error('✗ خطأ في الاتصال بقاعدة البيانات:', err));

// المسارات
app.use('/api/auth', require('./routes/auth'));
app.use('/api/files', require('./routes/files'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/setup', require('./routes/setup'));
app.use('/api/enrichment', require('./routes/enrichment'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/research', require('./routes/research'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/public', require('./routes/public'));
app.use('/api/notifications', require('./routes/notifications'));

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.json({
    message: 'مرحباً بك في منصة نخبة',
    version: '1.0.0',
    status: 'running'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// معالجة الأخطاء
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'حدث خطأ في الخادم',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 الخادم يعمل على المنفذ ${PORT}`);
  console.log(`📍 الرابط: http://localhost:${PORT}`);
});
