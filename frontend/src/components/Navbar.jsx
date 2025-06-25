import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          🐾 寵物商城
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-purple-600">首頁</Link>
          <Link to="/cart" className="text-gray-700 hover:text-purple-600">購物車</Link>
          <Link to="/login" className="text-blue-600 hover:underline">登入</Link>
          <Link to="/register" className="text-blue-600 hover:underline">註冊</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
