const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { protect, authorize } = require('../middleware/auth');

// @route   POST /api/inquiries
// @desc    إرسال استفسار
// @access  Public
router.post('/', async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    res.status(201).json({
      success: true,
      message: 'تم إرسال استفسارك بنجاح، سنرد عليك قريباً',
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'حدث خطأ في إرسال الاستفسار',
      error: error.message
    });
  }
});

// @route   GET /api/inquiries
// @desc    جلب كل الاستفسارات
// @access  Private (Admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, priority } = req.query;
    let query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const inquiries = await Inquiry.find(query)
      .populate('respondedBy', 'name email')
      .sort({ priority: -1, createdAt: -1 });

    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الاستفسارات',
      error: error.message
    });
  }
});

// @route   PUT /api/inquiries/:id
// @desc    الرد على استفسار
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        respondedBy: req.user._id,
        respondedAt: req.body.response ? Date.now() : undefined,
        status: req.body.response ? 'answered' : req.body.status
      },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'الاستفسار غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث الاستفسار بنجاح',
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'حدث خطأ في تحديث الاستفسار',
      error: error.message
    });
  }
});

// @route   DELETE /api/inquiries/:id
// @desc    حذف استفسار
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'الاستفسار غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم حذف الاستفسار بنجاح'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف الاستفسار',
      error: error.message
    });
  }
});

module.exports = router;
