import '../styles/login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Đăng Nhập Quản Trị</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="Nhập tài khoản..." />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Nhập mật khẩu..." />
          </div>
          <button className="btn-black btn-full" onClick={() => alert('Đăng nhập thành công (Mock)')}>Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}

export default Login;