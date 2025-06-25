import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

//建立網頁架構
const app = express();
app.use(cors());
//要有這段才能解析json
app.use(express.json());

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
