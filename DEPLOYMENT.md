# Vercel Deployment Guide / دليل النشر على Vercel

هذا الدليل يوضح كيفية نشر المشروع على Vercel.

This guide explains how to deploy the project to Vercel.

---

## 🚀 Pre-deployment Setup / الإعداد قبل النشر

### 1. Project Files / ملفات المشروع

تم إعداد الملفات التالية للنشر / The following files have been prepared for deployment:

- ✅ `package.json` - Updated with start script / محدث بـ start script
- ✅ `vercel.json` - Vercel configuration / تكوين Vercel
- ✅ `.gitignore` - Updated with deployment files / محدث بملفات النشر

### 2. Environment Variables / متغيرات البيئة

قبل النشر، تأكد من أن لديك القيم التالية / Before deployment, make sure you have the following values:

```env
# Database / قاعدة البيانات
DB_CONNECTION_STRING=mongodb+srv://your_mongodb_atlas_connection

# JWT Secret / سر JWT
JWT_SECRET=your_secure_jwt_secret

# Cloudinary (للصور / for images)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Port (اختياري / optional)
PORT=5000
```

---

## 📋 Deployment Steps / خطوات النشر

### Method 1: Vercel CLI / طريقة Vercel CLI

1. **Install Vercel CLI / تثبيت Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel / تسجيل الدخول إلى Vercel**
```bash
vercel login
```

3. **Deploy / النشر**
```bash
# من مجلد المشروع / From project folder
vercel

# للنشر للإنتاج / For production deployment
vercel --prod
```

### Method 2: GitHub Integration / طريقة تكامل GitHub

