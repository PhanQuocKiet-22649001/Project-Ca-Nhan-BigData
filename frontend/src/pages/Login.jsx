import { useState } from 'react';
import '../styles/login.css'; // Giữ nguyên file CSS của bạn

function Login() {
  // 1. Tạo state để giữ dữ liệu nhập vào
  const [uname, setUname] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Xóa lỗi cũ trước khi thử đăng nhập mới

    try {
      // 2. Gửi yêu cầu đăng nhập sang Backend
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uname, pass })
      });

      const data = await response.json();

      if (response.ok) {
        // 3. ĐĂNG NHẬP THÀNH CÔNG
        // Lưu Token và thông tin vào localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('adminUname', data.user.uname);
        localStorage.setItem('isAuth', 'true'); // Giữ lại cái này cho logic App.js của bạn
        
        alert("Chào mừng Admin quay trở lại!");
        window.location.href = '/'; // Tải lại trang chủ để nhận diện quyền Admin
      } else {
        // 4. THẤT BẠI: Hiện lỗi (Ví dụ: Sai mật khẩu)
        setError(data.message || 'Đăng nhập không thành công!');
      }
    } catch (err) {
      setError('Không thể kết nối đến máy chủ Backend!');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Đăng Nhập</h2>
        
        {/* Hiển thị thông báo lỗi nếu có */}
        {error && <p style={{ color: '#d9534f', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Tên đăng nhập (uname)</label>
            <input 
              type="text" 
              required 
              value={uname}
              onChange={(e) => setUname(e.target.value)} 
              placeholder="Ví dụ: admin"
            />
          </div>
          <div className="input-group">
            <label>Mật khẩu (pass)</label>
            <input 
              type="password" 
              required 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="********"
            />
          </div>
          <button type="submit" className="btn-black btn-full">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}

export default Login;