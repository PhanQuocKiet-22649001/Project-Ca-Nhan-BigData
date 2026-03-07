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


exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params; // ID của user định ẩn/hiện
    const adminId = req.user.id; // ID của chính người đang đăng nhập (lấy từ Token)

    // KIỂM TRA: Nếu ID định ẩn trùng với ID người đang đăng nhập
    if (id === adminId) {
      return res.status(400).json({
        message: "Bạn không thể tự ẩn/khóa tài khoản của chính mình!"
      });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy!" });

    user.status = !user.status;
    await user.save();

    res.json({ message: "Cập nhật thành công", status: user.status });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server", error: error.message });
  }
};


// update
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params; // ID của user định sửa
    const loggedInUserId = req.user.id; // ID của người đang đăng nhập (từ Token)

    // KIỂM TRA QUYỀN: Chỉ cho phép sửa chính mình
    if (id !== loggedInUserId) {
      return res.status(403).json({ 
        message: "Bạn không có quyền đổi mật khẩu của người khác!" 
      });
    }

    const { pass } = req.body;
    if (!pass) return res.status(400).json({ message: "Vui lòng nhập mật khẩu mới" });

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    await User.findByIdAndUpdate(id, { pass: hashedPassword });

    res.json({ message: "Đổi mật khẩu thành công! Hãy đăng nhập lại." });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server", error: error.message });
  }
};