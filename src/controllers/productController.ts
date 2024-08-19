import { Request, Response } from "express";
import { supabase } from "../config/connectDB";

export const getAllProducts = async (req: Request, res: Response) => {
  const { category: name, type, textSearch } = req.query;

  try {
    let query = supabase
      .from("products")
      .select("*")
      .order("name", { ascending: true });

    if (textSearch) {
      query = query.ilike("name", `%${textSearch}%`);
    }

    if (!(name === "All")) {
      query = query.eq("name", name);
    }

    if (type) {
      query = query.eq("type", type);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    let query = supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getProductDetail = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    let query = supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const toggleFavoriteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("favorite")
      .eq("product_id", productId)
      .single();

    if (fetchError) {
      console.error("Error fetching product:", fetchError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newFavoriteStatus = !product.favorite;

    const { data, error: updateError } = await supabase
      .from("products")
      .update({ favorite: newFavoriteStatus })
      .eq("product_id", productId)
      .single();

    if (updateError) {
      console.error("Error updating product:", updateError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
