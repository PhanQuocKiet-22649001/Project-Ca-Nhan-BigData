import { useState, useEffect, useCallback } from 'react';
import '../styles/home.css';
import DetailModal from '../components/DetailModal';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';

function Home() {
  const [tab, setTab] = useState('categories');
  const [data, setData] = useState([]);
  const [viewItem, setViewItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const currentUserId = localStorage.getItem('userId');

  const loadData = useCallback(() => {
    const token = localStorage.getItem('token');
    const hasToken = !!token;
    setIsLoggedIn(hasToken);

    const url = `http://localhost:5000/api/home`;
    fetch(url, { headers: hasToken ? { 'Authorization': `Bearer ${token}` } : {} })
      .then(res => res.json())
      .then(resData => setData(resData[tab] || []))
      .catch(err => console.error("Lỗi tải dữ liệu:", err));
  }, [tab]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // HÀM XỬ LÝ KHI NHẤN NÚT SỬA
  const handleEdit = (item) => {
    setEditItem(item); // Lưu thông tin mục muốn sửa
    setShowEdit(true); // Mở Modal sửa
  };

  const toggleStatus = async (id, currentStatus) => {
    if (tab === 'users' && id === currentUserId) {
      alert("Bạn không thể tự ẩn tài khoản của chính mình!");
      return;
    }

    const confirmMsg = currentStatus ? "Bạn có chắc muốn Ẩn mục này?" : "Bạn có muốn Hiện mục này?";
    if (!window.confirm(confirmMsg)) return;

    const token = localStorage.getItem('token');
    const endpoint = tab === 'categories' ? `categories/status/${id}` : `users/status/${id}`;

    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        loadData();
      } else {
        alert("Cập nhật trạng thái thất bại!");
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    }
  };

  return (
    <div className="page-content">
      {isLoggedIn && (
        <div className="welcome-banner">
          <strong>CHÀO MỪNG BẠN ĐĂNG NHẬP THÀNH CÔNG!</strong>
        </div>
      )}

      <div className="home-top-bar">
        <h2>QUẢN LÝ {tab.toUpperCase()}</h2>
      </div>

      <div className="controls-row">
        <div className="tabs">
          <button className={`tab ${tab === 'categories' ? 'active' : ''}`} onClick={() => setTab('categories')}>Danh Mục</button>
          <button className={`tab ${tab === 'users' ? 'active' : ''}`} onClick={() => setTab('users')}>Người Dùng</button>
        </div>

        {isLoggedIn && (
          <button className="btn-black btn-add-new" onClick={() => setShowAdd(true)}>
            + Thêm mới
          </button>
        )}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Tên {tab === 'categories' ? 'danh mục' : 'người dùng'}</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan="3" className="empty-data-msg">Chưa có dữ liệu...</td></tr>
          ) : (
            data.map(item => {
              const isMe = tab === 'users' && item._id === currentUserId;

              return (
                <tr key={item._id} className={item.status === false ? 'status-hidden-row' : ''}>
                  <td>
                    {item.name || item.uname}
                    {isMe && <span style={{ color: 'blue', fontSize: '12px', marginLeft: '5px' }}>(Tôi)</span>}
                  </td>
                  <td>
                    <button className="btn-outline" onClick={() => setViewItem(item)}>Xem</button>
                    {isLoggedIn && (
                      <>
                        {/* NÚT SỬA ĐÃ ĐƯỢC GẮN HÀM handleEdit */}
                        <button
                          className="btn-outline"
                          style={{
                            marginLeft: '5px',
                            // Nếu là tab users và không phải chính mình thì làm mờ nút Sửa
                            opacity: (tab === 'users' && !isMe) ? 0.5 : 1,
                            cursor: (tab === 'users' && !isMe) ? 'not-allowed' : 'pointer'
                          }}
                          disabled={tab === 'users' && !isMe} // Khóa nút nếu không phải chính mình
                          onClick={() => handleEdit(item)}
                          title={tab === 'users' && !isMe ? "Bạn chỉ được sửa mật khẩu của chính mình" : ""}
                        >
                          Sửa
                        </button>

                        <button
                          className="btn-outline"
                          style={{
                            marginLeft: '5px',
                            color: isMe ? '#ccc' : (item.status ? '#dc3545' : '#28a745'),
                            fontWeight: 'bold',
                            cursor: isMe ? 'not-allowed' : 'pointer'
                          }}
                          disabled={isMe}
                          onClick={() => toggleStatus(item._id, item.status)}
                          title={isMe ? "Bạn không thể tự ẩn chính mình" : ""}
                        >
                          {item.status ? 'Ẩn' : 'Hiện'}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* MODAL CHI TIẾT */}
      <DetailModal
        item={viewItem}
        tab={tab}
        isLoggedIn={isLoggedIn}
        onClose={() => setViewItem(null)}
      />

      {/* MODAL THÊM */}
      <AddModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        tab={tab} onSuccess={loadData}
      />

      {/* MODAL SỬA*/}
      <EditModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        tab={tab}
        item={editItem}
        onSuccess={loadData}
      />
    </div>
  );
}

export default Home;