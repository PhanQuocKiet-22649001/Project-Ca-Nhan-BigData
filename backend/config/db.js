const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Gọi đường dẫn từ file .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Đã kết nối thành công với MongoDB (mern_db)!');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error.message);
    process.exit(1); // Dừng server nếu lỗi CSDL
  }
};

module.exports = connectDB;