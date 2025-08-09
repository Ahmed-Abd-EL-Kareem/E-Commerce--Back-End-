# E-Commerce Backend API / واجهة برمجة تطبيقات التجارة الإلكترونية

🛍️ **Alalamyaa E-Commerce Backend** - A comprehensive RESTful API built with Node.js and Express for managing e-commerce operations.

🛍️ **واجهة برمجة تطبيقات العلامية للتجارة الإلكترونية** - واجهة برمجة تطبيقات REST شاملة مبنية بـ Node.js و Express لإدارة عمليات التجارة الإلكترونية.

---

## 🚀 Overview / نظرة عامة

This backend API provides a complete e-commerce solution with features including user authentication, product management, category organization, shopping cart functionality, order processing, and file uploads with cloud storage integration.

توفر واجهة برمجة التطبيقات هذه حلاً شاملاً للتجارة الإلكترونية مع ميزات تشمل مصادقة المستخدمين وإدارة المنتجات وتنظيم الفئات ووظائف سلة التسوق ومعالجة الطلبات ورفع الملفات مع تكامل التخزين السحابي.

---

## ✨ Features / الميزات

### 🔐 Authentication & Authorization / المصادقة والتفويض

- User registration and login / تسجيل المستخدمين وتسجيل الدخول
- JWT-based authentication / مصادقة قائمة على JWT
- Role-based access control (Admin/User) / التحكم في الوصول حسب الدور (مدير/مستخدم)
- Secure password hashing with bcrypt / تشفير كلمات المرور الآمن مع bcrypt

### 👥 User Management / إدارة المستخدمين

- User profile management / إدارة ملفات المستخدمين الشخصية
- User CRUD operations / عمليات إنشاء وقراءة وتحديث وحذف المستخدمين
- Admin user management / إدارة المستخدمين للمديرين

### 🏷️ Product Catalog / كتالوج المنتجات

- **Products** with variants and SKU support / **المنتجات** مع متغيرات ودعم SKU
- **Categories** with hierarchical structure / **الفئات** مع هيكل هرمي
- **Subcategories** and **Sub-subcategories** / **الفئات الفرعية** و**الفئات الفرعية الثانوية**
- **Brands** management / إدارة **العلامات التجارية**
- Advanced search and filtering / البحث والفلترة المتقدمة
- **SKU-based search functionality** / **وظيفة البحث بواسطة SKU**

### 🛒 Shopping Cart / سلة التسوق

- Add/remove items from cart / إضافة/إزالة العناصر من السلة
- Update item quantities / تحديث كميات العناصر
- Cart persistence for logged-in users / استمرارية السلة للمستخدمين المسجلين
- SKU-based cart search (Admin) / البحث في السلة بواسطة SKU (للمديرين)

### 📦 Order Management / إدارة الطلبات

- Order creation and processing / إنشاء ومعالجة الطلبات
- Order status tracking / تتبع حالة الطلبات
- Order history for users / تاريخ الطلبات للمستخدمين
- Admin order management / إدارة الطلبات للمديرين

### 📸 File Upload & Storage / رفع الملفات والتخزين

- Cloudinary integration for image storage / تكامل Cloudinary لتخزين الصور
- Secure file upload handling / معالجة آمنة لرفع الملفات
- Image optimization and transformation / تحسين وتحويل الصور

---

## 🛠️ Tech Stack / المكدس التقني

### Backend Technologies / تقنيات الخلفية

- **Node.js** - JavaScript runtime / بيئة تشغيل JavaScript
- **Express.js** - Web application framework / إطار عمل تطبيقات الويب
- **MongoDB** - NoSQL database / قاعدة بيانات NoSQL
- **Mongoose** - MongoDB object modeling / نمذجة كائنات MongoDB

### Authentication & Security / المصادقة والأمان

- **JWT** (jsonwebtoken) - Token-based authentication / مصادقة قائمة على الرموز
- **bcrypt** - Password hashing / تشفير كلمات المرور
- **CORS** - Cross-origin resource sharing / مشاركة الموارد عبر الأصول المختلفة

### File Handling / معالجة الملفات

- **Multer** - File upload middleware / وسطاء رفع الملفات
- **Cloudinary** - Cloud storage service / خدمة التخزين السحابي
- **multer-storage-cloudinary** - Cloudinary storage engine / محرك تخزين Cloudinary

