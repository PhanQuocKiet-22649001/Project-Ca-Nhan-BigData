import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  // Thống nhất dùng 'token' để kiểm tra đăng nhập
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token; 

  const handleLogout = () => {
    // Xóa sạch localStorage để không còn rác
    localStorage.clear(); 
    // Dùng href để ép tải lại toàn bộ App, xóa sạch State cũ trong RAM
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
            <li><button className="btn-nav" onClick={handleLogout}>Đăng xuất</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;