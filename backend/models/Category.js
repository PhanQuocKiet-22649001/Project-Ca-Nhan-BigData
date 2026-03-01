const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  status: { type: Boolean, default: true },

  // KHAI BÁO THAM CHIẾU ĐỂ TỰ KẾT BẢNG (JOIN)
  created_by: {
    type: mongoose.Schema.Types.ObjectId, // Ép kiểu ID chuẩn của MongoDB
    ref: 'User',                          // Trỏ chính xác tên Model 'User'
    required: true
  },

  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);