const jwt = require('jsonwebtoken');

const identifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Kiểm tra xem Header có gửi lên không
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("=> Không tìm thấy Header Authorization hoặc đã đăng xuất");
    req.isAdmin = false;
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Kiểm tra Secret Key (Phải khớp 100% với file authController)
    const decoded = jwt.verify(token, 'mysecretkeyquockiet');
    console.log("=> Token hợp lệ! User:", decoded.uname);
    req.isAdmin = true;
    req.user = decoded;
    next();
  } catch (error) {
    // 3. Nếu lỗi (hết hạn, sai key...), in lỗi ra Terminal
    console.log("=> Lỗi xác thực Token:", error.message);
    req.isAdmin = false;
    next();
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.isAdmin || !req.user) {
    return res.status(401).json({
      message: "Hành động này yêu cầu quyền quản trị. Vui lòng đăng nhập!"
    });
  }
  next(); // Nếu là Admin thật thì mới cho đi tiếp
};

module.exports = { identifyUser, requireAdmin };