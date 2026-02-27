import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Giả lập kiểm tra đăng nhập (thực tế sẽ check Token/Session)
  const isAuth = localStorage.getItem('token'); 
  
  if (!isAuth) {
    alert("Vui lòng đăng nhập để truy cập khu vực này!");
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;