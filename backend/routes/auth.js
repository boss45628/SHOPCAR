import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const users = []; // 暫存用戶

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10); // 將密碼加密
  users.push({ username, password: hash });     // 存入記憶體陣列中
  res.json({ message: '註冊成功' });            // 傳訊息回前端
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: '帳號錯誤' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: '密碼錯誤' });
//加密
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

export default router;
