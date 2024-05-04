const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: [true, "Provide an image"],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: { type: Number, required: true },
    status: { type: String, required: true, default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
