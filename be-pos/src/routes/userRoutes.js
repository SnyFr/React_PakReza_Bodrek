import { Router } from "express";
import { getAllUser, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { createUserSchema, updateUserSchema } from "../validation/userValidation.js";

import { verifyToken } from "../middlewares/middleware.js"

const router = Router();

router.use(verifyToken)
router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/', validate(createUserSchema), createUser);
router.put('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);


export default router;