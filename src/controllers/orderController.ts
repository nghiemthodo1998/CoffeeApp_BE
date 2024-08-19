import { Request, Response } from "express";
import { supabase } from "../config/connectDB";
import { v4 as uuidv4 } from "uuid";

export const paymentOrder = async (req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const { listOrder, totalPrice, created_at } = req.body;
    const { data, error } = await supabase.from("orders").insert([
      {
        id,
        total_price: totalPrice,
        list_order: JSON.stringify(listOrder),
        created_at,
      },
    ]);

    if (error) {
      throw error;
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getListOrder = async (req: Request, res: Response) => {
  try {
    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
