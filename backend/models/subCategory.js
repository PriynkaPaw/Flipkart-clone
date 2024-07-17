const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

subCategorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

subCategorySchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
