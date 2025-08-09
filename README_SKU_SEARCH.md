# البحث بواسطة SKU - دليل الاستخدام

## الميزات المضافة

تم إضافة ميزة البحث بواسطة SKU في كل من المنتجات والسلة.

### 1. البحث في المنتجات بواسطة SKU

#### المسار:

```
GET /api/products/search/sku?sku=SKU_VALUE
```

#### المعاملات:

- `sku` (مطلوب): قيمة SKU المطلوب البحث عنها
- `page`: رقم الصفحة (اختياري)
- `limit`: عدد العناصر في الصفحة (اختياري)
- `sort`: ترتيب النتائج (اختياري)
- `fields`: الحقول المطلوبة (اختياري)

#### مثال:

```bash
GET /api/products/search/sku?sku=IPHONE-13-128GB&page=1&limit=10
```

### 2. البحث في السلة بواسطة SKU (للمديرين فقط)

#### المسار:

```
GET /api/cart/admin/search/sku?sku=SKU_VALUE
```

#### المعاملات:

- `sku` (مطلوب): قيمة SKU المطلوب البحث عنها
- `page`: رقم الصفحة (اختياري)
- `limit`: عدد العناصر في الصفحة (اختياري)
- `sort`: ترتيب النتائج (اختياري)
- `fields`: الحقول المطلوبة (اختياري)

#### مثال:

```bash
GET /api/cart/admin/search/sku?sku=IPHONE-13-128GB&page=1&limit=10
```

### 3. البحث العام في المنتجات مع SKU

#### المسار:

```
GET /api/products?sku=SKU_VALUE
```

#### المعاملات:

- `sku` (اختياري): قيمة SKU للبحث
- `keyword` (اختياري): كلمة مفتاحية للبحث في الاسم والوصف
- `categorySlug` (اختياري): slug الفئة
- `brandSlug` (اختياري): slug البراند
- `color` (اختياري): لون المنتج
- `page`: رقم الصفحة (اختياري)
- `limit`: عدد العناصر في الصفحة (اختياري)
- `sort`: ترتيب النتائج (اختياري)
- `fields`: الحقول المطلوبة (اختياري)

#### مثال:

```bash
GET /api/products?sku=IPHONE&keyword=iPhone&categorySlug=phones&page=1&limit=20
```

### 4. البحث العام في السلة مع SKU (للمديرين فقط)

#### المسار:

```
GET /api/cart/admin?sku=SKU_VALUE
```

#### المعاملات:

- `sku` (اختياري): قيمة SKU للبحث
- `page`: رقم الصفحة (اختياري)
- `limit`: عدد العناصر في الصفحة (اختياري)
- `sort`: ترتيب النتائج (اختياري)
- `fields`: الحقول المطلوبة (اختياري)

#### مثال:

```bash
GET /api/cart/admin?sku=IPHONE-13-128GB&page=1&limit=10
```

## التحديثات في الكود

### 1. ملف `features.js`

- إضافة دالة `searchBySku()` للبحث في المنتجات
- إضافة دالة `searchCartBySku()` للبحث في السلة
- تحديث `filter()` لاستبعاد `sku` من الفلترة العادية

### 2. ملف `productController.js`

- إضافة دالة `searchProductsBySku()` للبحث المباشر بواسطة SKU
- تحديث `getAllProducts()` لاستخدام البحث بواسطة SKU

### 3. ملف `cartController.js`

- إضافة دالة `searchCartBySku()` للبحث في السلة بواسطة SKU
- تحديث `getAllCarts()` لاستخدام البحث بواسطة SKU

### 4. ملفات الراوتر

- إضافة مسار `/search/sku` في `productRouter.js`
- إضافة مسار `/admin/search/sku` في `cartRouter.js`

## ملاحظات مهمة

1. البحث بواسطة SKU حساس لحالة الأحرف (case-insensitive)
2. يمكن الجمع بين البحث بواسطة SKU والفلترة الأخرى
3. البحث في السلة متاح للمديرين فقط
4. جميع المسارات تدعم الصفحات والترتيب والفلترة

