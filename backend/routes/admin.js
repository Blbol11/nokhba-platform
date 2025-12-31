const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const File = require('../models/File');

// كل routes الأدمن تحتاج تسجيل دخول + صلاحية admin
router.use(protect);
router.use(authorize('admin'));

// إحصائيات Dashboard
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalFiles = await File.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const activeUsers = await User.countDocuments({ isActive: true });

    // آخر المستخدمين المسجلين
    const recentUsers = await User.find()
      .sort('-createdAt')
      .limit(5)
      .select('name email createdAt role');

    // آخر الملفات المرفوعة
    const recentFiles = await File.find()
      .sort('-createdAt')
      .limit(5)
      .populate('uploadedBy', 'name email');

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalFiles,
          totalStudents,
          totalAdmins,
          activeUsers
        },
        recentUsers,
        recentFiles
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الإحصائيات',
      error: error.message
    });
  }
});

// جلب كل المستخدمين
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب المستخدمين',
      error: error.message
    });
  }
});

// تحديث دور المستخدم
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;

    if (!['student', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'الدور غير صحيح'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث الدور',
      error: error.message
    });
  }
});

// تفعيل/تعطيل حساب مستخدم
router.put('/users/:id/status', async (req, res) => {
  try {
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث حالة المستخدم',
      error: error.message
    });
  }
});

// حذف مستخدم
router.delete('/users/:id', async (req, res) => {
  try {
    // منع الأدمن من حذف نفسه
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'لا يمكنك حذف حسابك الخاص'
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    // حذف ملفات المستخدم أيضاً
    await File.deleteMany({ uploadedBy: req.params.id });

    res.json({
      success: true,
      message: 'تم حذف المستخدم بنجاح'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف المستخدم',
      error: error.message
    });
  }
});

// جلب كل الملفات
router.get('/files', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const files = await File.find()
      .populate('uploadedBy', 'name email')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const total = await File.countDocuments();

    res.json({
      success: true,
      data: files,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الملفات',
      error: error.message
    });
  }
});

// حذف ملف
router.delete('/files/:id', async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'الملف غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم حذف الملف بنجاح'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف الملف',
      error: error.message
    });
  }
});

module.exports = router;
