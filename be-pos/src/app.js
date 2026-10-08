import express from "express";
import cors from "cors";
import authRoutes  from "./routes/authRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  //req : mengambil data dari body dan parameter
  //req.body, req.params
  res.json({message: "Selamat Datang di Indomaret, Selamat Berbelanja!"});
})

export default app;