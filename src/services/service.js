import pool from "../scripts/db.js";

const fetchProducts = async (name = "") => {
    let sql = "SELECT * FROM products";
    const params = [];

    if (name) {
        const keywords = name
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean);

        if (keywords.length) {
            const clauses = keywords.map(() => "LOWER(productName) LIKE ?");
            sql += ` WHERE ${clauses.join(" OR ")}`;
            params.push(...keywords.map(keyword => `%${keyword}%`));
        }
    }

    sql += " ORDER BY id";

    try {
        const [rows] = await pool.query(sql, params);
        return rows;
    } catch (err) {
        console.log("-- Error retrieving data from database. --");
        console.log(err);
        console.log("-- End of SQL error. --");
        return null;
    }
};

export const getAllProducts = async (search = "") => {
    const products = await fetchProducts(search);
    return products;
};

export const getProductById = async (findID) => {
    const products = await fetchProducts();
    return products.find(p => p.id === findID);
};