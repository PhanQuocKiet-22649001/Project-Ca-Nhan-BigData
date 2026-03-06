const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { uname, pass } = req.body;

    // 1. Kiểm tra User có tồn tại không
    const user = await User.findOne({ uname });
    if (!user) return res.status(400).json({ message: "Tài khoản không tồn tại!" });

    // 2. So sánh mật khẩu (Giải mã bcrypt)
    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu rồi!" });

    // 3. Kiểm tra trạng thái (Nếu bị ẩn/khóa thì không cho vào)
    if (!user.status) return res.status(403).json({ message: "Tài khoản này đã bị khóa!" });

    // 4. Tạo Token (JWT) - Thời hạn 1 ngày
    const token = jwt.sign(
      { id: user._id, uname: user.uname },
      'mysecretkeyquockiet', // Thay bằng mã bí mật bất kỳ
      { expiresIn: '1d' }
    );

    res.json({
      message: "Đăng nhập thành công!",
      token,
      user: {
        id: user._id, // THÊM DÒNG NÀY ĐỂ FRONTEND LẤY ID
        uname: user.uname
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống!", error: error.message });
  }
};

module.exports = { login };