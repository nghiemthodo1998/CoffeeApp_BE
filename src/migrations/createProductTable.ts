import { query } from "../config/database";

async function createProductsTable() {
  try {
    const res = await query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        roasted TEXT,
        imagelink_square TEXT,
        imagelink_portrait TEXT,
        ingredients TEXT,
        special_ingredient TEXT,
        prices JSONB,
        average_rating FLOAT8 DEFAULT 0.0,
        ratings_count TEXT,
        favourite BOOLEAN DEFAULT FALSE,
        type TEXT,
        index INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Table created successfully:", res);
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createProductsTable();
