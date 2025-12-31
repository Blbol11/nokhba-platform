# نظام التصميم - منصة نخبة

## لوحة الألوان الموحدة - KSU Blue

### الألوان الأساسية
```css
--primary-color: #008DC3        /* اللون الأساسي - KSU Blue */
--primary-dark: #006A93         /* أزرق داكن للـ hover */
--primary-light: #33A5D2        /* أزرق فاتح للتمييز */
--secondary-color: #005879      /* اللون الثانوي - أزرق عميق */
```

### مواصفات KSU Blue الرسمية
- **الاسم**: KSU Blue
- **HEX**: #008DC3
- **RGB**: R0 G141 B195
- **CMYK**: C100 M25 Y10 K0
- **Pantone**: PMS 640 C
- **RAL**: RAL 5015

### ألوان الخلفيات
```css
--content-bg: #F8FAFB          /* خلفية رمادي فاتح جداً */
--card-bg: #FFFFFF             /* أبيض نقي للكروت */
--bg-color: #F8FAFB
--light-color: #F8FAFB
```

### ألوان النصوص
```css
--primary-text: #1A202C        /* نص رمادي داكن */
--secondary-text: #4A5568      /* نص رمادي متوسط */
--text-color: #1A202C
--dark-color: #1A202C
```

### ألوان الحدود
```css
--border-color: #E2E8F0        /* حدود رمادي فاتح */
--border-light: #F7FAFC
```

### ألوان الحالات
```css
--success-color: #10B981       /* أخضر للنجاح */
--danger-color: #EF4444        /* أحمر للخطر */
--warning-color: #F59E0B       /* برتقالي للتحذير */
--info-color: #008DC3          /* أزرق للمعلومات */
```

### التدرجات الموحدة
```css
--gradient-primary: linear-gradient(135deg, #008DC3 0%, #006A93 100%)
--gradient-secondary: linear-gradient(135deg, #005879 0%, #003D52 100%)
--gradient-light: linear-gradient(135deg, #33A5D2 0%, #008DC3 100%)
```

## الوضع الليلي (Dark Mode)

### الألوان في الوضع الليلي
```css
--primary-color: #33A5D2       /* أزرق فاتح للوضع الليلي */
--secondary-color: #006A93
--content-bg: #1A1A1A
--card-bg: #2D2D2D
--primary-text: #F0F0F0
--border-color: #404040
```

## الاستخدام

### في CSS
```css
.my-element {
  background: var(--primary-color);
  color: var(--primary-text);
  border: 1px solid var(--border-color);
}
```

### التدرجات
```css
.header {
  background: var(--gradient-primary);
}
```

## ملاحظات مهمة

1. **استخدم المتغيرات دائماً**: لا تستخدم قيم hex مباشرة
2. **التدرجات الموحدة**: استخدم المتغيرات المعرفة بدلاً من إنشاء تدرجات جديدة
3. **الوضع الليلي**: يتم التبديل تلقائياً عبر class `dark-mode` على body
4. **التوافق**: جميع المتغيرات متوافقة مع الكود القديم

## التحديثات

- **2025-12-31**: تم توحيد جميع الألوان في المشروع باستخدام هوية KSU Blue
- اللون الأساسي: `#008DC3` (KSU Blue - RGB: 0, 141, 195)
- تم حذف ملف `colors.css` القديم
- تم تحديث جميع ملفات CSS لاستخدام المتغيرات الموحدة
- الهوية البصرية متوافقة مع معايير جامعة الملك سعود (Pantone PMS 640 C)
