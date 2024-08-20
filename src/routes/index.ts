import express from "express";
import {
  getAllProducts,
  getCategories,
  getFavoriteProductList,
  getProductDetail,
  updateFavoriteProduct,
} from "../controllers/productController";
import { getListOrder, paymentOrder } from "../controllers/orderController";

export const router = express.Router();

router.get("/categories", getCategories);

router.get("/products", getAllProducts);
router.get("/products/favorite", getFavoriteProductList);
router.put("/products/favorite/:id", updateFavoriteProduct);
router.get("/products/:id", getProductDetail);

router.post("/orders", paymentOrder);
router.get("/orders", getListOrder);
