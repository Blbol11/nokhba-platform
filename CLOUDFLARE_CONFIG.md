# إعدادات Cloudflare Pages 🌥️

## Build Settings

عند إنشاء المشروع في Cloudflare Pages، استخدم الإعدادات التالية:

### Framework preset
```
None (أو Create React App)
```

### Build command
```
cd frontend && npm install && npm run build
```

### Build output directory
```
frontend/build
```

### Root directory
```
/
```

## Environment Variables

أضف المتغيرات التالية في صفحة Environment Variables:

### Production
```
REACT_APP_API_URL=https://your-railway-app.up.railway.app
```

**⚠️ مهم جداً:** استبدل `your-railway-app.up.railway.app` بالـ URL الفعلي من Railway!

### Preview (اختياري)
يمكنك إضافة نفس المتغير للـ Preview environment إذا أردت.

## Custom Domain (اختياري)

إذا كان عندك دومين مخصص:

1. اذهب لـ Custom domains
2. اضغط Set up a custom domain
3. أدخل الدومين الخاص بك
4. اتبع التعليمات لتحديث DNS records

## Redirects & Headers

### إعادة التوجيه للـ SPA (Single Page App)

أنشئ ملف `_redirects` في `frontend/public/`:

```
/*    /index.html   200
```

### Headers (أمان إضافي)

أنشئ ملف `_headers` في `frontend/public/`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

## بعد النشر

1. انسخ الـ URL من Cloudflare: `https://nokhba-platform.pages.dev`
2. أضفه في Backend CORS settings (server.js)
3. ارفع التحديث على GitHub
4. راح يتم deployment تلقائياً!

## Troubleshooting

### الصفحة تظهر 404 عند Refresh
- تأكد من وجود ملف `_redirects` في `frontend/public/`

### API Calls تفشل
- تحقق من `REACT_APP_API_URL` في Environment Variables
- تحقق من CORS settings في Backend

### Build يفشل
- راجع Build Log في Cloudflare Dashboard
- تأكد من Build command صحيح
- تأكد من Build output directory = `frontend/build`
