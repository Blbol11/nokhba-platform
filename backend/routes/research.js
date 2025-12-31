const express = require('express');
const router = express.Router();
const ResearchSupport = require('../models/ResearchSupport');
const { protect, authorize } = require('../middleware/auth');

// @route   POST /api/research
// @desc    إرسال طلب دعم بحثي
// @access  Public
router.post('/', async (req, res) => {
  try {
    const request = await ResearchSupport.create(req.body);

    res.status(201).json({
      success: true,
      message: 'تم إرسال طلبك بنجاح، سنتواصل معك قريباً',
      data: request
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'حدث خطأ في إرسال الطلب',
      error: error.message
    });
  }
});

// @route   GET /api/research
// @desc    جلب كل طلبات الدعم البحثي
// @access  Private (Admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status) query.status = status;

    const requests = await ResearchSupport.find(query)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الطلبات',
      error: error.message
    });
  }
});

// @route   PUT /api/research/:id
// @desc    تحديث حالة طلب الدعم
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const request = await ResearchSupport.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        respondedAt: req.body.status !== 'pending' ? Date.now() : undefined
      },
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'الطلب غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث الطلب بنجاح',
      data: request
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'حدث خطأ في تحديث الطلب',
      error: error.message
    });
  }
});

// @route   DELETE /api/research/:id
// @desc    حذف طلب دعم
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const request = await ResearchSupport.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'الطلب غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم حذف الطلب بنجاح'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف الطلب',
      error: error.message
    });
  }
});

module.exports = router;
