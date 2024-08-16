import { query } from "../../config/database";
import { dataProduct } from "../../data";
import { Product } from "../../models/productModel";

async function addCategory(products: Product[]) {
  const uniqueCategories = Array.from(
    new Map(products.map((item) => [item.name, item])).values()
  );

  try {
    const insertPromises = uniqueCategories.map((product, index) => {
      return query(
        `
        INSERT INTO categories (
          id, name,type, created_at, updated_at
        ) VALUES (
          $1, $2, $3, NOW(), NOW()
        ) RETURNING *;
        `,
        [index, product.name, product.type]
      );
    });

    const results = await Promise.all(insertPromises);
    // results.forEach((res) =>
    //   console.log("Product added successfully:", res.rows[0])
    // );
    console.log("insert categories done");
  } catch (error) {
    console.error("Error adding categories:", error);
  }
}

addCategory(dataProduct);
