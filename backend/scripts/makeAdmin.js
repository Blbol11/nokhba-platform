const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const makeAdmin = async () => {
  try {
    // الاتصال بقاعدة البيانات
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nokhba');
    console.log('✓ تم الاتصال بقاعدة البيانات');

    // البحث عن عبدالرحمن الجابر وتحديث دوره
    const user = await User.findOneAndUpdate(
      { name: /عبدالرحمن.*الجابر/i }, // البحث بالاسم (case insensitive)
      { role: 'admin' },
      { new: true }
    );

    if (user) {
      console.log('✓ تم تعيين عبدالرحمن الجابر كمدير بنجاح!');
      console.log(`  - الاسم: ${user.name}`);
      console.log(`  - البريد: ${user.email}`);
      console.log(`  - الدور: ${user.role}`);
    } else {
      console.log('✗ لم يتم العثور على مستخدم بهذا الاسم');
      console.log('جاري عرض جميع المستخدمين...\n');

      const allUsers = await User.find().select('name email role');
      console.log('المستخدمين المسجلين:');
      allUsers.forEach((u, index) => {
        console.log(`${index + 1}. ${u.name} (${u.email}) - ${u.role}`);
      });
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ حدث خطأ:', error.message);
    process.exit(1);
  }
};

makeAdmin();
