// import asyncHandler from "express-async-handler";
// import { AppError } from "../../utils/appError.js";
// import Cart from "./cartModel.js";
// import Product from "../product/productModel.js";

// // Helper function to get localized response based on Accept-Language header
// const getLocalizedResponse = (req, cart) => {
//   const lang = req.headers["accept-language"]?.startsWith("ar") ? "ar" : "en";
//   const cartObj = cart.toObject();

//   // Add localized display fields
//   if (cart.statusDisplay) {
//     cartObj.statusText = cart.statusDisplay[lang];
//   }

//   // Add localized discount text
//   if (cart.discountText) {
//     cartObj.discountMessage = cart.discountText[lang];
//   }

//   // Add localized notes if they exist
//   if (cart.notes && cart.notes[lang]) {
//     cartObj.notesText = cart.notes[lang];
//   }

//   // Add localized discount description if it exists
//   if (cart.discountDescription && cart.discountDescription[lang]) {
//     cartObj.discountDescriptionText = cart.discountDescription[lang];
//   }

//   return cartObj;
// };

// // export const getCart = asyncHandler(async (req, res, next) => {
// //   let cart = await Cart.findOne({ user: req.user._id }).populate({
// //     path: "items.product",
// //     select: "name price images stock",
// //   });

// //   if (!cart) {
// //     // If no cart exists, create an empty one
// //     const newCart = new Cart({
// //       user: req.user._id,
// //       items: [],
// //       totalPrice: 0,
// //       discount: 0,
// //     });
// //     await newCart.save();
// //     return res.json({
// //       status: "success",
// //       data: {
// //         items: [],
// //         totalPrice: 0,
// //         discount: 0,
// //         totalPriceAfterDiscount: 0,
// //         discountMessage: req.headers["accept-language"]?.startsWith("ar")
// //           ? "لم يتم تطبيق أي خصم"
// //           : "No discount applied",
// //       },
// //     });
// //   }

// //   const localizedCart = getLocalizedResponse(req, cart);

// //   res.json({
// //     status: "success",
// //     data: {
// //       items: localizedCart.items,
// //       totalPrice: localizedCart.totalPrice,
// //       discount: localizedCart.discount,
// //       totalPriceAfterDiscount: localizedCart.totalPriceAfterDiscount,
// //       discountMessage: localizedCart.discountMessage,
// //       statusText: localizedCart.statusText,
// //       notesText: localizedCart.notesText,
// //       discountDescriptionText: localizedCart.discountDescriptionText,
// //     },
// //   });
// // });

// export const getCart = asyncHandler(async (req, res, next) => {
//   const cart = await Cart.findOne({ user: req.user._id }).populate({
//     path: "items.product",
//     select: "name images variants",
//   });

//   if (!cart) {
//     const newCart = new Cart({
//       user: req.user._id,
//       items: [],
//     });
//     await newCart.save();
//     return res.json({
//       status: "success",
//       data: {
//         items: [],
//         totalPrice: 0,
//       },
//     });
//   }

//   const language = req.headers["accept-language"]?.startsWith("ar")
//     ? "ar"
//     : "en";

//   const enrichedItems = [];
//   let grandTotal = 0;

//   for (const item of cart.items) {
//     const product = item.product;

//     // Find variant option by SKU
//     let matchedOption = null;
//     let matchedVariant = null;

//     // Search through all variants and options
//     for (const variant of product?.variants || []) {
//       matchedOption = variant.options?.find((opt) => opt.sku === item.sku);
//       if (matchedOption) {
//         matchedVariant = variant;
//         break;
//       }
//     }

//     if (!matchedOption) continue;

//     const price = matchedOption.priceAfterDiscount || matchedOption.price;
//     const totalPrice = price * item.quantity;
//     grandTotal += totalPrice;

//     // Get all variant images for this option
//     const variantImages = matchedOption.variantImages || [];

//     // Get product images as fallback
//     const productImages = product.images || [];

//     enrichedItems.push({
//       _id: item._id,
//       productId: product._id,
//       sku: item.sku,
//       quantity: item.quantity,
//       notes: item.notes,
//       productName: product.name,
//       // Return all variant images if available, otherwise product images
//       images: variantImages.length > 0 ? variantImages : productImages,
//       price,
//       totalPrice,
//       variant: {
//         label: matchedOption.value,
//         color: matchedOption.colorName,
//         colorHex: matchedOption.colorHex,
//         storage: matchedOption.storage,
//         ram: matchedOption.ram,
//         stock: matchedOption.stock,
//         // Include the parent variant name
//         type: matchedVariant?.name,
//       },
//     });
//   }

//   res.json({
//     status: "success",
//     results: enrichedItems.length,
//     data: {
//       items: enrichedItems,
//       totalPrice: grandTotal,
//     },
//   });
// });
// // export const addToCart = asyncHandler(async (req, res, next) => {
// //   const { items, notes } = req.body;

