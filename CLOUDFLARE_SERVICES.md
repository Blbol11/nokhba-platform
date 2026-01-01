# دليل استخدام خدمات Cloudflare

## 📋 نظرة عامة

هذا الدليل يوضح كيفية استخدام خدمات Cloudflare في جميع المشاريع المستقبلية.

---

## 🗄️ D1 Database (قاعدة البيانات)

### إنشاء قاعدة بيانات D1

```bash
# إنشاء قاعدة بيانات جديدة
npx wrangler d1 create <database-name>

# مثال
npx wrangler d1 create nokhba-db
```

### إضافة D1 إلى wrangler.toml

```toml
[[d1_databases]]
binding = "DB"
database_name = "nokhba-db"
database_id = "your-database-id-here"
```

### تنفيذ SQL على D1

```bash
# تنفيذ ملف SQL
npx wrangler d1 execute <database-name> --file=./schema.sql

# تنفيذ استعلام مباشر
npx wrangler d1 execute <database-name> --command="SELECT * FROM users"

# تنفيذ على البيئة الحية (production)
npx wrangler d1 execute <database-name> --file=./schema.sql --remote
```

### استخدام D1 في Worker

```javascript
export default {
  async fetch(request, env) {
    // قراءة بيانات
    const { results } = await env.DB.prepare(
      "SELECT * FROM users WHERE id = ?"
    ).bind(1).all();

    // إدراج بيانات
    await env.DB.prepare(
      "INSERT INTO users (name, email) VALUES (?, ?)"
    ).bind("أحمد", "ahmad@example.com").run();

    // تحديث بيانات
    await env.DB.prepare(
      "UPDATE users SET name = ? WHERE id = ?"
    ).bind("محمد", 1).run();

    return Response.json(results);
  }
};
```

---

## 📦 R2 Storage (تخزين الملفات)

### إنشاء R2 Bucket

```bash
# إنشاء bucket جديد
npx wrangler r2 bucket create <bucket-name>

# مثال
npx wrangler r2 bucket create nokhba-files
```

### إضافة R2 إلى wrangler.toml

```toml
[[r2_buckets]]
binding = "FILES"
bucket_name = "nokhba-files"
```

### رفع ملفات إلى R2

```bash
# رفع ملف واحد
npx wrangler r2 object put nokhba-files/file.pdf --file=./local-file.pdf

# عرض الملفات
npx wrangler r2 object list nokhba-files
```

### استخدام R2 في Worker

```javascript
export default {
  async fetch(request, env) {
    // رفع ملف
    await env.FILES.put("documents/file.pdf", fileContent, {
      httpMetadata: {
        contentType: "application/pdf"
      }
    });

    // قراءة ملف
    const object = await env.FILES.get("documents/file.pdf");

    if (object === null) {
      return new Response("File not found", { status: 404 });
    }

    // حذف ملف
    await env.FILES.delete("documents/file.pdf");

    return new Response(object.body, {
      headers: {
        "Content-Type": "application/pdf"
      }
    });
  }
};
```

---

## 🔑 KV Storage (تخزين مفتاح-قيمة)

### إنشاء KV Namespace

```bash
# إنشاء namespace جديد
npx wrangler kv:namespace create <namespace-name>

# إنشاء namespace للتطوير
npx wrangler kv:namespace create <namespace-name> --preview

# مثال
npx wrangler kv:namespace create CACHE
```

### إضافة KV إلى wrangler.toml

```toml
[[kv_namespaces]]
binding = "CACHE"
id = "your-namespace-id-here"
```

### التعامل مع البيانات

```bash
# كتابة قيمة
npx wrangler kv:key put --binding=CACHE "my-key" "my-value"

# قراءة قيمة
npx wrangler kv:key get --binding=CACHE "my-key"

# حذف قيمة
npx wrangler kv:key delete --binding=CACHE "my-key"

# عرض جميع المفاتيح
npx wrangler kv:key list --binding=CACHE
```

### استخدام KV في Worker

```javascript
export default {
  async fetch(request, env) {
    // كتابة بيانات
    await env.CACHE.put("user:1", JSON.stringify({
      name: "أحمد",
      email: "ahmad@example.com"
    }), {
      expirationTtl: 3600 // ينتهي بعد ساعة
    });

    // قراءة بيانات
    const userData = await env.CACHE.get("user:1", "json");

    // حذف بيانات
    await env.CACHE.delete("user:1");

    // قراءة مع metadata
    const { value, metadata } = await env.CACHE.getWithMetadata("user:1");

    return Response.json(userData);
  }
};
```

---

## 🌐 Pages (استضافة Frontend)

### نشر مشروع على Pages

```bash
# نشر مجلد build
npx wrangler pages deploy <build-directory> --project-name=<project-name>

# مثال: نشر React
npm run build
npx wrangler pages deploy build --project-name=nokhba-platform

# مثال: نشر Next.js
npm run build
npx wrangler pages deploy .next --project-name=my-nextjs-app
```

### إضافة متغيرات بيئية

```bash
# عبر Dashboard أو باستخدام wrangler
npx wrangler pages deployment create --project-name=nokhba-platform
```

### استخدام Pages Functions

إنشاء ملف `functions/api/users.js`:

```javascript
export async function onRequest(context) {
  return Response.json({
    message: "Hello from Pages Function!"
  });
}
```

سيكون متاح على: `https://your-site.pages.dev/api/users`

---

## ⚡ Workers (Serverless Backend)

### إنشاء Worker جديد

