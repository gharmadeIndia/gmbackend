const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String],
  category: String,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  stock: { type: Number, default: 0 },
  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
    rating: Number,
    comment: String
  }] 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
