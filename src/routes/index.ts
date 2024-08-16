import express from "express";
import {
  getAllProducts,
  getCategories,
} from "../controllers/productController";

export const router = express.Router();

router.get("/products", getAllProducts);
router.get("/categories", getCategories);
