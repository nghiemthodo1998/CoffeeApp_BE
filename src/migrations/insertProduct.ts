import { query } from "../config/database";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../models/productModel";

async function addProduct(product: Product) {
  const {
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

  try {
    const res = await query(
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
        uuidv4(), // Generate a unique id
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

    console.log("Product added successfully:", res.rows[0]);
  } catch (error) {
    console.error("Error adding product:", error);
  }
}

// Example usage
const newProduct = {
  id: "C1",
  name: "Americano",
  description: `The Americano is another popular type of coffee drink, and it's very easy to make! It's just espresso with hot water dripping over it. The name came about during World War II when European baristas added water to their espresso drinks for the American soldiers stationed there. The resulting drink had a smoother, less concentrated flavour than espresso and thus the Americano was born.`,
  roasted: "Medium Roasted",
  imagelink_square:
    "https://res.cloudinary.com/diadhtlpl/image/upload/v1723521043/CoffeeApp/americano_pic_1_square.png",
  imagelink_portrait:
    "https://res.cloudinary.com/diadhtlpl/image/upload/v1723521417/americano_pic_1_portrait.png",
  ingredients: "Milk",
  special_ingredient: "With Steamed Milk",
  prices: [
    { size: "S", price: "1.38", currency: "$" },
    { size: "M", price: "3.15", currency: "$" },
    { size: "L", price: "4.29", currency: "$" },
  ],
  average_rating: 4.7,
  ratings_count: "6,879",
  favourite: false,
  type: "Coffee",
  index: 0,
};

addProduct(newProduct);
