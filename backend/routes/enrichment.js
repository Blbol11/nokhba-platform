const express = require('express');
const router = express.Router();
const Enrichment = require('../models/Enrichment');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/enrichment
// @desc    جلب كل محتوى الإثراء
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type, category } = req.query;

    let query = { isActive: true };
    if (type) query.type = type;
    if (category) query.category = category;

    const content = await Enrichment.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: content.length,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب المحتوى',
      error: error.message
    });
  }
});

// @route   GET /api/enrichment/:id
// @desc    جلب محتوى محدد
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const content = await Enrichment.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'المحتوى غير موجود'
      });
    }

    // زيادة عدد المشاهدات
    content.views += 1;
    await content.save();

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب المحتوى',
      error: error.message
    });
  }
});

// @route   POST /api/enrichment
// @desc    إضافة محتوى إثراء جديد
// @access  Private (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const content = await Enrichment.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'تم إضافة المحتوى بنجاح',
      data: content
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'حدث خطأ في إضافة المحتوى',
      error: error.message
    });
  }
});

// @route   PUT /api/enrichment/:id
// @desc    تحديث محتوى إثراء
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const content = await Enrichment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'المحتوى غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث المحتوى بنجاح',
      data: content
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'حدث خطأ في تحديث المحتوى',
      error: error.message
    });
  }
});

// @route   DELETE /api/enrichment/:id
// @desc    حذف محتوى إثراء
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const content = await Enrichment.findByIdAndDelete(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'المحتوى غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم حذف المحتوى بنجاح'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف المحتوى',
      error: error.message
    });
  }
});

module.exports = router;
