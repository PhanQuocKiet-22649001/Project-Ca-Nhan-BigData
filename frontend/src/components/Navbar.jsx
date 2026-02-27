import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const isAuth = localStorage.getItem('isAuth') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    window.location.href = '/'; // Tải lại trang, tự văng về Trang chủ
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">HỆ THỐNG CMS</div>
      <ul className="nav-links">

        {/* VIEW CỦA KHÁCH CHƯA LOGIN */}
        {!isAuth && <li><Link to="/">Trang Chủ</Link></li>}
        {!isAuth && <li><Link to="/login">Đăng nhập</Link></li>}

        {/* VIEW CỦA ADMIN ĐÃ LOGIN */}
        {isAuth && <li><Link to="/admin">Trang Quản Trị</Link></li>}
        {isAuth && <li><button className="btn-nav" onClick={handleLogout}>Đăng xuất</button></li>}
      </ul>
    </nav>
  );
}

export default Navbar;