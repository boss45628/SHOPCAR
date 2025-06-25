import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // 清除 token
    alert('你已登出');
    navigate('/login'); // 導回登入頁面
  };

  return (
    <div>
      <h2>歡迎來到首頁！</h2>
      {token ? (
        <>
          <p>你已登入，Token：{token.slice(0, 20)}...</p>
          <button onClick={handleLogout}>登出</button>
        </>
      ) : (
        <p>尚未登入</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard name="貓咪罐頭" price={199} image="https://example.com/cat-food.jpg" />
        <ProductCard name="狗狗罐頭" price={199} image="https://example.com/cat-food.jpg" />
        <ProductCard name="貓咪罐頭" price={199} image="https://example.com/cat-food.jpg" />
        <ProductCard name="貓咪罐頭" price={199} image="https://example.com/cat-food.jpg" />
        <ProductCard name="貓咪罐頭" price={199} image="https://example.com/cat-food.jpg" />
        <ProductCard name="貓咪罐頭" />
      </div>
    </div>
  );
}
