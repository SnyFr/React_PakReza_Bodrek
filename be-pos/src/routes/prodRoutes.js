import { Router } from "express";
import { getAllProduct, getProdById, createProd, updateProd, deleteProd } from "../controllers/productController.js";
import { createProductSchema, updateProductSchema } from "../validation/productValidation.js";
import { validate } from "../middlewares/validationMiddleware.js";

const router = Router();

router.get('/', getAllProduct)
router.get('/:id', getProdById)
router.post('/', validate(createProductSchema), createProd)
router.put('/:id', validate(updateProductSchema), updateProd)
router.delete('/:id', deleteProd)

export default router