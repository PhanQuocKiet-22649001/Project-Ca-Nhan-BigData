import { useState } from 'react';
import '../styles/admin.css';

const initialItems = [
  { id: 1, name: 'Classic Black Sneaker', price: '1,500,000' },
  { id: 2, name: 'White Runner Pro', price: '2,200,000' },
];

const initialUsers = [
  { id: 1, username: 'admin1', email: 'admin@sneaker.com', role: 'Admin' },
  { id: 2, username: 'user_nguyen', email: 'nguyen@gmail.com', role: 'User' },
];

function Admin() {
  const [activeTab, setActiveTab] = useState('items'); // 'items' hoặc 'users'
  const [items, setItems] = useState(initialItems);
  const [users, setUsers] = useState(initialUsers);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({}); // Dùng chung cho cả user và item

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục này?')) {
      if (activeTab === 'items') {
        setItems(items.filter(item => item.id !== id));
      } else {
        setUsers(users.filter(user => user.id !== id));
      }
    }
  };

  const openModalForCreate = () => {
    if (activeTab === 'items') {
      setFormData({ id: Date.now(), name: '', price: '' });
    } else {
      setFormData({ id: Date.now(), username: '', email: '', role: 'User' });
    }
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openModalForEdit = (data) => {
    setFormData(data);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (activeTab === 'items') {
      if (isEditMode) {
        setItems(items.map(item => item.id === formData.id ? formData : item));
      } else {
        setItems([...items, formData]);
      }
    } else {
      if (isEditMode) {
        setUsers(users.map(user => user.id === formData.id ? formData : user));
      } else {
        setUsers([...users, formData]);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="admin-page">
      <h2>Bảng Điều Khiển Quản Trị</h2>
      
      {/* Tabs */}
      <div className="admin-tabs">
        <button 
          className={activeTab === 'items' ? 'tab-active' : 'tab-inactive'} 
          onClick={() => setActiveTab('items')}
        >
          Quản Lý Sản Phẩm
        </button>
        <button 
          className={activeTab === 'users' ? 'tab-active' : 'tab-inactive'} 
          onClick={() => setActiveTab('users')}
        >
          Quản Lý Người Dùng
        </button>
      </div>

      <div className="admin-header">
        <h3>{activeTab === 'items' ? 'Danh Sách Sản Phẩm' : 'Danh Sách Người Dùng'}</h3>
        <button className="btn-black" onClick={openModalForCreate}>
          + Thêm Mới {activeTab === 'items' ? 'Sản Phẩm' : 'User'}
        </button>
      </div>

      {/* Render Bảng Dữ Liệu Tương Ứng */}
      <table className="admin-table">
        <thead>
          {activeTab === 'items' ? (
            <tr>
              <th>ID</th>
              <th>Tên Sản Phẩm</th>
              <th>Giá</th>
              <th>Hành Động</th>
            </tr>
          ) : (
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Hành Động</th>
            </tr>
          )}
        </thead>
        <tbody>
          {activeTab === 'items' ? (
            items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price} VNĐ</td>
                <td>
                  <button className="btn-outline" onClick={() => openModalForEdit(item)}>Sửa</button>
                  <button className="btn-outline btn-danger" onClick={() => handleDelete(item.id)}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn-outline" onClick={() => openModalForEdit(user)}>Sửa</button>
                  <button className="btn-outline btn-danger" onClick={() => handleDelete(user.id)}>Xóa</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal Dùng Chung Cho Create/Edit Item và User */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditMode ? 'Sửa' : 'Thêm'} {activeTab === 'items' ? 'Sản Phẩm' : 'Người Dùng'}</h3>
            
            {/* Form Sản Phẩm */}
            {activeTab === 'items' && (
              <>
                <div className="input-group">
                  <label>Tên giày</label>
                  <input 
                    type="text" 
                    value={formData.name || ''} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Giá</label>
                  <input 
                    type="text" 
                    value={formData.price || ''} 
                    onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </>
            )}

            {/* Form Người Dùng */}
            {activeTab === 'users' && (
              <>
                <div className="input-group">
                  <label>Username</label>
                  <input 
                    type="text" 
                    value={formData.username || ''} 
                    onChange={e => setFormData({...formData, username: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={formData.email || ''} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Vai trò</label>
                  <select 
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc' }}
                    value={formData.role || 'User'} 
                    onChange={e => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </>
            )}

            <div className="modal-actions">
              <button className="btn-black" onClick={handleSave}>Lưu</button>
              <button className="btn-outline" onClick={() => setIsModalOpen(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;