// //   // Validate input
// //   if (!items || !Array.isArray(items) || items.length === 0) {
// //     return next(new AppError("Items array is required", 400));
// //   }

// //   // Find or create cart
// //   let cart = await Cart.findOne({ user: req.user._id });
// //   if (!cart) {
// //     cart = new Cart({
// //       user: req.user._id,
// //       items: [],
// //       totalPrice: 0,
// //       discount: 0
// //     });
// //   }

// //   // Add cart-level notes if provided
// //   if (notes) {
// //     cart.notes = notes;
// //   }

// //   // Process each item
// //   for (const item of items) {
// //     const { product, quantity, price, notes: itemNotes } = item;

// //     // Validate item data
// //     if (!product || !quantity || !price) {
// //       return next(new AppError("Product, quantity, and price are required for each item", 400));
// //     }

// //     // Check if product exists
// //     const productExists = await Product.findById(product);
// //     if (!productExists) {
// //       return next(new AppError(`Product with ID ${product} not found`, 404));
// //     }

// //     // Check stock
// //     if (productExists.stock < quantity) {
// //       return next(new AppError(`Not enough stock available for product ${product}`, 400));
// //     }

// //     // Update or add item using the model method
// //     await cart.addItem(product, quantity, price, itemNotes);
// //   }

// //   // Populate product details
// //   cart = await cart.populate({
// //     path: "items.product",
// //     select: "name price images stock"
// //   });

// //   const localizedCart = getLocalizedResponse(req, cart);

// //   res.status(201).json({
// //     status: "success",
// //     data: {
// //       items: localizedCart.items,
// //       totalPrice: localizedCart.totalPrice,
// //       discount: localizedCart.discount,
// //       totalPriceAfterDiscount: localizedCart.totalPriceAfterDiscount,
// //       discountMessage: localizedCart.discountMessage,
// //       statusText: localizedCart.statusText,
// //       notesText: localizedCart.notesText
// //     }
// //   });
// // });
// export const addToCart = asyncHandler(async (req, res, next) => {
//   const { items, notes } = req.body;

//   if (!items || !Array.isArray(items) || items.length === 0) {
//     return next(new AppError("Items array is required", 400));
//   }

//   let cart = await Cart.findOne({ user: req.user._id });
//   if (!cart) {
//     cart = new Cart({
//       user: req.user._id,
//       items: [],
//       totalPrice: 0,
//       discount: 0,
//     });
//   }

//   // Clean existing items without SKU
//   cart.items = cart.items.filter((item) => item.sku && item.sku.trim() !== "");

//   if (notes) {
//     cart.notes = notes;
//   }

//   for (const item of items) {
//     // Remove 'price' from destructuring since it's not used
//     const { product, quantity, sku, notes: itemNotes } = item;

//     if (!product || !quantity || !sku) {
//       return next(
//         new AppError(
//           "Product, quantity, and SKU are required for each item",
//           400
//         )
//       );
//     }

//     const productExists = await Product.findById(product);
//     if (!productExists) {
//       return next(new AppError(`Product with ID ${product} not found`, 404));
//     }

//     // Validate SKU exists in product variants
//     let skuValid = false;
//     for (const variant of productExists.variants) {
//       if (variant.options?.some((option) => option.sku === sku)) {
//         skuValid = true;
//         break;
//       }
//     }

//     if (!skuValid) {
//       return next(
//         new AppError(`SKU ${sku} is not valid for product ${product}`, 400)
//       );
//     }

//     // FIX: Remove price parameter and reorder arguments
//     await cart.addItem(product, quantity, itemNotes, sku);
//   }

//   // Populate product details
//   cart = await cart.populate({
//     path: "items.product",
//     select: "name price images stock",
//   });

//   const localizedCart = getLocalizedResponse(req, cart);

//   res.status(201).json({
//     status: "success",
//     data: {
//       items: localizedCart.items,
//       totalPrice: localizedCart.totalPrice,
//       discount: localizedCart.discount,
//       totalPriceAfterDiscount: localizedCart.totalPriceAfterDiscount,
//       discountMessage: localizedCart.discountMessage,
//       statusText: localizedCart.statusText,
//       notesText: localizedCart.notesText,
//     },
//   });
// });

// export const removeFromCart = asyncHandler(async (req, res, next) => {
//   const { productId, sku } = req.params;
//   const cart = await Cart.findOne({ user: req.user._id });
//   if (!cart) return next(new AppError("Cart not found", 404));

//   await cart.removeItem(productId, sku);
//   await cart.populate({
//     path: "items.product",
//     select: "name price images stock",
//   });

//   const localizedCart = getLocalizedResponse(req, cart);
//   res.status(200).json({ status: "success", data: localizedCart });
// });

