import { query } from "../../config/database";

async function createOrderTable() {
  try {
    const res = await query(`
      CREATE TABLE IF NOT EXISTS Orders (
        id TEXT PRIMARY KEY,
        total_price FLOAT8 DEFAULT 0.0,
        list_order JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Table created successfully:", res);
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createOrderTable();
