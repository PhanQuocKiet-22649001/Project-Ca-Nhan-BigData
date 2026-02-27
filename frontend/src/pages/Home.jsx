import { useState } from 'react';
import '../styles/home.css';

// Thêm các trường dữ liệu đầy đủ để test hiển thị
const MOCK_CATEGORIES = [
  { id: 'C01', name: 'Giày Thể Thao', slug: 'giay-the-thao', created_by: 'admin_1', status: true, created_at: '2026-02-28' },
  { id: 'C02', name: 'Giày Trẻ Em', slug: 'giay-tre-em', created_by: 'admin_2', status: false, created_at: '2026-02-25' } // Sẽ bị ẩn ngoài bảng
];
const MOCK_USERS = [
  { id: 'U01', uname: 'khachhang_01', pass: 'hash_123456', status: true, created_at: '2026-02-20' },
  { id: 'U02', uname: 'user_banned', pass: 'hash_abcdef', status: false, created_at: '2026-02-22' } // Sẽ bị ẩn ngoài bảng
];

function Home() {
  const [tab, setTab] = useState('categories');
  const [viewData, setViewData] = useState(null);
  
  // KHÁCH: Chỉ lấy status === true (Đang hoạt động)
  const currentData = (tab === 'categories' ? MOCK_CATEGORIES : MOCK_USERS).filter(item => item.status);

  return (
    <div className="page-content">
      <h2>Trang Chủ Cửa Hàng (Public)</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>* Chỉ hiển thị danh sách đang hoạt động.</p>

      <div className="tabs">
        <button className={`tab ${tab === 'categories' ? 'active' : ''}`} onClick={() => setTab('categories')}>Danh Mục</button>
        <button className={`tab ${tab === 'users' ? 'active' : ''}`} onClick={() => setTab('users')}>Người Dùng</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>{tab === 'categories' ? 'Tên danh mục' : 'Tên đăng nhập'}</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.name || item.uname}</td>
              <td>{item.created_at}</td>
              <td>
                <button className="btn-outline" onClick={() => setViewData({ type: tab, data: item })}>Xem chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL XEM CỦA KHÁCH: Hiển thị full thông tin trừ status và pass */}
      {viewData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Chi tiết {viewData.type === 'categories' ? 'Danh mục' : 'Người dùng'}</h3>
            <div className="detail-info">
              <p><strong>Mã ID:</strong> {viewData.data.id}</p>
              <p><strong>{viewData.type === 'categories' ? 'Tên danh mục:' : 'Tên đăng nhập (Uname):'}</strong> {viewData.data.name || viewData.data.uname}</p>
              
              {/* Hiển thị thêm thông tin của categories (trừ status) */}
              {viewData.type === 'categories' && (
                <>
                  <p><strong>Đường dẫn (Slug):</strong> {viewData.data.slug}</p>
                  <p><strong>Người tạo:</strong> {viewData.data.created_by}</p>
                </>
              )}

              <p><strong>Ngày tạo:</strong> {viewData.data.created_at}</p>

              {/* Ghi chú báo cho người dùng biết dữ liệu nào đã bị ẩn */}
              <p style={{ fontStyle: 'italic', color: '#d9534f', marginTop: '15px' }}>
                (Trạng thái hoạt động {viewData.type === 'users' && 'và Mật khẩu '}đã được ẩn vì lý do bảo mật. Vui lòng đăng nhập để xem)
              </p>
            </div>
            <div className="modal-actions" style={{marginTop: '20px'}}>
              <button className="btn-black" onClick={() => setViewData(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;