// export const updateCartItemQuantity = asyncHandler(async (req, res, next) => {
//   const { productId, sku } = req.params;
//   const { quantity } = req.body;

//   if (!quantity || quantity < 1)
//     return next(new AppError("Valid quantity is required", 400));
//   const product = await Product.findById(productId);
//   if (!product) return next(new AppError("Product not found", 404));

//   const cart = await Cart.findOne({ user: req.user._id });
//   if (!cart) return next(new AppError("Cart not found", 404));

//   await cart.updateItemQuantity(productId, sku, quantity);
//   await cart.populate({
//     path: "items.product",
//     select: "name price images stock",
//   });

//   const localizedCart = getLocalizedResponse(req, cart);
//   res.json({ status: "success", data: localizedCart });
// });

// export const updateCartItemNotes = asyncHandler(async (req, res, next) => {
//   const { productId, sku } = req.params;
//   const { notes } = req.body;

//   const cart = await Cart.findOne({ user: req.user._id });
//   if (!cart) return next(new AppError("Cart not found", 404));

//   await cart.updateItemNotes(productId, sku, notes);
//   await cart.populate({
//     path: "items.product",
//     select: "name price images stock",
//   });

//   const localizedCart = getLocalizedResponse(req, cart);
//   res.json({ status: "success", data: localizedCart });
// });

// // New endpoint to apply discount with description
// export const applyDiscount = asyncHandler(async (req, res, next) => {
//   const { discount, description } = req.body;

//   if (discount < 0 || discount > 100) {
//     return next(new AppError("Discount must be between 0 and 100", 400));
//   }

//   const cart = await Cart.findOne({ user: req.user._id });
//   if (!cart) {
//     return next(new AppError("Cart not found", 404));
//   }

//   await cart.applyDiscount(discount, description);

//   // Populate product details
//   await cart.populate({
//     path: "items.product",
//     select: "name price images stock",
//   });

//   const localizedCart = getLocalizedResponse(req, cart);

//   res.json({
//     status: "success",
//     data: {
//       items: localizedCart.items,
//       totalPrice: localizedCart.totalPrice,
//       discount: localizedCart.discount,
//       totalPriceAfterDiscount: localizedCart.totalPriceAfterDiscount,
//       discountMessage: localizedCart.discountMessage,
//       discountDescriptionText: localizedCart.discountDescriptionText,
//     },
//   });
// });

// // New endpoint to update cart notes
// export const updateCartNotes = asyncHandler(async (req, res, next) => {
//   const { notes } = req.body;

//   const cart = await Cart.findOne({ user: req.user._id });
//   if (!cart) {
//     return next(new AppError("Cart not found", 404));
//   }

//   cart.notes = notes;
//   await cart.save();

//   // Populate product details
//   await cart.populate({
//     path: "items.product",
//     select: "name price images stock",
//   });

//   const localizedCart = getLocalizedResponse(req, cart);

//   res.json({
//     status: "success",
//     data: {
//       items: localizedCart.items,
//       totalPrice: localizedCart.totalPrice,
//       discount: localizedCart.discount,
//       totalPriceAfterDiscount: localizedCart.totalPriceAfterDiscount,
//       notesText: localizedCart.notesText,
//     },
//   });
// });

// export const clearCart = asyncHandler(async (req, res, next) => {
//   const cart = await Cart.findOne({ user: req.user._id });
//   if (!cart) {
//     return next(new AppError("Cart not found", 404));
//   }

//   await cart.clearCart();
//   res.json({
//     status: "success",
//     data: {
//       items: [],
//       totalPrice: 0,
//       discount: 0,
//       totalPriceAfterDiscount: 0,
//       discountMessage: req.headers["accept-language"]?.startsWith("ar")
//         ? "لم يتم تطبيق أي خصم"
//         : "No discount applied",
//     },
//   });
// });

// // export const getAllCarts = asyncHandler(async (req, res, next) => {
// //   // Check if user is admin
// //   if (req.user.role !== "admin") {
// //     return next(new AppError("Not authorized to access this resource", 403));
// //   }

// //   const carts = await Cart.find()
// //     .populate("user", "firstName lastName email phoneNumber")
// //     .populate("items.product", "name price images stock")
// //     .sort({ createdAt: -1 });

// //   // Calculate totals for each cart with localization
// //   const cartsWithTotals = carts.map((cart) => {
// //     const localizedCart = getLocalizedResponse(req, cart);
// //     localizedCart.totalItems = cart.items.reduce(
// //       (sum, item) => sum + item.quantity,
// //       0
// //     );
// //     return localizedCart;
// //   });

