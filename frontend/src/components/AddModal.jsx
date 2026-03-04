import React, { useState } from 'react';
import '../styles/AddModal.css';


// Hàm chuyển đổi tiếng Việt có dấu thành không dấu và tạo Slug
const toSlug = (str) => {
    if (!str) return "";
    return str
        .toLowerCase()
        .normalize("NFD")              // Tách dấu khỏi chữ cái (VD: ế -> e + ^ + ')
        .replace(/[\u0300-\u036f]/g, "") // Xóa sạch các dấu vừa tách
        .replace(/[đĐ]/g, "d")         // Thay chữ đ thành d
        .replace(/([^0-9a-z-\s])/g, "") // Xóa ký tự đặc biệt
        .replace(/(\s+)/g, "-")        // Thay khoảng trắng thành dấu -
        .replace(/-+/g, "-")           // Tránh trường hợp nhiều dấu - liên tiếp
        .replace(/^-+|-+$/g, "");      // Xóa dấu - ở đầu và cuối chuỗi
};

function AddModal({ isOpen, onClose, tab, onSuccess }) {
    const [formData, setFormData] = useState({});

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (tab === 'users' && formData.pass !== formData.confirmPass) {
            alert("Mật khẩu nhập lại không khớp!");
            return;
        }

        const token = localStorage.getItem('token');

        // ĐỊNH NGHĨA URL TƯỜNG MINH (Không dùng phép cộng chuỗi phức tạp)
        let apiUrl = "";
        if (tab === "categories") {
            apiUrl = "http://localhost:5000/api/categories/add";
        } else {
            apiUrl = "http://localhost:5000/api/users/add";
        }

        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            // Kiểm tra phản hồi có phải JSON không
            const contentType = res.headers.get("content-type");
            let result = {};
            if (contentType && contentType.includes("application/json")) {
                result = await res.json();
            }

            if (res.ok) {
                alert("Thêm thành công!");
                onSuccess();
                onClose();
            } else {
                // Nếu là 404, hiện thông báo rõ ràng
                const errorMsg = result.message || `Lỗi ${res.status}: Không tìm thấy đường dẫn Server`;
                alert(errorMsg);
            }
        } catch (error) {
            console.error("Lỗi Fetch:", error);
            alert("Không thể kết nối đến Server. Hãy kiểm tra Backend!");
        }
    };

    return (
        <div className="add-modal-overlay">
            <div className="add-modal-content">
                <h3>Thêm {tab === 'categories' ? 'Danh mục' : 'Người dùng'}</h3>
                <form onSubmit={handleSubmit}>
                    {tab === 'categories' ? (
                        <>
                            <input type="text" placeholder="Tên danh mục"
                                onChange={e => {
                                    const nameValue = e.target.value;
                                    const slugValue = toSlug(nameValue); // Gọi hàm bỏ dấu ở trên
                                    setFormData({ ...formData, name: nameValue, slug: slugValue });
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <input type="text" placeholder="Tên đăng nhập"
                                onChange={e => setFormData({ ...formData, uname: e.target.value })} />
                            <input type="password" placeholder="Mật khẩu"
                                onChange={e => setFormData({ ...formData, pass: e.target.value })} />
                            {/* Ô NHẬP LẠI MẬT KHẨU */}
                            <input type="password" placeholder="Nhập lại mật khẩu"
                                onChange={e => setFormData({ ...formData, confirmPass: e.target.value })} />
                        </>
                    )}

                    <div className="add-modal-actions">
                        <button type="button" onClick={onClose}>Hủy</button>
                        <button type="submit" className="btn-black">Lưu lại</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddModal;