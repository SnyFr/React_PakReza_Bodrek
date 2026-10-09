import { Router } from "express";
import { getAllUser, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController.js";

const router = Router();
router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;