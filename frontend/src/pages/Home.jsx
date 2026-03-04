import { useState, useEffect, useCallback } from 'react';
import '../styles/home.css';
import DetailModal from '../components/DetailModal';
import AddModal from '../components/AddModal';

function Home() {
  const [tab, setTab] = useState('categories');
  const [data, setData] = useState([]);
  const [viewItem, setViewItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // Viết hàm loadData để dùng chung cho cả useEffect và sau khi thêm mới thành công
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

        {/* Nút thêm mới - Đã sửa class cho đẹp */}
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
            data.map(item => (
              <tr key={item._id} className={item.status === false ? 'status-hidden-row' : ''}>
                <td>{item.name || item.uname}</td>
                <td>
                  <button className="btn-outline" onClick={() => setViewItem(item)}>Xem</button>
                  {isLoggedIn && (
                    <>
                      <button className="btn-outline" style={{ marginLeft: '5px' }}>Sửa</button>
                      <button className="btn-outline" style={{ marginLeft: '5px' }}>Ẩn/Hiện</button>
                    </>
                  )}
                </td>
              </tr>
            ))
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

      {/* MODAL THÊM MỚI */}
      <AddModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        tab={tab}
        onSuccess={loadData}
      />
    </div>
  );
}

export default Home;