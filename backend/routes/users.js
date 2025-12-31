const express = require('express');
const router = express.Router();
const User = require('../models/User');
const File = require('../models/File');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/users
// @desc    الحصول على جميع المستخدمين
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ'
    });
  }
});

// @route   GET /api/users/:id
// @desc    الحصول على مستخدم محدد
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ'
    });
  }
});

// @route   GET /api/users/stats
// @desc    الحصول على إحصائيات المستخدم
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    // حساب الملفات المرفوعة
    const uploadedFiles = await File.countDocuments({ uploadedBy: userId });

    // حساب التحميلات (من جميع الملفات التي رفعها المستخدم)
    const userFiles = await File.find({ uploadedBy: userId });
    const totalDownloads = userFiles.reduce((sum, file) => sum + (file.downloads || 0), 0);

    // الدورات المسجلة (مؤقتاً نستخدم قيمة افتراضية حتى يتم تطوير نظام التسجيل)
    const enrolledCourses = 0;
    const completedCourses = 0;

    // الإنجازات والنقاط (يمكن تطويرها لاحقاً)
    let achievements = 0;
    let points = 0;

    // حساب الإنجازات بناءً على النشاط
    if (uploadedFiles > 0) achievements++;
    if (uploadedFiles >= 10) achievements++;
    if (uploadedFiles >= 50) achievements++;
    if (totalDownloads >= 20) achievements++;

    // حساب النقاط
    points = (uploadedFiles * 10) + (totalDownloads * 2);

    res.json({
      success: true,
      data: {
        uploadedFiles,
        downloads: totalDownloads,
        enrolledCourses,
        completedCourses,
        achievements,
        points
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الإحصائيات'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    تحديث الملف الشخصي
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, studentId, major, university, bio } = req.body;

    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (studentId) user.studentId = studentId;
    if (major) user.major = major;
    if (university) user.university = university;
    if (bio) user.bio = bio;

    await user.save();

    res.json({
      success: true,
      message: 'تم تحديث الملف الشخصي بنجاح',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        major: user.major,
        university: user.university,
        bio: user.bio,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      }
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
