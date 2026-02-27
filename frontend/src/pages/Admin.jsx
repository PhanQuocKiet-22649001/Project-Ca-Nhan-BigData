import { useState } from 'react';
import '../styles/admin.css';

const MOCK_CATEGORIES = [
  { id: 'C01', name: 'Giày Thể Thao', slug: 'giay-the-thao', created_by: 'admin_1', created_at: '2026-02-28', status: true },
  { id: 'C02', name: 'Giày Trẻ Em', slug: 'giay-tre-em', created_by: 'admin_2', created_at: '2026-02-25', status: false }
];
const MOCK_USERS = [
  { id: 'U01', uname: 'admin_vip', pass: 'hash_123abc', created_at: '2026-02-20', status: true },
  { id: 'U02', uname: 'user_banned', pass: 'hash_456xyz', created_at: '2026-02-22', status: false }
];

function Admin() {
  const [tab, setTab] = useState('categories');
  const [viewData, setViewData] = useState(null); // Cho Modal Xem full
  const [isFormOpen, setIsFormOpen] = useState(false); // Cho Modal Thêm/Sửa
  const [isEdit, setIsEdit] = useState(false);

  const currentData = tab === 'categories' ? MOCK_CATEGORIES : MOCK_USERS;

  const openForm = (editMode) => {
    setIsEdit(editMode);
    setIsFormOpen(true);
  };

  const handleToggle = (action) => {
    if (window.confirm(`Xác nhận: Bạn muốn ${action} bản ghi này?`)) {
      alert(`Thao tác ${action} thành công!`);
    }
  };

  return (
    <div className="page-content">
      <h2>Trung Tâm Quản Trị Hệ Thống</h2>
      
      <div className="tabs">
        <button className={`tab ${tab === 'categories' ? 'active' : ''}`} onClick={() => setTab('categories')}>Quản Lý Danh Mục</button>
        <button className={`tab ${tab === 'users' ? 'active' : ''}`} onClick={() => setTab('users')}>Quản Lý Người Dùng</button>
      </div>

      <div className="header-actions">
        <h3>Bảng Dữ Liệu {tab === 'categories' ? 'Danh Mục' : 'Người Dùng'} (Toàn quyền)</h3>
        <button className="btn-black" onClick={() => openForm(false)}>+ Thêm Mới</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>{tab === 'categories' ? 'Tên danh mục' : 'Tên đăng nhập'}</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(item => (
            <tr key={item.id}>
              <td>{item.name || item.uname}</td>
              <td className={item.status ? 'status-active' : 'status-inactive'}>
                {item.status ? 'Hoạt động' : 'Đã ẩn'}
              </td>
              <td>
                <button className="btn-outline" onClick={() => setViewData({ type: tab, data: item })}>Xem</button>
                <button className="btn-outline" onClick={() => openForm(true)}>Sửa</button>
                <button className={item.status ? "btn-outline btn-danger" : "btn-black"} onClick={() => handleToggle(item.status ? 'Ẩn' : 'Hiện')}>
                  {item.status ? 'Ẩn' : 'Hiện'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL 1: XEM FULL THÔNG TIN (Chỉ Admin mới có) */}
      {viewData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Chi tiết {viewData.type === 'categories' ? 'Danh mục' : 'Người dùng'} (Chế độ Admin)</h3>
            <div className="detail-info">
              <p><strong>Mã ID:</strong> {viewData.data.id}</p>
              <p><strong>{viewData.type === 'categories' ? 'Tên:' : 'Uname:'}</strong> {viewData.data.name || viewData.data.uname}</p>
              <p><strong>Ngày tạo:</strong> {viewData.data.created_at}</p>
              <hr style={{ margin: '15px 0', borderColor: '#eee' }} />
              <p><strong>Trạng thái:</strong> {viewData.data.status ? 'Hoạt động (Active)' : 'Đã ẩn (Inactive)'}</p>
              {viewData.type === 'categories' && (
                <>
                  <p><strong>Đường dẫn (Slug):</strong> {viewData.data.slug}</p>
                  <p><strong>Người tạo:</strong> {viewData.data.created_by}</p>
                </>
              )}
              {viewData.type === 'users' && (
                <p><strong>Mật khẩu đã mã hóa:</strong> {viewData.data.pass}</p>
              )}
            </div>
            <div className="modal-actions" style={{marginTop: '20px'}}>
              <button className="btn-black" onClick={() => setViewData(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: FORM THÊM / SỬA */}
      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEdit ? 'Cập Nhật' : 'Thêm Mới'} {tab === 'categories' ? 'Danh Mục' : 'Người Dùng'}</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("Validate dữ liệu OK. Lưu thành công!"); setIsFormOpen(false); }}>
              {tab === 'categories' ? (
                <div className="input-group">
                  <label>Tên danh mục (*)</label>
                  <input type="text" required />
                </div>
              ) : (
                 <>
                  <div className="input-group">
                    <label>Tên đăng nhập (Uname) (*)</label>
                    <input type="text" disabled={isEdit} required />
                  </div>
                  <div className="input-group">
                    <label>Mật khẩu (*)</label>
                    <input type="password" required />
                  </div>
                </>
              )}
              <div className="modal-actions" style={{ marginTop: '20px' }}>
                <button type="submit" className="btn-black">Lưu Dữ Liệu</button>
                <button type="button" className="btn-outline" onClick={() => setIsFormOpen(false)}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;