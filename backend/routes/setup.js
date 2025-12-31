const express = require('express');
const router = express.Router();
const User = require('../models/User');

// endpoint لإعداد أول admin (استخدمه مرة واحدة فقط)
router.post('/make-admin', async (req, res) => {
  try {
    const { email, secretKey } = req.body;

    // مفتاح سري للحماية
    if (secretKey !== 'nokhba_setup_2024') {
      return res.status(403).json({
        success: false,
        message: 'مفتاح سري غير صحيح'
      });
    }

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { role: 'admin' },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    res.json({
      success: true,
      message: `تم تعيين ${user.name} كمدير بنجاح`,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ',
      error: error.message
    });
  }
});

// عرض جميع المستخدمين (للتأكد)
router.get('/users-list', async (req, res) => {
  try {
    const { secretKey } = req.query;

    if (secretKey !== 'nokhba_setup_2024') {
      return res.status(403).json({
        success: false,
        message: 'مفتاح سري غير صحيح'
      });
    }

    const users = await User.find().select('name email role isActive createdAt');

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ',
      error: error.message
    });
  }
});

module.exports = router;
