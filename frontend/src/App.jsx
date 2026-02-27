import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';

const isAuth = localStorage.getItem('isAuth') === 'true';

// Component bảo vệ cho Admin
function ProtectedRoute({ children }) {
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Nếu chưa Login thì ở Home, nếu Login rồi thì bắt buộc ở Admin */}
          <Route path="/" element={isAuth ? <Navigate to="/admin" replace /> : <Home />} />
          <Route path="/login" element={isAuth ? <Navigate to="/admin" replace /> : <Login />} />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;