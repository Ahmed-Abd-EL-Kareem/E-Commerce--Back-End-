# SKU Search Implementation

This project now includes enhanced search functionality by SKU (Stock Keeping Unit) for both products and carts. The search has been integrated into existing routes for a cleaner API design.

## Features Added

### 1. Product Search by SKU

You can now search products by SKU using the existing route:

**Route:** `GET /api/products`

**Search Parameters:**

- `sku`: The SKU code to search for
- `keyword`: For searching in name and description (optional)
- `page`: Page number (optional, default: 1)
- `limit`: Items per page (optional, default: 20)
- `sort`: Sort results (optional)
- `fields`: Required fields (optional)

**Examples:**

```bash
# Search for a product by SKU
GET /api/products?sku=IPHONE-13-128GB-BLACK

# Search with additional filtering
GET /api/products?sku=IPHONE&category=electronics&sort=price

# Search with pagination
GET /api/products?sku=SAMSUNG&page=1&limit=10
```

### 2. Cart Search by SKU (Admin Only)

You can search carts by SKU using the existing admin route:

**Route:** `GET /api/cart/admin`

**Search Parameters:**

- `sku`: The SKU code to search for
- `page`: Page number (optional, default: 1)
- `limit`: Items per page (optional, default: 20)
- `sort`: Sort results (optional)
- `fields`: Required fields (optional)

**Examples:**

```bash
# Search carts by SKU
GET /api/cart/admin?sku=IPHONE-13-128GB-BLACK

# Search with pagination
GET /api/cart/admin?sku=SAMSUNG&page=1&limit=5
```

## Code Updates

### 1. File: `src/utils/features.js`

Added two new methods for SKU-based searching:

```javascript
// Search by SKU in products
searchBySku() {
  if (this.queryString.sku) {
    const sku = this.queryString.sku;
    this.mongooseQuery = this.mongooseQuery.find({
      "variants.options.sku": { $regex: sku, $options: "i" },
    });
  }
  return this;
}

// Search by SKU in carts
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

### 2. File: `src/modules/product/productController.js`

Updated the `getAllProducts` function to include SKU search:

```javascript
const features = new Features(Product.find(), filteredQuery)
  .filter()
  .search()
  .searchBySku() // Added SKU search
  .sort()
  .pagination()
  .fields();
```

### 3. File: `src/modules/cart/cartController.js`

Updated the `getAllCarts` function to include SKU search:

```javascript
const features = new Features(Cart.find(), req.query)
  .filter()
  .searchCartBySku() // Added SKU search
  .sort()
  .pagination()
  .fields();
```

## How to Use

### For Product Search:

```bash
curl "http://localhost:3000/api/products?sku=IPHONE-13"
```

### For Cart Search (Admin Only):

```bash
curl "http://localhost:3000/api/cart/admin?sku=IPHONE-13" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Important Notes

1. **Case Insensitive**: You can search with "iphone" or "IPHONE" or "iPhone"
2. **Partial Search**: You can search for part of a SKU like "IPHONE" to find all iPhone products
3. **Compatible with Existing Features**: SKU search works with all existing filtering and sorting features
4. **Security**: Cart search is only available to admins

## Response Format

You'll get a response in the same format as existing routes with the addition of SKU search results.

## Error Handling

The implementation includes proper error handling using the existing `AppError` and `asyncHandler` utilities for consistent error management across the application.

## Database Schema Requirements

For this functionality to work properly, ensure your database schema includes:

- **Products**: `variants.options.sku` field for product variants
- **Carts**: `items.sku` field for cart items

## Testing

To test the implementation:

1. Start your server
2. Use the provided curl commands or your preferred API testing tool
3. Verify that SKU search returns the expected results
4. Test with different SKU patterns (exact match, partial match, case variations)

## Future Enhancements

Potential improvements for the future:

- Add SKU search to other entities (orders, categories, etc.)
- Implement fuzzy search for better matching
- Add search result highlighting
- Implement search analytics and trending SKUs

