# دليل نشر Backend - خطوة بخطوة 🚀

## الخطوة 1️⃣: إنشاء MongoDB Atlas (قاعدة البيانات المجانية)

1. اذهب إلى: https://www.mongodb.com/cloud/atlas/register
2. سجل دخول بحساب Google أو Email
3. اختر **FREE** (M0 Sandbox - مجاني للأبد)
4. اختر Region: **Frankfurt** (الأقرب للسعودية)
5. اضغط **Create Cluster**

### إعدادات الأمان:
1. في **Database Access**:
   - اضغط **Add New Database User**
   - Username: `nokhba_admin`
   - Password: اضغط **Autogenerate Secure Password** (انسخه!)
   - Database User Privileges: **Read and write to any database**
   - اضغط **Add User**

2. في **Network Access**:
   - اضغط **Add IP Address**
   - اختر **Allow Access from Anywhere** (0.0.0.0/0)
   - اضغط **Confirm**

### الحصول على Connection String:
1. اضغط **Connect** على الـ Cluster
2. اختر **Connect your application**
3. Driver: **Node.js**
4. Version: **5.5 or later**
5. انسخ الـ Connection String:
```
mongodb+srv://nokhba_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
6. استبدل `<password>` بالباسورد اللي نسخته
7. **احفظ الـ Connection String!**

---

## الخطوة 2️⃣: نشر Backend على Render.com

1. اذهب إلى: https://render.com
2. اضغط **Get Started for Free**
3. سجل دخول بحساب **GitHub**
4. امنح Render صلاحية الوصول لـ repository: `nokhba-platform`

### إنشاء Web Service:
1. من Dashboard، اضغط **New +**
2. اختر **Web Service**
3. اختر repository: **nokhba-platform**
4. اضغط **Connect**

### إعدادات الـ Service:
```
Name: nokhba-backend
Region: Frankfurt (EU Central)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### Environment Variables:
اضغط **Advanced** ثم أضف المتغيرات التالية:

```
PORT=5001
NODE_ENV=production
JWT_SECRET=nokhba_secret_production_2025_change_this_to_random_string
JWT_EXPIRE=7d
MONGODB_URI=<الـ Connection String من MongoDB Atlas>
MAX_FILE_SIZE=10485760
```

**⚠️ مهم جداً:** استبدل `MONGODB_URI` بالـ Connection String الكامل من الخطوة 1!

7. اضغط **Create Web Service**

### انتظر النشر:
- راح يبدأ Build تلقائياً
- انتظر 2-3 دقائق
- لما يصير الـ Status: **Live** ✅

### انسخ URL الـ Backend:
- من أعلى الصفحة، انسخ الـ URL:
```
https://nokhba-backend.onrender.com
```
**احفظ هذا الرابط!**

---

## الخطوة 3️⃣: تحديث Frontend بـ Backend URL

بعد ما ينشر Backend بنجاح وتحصل على الـ URL:

1. افتح Terminal وشغل:
```bash
cd /Users/abdulrahman/Code/mstshark/nokhba/frontend
```

2. حدّث ملف `.env.production`:
```bash
echo 'REACT_APP_API_URL=https://nokhba-backend.onrender.com' > .env.production
```
(استبدل بالـ URL الحقيقي من Render)

3. ارفع التحديثات:
```bash
cd /Users/abdulrahman/Code/mstshark/nokhba
git add .
git commit -m "Update: Connect frontend to deployed backend"
git push

cd frontend
npm run build
wrangler pages deploy build --project-name=nokhba-platform
```

---

## الخطوة 4️⃣: اختبار الموقع

1. افتح الموقع المنشور
2. تأكد من ظهور الإحصائيات من قاعدة البيانات
3. جرب التسجيل وتسجيل الدخول

---

## 🎉 تم بنجاح!

الموقع الآن شغال بالكامل:
- ✅ Frontend على Cloudflare Pages
- ✅ Backend على Render
- ✅ Database على MongoDB Atlas

---

## ملاحظات مهمة:

### Render Free Tier:
- Backend راح ينام بعد 15 دقيقة بدون استخدام
- أول طلب بعد النوم راح ياخذ 30-60 ثانية (لما يصحى)
- بعدها كل شي راح يشتغل طبيعي

### الترقية (اختياري):
إذا تبي Backend يظل شغال 24/7:
- ترقية Render إلى Starter Plan ($7/شهر)
- أو استخدام Railway ($5/شهر)

---

## روابط مفيدة:
- 📊 **MongoDB Atlas Dashboard**: https://cloud.mongodb.com
- 🚀 **Render Dashboard**: https://dashboard.render.com
- 📁 **GitHub Repo**: https://github.com/Blbol11/nokhba-platform
- 🌐 **Frontend**: https://nokhba-platform.pages.dev