### Utilities / المرافق

- **slugify** - URL-friendly string conversion / تحويل النصوص لنصوص ملائمة للروابط
- **express-async-handler** - Async error handling / معالجة الأخطاء غير المتزامنة
- **cookie-parser** - Cookie parsing middleware / وسطاء تحليل ملفات تعريف الارتباط
- **dotenv** - Environment variables / متغيرات البيئة

---

## 📁 Project Structure / هيكل المشروع

```
Backend/
├── index.js                 # Application entry point / نقطة دخول التطبيق
├── index.routes.js          # Route initialization / تهيئة المسارات
├── package.json             # Dependencies / التبعيات
├── .env                     # Environment variables / متغيرات البيئة
└── src/
    ├── config/              # Configuration files / ملفات التكوين
    │   ├── db.js           # Database connection / اتصال قاعدة البيانات
    │   └── cloudinary.js   # Cloudinary config / تكوين Cloudinary
    ├── middleware/          # Custom middleware / الوسطاء المخصصة
    │   ├── authorization.js # Auth middleware / وسطاء المصادقة
    │   └── globalErrorHandler.js # Error handling / معالجة الأخطاء
    ├── modules/             # Feature modules / وحدات الميزات
    │   ├── auth/           # Authentication / المصادقة
    │   ├── user/           # User management / إدارة المستخدمين
    │   ├── product/        # Product management / إدارة المنتجات
    │   ├── category/       # Category management / إدارة الفئات
    │   ├── subcategory/    # Subcategory management / إدارة الفئات الفرعية
    │   ├── sub-subcategory/ # Sub-subcategory management / إدارة الفئات الفرعية الثانوية
    │   ├── brand/          # Brand management / إدارة العلامات التجارية
    │   ├── cart/           # Shopping cart / سلة التسوق
    │   ├── order/          # Order management / إدارة الطلبات
    │   └── uploads/        # File uploads / رفع الملفات
    └── utils/              # Utility functions / وظائف المرافق
        ├── appError.js     # Custom error class / فئة الأخطاء المخصصة
        ├── features.js     # Query features / ميزات الاستعلام
        └── feature.js      # Feature utilities / مرافق الميزات
```

---

## 🚀 Quick Start / البداية السريعة

### Prerequisites / المتطلبات المسبقة

- Node.js (v16 or higher) / Node.js (الإصدار 16 أو أحدث)
- MongoDB database / قاعدة بيانات MongoDB
- Cloudinary account (for file uploads) / حساب Cloudinary (لرفع الملفات)

### Installation / التثبيت

1. **Clone the repository / استنساخ المستودع**

```bash
git clone https://github.com/Karim-Abdelkareem/Alalamyaa.git
cd Backend
```

2. **Install dependencies / تثبيت التبعيات**

```bash
npm install
```

3. **Set up environment variables / إعداد متغيرات البيئة**
   Create a `.env` file in the root directory / إنشاء ملف `.env` في المجلد الجذر:

```env
PORT=5000
DB_CONNECTION_STRING=mongodb://localhost:27017/alalamyaa
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. **Start the development server / بدء خادم التطوير**

```bash
npm run dev
```

The server will start on `http://localhost:5000` / سيبدأ الخادم على `http://localhost:5000`

---

## 📚 API Endpoints / نقاط النهاية للـ API

### 🔐 Authentication / المصادقة

```
POST   /api/auth/register     # User registration / تسجيل المستخدم
POST   /api/auth/login        # User login / تسجيل دخول المستخدم
POST   /api/auth/logout       # User logout / تسجيل خروج المستخدم
GET    /api/check-auth        # Check authentication status / فحص حالة المصادقة
```

### 👥 Users / المستخدمون

```
GET    /api/users             # Get all users (Admin) / الحصول على جميع المستخدمين (المدير)
GET    /api/users/:id         # Get user by ID / الحصول على المستخدم بالمعرف
PUT    /api/users/:id         # Update user / تحديث المستخدم
DELETE /api/users/:id         # Delete user / حذف المستخدم
```

### 🛍️ Products / المنتجات

```
GET    /api/product           # Get all products / الحصول على جميع المنتجات
GET    /api/product/:id       # Get product by ID / الحصول على المنتج بالمعرف
POST   /api/product           # Create product (Admin) / إنشاء منتج (المدير)
PUT    /api/product/:id       # Update product (Admin) / تحديث المنتج (المدير)
DELETE /api/product/:id       # Delete product (Admin) / حذف المنتج (المدير)
```