// //   res.status(200).json({
// //     status: "success",
// //     results: carts.length,
// //     data: {
// //       carts: cartsWithTotals,
// //       summary: {
// //         totalCarts: carts.length,
// //         totalActiveCarts: carts.filter((cart) => cart.items.length > 0).length,
// //         totalItems: carts.reduce(
// //           (sum, cart) =>
// //             sum +
// //             cart.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
// //           0
// //         ),
// //       },
// //     },
// //   });
// // });

// export const getAllCarts = asyncHandler(async (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return next(new AppError("Not authorized to access this resource", 403));
//   }

//   const carts = await Cart.find()
//     .populate("user", "firstName lastName email")
//     .populate("items.product", "name images variants")
//     .sort({ createdAt: -1 });

//   const cartsWithTotals = carts.map((cart) => {
//     const localizedCart = getLocalizedResponse(req, cart);

//     const enrichedItems = [];
//     let grandTotal = 0;

//     for (const item of cart.items) {
//       const product = item.product;

//       // Find variant option by SKU for price
//       let matchedOption = null;
//       let matchedVariant = null;
//       for (const variant of product?.variants || []) {
//         matchedOption = variant.options?.find((opt) => opt.sku === item.sku);
//         if (matchedOption) {
//           matchedVariant = variant;
//           break;
//         }
//       }

//       let price = 0;
//       if (matchedOption) {
//         price = matchedOption.priceAfterDiscount || matchedOption.price || 0;
//       }
//       const totalPrice = price * item.quantity;
//       grandTotal += totalPrice;

//       enrichedItems.push({
//         _id: item._id,
//         productId: product._id,
//         quantity: item.quantity,
//         notes: item.notes,
//         productName: product.name,
//         images: product.images || [],
//         price,
//         totalPrice,
//         variant: matchedOption
//           ? {
//               label: matchedOption.value,
//               color: matchedOption.colorName,
//               colorHex: matchedOption.colorHex,
//               storage: matchedOption.storage,
//               ram: matchedOption.ram,
//               stock: matchedOption.stock,
//             }
//           : {},
//       });
//     }

//     // Calculate discount and totalPriceAfterDiscount
//     const discount = cart.discount || 0;
//     const totalPriceAfterDiscount = grandTotal - (grandTotal * discount) / 100;

//     localizedCart.items = enrichedItems;
//     localizedCart.totalPrice = grandTotal;
//     localizedCart.discount = discount;
//     localizedCart.totalPriceAfterDiscount = totalPriceAfterDiscount;
//     localizedCart.totalItems = enrichedItems.reduce(
//       (sum, item) => sum + item.quantity,
//       0
//     );

//     return localizedCart;
//   });

//   res.status(200).json({
//     status: "success",
//     results: carts.length,
//     data: {
//       carts: cartsWithTotals,
//       summary: {
//         totalCarts: carts.length,
//         totalActiveCarts: cartsWithTotals.filter(
//           (cart) => cart.items.length > 0
//         ).length,
//         totalItems: cartsWithTotals.reduce(
//           (sum, cart) => sum + cart.totalItems,
//           0
//         ),
//       },
//     },
//   });
// });

// // export const getAllCarts = asyncHandler(async (req, res, next) => {
// //   // Check if user is admin
// //   if (req.user.role !== "admin") {
// //     return next(new AppError("Not authorized to access this resource", 403));
// //   }

// //   const carts = await Cart.find()
// //     .populate("user", "firstName lastName email phoneNumber")
// //     .populate({
// //       path: "items.product",
// //       select: "name images variants",
// //       populate: {
// //         path: "variants.options",
// //         select: "sku price priceAfterDiscount",
// //       },
// //     })
// //     .sort({ createdAt: -1 });

// //   const cartsWithTotals = carts.map((cart) => {
// //     const cartObj = cart.toObject();

// //     let totalPrice = 0;

// //     // Format items to match response and calculate price
// //     cartObj.items = cartObj.items.map((item) => {
// //       let price = 0;
// //       if (item.product && item.product.variants) {
// //         for (const variant of item.product.variants) {
// //           const matchedOption = variant.options?.find(
// //             (opt) => opt.sku === item.sku
// //           );
// //           if (matchedOption) {
// //             price =
// //               matchedOption.priceAfterDiscount || matchedOption.price || 0;
// //             break;
// //           }
// //         }
// //       }
// //       totalPrice += price * item.quantity;

// //       return {
// //         _id: item._id,
// //         product: {
// //           _id: item.product?._id,
// //           name: item.product?.name,
// //           images: item.product?.images,
// //           id: item.product?._id?.toString(),
// //         },
// //         sku: item.sku,
// //         quantity: item.quantity,
// //         price,
// //       };
// //     });

// //     // Calculate discount and totalPriceAfterDiscount
// //     const discount = cart.discount || 0;
// //     const totalPriceAfterDiscount = totalPrice - (totalPrice * discount) / 100;

