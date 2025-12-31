const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/courses
// @desc    جلب كل الدورات
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type, category } = req.query;

    let query = { isActive: true };
    if (type) query.type = type;
    if (category) query.category = category;

    const courses = await Course.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الدورات',
      error: error.message
    });
  }
});

// @route   GET /api/courses/:id
// @desc    جلب دورة محددة
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('enrolledStudents.student', 'name email');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'الدورة غير موجودة'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الدورة',
      error: error.message
    });
  }
});

// @route   POST /api/courses
// @desc    إضافة دورة جديدة
// @access  Private (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'تم إضافة الدورة بنجاح',
      data: course
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'حدث خطأ في إضافة الدورة',
      error: error.message
    });
  }
});

// @route   PUT /api/courses/:id
// @desc    تحديث دورة
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'الدورة غير موجودة'
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث الدورة بنجاح',
      data: course
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'حدث خطأ في تحديث الدورة',
      error: error.message
    });
  }
});

// @route   DELETE /api/courses/:id
// @desc    حذف دورة
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'الدورة غير موجودة'
      });
    }

    res.json({
      success: true,
      message: 'تم حذف الدورة بنجاح'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف الدورة',
      error: error.message
    });
  }
});

// @route   POST /api/courses/:id/enroll
// @desc    التسجيل في دورة
// @access  Private
router.post('/:id/enroll', protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'الدورة غير موجودة'
      });
    }

    // التحقق من عدم التسجيل المسبق
    const alreadyEnrolled = course.enrolledStudents.find(
      enrollment => enrollment.student.toString() === req.user._id.toString()
    );

    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: 'أنت مسجل بالفعل في هذه الدورة'
      });
    }

    // التحقق من توفر مقاعد
    if (course.seats && course.registered >= course.seats) {
      return res.status(400).json({
        success: false,
        message: 'عذراً، لا توجد مقاعد متاحة'
      });
    }

    course.enrolledStudents.push({
      student: req.user._id
    });

    await course.save();

    res.json({
      success: true,
      message: 'تم التسجيل في الدورة بنجاح',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في التسجيل',
      error: error.message
    });
  }
});

module.exports = router;
