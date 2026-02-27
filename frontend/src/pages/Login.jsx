import '../styles/login.css'; // Chỉ import login.css

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('isAuth', 'true');
    window.location.href = '/'; 
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Đăng Nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Tên đăng nhập (uname)</label>
            <input type="text" required />
          </div>
          <div className="input-group">
            <label>Mật khẩu (pass)</label>
            <input type="password" required />
          </div>
          <button type="submit" className="btn-black btn-full">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}

export default Login;