// //     // Add virtuals and localized fields
// //     cartObj.totalPrice = totalPrice;
// //     cartObj.discount = discount;
// //     cartObj.totalPriceAfterDiscount = totalPriceAfterDiscount;
// //     cartObj.discountText = cart.discountText;
// //     cartObj.statusText = cart.statusDisplay?.en || "Active";
// //     cartObj.discountMessage = cart.discountText?.en || "No discount applied";
// //     cartObj.notesText = cart.notes?.en || "";
// //     cartObj.totalItems = cartObj.items.reduce(
// //       (sum, item) => sum + item.quantity,
// //       0
// //     );
// //     cartObj.id = cartObj._id?.toString();

// //     return cartObj;
// //   });

// //   res.status(200).json({
// //     status: "success",
// //     results: carts.length,
// //     data: {
// //       carts: cartsWithTotals,
// //       summary: {
// //         totalCarts: carts.length,
// //         totalActiveCarts: cartsWithTotals.filter(
// //           (cart) => cart.items.length > 0
// //         ).length,
// //         totalItems: cartsWithTotals.reduce(
// //           (sum, cart) => sum + cart.totalItems,
// //           0
// //         ),
// //       },
// //     },
// //   });
// // });
// // Delete a cart by ID (admin only)
import asyncHandler from "express-async-handler";
import { AppError } from "../../utils/appError.js";
import Cart from "./cartModel.js";
import Product from "../product/productModel.js";
import { Features } from "../../utils/features.js";

// Helper function to get localized response based on Accept-Language header
const getLocalizedResponse = (req, cart) => {
  const lang = req.headers["accept-language"]?.startsWith("ar") ? "ar" : "en";
  const cartObj = cart.toObject();

  // Add localized display fields
  if (cart.statusDisplay) {
    cartObj.statusText = cart.statusDisplay[lang];
  }

  // Add localized discount text
  if (cart.discountText) {
    cartObj.discountMessage = cart.discountText[lang];
  }

  // Add localized notes if they exist
  if (cart.notes && cart.notes[lang]) {
    cartObj.notesText = cart.notes[lang];
  }

  // Add localized discount description if it exists
  if (cart.discountDescription && cart.discountDescription[lang]) {
    cartObj.discountDescriptionText = cart.discountDescription[lang];
  }

  return cartObj;
};

// Get the cart for a user
// In cartController.js
export const getCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: "items.product",
    select: "name images variants",
  });

  if (!cart) {
    const newCart = new Cart({
      user: req.user._id,
      items: [],
    });
    await newCart.save();
    return res.json({
      status: "success",
      data: {
        items: [],
        totalPrice: 0,
        discount: 0,
      },
    });
  }

  const language = req.headers["accept-language"]?.startsWith("ar")
    ? "ar"
    : "en";

  const enrichedItems = [];
  let grandTotal = 0;

  for (const item of cart.items) {
    const product = item.product;

    // Find matching variant option by SKU
    let matchedOption = null;
    let matchedVariant = null;

    for (const variant of product?.variants || []) {
      matchedOption = variant.options?.find((opt) => opt.sku === item.sku);
      if (matchedOption) {
        matchedVariant = variant;
        break;
      }
    }

    if (!matchedOption) continue;

    const price = matchedOption.priceAfterDiscount || matchedOption.price;
    const totalPrice = price * item.quantity;
    grandTotal += totalPrice;

    enrichedItems.push({
      _id: item._id,
      productId: product._id,
      sku: item.sku,
      quantity: item.quantity,
      notes: item.notes,
      productName: product.name,
      images: matchedOption.variantImages || product.images || [],
      price,
      totalPrice,
      variant: {
        label: matchedOption.value,
        color: matchedOption.colorName,
        colorHex: matchedOption.colorHex,
        storage: matchedOption.storage,
        ram: matchedOption.ram,
        stock: matchedOption.stock,
        type: matchedVariant?.name,
      },
    });
  }

  const discount = cart.discount || 0;
  const totalPriceAfterDiscount = grandTotal - (grandTotal * discount) / 100;

  res.json({
    status: "success",
    results: enrichedItems.length,
    data: {
      items: enrichedItems,
      totalPrice: grandTotal,
      discount,
      totalPriceAfterDiscount,
      message: "تم جلب السلة بنجاح",
    },
  });
});

