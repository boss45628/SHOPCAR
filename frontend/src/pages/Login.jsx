import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';

function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  // Google 登入成功
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    if (!token) {
      console.error('⚠️ 沒有拿到 Google Token，登入失敗');
      return;
    }

    console.log('✅ 拿到 Google Token', token);
    try {
      const res = await axios.post('http://localhost:5000/api/google-login', {
        token,
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        alert('登入成功！歡迎 ' + res.data.name);
      } else {
        alert('登入失敗');
      }
    } catch (err) {
      console.error('錯誤:', err);
    }
  };

  // Google 登入失敗
  const handleGoogleError = () => {
    console.error('Google 登入失敗');
  };

  // 一般帳密登入
  const handleNormalLogin = async () => {
    if (!account || !password) {
      alert('請輸入帳號與密碼');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        account,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        alert('登入成功！歡迎 ' + res.data.name);
      } else {
        alert('帳號或密碼錯誤');
      }
    } catch (err) {
      console.error('登入失敗:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-black-600">登入</h2>

      <label className="block mb-1">帳號</label>
      <input
        className="w-full border mb-4 p-2"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />

      <label className="block mb-1">密碼</label>
      <input
        type="password"
        className="w-full border mb-4 p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={handleNormalLogin}>
        登入
      </button>

      <div className="my-4">
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
      </div>
    </div>
  );
}

export default Login;
