import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  // 每次渲染時都檢查是否有 token
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);
    };

    checkLogin(); // 初始載入時檢查

    // 監聽 storage 事件（跨頁有效）
    window.addEventListener('storage', checkLogin);

    // 也加一個 timer 每秒檢查（同頁登入也會更新）
    const interval = setInterval(checkLogin, 500);

    return () => {
      window.removeEventListener('storage', checkLogin);
      clearInterval(interval);
    };
  }, []);

  // 登出邏輯
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          🐾 MiGi寵物衣舖
        </Link>
        <div className="space-x-6">
          <Link to="/" className="font-bold text-gray-700 hover:text-purple-600">
            首頁
          </Link>
          <Link to="/cart" className="font-bold text-gray-700 hover:text-purple-600">
            購物車
          </Link>
          {isLogin ? (
            <button
              onClick={handleLogout}
              className="font-bold text-gray-700 hover:text-purple-600"
            >
              登出
            </button>
          ) : (
            <Link to="/login" className="font-bold text-gray-700 hover:text-purple-600">
              登入
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
