import express from "express";
import cors from "cors";
import authRoutes  from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import catRoutes from "./routes/catRoutes.js";
import prodRoutes from "./routes/prodRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', catRoutes);
app.use('/api/product', prodRoutes);

app.get('/', (req, res) => {
  //req : mengambil data dari body dan parameter
  //req.body, req.params
  res.json({message: "Selamat Datang di Indomaret, Selamat Berbelanja!"});
})

export default app;