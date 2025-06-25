import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();

const users = []; // 暫存用戶

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10); // 將密碼加密
  users.push({ username, password: hash }); // 存入記憶體陣列中
  res.json({ message: "註冊成功" }); // 傳訊息回前端
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "帳號錯誤" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "密碼錯誤" });
  //加密
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

//google驗證
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // TODO: 寫入自己的 DB 查詢與帳號建立邏輯（如果沒存在就註冊）
    console.log("使用者登入:", email, name);

    // 範例產生 JWT token（你可用 session 或其他）
    const jwt = "mocked-jwt-token-for-" + email;

    res.json({ success: true, token: jwt, email, name, picture });
  } catch (error) {
    console.error("驗證失敗", error);
    res.status(401).json({ success: false, message: "Google token 無效" });
  }
});

export default router;
