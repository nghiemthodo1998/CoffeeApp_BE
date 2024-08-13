import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.SUPABASE_DATABASE_URL,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
