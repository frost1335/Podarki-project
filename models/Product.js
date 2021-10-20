const { Schema, model } = require("mongoose");

const product = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  info: Array,
});

module.exports = model("product", product);
