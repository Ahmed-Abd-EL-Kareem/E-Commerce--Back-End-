# Database Connection Fix for Vercel / إصلاح اتصال قاعدة البيانات لـ Vercel

## مشكلة / Problem

```
{"status":"error","message":"Operation `products.find()` buffering timed out after 10000ms"}
```

هذه المشكلة تحدث في بيئة serverless لأن اتصال قاعدة البيانات ينقطع بين الطلبات.

This issue occurs in serverless environments because database connections drop between requests.

---

## الحلول المطبقة / Applied Solutions

### 1. تحسين إعدادات الاتصال / Optimized Connection Settings

**File: `src/config/db.js`**

```javascript
// إعدادات محسنة للـ serverless functions
const connection = await mongoose.connect(dbURI, {
  maxPoolSize: 10, // أقصى عدد اتصالات
  serverSelectionTimeoutMS: 5000, // مهلة اختيار الخادم
  socketTimeoutMS: 45000, // مهلة المقبس
  family: 4, // استخدام IPv4
  bufferCommands: false, // تعطيل التخزين المؤقت
  bufferMaxEntries: 0, // تعطيل التخزين المؤقت
});
```

### 2. معالجة أفضل للأخطاء / Better Error Handling

- دعم متغيرات بيئة متعددة (`DBURL_PROD` و `DB_CONNECTION_STRING`)
- معالجة أخطاء أفضل مع رسائل واضحة
- تسجيل تفصيلي للاتصالات

### 3. Middleware للاتصال / Connection Middleware

**File: `src/middleware/dbConnection.js`**

- فحص حالة الاتصال قبل كل طلب
- إعادة الاتصال التلقائي إذا انقطع
- معالجة أخطاء على مستوى الطلب

### 4. تحديث CORS للإنتاج / Production CORS Update

```javascript
origin: [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://e-commerce-back-65kq8vo9l-ahmeds-projects-e9ff88c7.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);
```

---

## متغيرات البيئة المطلوبة / Required Environment Variables

في Vercel Dashboard، أضف / In Vercel Dashboard, add:

```env
# Database (اختر واحد / choose one)
DBURL_PROD=mongodb+srv://username:password@cluster.mongodb.net/database
# أو / or
DB_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Security
JWT_SECRET=your_very_secure_secret_key_here

# Cloudinary (للصور / for images)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend (اختياري / optional)
FRONTEND_URL=https://your-frontend-domain.com
```

---

## MongoDB Atlas Setup / إعداد MongoDB Atlas

### 1. إعدادات الشبكة / Network Settings

```
IP Access List: 0.0.0.0/0 (Allow all)
```

### 2. Database User / مستخدم قاعدة البيانات

```
- Username: [your-username]
- Password: [strong-password]
- Roles: Read and write to any database
```

### 3. Connection String / نص الاتصال

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

---

## اختبار الحل / Testing the Solution

### 1. Local Test / اختبار محلي

```bash
npm run dev
curl http://localhost:5000/api/product
```

### 2. Production Test / اختبار الإنتاج

```bash
curl https://your-app.vercel.app/api/product
```

### 3. Health Check / فحص الصحة

```bash
curl https://your-app.vercel.app/
# Should return: "API is running..."
```

---

## خطوات النشر / Deployment Steps

1. **إضافة متغيرات البيئة / Add Environment Variables**

   - اذهب إلى Vercel Dashboard / Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - أضف جميع المتغيرات أعلاه / Add all variables above

2. **إعادة النشر / Redeploy**

```bash
git add .
git commit -m "Fix database connection for serverless"
git push origin main
```

أو / Or:

```bash
vercel --prod
```

3. **التحقق من السجلات / Check Logs**
   - في Vercel Dashboard / In Vercel Dashboard
   - Functions → View Function Logs
   - ابحث عن "✅ Database connected successfully"

---

## استكشاف الأخطاء / Troubleshooting

### خطأ: Database URI not found / Database URI not found Error

```
✅ تأكد من إضافة DBURL_PROD أو DB_CONNECTION_STRING في Vercel
✅ Make sure to add DBURL_PROD or DB_CONNECTION_STRING in Vercel
```

### خطأ: MongoServerSelectionError / MongoServerSelectionError

```
✅ تحقق من إعدادات IP Access List في MongoDB Atlas
✅ Check IP Access List settings in MongoDB Atlas
✅ تأكد من صحة اسم المستخدم وكلمة المرور
✅ Verify username and password are correct
```

### خطأ: Connection timeout / Connection timeout

```
✅ تحقق من استقرار اتصال الإنترنت لـ MongoDB Atlas
✅ Check MongoDB Atlas internet connectivity
✅ جرب cluster في منطقة أقرب
✅ Try a cluster in a closer region
```

### خطأ: option buffermaxentries is not supported / option buffermaxentries is not supported

```
✅ تم إصلاح هذا الخطأ بإزالة الخيارات المتقدمة
✅ This error has been fixed by removing advanced options
✅ استخدام إعدادات اتصال بسيطة ومستقرة
✅ Using simple and stable connection settings
```

---

## الفوائد / Benefits

- ✅ **استقرار أفضل** / Better Stability
- ✅ **أداء محسن** / Improved Performance
- ✅ **معالجة أخطاء أفضل** / Better Error Handling
- ✅ **تتبع أفضل** / Better Monitoring
- ✅ **توافق مع Serverless** / Serverless Compatible

---

_تم إصلاح المشكلة! 🚀 / Problem Fixed! 🚀_
