const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
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
  inquiryType: {
    type: String,
    required: [true, 'نوع الاستفسار مطلوب'],
    enum: ['تقني', 'أكاديمي', 'إداري', 'عام']
  },
  subject: {
    type: String,
    required: [true, 'موضوع الاستفسار مطلوب'],
    maxlength: [200, 'الموضوع يجب ألا يتجاوز 200 حرف']
  },
  message: {
    type: String,
    required: [true, 'نص الاستفسار مطلوب'],
    maxlength: [2000, 'الرسالة يجب ألا تتجاوز 2000 حرف']
  },
  status: {
    type: String,
    enum: ['pending', 'answered', 'closed'],
    default: 'pending'
  },
  response: {
    type: String,
    maxlength: [2000, 'الرد يجب ألا يتجاوز 2000 حرف']
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  respondedAt: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Index
inquirySchema.index({ status: 1, priority: -1, createdAt: -1 });
inquirySchema.index({ 'student.email': 1 });

module.exports = mongoose.model('Inquiry', inquirySchema);
