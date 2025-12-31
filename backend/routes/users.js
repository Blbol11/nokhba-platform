const express = require('express');
const router = express.Router();
const User = require('../models/User');
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
        bio: user.bio
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
