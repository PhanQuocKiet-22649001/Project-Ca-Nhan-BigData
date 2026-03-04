const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db.js');

// Khởi tạo ứng dụng Express
const app = express();

// ==========================================
// 1. MIDDLEWARE
// ==========================================
app.use(cors()); 
app.use(express.json()); 

// ==========================================
// 2. ROUTES (Định tuyến API)
// ==========================================
app.use('/api/users', require('./routes/userRoutes.js')); // Đảm bảo file tên là userRoutes.js
app.use('/api/categories', require('./routes/categoryRoutes.js')); // Bổ sung dòng này cho Category
app.use('/api', require('./routes/homeRoutes.js'));
app.use('/api', require('./routes/authRoutes.js')); // Route Login thật

// app.use('/api/admin', require('./routes/adminRoutes.js')); // Route cho Admin sau này

// ==========================================
// 3. KẾT NỐI DB VÀ CHẠY SERVER
// ==========================================
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server Backend đang chạy tại: http://localhost:${PORT}`);
      console.log('✅ Đã kết nối MongoDB. Sẵn sàng nhận lệnh đăng nhập!');
    });
  })
  .catch((err) => {
    console.error('❌ Lỗi khởi động:', err);
  });