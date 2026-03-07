import { useState, useEffect } from 'react';
import '../styles/editModal.css';

const EditModal = ({ isOpen, onClose, tab, item, onSuccess }) => {
    const [formData, setFormData] = useState({});

    const toSlug = (str) => {
        if (!str) return "";
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").replace(/([^0-9a-z-\s])/g, "").replace(/(\s+)/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
    };

    // Reset form về trống rỗng mỗi khi mở Modal
    useEffect(() => {
        if (isOpen) {
            setFormData({});
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = `http://localhost:5000/api/${tab}/edit/${item._id}`;

        try {
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (res.ok) {
                if (tab === 'users') {
                    alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
                    localStorage.clear();
                    window.location.href = '/login';
                } else {
                    alert("Cập nhật thành công!");
                    onSuccess();
                    onClose();
                }
            } else {
                alert(data.message || "Có lỗi xảy ra!");
            }
        } catch (error) {
            console.error("Lỗi cập nhật:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h3>CẬP NHẬT {tab === 'categories' ? 'DANH MỤC' : 'NGƯỜI DÙNG'}</h3>
                
                {/* Hiển thị thông tin hiện tại để user dễ đối chiếu */}
                <p style={{ fontSize: '13px', color: '#666' }}>
                    Đang sửa: <strong>{item.name || item.uname}</strong>
                </p>

                <form onSubmit={handleSubmit}>
                    {tab === 'categories' ? (
                        <>
                            <div className="input-group">
                                <label>Tên danh mục mới:</label>
                                <input 
                                    type="text" 
                                    placeholder="Nhập danh mục mới..."
                                    value={formData.name || ''} 
                                    onChange={(e) => {
                                        const newName = e.target.value;
                                        setFormData({ ...formData, name: newName, slug: toSlug(newName) });
                                    }}
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <label>Slug (Tự động tạo):</label>
                                <input 
                                    type="text" 
                                    placeholder="duong-dan-tu-dong"
                                    value={formData.slug || ''} 
                                    readOnly 
                                    disabled 
                                />
                            </div>
                        </>
                    ) : (
                        <div className="input-group">
                            <label>Mật khẩu mới:</label>
                            <input 
                                type="password" 
                                placeholder="Nhập mật khẩu mới..."
                                value={formData.pass || ''} 
                                onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
                                required 
                            />
                        </div>
                    )}

                    <div className="modal-actions">
                        <button type="button" className="btn-outline" onClick={onClose}>Hủy</button>
                        <button type="submit" className="btn-black">Lưu thay đổi</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;