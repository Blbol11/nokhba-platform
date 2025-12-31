const mongoose = require('mongoose');

const researchSupportSchema = new mongoose.Schema({
  student: {
    name: {
      type: String,
      required: [true, 'اسم الطالب مطلوب']
    },
    email: {
      type: String,
      required: [true, 'البريد الإلكتروني مطلوب']
    },
    studentId: {
      type: String,
      required: [true, 'الرقم الجامعي مطلوب']
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  researchType: {
    type: String,
    required: [true, 'نوع البحث مطلوب'],
    enum: ['بحث تخرج', 'مشروع بحثي', 'ورقة علمية', 'مقترح بحث', 'أخرى']
  },
  topic: {
    type: String,
    required: [true, 'موضوع البحث مطلوب'],
    maxlength: [300, 'موضوع البحث يجب ألا يتجاوز 300 حرف']
  },
  description: {
    type: String,
    required: [true, 'وصف البحث مطلوب'],
    maxlength: [2000, 'الوصف يجب ألا يتجاوز 2000 حرف']
  },
  supportNeeded: {
    type: [String],
    required: [true, 'نوع الدعم المطلوب مطلوب']
  },
  status: {
    type: String,
    enum: ['pending', 'inProgress', 'completed', 'rejected'],
    default: 'pending'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String,
    maxlength: [1000, 'الملاحظات يجب ألا تتجاوز 1000 حرف']
  },
  adminResponse: {
    type: String,
    maxlength: [1000, 'الرد يجب ألا يتجاوز 1000 حرف']
  },
  respondedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index
researchSupportSchema.index({ status: 1, createdAt: -1 });
researchSupportSchema.index({ 'student.email': 1 });

module.exports = mongoose.model('ResearchSupport', researchSupportSchema);
