import { Router } from "express";
import { getAllProduct, getProdById, createProd, updateProd, deleteProd } from "../controllers/productController.js";

const router = Router();

router.get('/', getAllProduct)
router.get('/:id', getProdById)
router.post('/', createProd)
router.put('/:id', updateProd)
router.delete('/:id', deleteProd)

export default router