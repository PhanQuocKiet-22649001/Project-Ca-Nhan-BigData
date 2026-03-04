const Category = require('../models/Category');

exports.addCategory = async (req, res) => {
    try {
        const { name, slug } = req.body;

        // 1. Kiểm tra trống (Luôn làm đầu tiên)
        if (!name) {
            return res.status(400).json({ message: "Vui lòng nhập tên danh mục!" });
        }

        // 2. Kiểm tra quyền hạn/Token (Để tránh lỗi 500 khi req.user bị trống)
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Không tìm thấy thông tin người tạo. Vui lòng đăng nhập lại!" });
        }

        // 3. Kiểm tra trùng lặp
        const existingCat = await Category.findOne({
            $or: [{ name: name}, { slug: slug }]
        });

        if (existingCat) {
            return res.status(400).json({ message: "Tên danh mục đã tồn tại!" });
        }
        // 4. Tạo bản ghi mới
        const newCategory = new Category({
            name,
            slug,
            status: true,
            created_by: req.user.id // Bây giờ đã an toàn vì có bước 2 bảo vệ
        });

        await newCategory.save();
        res.status(201).json({ message: "Thêm danh mục thành công!" });

    } catch (error) {
        // In lỗi ra terminal để bạn biết chính xác dòng nào sai
        console.error("Lỗi tại CategoryController:", error.message);
        res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
};