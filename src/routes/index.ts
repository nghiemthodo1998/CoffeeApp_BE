import express from "express";
import {
  getAllProducts,
  getCategories,
  getProductDetail,
} from "../controllers/productController";

export const router = express.Router();

router.get("/products", getAllProducts);
router.get("/categories", getCategories);
router.get("/products/:id", getProductDetail);
