const express = require('express');
const router = express.Router();
const User = require('../models/User');
const File = require('../models/File');
const Course = require('../models/Course');

// Public stats للصفحة الرئيسية
router.get('/stats', async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student', isActive: true });
    const totalFiles = await File.countDocuments();
    const totalCourses = await Course.countDocuments();
    
    // حساب إجمالي الساعات (مثلاً من الدورات)
    const courses = await Course.find().select('duration');
    const totalHours = courses.reduce((sum, course) => {
      // استخراج الأرقام من duration (مثلاً "4 أسابيع" -> 4*7*2 = 56 ساعة)
      const match = course.duration?.match(/(\d+)/);
      if (match) {
        const num = parseInt(match[1]);
        if (course.duration.includes('أسبوع') || course.duration.includes('week')) {
          return sum + (num * 7 * 2); // أسبوع = 7 أيام * 2 ساعة يومياً
        } else if (course.duration.includes('ساعة') || course.duration.includes('hour')) {
          return sum + num;
        } else if (course.duration.includes('يوم') || course.duration.includes('day')) {
          return sum + (num * 2);
        }
      }
      return sum;
    }, 0);

    res.json({
      success: true,
      data: {
        students: totalStudents,
        files: totalFiles,
        courses: totalCourses,
        hours: totalHours || 12500 // default value
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

module.exports = router;