// Add an item to the cart
export const addToCart = asyncHandler(async (req, res, next) => {
  try {
    // console.log("addToCart started");
    // console.log("Request body:", req.body);
    // console.log("User:", req.user._id);

    const { items, notes } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return next(new AppError("Items array is required", 400));
    }

    let cart = await Cart.findOne({ user: req.user._id });
    // console.log("Found cart:", cart ? cart._id : "No cart found");

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
        totalPrice: 0,
        discount: 0,
      });
      // console.log("Created new cart");
    }

    // Clean existing items without SKU
    cart.items = cart.items.filter(
      (item) => item.sku && item.sku.trim() !== ""
    );

    if (notes) {
      cart.notes = notes;
    }

    for (const item of items) {
      const { product, quantity, sku, notes: itemNotes } = item;

      if (!product || !quantity || !sku) {
        return next(
          new AppError(
            "Product, quantity, and SKU are required for each item",
            400
          )
        );
      }

      const productExists = await Product.findById(product);
      if (!productExists) {
        return next(new AppError(`Product with ID ${product} not found`, 404));
      }

      // console.log("Product found:", productExists._id);
      // console.log("Product variants:", productExists.variants);
      // console.log("Looking for SKU:", sku);

      // Validate SKU exists in product variants
      let skuValid = false;
      for (const variant of productExists.variants) {
        // console.log("Checking variant:", variant.name);
        // console.log("Variant options:", variant.options);
        if (variant.options?.some((option) => option.sku === sku)) {
          skuValid = true;
          // console.log("SKU found in variant:", variant.name);
          break;
        }
      }

      if (!skuValid) {
        return next(
          new AppError(`SKU ${sku} is not valid for product ${product}`, 400)
        );
      }

      const matchedOption = productExists.variants
        .flatMap((variant) => variant.options)
        .find((option) => option.sku === sku);
      // console.log("matchedOption", matchedOption);
      const price = matchedOption.priceAfterDiscount || matchedOption.price;
      const basePrice = matchedOption.price;

      // Add item to cart
      await cart.addItem(product, quantity, price, basePrice, itemNotes, sku);
    }

    // Populate product details
    cart = await cart.populate({
      path: "items.product",
      select: "name price images stock",
    });

    // console.log("About to send response");
    // console.log("Cart items in response:", cart.items);
    // console.log("Cart totalPrice:", cart.totalPrice);

    // Return a simpler response to avoid potential errors
    res.status(201).json({
      status: "success",
      data: {
        items: cart.items,
        totalPrice: cart.totalPrice,
        discount: cart.discount || 0,
        totalPriceAfterDiscount:
          cart.totalPriceAfterDiscount || cart.totalPrice,
        message: "تم إضافة المنتج إلى السلة بنجاح",
      },
    });

    // console.log("Response sent successfully");
  } catch (error) {
    console.error("Error in addToCart:", error);
    return next(new AppError(`Error adding to cart: ${error.message}`, 500));
  }
});

// Remove an item from the cart
export const removeFromCart = asyncHandler(async (req, res, next) => {
  const { productId, sku } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new AppError("Cart not found", 404));

  await cart.removeItem(productId, sku);
  await cart.populate({
    path: "items.product",
    select: "name price images stock",
  });

  res.status(200).json({
    status: "success",
    data: {
      items: cart.items,
      totalPrice: cart.totalPrice,
      discount: cart.discount || 0,
      totalPriceAfterDiscount: cart.totalPriceAfterDiscount || cart.totalPrice,
      message: "تم حذف المنتج من السلة بنجاح",
    },
  });
});

// Update cart item quantity
export const updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const { productId, sku } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1)
    return next(new AppError("Valid quantity is required", 400));
  const product = await Product.findById(productId);
  if (!product) return next(new AppError("Product not found", 404));

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new AppError("Cart not found", 404));

  await cart.updateItemQuantity(productId, sku, quantity);
  await cart.populate({
    path: "items.product",
    select: "name price images stock",
  });

  res.json({
    status: "success",
    data: {
      items: cart.items,
      totalPrice: cart.totalPrice,
      discount: cart.discount || 0,
      totalPriceAfterDiscount: cart.totalPriceAfterDiscount || cart.totalPrice,
      message: "تم تحديث الكمية بنجاح",
    },
  });
});

// Update cart item notes
export const updateCartItemNotes = asyncHandler(async (req, res, next) => {
  const { productId, sku } = req.params;
  const { notes } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new AppError("Cart not found", 404));

  await cart.updateItemNotes(productId, sku, notes);
  await cart.populate({
    path: "items.product",
    select: "name price images stock",
  });

  res.json({
    status: "success",
    data: {
      items: cart.items,
      totalPrice: cart.totalPrice,
      discount: cart.discount || 0,
      totalPriceAfterDiscount: cart.totalPriceAfterDiscount || cart.totalPrice,
      message: "تم تحديث الملاحظات بنجاح",
    },
  });
});

