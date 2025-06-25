import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', {
        username,
        password,
      });
      alert('註冊成功，請前往登入');
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border border-gray-300 p-2 mb-4 rounded"
        placeholder="請輸入帳號"
      />

      <label className="block mb-1">密碼</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 p-2 mb-4 rounded"
        placeholder="請輸入密碼"
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
