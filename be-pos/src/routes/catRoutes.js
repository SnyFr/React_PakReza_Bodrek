import { Router } from "express";
import { getAllCat, getCatById, createCat, updateCat, deleteCat } from "../controllers/catController.js";
import { createCategorySchema, updateCategorySchema } from "../validation/categoryValidation.js";
import { validate } from "../middlewares/validationMiddleware.js";
validate

const router = Router();

router.get('/', getAllCat)
router.get('/:id', getCatById)
router.post('/', validate(createCategorySchema), createCat)
router.put('/:id', validate(updateCategorySchema), updateCat)
router.delete('/:id', deleteCat)

export default router