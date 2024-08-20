import express from "express";
import {
  getAllProducts,
  getCategories,
  getProductDetail,
  updateFavoriteProduct,
} from "../controllers/productController";
import { getListOrder, paymentOrder } from "../controllers/orderController";

export const router = express.Router();

router.get("/products", getAllProducts);
router.get("/categories", getCategories);
router.get("/products/:id", getProductDetail);
router.put("/products/favorite/:id", updateFavoriteProduct);
router.post("/orders", paymentOrder);
router.get("/orders", getListOrder);
