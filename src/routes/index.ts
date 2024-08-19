import express from "express";
import {
  getAllProducts,
  getCategories,
  getProductDetail,
} from "../controllers/productController";
import { getListOrder, paymentOrder } from "../controllers/orderController";

export const router = express.Router();

router.get("/products", getAllProducts);
router.get("/categories", getCategories);
router.get("/products/:id", getProductDetail);
router.post("/orders", paymentOrder);
router.get("/orders", getListOrder);
