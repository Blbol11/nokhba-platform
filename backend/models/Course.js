const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'نوع الدورة مطلوب'],
    enum: ['remote', 'inPerson', 'recorded']
  },
  title: {
    type: String,
    required: [true, 'عنوان الدورة مطلوب'],
    trim: true,
    maxlength: [200, 'العنوان يجب ألا يتجاوز 200 حرف']
  },
  description: {
    type: String,
    required: [true, 'الوصف مطلوب'],
    maxlength: [2000, 'الوصف يجب ألا يتجاوز 2000 حرف']
  },
  instructor: {
    type: String,
    required: [true, 'اسم المدرب مطلوب']
  },
  duration: {
    type: String,
    required: [true, 'مدة الدورة مطلوبة']
  },
  // للدورات الحضورية وعن بعد
  schedule: {
    type: String,
    required: function() {
      return this.type === 'remote' || this.type === 'inPerson';
    }
  },
  startDate: {
    type: Date,
    required: function() {
      return this.type === 'remote' || this.type === 'inPerson';
    }
  },
  seats: {
    type: Number,
    required: function() {
      return this.type === 'remote' || this.type === 'inPerson';
    }
  },
  registered: {
    type: Number,
    default: 0
  },
  // للدورات عن بعد
  platform: {
    type: String,
    required: function() {
      return this.type === 'remote';
    }
  },
  meetingLink: {
    type: String,
    required: function() {
      return this.type === 'remote';
    }
  },
  // للدورات الحضورية
  location: {
    type: String,
    required: function() {
      return this.type === 'inPerson';
    }
  },
  // للدورات المسجلة
  videos: {
    type: Number,
    required: function() {
      return this.type === 'recorded';
    }
  },
  downloadable: {
    type: Boolean,
    required: function() {
      return this.type === 'recorded';
    }
  },
  videoLinks: [{
    title: String,
    url: String,
    duration: String
  }],
  // حقول مشتركة
  price: {
    type: Number,
    default: 0  // 0 يعني مجاني
  },
  level: {
    type: String,
    enum: ['مبتدئ', 'متوسط', 'متقدم'],
    default: 'متوسط'
  },
  category: {
    type: String,
    required: [true, 'تصنيف الدورة مطلوب']
  },
  thumbnail: {
    type: String  // مسار الصورة
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  enrolledStudents: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    completed: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: 0
    }
  }],
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index للبحث السريع
courseSchema.index({ type: 1, category: 1, isActive: 1 });
courseSchema.index({ startDate: 1 });
courseSchema.index({ createdAt: -1 });

// حساب عدد المسجلين
courseSchema.pre('save', function(next) {
  if (this.enrolledStudents) {
    this.registered = this.enrolledStudents.length;
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);
