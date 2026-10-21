import { Router } from "express";
import { getAllUser, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController.js";

import { verifyToken } from "../middlewares/middleware.js"

const router = Router();

router.use(verifyToken)
router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;