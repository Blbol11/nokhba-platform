const mongoose = require('mongoose');

const enrichmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'نوع المحتوى مطلوب'],
    enum: ['video', 'pdf', 'material']
  },
  title: {
    type: String,
    required: [true, 'العنوان مطلوب'],
    trim: true,
    maxlength: [200, 'العنوان يجب ألا يتجاوز 200 حرف']
  },
  description: {
    type: String,
    required: [true, 'الوصف مطلوب'],
    maxlength: [1000, 'الوصف يجب ألا يتجاوز 1000 حرف']
  },
  category: {
    type: String,
    required: [true, 'التصنيف مطلوب']
  },
  // للفيديوهات
  url: {
    type: String,
    required: function() {
      return this.type === 'video';
    }
  },
  duration: {
    type: String, // مثال: "45 دقيقة"
    required: function() {
      return this.type === 'video';
    }
  },
  level: {
    type: String,
    enum: ['مبتدئ', 'متوسط', 'متقدم'],
    required: function() {
      return this.type === 'video';
    }
  },
  // للـ PDF
  filePath: {
    type: String,
    required: function() {
      return this.type === 'pdf';
    }
  },
  fileName: {
    type: String,
    required: function() {
      return this.type === 'pdf';
    }
  },
  pages: {
    type: Number,
    required: function() {
      return this.type === 'pdf';
    }
  },
  size: {
    type: String, // مثال: "2.5 MB"
    required: function() {
      return this.type === 'pdf';
    }
  },
  // للمواد الداعمة
  fileCount: {
    type: Number,
    required: function() {
      return this.type === 'material';
    }
  },
  materialType: {
    type: String, // مثال: "ملفات وقوالب"
    required: function() {
      return this.type === 'material';
    }
  },
  // حقول مشتركة
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index للبحث السريع
enrichmentSchema.index({ type: 1, category: 1, isActive: 1 });
enrichmentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Enrichment', enrichmentSchema);
