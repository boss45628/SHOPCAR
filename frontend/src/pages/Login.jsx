import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  //每次登入時都要清除google快取
  useEffect(() => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
    if (isGoogleLogin()) {
      console.log('✅ 目前是 Google 登入！');
    } else {
      console.log('✅ 目前是一般會員登入！');
    }
  }, []);

  function isGoogleLogin() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    // 若你的 Google token 是自訂字串
    if (token.startsWith('mocked-jwt-token-for')) {
      return true;
    }

    // 若未來都改用 JWT，也可以在此解析 payload 判斷
    return false;
  }

  // Google 登入成功
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    if (!token) {
      toast.error('⚠️ 沒有拿到 Google Token，登入失敗');
      return;
    }

    console.log('✅ 拿到 Google Token', token);
    try {
      const res = await axios.post('http://localhost:5000/api/google-login', { token });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        window.dispatchEvent(new Event('storage')); // ← 加這行
        toast.success('登入成功');
        navigate('/');
      } else {
        toast.error('登入失敗');
      }
    } catch (err) {
      console.error('錯誤:', err);
      alert('登入失敗');
    }
  };

  // Google 登入失敗
  const handleGoogleError = () => {
    console.error('Google 登入失敗');
    toast.error('Google 登入失敗，請稍後再試');
  };

  // 一般帳密登入
  const handleNormalLogin = async () => {
    if (!username || !password) {
      toast.error('請輸入帳號與密碼');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      const token = res.data.token;
      if (token) {
        localStorage.setItem('token', token);
        window.dispatchEvent(new Event('storage')); // ← 加這行
        navigate('/');
        toast.success('登入成功');
      } else {
        toast.error('帳號或密碼錯誤');
      }
    } catch (err) {
      alert('登入失敗');
      console.error(err);
    }
  };

  // 前往註冊頁面
  const gotoRegister = () => {
    navigate('/Register');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-3xl font-bold mb-4 text-gray-700">登入</h2>

      <label className="block mb-1">帳號</label>
      <input
        className="w-full border mb-4 p-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className="block mb-1">密碼</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full border mb-4 p-2 pr-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/3 transform -translate-y-1/2 text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button
        className="w-full font-bold bg-blue-500 text-white py-2 rounded hover:bg-blue-400 "
        onClick={handleNormalLogin}
      >
        開始購物瞜
      </button>

      <div className="my-4">
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">還不是會員嗎？</h2>
        <button
          className="w-full font-bold border border-blue-500 text-blue-500 bg-white py-2 rounded hover:bg-blue-100"
          onClick={gotoRegister}
        >
          加入會員
        </button>
      </div>
    </div>
  );
}

export default Login;