1. **Push to GitHub / رفع إلى GitHub**
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. **Connect to Vercel / الاتصال بـ Vercel**
   - Go to [vercel.com](https://vercel.com) / اذهب إلى [vercel.com](https://vercel.com)
   - Click "Import Project" / اضغط على "Import Project"
   - Connect your GitHub repository / اربط مستودع GitHub الخاص بك

3. **Configure Environment Variables / تكوين متغيرات البيئة**
   - In Vercel dashboard, go to project settings / في لوحة تحكم Vercel، اذهب إلى إعدادات المشروع
   - Add all environment variables from the list above / أضف جميع متغيرات البيئة من القائمة أعلاه

---

## ⚙️ Vercel Configuration Details / تفاصيل تكوين Vercel

### vercel.json Explanation / شرح vercel.json

```json
{
  "version": 2,                    // إصدار Vercel / Vercel version
  "name": "alalamyaa-backend",     // اسم المشروع / Project name
  "builds": [
    {
      "src": "index.js",           // ملف الدخول / Entry file
      "use": "@vercel/node"        // Runtime Node.js / بيئة تشغيل Node.js
    }
  ],
  "routes": [
    {
      "src": "/(.*)",             // جميع المسارات / All routes
      "dest": "/index.js"          // توجيه إلى index.js / Route to index.js
    }
  ],
  "env": {
    "NODE_ENV": "production"       // بيئة الإنتاج / Production environment
  },
  "functions": {
    "index.js": {
      "maxDuration": 30            // أقصى مدة تنفيذ / Max execution time
    }
  }
}
```

---

## 🔧 Database Setup / إعداد قاعدة البيانات

### MongoDB Atlas (Recommended / مُوصى به)

1. **Create MongoDB Atlas Account / إنشاء حساب MongoDB Atlas**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas) / اذهب إلى [mongodb.com/atlas](https://mongodb.com/atlas)

2. **Create Cluster / إنشاء مجموعة**
   - Choose Free Tier (M0) / اختر الطبقة المجانية (M0)
   - Select region closest to your users / اختر المنطقة الأقرب لمستخدميك

3. **Get Connection String / الحصول على نص الاتصال**
   - Click "Connect" / اضغط على "Connect"
   - Choose "Connect your application" / اختر "Connect your application"
   - Copy the connection string / انسخ نص الاتصال

4. **Network Access / الوصول للشبكة**
   - Add IP address: `0.0.0.0/0` (Allow all) / أضف عنوان IP: `0.0.0.0/0` (السماح للجميع)

---

## 🌍 Environment Variables in Vercel / متغيرات البيئة في Vercel

### Adding Environment Variables / إضافة متغيرات البيئة

1. **Via Vercel Dashboard / عبر لوحة تحكم Vercel**
   - Project Settings → Environment Variables / إعدادات المشروع ← متغيرات البيئة
   - Add each variable one by one / أضف كل متغير واحداً تلو الآخر

2. **Via Vercel CLI / عبر Vercel CLI**
```bash
vercel env add DB_CONNECTION_STRING
vercel env add JWT_SECRET
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
```

---

## 🔒 Security Considerations / اعتبارات الأمان

### 1. Environment Variables / متغيرات البيئة
- ❌ Never commit `.env` files / لا تحفظ ملفات `.env` في Git أبداً
- ✅ Use strong JWT secrets / استخدم أسرار JWT قوية
- ✅ Use MongoDB Atlas with authentication / استخدم MongoDB Atlas مع المصادقة

### 2. CORS Configuration / تكوين CORS
Update CORS origins in production / حدث مصادر CORS في الإنتاج:

```javascript
// في index.js / In index.js
app.use(
  cors({
    origin: [
      "https://your-frontend-domain.vercel.app", // Frontend domain / نطاق الواجهة الأمامية
      "http://localhost:5173", // Local development / التطوير المحلي
    ],
    credentials: true,
  })
);
```

---

## 🧪 Testing Deployment / اختبار النشر

### 1. Health Check / فحص الصحة
بعد النشر، اختبر / After deployment, test:

```bash
# استبدال YOUR_VERCEL_URL بالرابط الفعلي / Replace YOUR_VERCEL_URL with actual URL
curl https://YOUR_VERCEL_URL.vercel.app/

# يجب أن ترى / Should see: "API is running..."
```

### 2. API Endpoints / نقاط النهاية
```bash
# Test authentication endpoint / اختبار نقطة المصادقة
curl https://YOUR_VERCEL_URL.vercel.app/api/check-auth

# Test products endpoint / اختبار نقطة المنتجات
curl https://YOUR_VERCEL_URL.vercel.app/api/product
```

---

## 🐛 Common Issues / المشاكل الشائعة

### 1. Build Errors / أخطاء البناء

**Problem / المشكلة:** Module not found / وحدة غير موجودة
```bash
Solution / الحل:
- Check package.json dependencies / فحص تبعيات package.json
- Run npm install locally / تشغيل npm install محلياً
- Ensure all imports are correct / التأكد من صحة جميع الاستيرادات
```

### 2. Database Connection / اتصال قاعدة البيانات

**Problem / المشكلة:** Cannot connect to database / لا يمكن الاتصال بقاعدة البيانات
```bash
Solution / الحل:
- Check DB_CONNECTION_STRING / فحص DB_CONNECTION_STRING
- Ensure MongoDB Atlas allows all IPs / التأكد من أن MongoDB Atlas يسمح لجميع عناوين IP
- Check database user permissions / فحص صلاحيات مستخدم قاعدة البيانات
```

### 3. Environment Variables / متغيرات البيئة

**Problem / المشكلة:** Environment variables not working / متغيرات البيئة لا تعمل
```bash
Solution / الحل:
- Double-check variable names in Vercel / تحقق مرة أخرى من أسماء المتغيرات في Vercel
- Redeploy after adding variables / أعد النشر بعد إضافة المتغيرات
- Check for typos / فحص الأخطاء الإملائية
```

---

## 📊 Monitoring / المراقبة

### Vercel Analytics / تحليلات Vercel
- **Functions** - Monitor serverless function performance / مراقبة أداء الوظائف بدون خادم
- **Edge Network** - Check global performance / فحص الأداء العالمي
- **Real-time logs** - Debug issues / تصحيح المشاكل

### Performance Tips / نصائح الأداء
- Use database connection pooling / استخدم تجميع اتصالات قاعدة البيانات
- Implement caching where appropriate / طبق التخزين المؤقت عند الحاجة
- Optimize database queries / حسن استعلامات قاعدة البيانات

---

## 🔄 Updates & Maintenance / التحديثات والصيانة

### Automatic Deployments / النشر التلقائي
With GitHub integration / مع تكامل GitHub:
- Every push to main branch triggers deployment / كل push لفرع main يُشغل النشر
- Preview deployments for other branches / معاينة النشر للفروع الأخرى

### Manual Deployments / النشر اليدوي
```bash
# Update and redeploy / تحديث وإعادة نشر
git add .
git commit -m "Update: describe your changes"
git push origin main

# Or using Vercel CLI / أو باستخدام Vercel CLI
vercel --prod
```

---

## 📞 Support / الدعم

### Resources / المصادر
- [Vercel Documentation](https://vercel.com/docs) / [وثائق Vercel](https://vercel.com/docs)
- [Vercel Node.js Guide](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js) / [دليل Vercel Node.js](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/) / [وثائق MongoDB Atlas](https://docs.atlas.mongodb.com/)

### Getting Help / الحصول على المساعدة
- Vercel Community: [vercel.com/community](https://vercel.com/community)
- GitHub Issues: [Project Issues](https://github.com/Karim-Abdelkareem/Alalamyaa/issues)

---

*نشر ناجح! 🚀 / Successful Deployment! 🚀*
