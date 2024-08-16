import { query } from "../../config/database";

async function createCategoryTable() {
  try {
    const res = await query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Table created successfully:", res);
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createCategoryTable();
