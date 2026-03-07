import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const token = localStorage.getItem('token');
  // Lấy tên Admin đã lưu từ localStorage
  const adminUname = localStorage.getItem('adminUname');
  const isLoggedIn = !!token; 

  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = '/'; 
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">HỆ THỐNG MERN</div>
      <ul className="nav-links">
        {!isLoggedIn ? (
          <li><Link to="/login" className="btn-login">Đăng nhập</Link></li>
        ) : (
          <>
            {/* Hiển thị tên user đang login */}
            <li className="nav-item user-name">
              Chào, <strong>{adminUname}</strong>
            </li>
            <li>
              <button className="btn-nav btn-logout" onClick={handleLogout}>
                Đăng xuất
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;