```bash
# إنشاء worker من template
npx wrangler init my-worker

# أو إنشاء worker فارغ
npx wrangler init my-worker --type=javascript
```

### ملف wrangler.toml الكامل

```toml
name = "nokhba-api"
main = "src/index.js"
compatibility_date = "2024-01-01"

# D1 Database
[[d1_databases]]
binding = "DB"
database_name = "nokhba-db"
database_id = "your-db-id"

# R2 Storage
[[r2_buckets]]
binding = "FILES"
bucket_name = "nokhba-files"

# KV Storage
[[kv_namespaces]]
binding = "CACHE"
id = "your-kv-id"

# متغيرات البيئة
[vars]
ENVIRONMENT = "production"

# الأسرار (Secrets)
# تضاف عبر: npx wrangler secret put SECRET_NAME
```

### نشر Worker

```bash
# النشر
npx wrangler deploy

# عرض logs
npx wrangler tail

# اختبار محلي
npx wrangler dev
```

### Worker كامل يستخدم جميع الخدمات

```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // مثال: حفظ بيانات في D1
    if (url.pathname === "/api/users" && request.method === "POST") {
      const body = await request.json();

      await env.DB.prepare(
        "INSERT INTO users (name, email) VALUES (?, ?)"
      ).bind(body.name, body.email).run();

      return Response.json({ success: true });
    }

    // مثال: رفع ملف إلى R2
    if (url.pathname === "/api/upload" && request.method === "POST") {
      const formData = await request.formData();
      const file = formData.get("file");

      await env.FILES.put(`uploads/${file.name}`, file.stream());

      return Response.json({
        url: `https://files.example.com/${file.name}`
      });
    }

    // مثال: cache باستخدام KV
    if (url.pathname === "/api/stats") {
      // محاولة قراءة من cache
      let stats = await env.CACHE.get("stats", "json");

      if (!stats) {
        // إذا لم يكن موجود، جلب من DB
        const { results } = await env.DB.prepare(
          "SELECT COUNT(*) as count FROM users"
        ).all();

        stats = { userCount: results[0].count };

        // حفظ في cache لمدة 5 دقائق
        await env.CACHE.put("stats", JSON.stringify(stats), {
          expirationTtl: 300
        });
      }

      return Response.json(stats);
    }

    return new Response("Not Found", { status: 404 });
  }
};
```

---

## 🔐 Secrets (الأسرار)

```bash
# إضافة secret لـ Worker
npx wrangler secret put JWT_SECRET
# ثم أدخل القيمة

# إضافة secret لـ Pages
npx wrangler pages secret put API_KEY --project-name=nokhba-platform

# عرض الأسرار (الأسماء فقط)
npx wrangler secret list
```

### استخدام Secrets

```javascript
export default {
  async fetch(request, env) {
    // env.JWT_SECRET متاح مباشرة
    const token = signJWT(payload, env.JWT_SECRET);

    return Response.json({ token });
  }
};
```

---

## 🚀 سير العمل الكامل لمشروع جديد

### 1. إعداد Frontend (React/Next.js)

```bash
# إنشاء المشروع
npx create-react-app my-project
cd my-project

# تسجيل الدخول لـ Cloudflare
npx wrangler login

# بناء ونشر
npm run build
npx wrangler pages deploy build --project-name=my-project
```

### 2. إعداد Backend (Worker)

```bash
# إنشاء worker
mkdir my-api && cd my-api
npx wrangler init

# إنشاء D1 database
npx wrangler d1 create my-db

# إنشاء R2 bucket
npx wrangler r2 bucket create my-files

# إنشاء KV namespace
npx wrangler kv:namespace create CACHE

# تحديث wrangler.toml بالـ IDs

# نشر
npx wrangler deploy
```

### 3. ربط Frontend بـ Backend

في Frontend `.env.production`:

```env
REACT_APP_API_URL=https://my-api.your-subdomain.workers.dev
```

---

## 📊 مراقبة وإدارة

```bash
# عرض استخدام الموارد
npx wrangler pages deployment list --project-name=my-project

# عرض logs للـ Worker
npx wrangler tail

# عرض معلومات D1
npx wrangler d1 info my-db

# عرض معلومات R2
npx wrangler r2 bucket list
```

---

## 💡 أفضل الممارسات

1. **D1**: استخدم للبيانات المنظمة (users, courses, etc.)
2. **R2**: استخدم للملفات الكبيرة (PDFs, images, videos)
3. **KV**: استخدم للـ cache والبيانات المؤقتة
4. **Pages**: استخدم للـ Frontend الثابت
5. **Workers**: استخدم للـ API والـ Backend logic

---

## 🔗 روابط مفيدة

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [D1 Documentation](https://developers.cloudflare.com/d1/)
- [R2 Documentation](https://developers.cloudflare.com/r2/)
- [KV Documentation](https://developers.cloudflare.com/kv/)
- [Pages Documentation](https://developers.cloudflare.com/pages/)

---

## ⚠️ ملاحظات مهمة

- **Free Plan Limits**:
  - D1: 5 GB storage, 5 million reads/day
  - R2: 10 GB storage, 1 million class A operations
  - KV: 1 GB storage, 100k reads/day
  - Workers: 100k requests/day
  - Pages: Unlimited requests

- **دائماً استخدم `--remote` عند تنفيذ SQL على الإنتاج**
- **لا تضع Secrets في الكود، استخدم `wrangler secret`**
- **استخدم D1 migrations للـ schema changes**

---

تم إنشاء هذا الدليل لمشروع نخبة - جامعة الملك سعود
