import { Router } from "express";
import { login } from "../controllers/AuthController.js";
// import { verifyToken } from "../middlewares/middleware.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { loginSchema } from "../validation/authValidation.js";

const authRoutes = Router();

authRoutes.post('/login', validate(loginSchema), login);
// authRoutes.get('/me', verifyToken)

export default authRoutes;