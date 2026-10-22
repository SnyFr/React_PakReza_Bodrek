import { Router } from "express";
import { createTransaction, getAllTransaction, getTransactionById } from "../controllers/transactionController.js";

const router = Router();

router.post('/', createTransaction)
router.get('/', getAllTransaction)
router.get('/:id', getTransactionById)


export default router;