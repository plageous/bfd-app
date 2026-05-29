import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// database related stuff

const pool = mysql.createConnection({
    host: process.env.HOST_,
    user: process.env.USER_,
    password: process.env.PASS_,
    database: process.env.DATABASE_,
    port: process.env.PORT_
}).promise();

// actual service functions

const fetchProducts = async () => {
    const sql = "SELECT * FROM products ORDER BY id";
    const products = await pool.query(sql);
    if (products === null) { console.log("Failed to retrieve products!"); }
    return products[0];
}

export const getAllProducts = () => ({
        "productCount": fetchProducts.length,
        "productData": fetchProducts.map(el => ({
                id: el.id,
                name: el.productName,
                desc: el.productDesc,
                type: el.productType,
                price: el.producePrice,
                imgUrl: el.image_url
            }))
    });

export const getProductById = (findID) => fetchProducts.find(el => el.id === findID);