function Login() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">登入</h2>
      <label className="block mb-1">帳號</label>
      <input className="w-full border mb-4 p-2" />
      <label className="block mb-1">密碼</label>
      <input type="password" className="w-full border mb-4 p-2" />
      <button className="w-full bg-blue-500 text-white py-2 rounded">登入</button>
    </div>
  );
}

export default Login;
