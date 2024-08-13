import { supabase } from "../config/connectDB";
import { Product } from "../models/productModel";

// export const getProducts = async (): Promise<Product[]> => {
//   const { data, error } = await supabase.from<Product>("products").select("*");

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// };