### 📂 Categories / الفئات

```
GET    /api/categories        # Get all categories / الحصول على جميع الفئات
GET    /api/categories/:id    # Get category by ID / الحصول على الفئة بالمعرف
POST   /api/categories        # Create category (Admin) / إنشاء فئة (المدير)
PUT    /api/categories/:id    # Update category (Admin) / تحديث الفئة (المدير)
DELETE /api/categories/:id    # Delete category (Admin) / حذف الفئة (المدير)
```

### 📂 Subcategories / الفئات الفرعية

```
GET    /api/subcategory       # Get all subcategories / الحصول على جميع الفئات الفرعية
GET    /api/subcategory/:id   # Get subcategory by ID / الحصول على الفئة الفرعية بالمعرف
POST   /api/subcategory       # Create subcategory (Admin) / إنشاء فئة فرعية (المدير)
PUT    /api/subcategory/:id   # Update subcategory (Admin) / تحديث الفئة الفرعية (المدير)
DELETE /api/subcategory/:id   # Delete subcategory (Admin) / حذف الفئة الفرعية (المدير)
```

### 📂 Sub-subcategories / الفئات الفرعية الثانوية

```
GET    /api/subsubcategory    # Get all sub-subcategories / الحصول على جميع الفئات الفرعية الثانوية
GET    /api/subsubcategory/:id # Get sub-subcategory by ID / الحصول على الفئة الفرعية الثانوية بالمعرف
POST   /api/subsubcategory    # Create sub-subcategory (Admin) / إنشاء فئة فرعية ثانوية (المدير)
PUT    /api/subsubcategory/:id # Update sub-subcategory (Admin) / تحديث الفئة الفرعية الثانوية (المدير)
DELETE /api/subsubcategory/:id # Delete sub-subcategory (Admin) / حذف الفئة الفرعية الثانوية (المدير)
```

### 🏷️ Brands / العلامات التجارية

```
GET    /api/brand             # Get all brands / الحصول على جميع العلامات التجارية
GET    /api/brand/:id         # Get brand by ID / الحصول على العلامة التجارية بالمعرف
POST   /api/brand             # Create brand (Admin) / إنشاء علامة تجارية (المدير)
PUT    /api/brand/:id         # Update brand (Admin) / تحديث العلامة التجارية (المدير)
DELETE /api/brand/:id         # Delete brand (Admin) / حذف العلامة التجارية (المدير)
```

### 🛒 Cart / سلة التسوق

```
GET    /api/cart              # Get user cart / الحصول على سلة المستخدم
POST   /api/cart              # Add item to cart / إضافة عنصر إلى السلة
PUT    /api/cart/:id          # Update cart item / تحديث عنصر السلة
DELETE /api/cart/:id          # Remove item from cart / إزالة عنصر من السلة
GET    /api/cart/admin        # Get all carts (Admin) / الحصول على جميع السلات (المدير)
```

### 📦 Orders / الطلبات

```
GET    /api/orders            # Get user orders / الحصول على طلبات المستخدم
GET    /api/orders/:id        # Get order by ID / الحصول على الطلب بالمعرف
POST   /api/orders            # Create order / إنشاء طلب
PUT    /api/orders/:id        # Update order status (Admin) / تحديث حالة الطلب (المدير)
DELETE /api/orders/:id        # Cancel order / إلغاء الطلب
```

### 📸 File Upload / رفع الملفات

```
POST   /api/upload            # Upload file / رفع ملف
DELETE /api/upload/:id        # Delete file / حذف ملف
```

---

## 🔍 Advanced Search Features / ميزات البحث المتقدمة

### Product Search / البحث في المنتجات

You can search products using various parameters / يمكنك البحث في المنتجات باستخدام معاملات مختلفة:

**Search by SKU / البحث بواسطة SKU:**

```
GET /api/product?sku=IPHONE-13-128GB-BLACK
```

**Search by keyword / البحث بالكلمة المفتاحية:**

```
GET /api/product?keyword=smartphone
```

**Combined search with filtering / البحث المدمج مع الفلترة:**

```
GET /api/product?sku=IPHONE&category=electronics&sort=price&page=1&limit=10
```

