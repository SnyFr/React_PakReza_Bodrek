import { Router } from "express";
import { getAllCat, getCatById, createCat, updateCat, deleteCat } from "../controllers/catController.js";

const router = Router();

router.get('/', getAllCat)
router.get('/:id', getCatById)
router.post('/', createCat)
router.put('/:id', updateCat)
router.delete('/:id', deleteCat)

export default router