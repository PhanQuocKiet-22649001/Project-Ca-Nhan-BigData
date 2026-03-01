const Category = require('../models/Category');
const User = require('../models/User');

exports.getHomeData = async (req, res) => {
  try {
    const filter = req.isAdmin ? {} : { status: true };

    // SỬA LẠI ĐOẠN NÀY:
    const [categories, users] = await Promise.all([
      Category.find(filter).populate('created_by', 'uname'),
      
      // Nếu là Admin thì lấy hết (gồm cả pass), nếu là khách mới chặn -pass
      req.isAdmin 
        ? User.find(filter) 
        : User.find(filter).select('-pass')
    ]);

    res.json({
      categories,
      users,
      mode: req.isAdmin ? "admin" : "public"
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy dữ liệu trang chủ" });
  }
};