### Cart Search (Admin Only) / البحث في السلة (للمديرين فقط)

```
GET /api/cart/admin?sku=IPHONE-13-128GB-BLACK
```

### Search Parameters / معاملات البحث

- `sku` - Search by SKU code / البحث بواسطة رمز SKU
- `keyword` - Search in name and description / البحث في الاسم والوصف
- `page` - Page number (default: 1) / رقم الصفحة (افتراضي: 1)
- `limit` - Items per page (default: 20) / عدد العناصر في الصفحة (افتراضي: 20)
- `sort` - Sort results / ترتيب النتائج
- `fields` - Select specific fields / تحديد حقول معينة

---

## 🔒 Security Features / ميزات الأمان

- **JWT Authentication** - Secure token-based authentication / مصادقة آمنة قائمة على الرموز
- **Password Hashing** - bcrypt password encryption / تشفير كلمات المرور بـ bcrypt
- **CORS Protection** - Cross-origin request security / أمان طلبات الأصول المختلفة
- **Role-based Access** - Admin and user role permissions / أذونات أدوار المدير والمستخدم
- **Input Validation** - Request data validation / التحقق من صحة بيانات الطلبات
- **Error Handling** - Comprehensive error management / إدارة شاملة للأخطاء

---

## 🌐 CORS Configuration / تكوين CORS

The API is configured to accept requests from / واجهة برمجة التطبيقات مُكوَّنة لقبول الطلبات من:

- `http://localhost:5173` (Vite dev server)
- `http://localhost:5174` (Alternative port)

---

## 📝 Environment Variables / متغيرات البيئة

Required environment variables / متغيرات البيئة المطلوبة:

```env
# Server Configuration / تكوين الخادم
PORT=5000

# Database / قاعدة البيانات
DB_CONNECTION_STRING=mongodb://localhost:27017/alalamyaa

# JWT Authentication / مصادقة JWT
JWT_SECRET=your_secret_key_here

# Cloudinary (File Upload) / Cloudinary (رفع الملفات)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 🧪 Development / التطوير

### Running in Development Mode / التشغيل في وضع التطوير

```bash
npm run dev
```

This uses nodemon for automatic server restart on file changes / يستخدم هذا nodemon لإعادة تشغيل الخادم تلقائياً عند تغيير الملفات.

### Available Scripts / النصوص المتوفرة

```bash
npm run dev    # Start development server / بدء خادم التطوير
npm test       # Run tests (to be implemented) / تشغيل الاختبارات (سيتم تنفيذها)
```

---

## 🐛 Error Handling / معالجة الأخطاء

The API includes comprehensive error handling / تتضمن واجهة برمجة التطبيقات معالجة شاملة للأخطاء:

- **Global Error Handler** - Centralized error management / معالجة مركزية للأخطاء
- **Custom AppError Class** - Structured error responses / استجابات أخطاء منظمة
- **Async Error Handling** - Automatic async error catching / التقاط تلقائي للأخطاء غير المتزامنة
- **404 Route Handler** - Handles undefined routes / معالجة المسارات غير المعرفة

---

## 📊 Response Format / تنسيق الاستجابة

### Success Response / الاستجابة الناجحة

```json
{
  "success": true,
  "data": {
    // Response data / بيانات الاستجابة
  },
  "message": "Operation successful"
}
```

### Error Response / استجابة الخطأ

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "statusCode": 400
  }
}
```

---

## 🤝 Contributing / المساهمة

1. Fork the repository / انسخ المستودع
2. Create a feature branch / أنشئ فرع ميزة
3. Commit your changes / أرسل تغييراتك
4. Push to the branch / ادفع إلى الفرع
5. Open a Pull Request / افتح طلب سحب

---

## 📄 License / الترخيص

This project is licensed under the ISC License / هذا المشروع مرخص تحت ترخيص ISC.

---

## 📞 Support / الدعم

For support and questions / للدعم والأسئلة:

- GitHub Issues: [Create an issue](https://github.com/Karim-Abdelkareem/Alalamyaa/issues)
- Repository: [GitHub Repository](https://github.com/Karim-Abdelkareem/Alalamyaa)

---

## 🔄 Version / الإصدار

Current Version: **1.0.0** / الإصدار الحالي: **1.0.0**

---

_Built with ❤️ using Node.js and Express / مبني بـ ❤️ باستخدام Node.js و Express_
