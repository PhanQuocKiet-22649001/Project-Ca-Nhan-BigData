import React from 'react';

function DetailModal({ item, tab, isLoggedIn, onClose }) {
  if (!item) return null; // Nếu không có dữ liệu thì không hiện gì cả

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Chi tiết {tab === 'categories' ? 'Danh mục' : 'Người dùng'}</h3>
        <hr />
        
        <div className="detail-info">
          <p><strong>ID:</strong> {item._id}</p>
          <p><strong>Tên:</strong> {item.name || item.uname}</p>
          
          {/* Riêng cho Danh mục */}
          {tab === 'categories' && (
            <>
              <p><strong>Slug:</strong> {item.slug || 'N/A'}</p>
              <p><strong>Người tạo:</strong> {item.created_by?.uname || 'Hệ thống'}</p>
            </>
          )}

          {/* Riêng cho Người dùng */}
          {tab === 'users' && (
            <p><strong>Mật khẩu:</strong> {isLoggedIn ? (item.pass || 'N/A') : '********'}</p>
          )}

          <p><strong>Ngày tạo:</strong> {new Date(item.created_at).toLocaleDateString('vi-VN')}</p>
          <p><strong>Trạng thái:</strong> {isLoggedIn ? (item.status ? 'Hoạt động' : 'Đã ẩn') : '********'}</p>
        </div>

        <div className="modal-actions">
          <button className="btn-black" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;