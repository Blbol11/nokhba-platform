const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require('../models/File');
const { protect } = require('../middleware/auth');

// إعداد Multer لرفع الملفات
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB default
  },
  fileFilter: function (req, file, cb) {
    // السماح بأنواع الملفات الشائعة
    const allowedTypes = /pdf|doc|docx|ppt|pptx|xls|xlsx|txt|jpg|jpeg|png|zip|rar/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('نوع الملف غير مدعوم'));
    }
  }
});

// @route   POST /api/files/upload
// @desc    رفع ملف جديد
// @access  Private
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'الرجاء اختيار ملف'
      });
    }

    const { title, description, category, subject, tags } = req.body;

    const file = await File.create({
      title: title || req.file.originalname,
      description,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      category,
      subject,
      tags: tags ? JSON.parse(tags) : [],
      uploadedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'تم رفع الملف بنجاح',
      file
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء رفع الملف',
      error: error.message
    });
  }
});

// @route   GET /api/files
// @desc    الحصول على جميع الملفات
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, subject, search, page = 1, limit = 10 } = req.query;

    const query = { isPublic: true };

    if (category) query.category = category;
    if (subject) query.subject = new RegExp(subject, 'i');
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') }
      ];
    }

    const files = await File.find(query)
      .populate('uploadedBy', 'name email studentId')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await File.countDocuments(query);

    res.json({
      success: true,
      files,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ'
    });
  }
});

// @route   GET /api/files/:id
// @desc    الحصول على ملف محدد
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id)
      .populate('uploadedBy', 'name email studentId major university');

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'الملف غير موجود'
      });
    }

    // زيادة عدد المشاهدات
    file.views += 1;
    await file.save();

    res.json({
      success: true,
      file
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ'
    });
  }
});

// @route   GET /api/files/download/:id
// @desc    تحميل ملف
// @access  Public
router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'الملف غير موجود'
      });
    }

    // زيادة عدد التحميلات
    file.downloads += 1;
    await file.save();

    res.download(file.filePath, file.fileName);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء التحميل'
    });
  }
});

// @route   DELETE /api/files/:id
// @desc    حذف ملف
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'الملف غير موجود'
      });
    }

    // التحقق من أن المستخدم هو من رفع الملف أو أدمن
    if (file.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بحذف هذا الملف'
      });
    }

    // حذف الملف من السيرفر
    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);
    }

    await file.deleteOne();

    res.json({
      success: true,
      message: 'تم حذف الملف بنجاح'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء حذف الملف'
    });
  }
});

// @route   GET /api/files/user/my-files
// @desc    الحصول على ملفات المستخدم
// @access  Private
router.get('/user/my-files', protect, async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      files
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ'
    });
  }
});

module.exports = router;
