import { Request, Response } from "express";
import { supabase } from "../config/connectDB";

export const getAllProducts = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
};
