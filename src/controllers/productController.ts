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

export const updateFavoriteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const { data: product, error } = await supabase
      .from("products")
      .select("favourite")
      .eq("id", productId)
      .single();

    if (error) {
      return res.status(400).json({ error: "Product not found" });
    }

    const updatedFavorite = !product.favourite;

    const { error: updateError } = await supabase
      .from("products")
      .update({ favourite: updatedFavorite })
      .eq("id", productId);

    if (updateError) {
      return res.status(400).json({ error: "Error updating favorite" });
    }

    return res.status(200).json({ success: true, favorite: updatedFavorite });
  } catch (error) {}
};