// Apply discount to the cart
export const applyDiscount = asyncHandler(async (req, res, next) => {
  const { discount, description } = req.body;

  if (discount < 0 || discount > 100) {
    return next(new AppError("Discount must be between 0 and 100", 400));
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  await cart.applyDiscount(discount, description);

  // Populate product details
  await cart.populate({
    path: "items.product",
    select: "name price images stock",
  });

  res.json({
    status: "success",
    data: {
      items: cart.items,
      totalPrice: cart.totalPrice,
      discount: cart.discount || 0,
      totalPriceAfterDiscount: cart.totalPriceAfterDiscount || cart.totalPrice,
      message: "تم تطبيق الخصم بنجاح",
    },
  });
});

// Update cart notes
export const updateCartNotes = asyncHandler(async (req, res, next) => {
  const { notes } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  cart.notes = notes;
  await cart.save();

  // Populate product details
  await cart.populate({
    path: "items.product",
    select: "name price images stock",
  });

  res.json({
    status: "success",
    data: {
      items: cart.items,
      totalPrice: cart.totalPrice,
      discount: cart.discount || 0,
      totalPriceAfterDiscount: cart.totalPriceAfterDiscount || cart.totalPrice,
      message: "تم تحديث الملاحظات بنجاح",
    },
  });
});

// Clear the cart
export const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  await cart.clearCart();
  res.json({
    status: "success",
    data: {
      items: [],
      totalPrice: 0,
      discount: 0,
      totalPriceAfterDiscount: 0,
      message: "تم تفريغ السلة بنجاح",
    },
  });
});

export const deleteCartById = asyncHandler(async (req, res, next) => {
  const { cartId } = req.params;
  const cart = await Cart.findByIdAndDelete(cartId);
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }
  res.status(204).json({ status: "success", data: null });
});

// In cartController.js
// In cartController.js
// In cartController.js

export const getAllCarts = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new AppError("Not authorized to access this resource", 403));
  }

  // استخدام Features للبحث والفلترة
  const features = new Features(Cart.find(), req.query)
    .filter()
    .searchCartBySku()
    .sort()
    .pagination()
    .fields();

  const carts = await features.mongooseQuery
    .populate("user", "firstName lastName email")
    .populate({
      path: "items.product",
      select: "name images variants basePrice",
    });

  const cartsWithTotals = carts.map((cart) => {
    const cartObj = cart.toObject();

    const enrichedItems = [];
    let grandTotal = 0;
    let totalPriceBeforeDiscount = 0;

    for (const item of cart.items) {
      const product = item.product;
      let price = 0;
      let basePrice = product?.basePrice || 0;
      let matchedOption = null;

      if (product?.variants) {
        for (const variant of product.variants) {
          matchedOption = variant.options?.find((opt) => opt.sku === item.sku);
          if (matchedOption) {
            price =
              matchedOption.priceAfterDiscount || matchedOption.price || 0;
            basePrice = matchedOption.price || basePrice;
            break;
          }
        }
      }

      const totalPrice = price * item.quantity;
      const itemBaseTotal = basePrice * item.quantity;
      grandTotal += totalPrice;
      totalPriceBeforeDiscount += itemBaseTotal;

      enrichedItems.push({
        _id: item._id,
        productId: product._id,
        sku: item.sku,
        quantity: item.quantity,
        notes: item.notes,
        productName: product.name,
        images: product.images || [],
        price,
        basePrice,
        totalPrice,
        totalBasePrice: itemBaseTotal,
        variant: matchedOption
          ? {
              label: matchedOption.value,
              color: matchedOption.colorName,
              colorHex: matchedOption.colorHex,
              storage: matchedOption.storage,
              ram: matchedOption.ram,
              stock: matchedOption.stock,
            }
          : {},
      });
    }

    const discount = cart.discount || 0;
    const totalPriceAfterDiscount = grandTotal - (grandTotal * discount) / 100;

    // Calculate discount percent from totals
    let calculatedDiscountPercent = 0;
    if (totalPriceBeforeDiscount > 0) {
      calculatedDiscountPercent = Math.round(
        ((totalPriceBeforeDiscount - totalPriceAfterDiscount) /
          totalPriceBeforeDiscount) *
          100
      );
    }

    cartObj.items = enrichedItems;
    cartObj.totalPrice = grandTotal;
    cartObj.totalPriceBeforeDiscount = totalPriceBeforeDiscount;
    cartObj.discount = discount;
    cartObj.totalPriceAfterDiscount = totalPriceAfterDiscount;
    cartObj.calculatedDiscountPercent = calculatedDiscountPercent;
    cartObj.totalItems = enrichedItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return cartObj;
  });
  res.status(200).json({
    status: "success",
    results: carts.length,
    data: {
      carts: cartsWithTotals,
      summary: {
        totalCarts: carts.length,
        totalActiveCarts: cartsWithTotals.filter(
          (cart) => cart.items.length > 0
        ).length,
        totalItems: cartsWithTotals.reduce(
          (sum, cart) => sum + cart.totalItems,
          0
        ),
      },
    },
  });
});

