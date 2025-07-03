import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import pool from "./db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password, name, email, phone } = req.body;

    //加密密碼
    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, password, name, email, phone) VALUES (?, ?, ?, ?, ?)",
      [username, hash, name, email, phone]
    );

    res.json({ message: "註冊成功" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // 從 MySQL 查找使用者
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);

  if (rows.length === 0) {
    return res.status(400).json({ message: "帳號錯誤" });
  }

  //找出資料庫的密碼
  const user = rows[0];

  // 比對密碼
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ message: "密碼錯誤" });
  }
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
