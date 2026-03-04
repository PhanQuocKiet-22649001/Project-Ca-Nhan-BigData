const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
  try {
    const { uname, pass } = req.body;

    // 1. Kiểm tra dữ liệu đầu vào (Validation cơ bản)
    if (!uname || !pass) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    // 2. Kiểm tra xem tên đăng nhập đã tồn tại chưa
    const existingUser = await User.findOne({ uname });
    if (existingUser) {
      return res.status(400).json({ message: "Tên đăng nhập này đã tồn tại!" });
    }

    // 3. MÃ HÓA MẬT KHẨU (Hash password)
    // Độ khó (salt) thường để là 10
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    // 4. Tạo User mới với mật khẩu đã mã hóa
    const newUser = new User({
      uname,
      pass: hashedPassword,
      status: true
    });

    await newUser.save();

    // 5. Phản hồi thành công
    res.status(201).json({ message: "Thêm người dùng mới thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server", error: error.message });
  }
};