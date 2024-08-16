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