// Update a cart by ID (admin only)
export const updateCartById = asyncHandler(async (req, res, next) => {
  const { cartId } = req.params;
  let { items, ...rest } = req.body;

  // If items are being updated, ensure required fields are present
  let enrichedItems = [];
  let grandTotal = 0;
  let totalPriceBeforeDiscount = 0;

  if (Array.isArray(items)) {
    for (const item of items) {
      // Validate required fields
      if (!item.product) {
        return next(
          new AppError("Each item must have a valid product ID", 400)
        );
      }
      if (!item.sku) {
        return next(new AppError("Each item must have a valid SKU", 400));
      }
      if (!item.quantity || item.quantity < 1) {
        return next(new AppError("Each item must have a valid quantity", 400));
      }

      // Fetch product and variant info
      const product = await Product.findById(item.product);
      if (!product) {
        return next(
          new AppError(`Product with ID ${item.product} not found`, 404)
        );
      }
      let basePrice = product.basePrice || 0;
      let sku = item.sku;
      let matchedOption = null;
      let matchedVariant = null;
      for (const variant of product.variants || []) {
        matchedOption = variant.options?.find((opt) => opt.sku === sku);
        if (matchedOption) {
          basePrice = matchedOption.price || basePrice;
          matchedVariant = variant;
          break;
        }
      }
      const price = matchedOption
        ? matchedOption.priceAfterDiscount || matchedOption.price || basePrice
        : basePrice;
      const totalPrice = price * item.quantity;
      const itemBaseTotal = basePrice * item.quantity;
      grandTotal += totalPrice;
      totalPriceBeforeDiscount += itemBaseTotal;

      // Build item with required fields and variant info
      enrichedItems.push({
        product: item.product,
        quantity: item.quantity,
        basePrice,
        sku,
        price,
        notes: item.notes,
        variant: matchedOption
          ? {
              label: matchedOption.value,
              color: matchedOption.colorName,
              colorHex: matchedOption.colorHex,
              storage: matchedOption.storage,
              ram: matchedOption.ram,
              stock: matchedOption.stock,
              type: matchedVariant?.name,
            }
          : {},
      });
    }
    req.body.items = enrichedItems;
  }

  // Update the cart and get the new document
  let updatedCart = await Cart.findByIdAndUpdate(
    cartId,
    { items: enrichedItems, ...rest },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate({
      path: "user",
      select: "firstName lastName email",
    })
    .populate({
      path: "items.product",
      select: "name images variants basePrice",
    });

  if (!updatedCart) {
    return next(new AppError("Cart not found", 404));
  }

  const discount = updatedCart.discount || 0;
  const totalPriceAfterDiscount = grandTotal - (grandTotal * discount) / 100;

  // Calculate discount percent from totals
  let calculatedDiscountPercent = 0;
  if (totalPriceBeforeDiscount > 0) {
    calculatedDiscountPercent = Math.round(
      ((totalPriceBeforeDiscount - totalPriceAfterDiscount) /
        totalPriceBeforeDiscount) *
        100
    );
  }

  // Create enriched items for response
  const enrichedResponseItems = [];
  for (const item of updatedCart.items) {
    const product = item.product;
    let price = 0;
    let basePrice = product?.basePrice || 0;
    let matchedOption = null;

    if (product?.variants) {
      for (const variant of product.variants) {
        matchedOption = variant.options?.find((opt) => opt.sku === item.sku);
        if (matchedOption) {
          price = matchedOption.priceAfterDiscount || matchedOption.price || 0;
          basePrice = matchedOption.price || basePrice;
          break;
        }
      }
    }

    const totalPrice = price * item.quantity;
    const itemBaseTotal = basePrice * item.quantity;

    enrichedResponseItems.push({
      _id: item._id,
      productId: product._id,
      quantity: item.quantity,
      notes: item.notes,
      productName: product.name,
      images: product.images || [],
      price,
      basePrice,
      totalPrice,
      totalBasePrice: itemBaseTotal,
      sku: item.sku,
      variant: matchedOption
        ? {
            label: matchedOption.value,
            color: matchedOption.colorName,
            colorHex: matchedOption.colorHex,
            storage: matchedOption.storage,
            ram: matchedOption.ram,
            stock: matchedOption.stock,
          }
        : {},
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      _id: updatedCart._id,
      user: updatedCart.user,
      items: enrichedResponseItems,
      totalPrice: grandTotal,
      totalPriceBeforeDiscount,
      discount,
      totalPriceAfterDiscount,
      calculatedDiscountPercent,
      totalItems: enrichedResponseItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
      notes: updatedCart.notes,
      status: updatedCart.status,
      statusDisplay: updatedCart.statusDisplay,
      createdAt: updatedCart.createdAt,
      updatedAt: updatedCart.updatedAt,
      message: "تم تحديث السلة بنجاح",
    },
  });
});
