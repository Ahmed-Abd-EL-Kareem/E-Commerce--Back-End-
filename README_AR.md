# تنفيذ البحث بواسطة SKU

يتضمن هذا المشروع الآن وظيفة بحث محسنة بواسطة SKU (رمز وحدة المخزون) لكل من المنتجات وسلات التسوق. تم دمج البحث في المسارات الموجودة للحصول على تصميم API أنظف.

## الميزات المضافة

### 1. البحث في المنتجات بواسطة SKU

يمكنك الآن البحث في المنتجات بواسطة SKU باستخدام المسار الموجود:

**المسار:** `GET /api/products`

**معاملات البحث:**

- `sku`: رمز SKU للبحث عنه
- `keyword`: للبحث في الاسم والوصف (اختياري)
- `page`: رقم الصفحة (اختياري، افتراضي: 1)
- `limit`: عدد العناصر في الصفحة (اختياري، افتراضي: 20)
- `sort`: ترتيب النتائج (اختياري)
- `fields`: الحقول المطلوبة (اختياري)

**أمثلة:**

```bash
# البحث عن منتج بواسطة SKU
GET /api/products?sku=IPHONE-13-128GB-BLACK

# البحث مع فلترة إضافية
GET /api/products?sku=IPHONE&category=electronics&sort=price

# البحث مع ترقيم الصفحات
GET /api/products?sku=SAMSUNG&page=1&limit=10
```

### 2. البحث في سلات التسوق بواسطة SKU (للمدير فقط)

يمكنك البحث في سلات التسوق بواسطة SKU باستخدام مسار المدير الموجود:

**المسار:** `GET /api/cart/admin`

**معاملات البحث:**

- `sku`: رمز SKU للبحث عنه
- `page`: رقم الصفحة (اختياري، افتراضي: 1)
- `limit`: عدد العناصر في الصفحة (اختياري، افتراضي: 20)
- `sort`: ترتيب النتائج (اختياري)
- `fields`: الحقول المطلوبة (اختياري)

**أمثلة:**

```bash
# البحث في سلات التسوق بواسطة SKU
GET /api/cart/admin?sku=IPHONE-13-128GB-BLACK

# البحث مع ترقيم الصفحات
GET /api/cart/admin?sku=SAMSUNG&page=1&limit=5
```

## تحديثات الكود

### 1. الملف: `src/utils/features.js`

تم إضافة طريقتين جديدتين للبحث بواسطة SKU:

```javascript
// البحث بواسطة SKU في المنتجات
searchBySku() {
  if (this.queryString.sku) {
    const sku = this.queryString.sku;
    this.mongooseQuery = this.mongooseQuery.find({
      "variants.options.sku": { $regex: sku, $options: "i" },
    });
  }
  return this;
}

// البحث بواسطة SKU في سلات التسوق
searchCartBySku() {
  if (this.queryString.sku) {
    const sku = this.queryString.sku;
    this.mongooseQuery = this.mongooseQuery.find({
      "items.sku": { $regex: sku, $options: "i" },
    });
  }
  return this;
}
```

### 2. الملف: `src/modules/product/productController.js`

تم تحديث دالة `getAllProducts` لتشمل البحث بواسطة SKU:

```javascript
const features = new Features(Product.find(), filteredQuery)
  .filter()
  .search()
  .searchBySku() // تم إضافة البحث بواسطة SKU
  .sort()
  .pagination()
  .fields();
```

### 3. الملف: `src/modules/cart/cartController.js`

تم تحديث دالة `getAllCarts` لتشمل البحث بواسطة SKU:

```javascript
const features = new Features(Cart.find(), req.query)
  .filter()
  .searchCartBySku() // تم إضافة البحث بواسطة SKU
  .sort()
  .pagination()
  .fields();
```

## كيفية الاستخدام

### للبحث في المنتجات:

```bash
curl "http://localhost:3000/api/products?sku=IPHONE-13"
```

### للبحث في سلات التسوق (للمدير فقط):

```bash
curl "http://localhost:3000/api/cart/admin?sku=IPHONE-13" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## ملاحظات مهمة

1. **غير حساس لحالة الأحرف**: يمكنك البحث بـ "iphone" أو "IPHONE" أو "iPhone"
2. **البحث الجزئي**: يمكنك البحث عن جزء من SKU مثل "IPHONE" للعثور على جميع منتجات iPhone
3. **متوافق مع الميزات الموجودة**: البحث بواسطة SKU يعمل مع جميع ميزات الفلترة والترتيب الموجودة
4. **الأمان**: البحث في سلات التسوق متاح للمديرين فقط

## تنسيق الاستجابة

ستحصل على استجابة بنفس تنسيق المسارات الموجودة مع إضافة نتائج البحث بواسطة SKU.

## معالجة الأخطاء

يتضمن التنفيذ معالجة مناسبة للأخطاء باستخدام أدوات `AppError` و `asyncHandler` الموجودة لإدارة الأخطاء المتسقة عبر التطبيق.

## متطلبات مخطط قاعدة البيانات

لكي تعمل هذه الوظيفة بشكل صحيح، تأكد من أن مخطط قاعدة البيانات يتضمن:

- **المنتجات**: حقل `variants.options.sku` لمتغيرات المنتج
- **سلات التسوق**: حقل `items.sku` لعناصر سلة التسوق

## الاختبار

لاختبار التنفيذ:

1. ابدأ الخادم
2. استخدم أوامر curl المقدمة أو أداة اختبار API المفضلة لديك
3. تحقق من أن البحث بواسطة SKU يعيد النتائج المتوقعة
4. اختبر بأنماط SKU مختلفة (تطابق دقيق، تطابق جزئي، تغييرات حالة الأحرف)

## التحسينات المستقبلية

التحسينات المحتملة للمستقبل:

- إضافة البحث بواسطة SKU لكيانات أخرى (الطلبات، الفئات، إلخ)
- تنفيذ البحث الضبابي لمطابقة أفضل
- إضافة تمييز نتائج البحث
- تنفيذ تحليلات البحث واتجاهات SKU

