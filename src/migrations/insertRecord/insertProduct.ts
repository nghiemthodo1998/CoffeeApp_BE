// import { v4 as uuidv4 } from "uuid";
import { query } from "../../config/database";
import { dataProduct } from "../../data";
import { Product } from "../../models/productModel";

async function addProduct(products: Product[]) {
  try {
    const insertPromises = products.map((product) => {
      const {
        id,
        name,
        description,
        roasted,
        imagelink_square,
        imagelink_portrait,
        ingredients,
        special_ingredient,
        prices,
        average_rating,
        ratings_count,
        favourite,
        type,
        index,
      } = product;

      return query(
        `
        INSERT INTO products (
          id, name, description, roasted, imagelink_square, imagelink_portrait,
          ingredients, special_ingredient, prices, average_rating, ratings_count,
          favourite, type, index, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW()
        ) RETURNING *;
        `,
        [
          // uuidv4(),
          id,
          name,
          description,
          roasted,
          imagelink_square,
          imagelink_portrait,
          ingredients,
          special_ingredient,
          JSON.stringify(prices),
          average_rating,
          ratings_count,
          favourite,
          type,
          index,
        ]
      );
    });

    const results = await Promise.all(insertPromises);
    // results.forEach((res) =>
    //   console.log("Product added successfully:", res.rows[0])
    // );
    console.log("insert product done");
  } catch (error) {
    console.error("Error adding products:", error);
  }
}

addProduct(dataProduct);
