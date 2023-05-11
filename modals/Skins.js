const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  float: {
    type: Number,
    required: true
  },
  rarity: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("skins", ItemSchema);