import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Register() {
  const [formData, setFormData] = useState({
    username: '', //帳號
    password: '', //密碼
    name: '', //姓名
    email: '', //信箱
    phone: '', //連絡電話
  });
  const navigate = useNavigate();

  //點擊事件
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleRegister = async () => {
    try {
      await axios.post('https://shopcar-production.up.railway.app/api/register', formData);
      toast.success('註冊成功，請前往登入');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || '註冊失敗');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-black-600">註冊帳號</h2>

      <label className="block mb-1">帳號</label>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 mb-4 rounded"
        placeholder="請輸入帳號"
      />

      <label className="block mb-1">密碼</label>
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 mb-4 rounded"
        placeholder="請輸入密碼"
      />

      <label className="block mb-1">姓名</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 mb-4 rounded"
        placeholder="請輸入姓名"
      />

      <label className="block mb-1">電子郵件</label>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 mb-4 rounded"
        placeholder="請輸入電子郵件"
      />

      <label className="block mb-1">連絡電話</label>
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 mb-4 rounded"
        placeholder="請輸入連絡電話"
      />

      <button
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-purple-700"
      >
        註冊
      </button>
    </div>
  );
}

export default Register;
