import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">SNEAKER STORE</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Trang chủ</Link></li>
        <li><Link to="/admin">Quản trị (Admin)</Link></li> {/* Cập nhật link */}
        <li><Link to="/login">Đăng nhập</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;