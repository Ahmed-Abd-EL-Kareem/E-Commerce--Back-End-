import mongoose from "mongoose";
import slugify from "slugify";
const localizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, required: true },
    ar: { type: String, trim: true, required: true },
  },
  { _id: false, strict: false }
);
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: localizedStringSchema,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    logoUrl: {
      type: String,
      default: "https://via.placeholder.com/150", // Default logo URL
    },
    websiteUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

brandSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    const source = (
      (this.name && (this.name.en || this.name.ar)) ||
      ""
    ).toString();
    this.slug = slugify(source, { lower: true, strict: true });
  }
  next();
});

// اختياري: حافظ على slug صحيح في التحديثات
brandSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() || {};
  if (update.name && (update.name.en || update.name.ar)) {
    const source = (update.name.en || update.name.ar || "").toString();
    update.slug = slugify(source, { lower: true, strict: true });
    this.setUpdate(update);
  }
  next();
});
const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
