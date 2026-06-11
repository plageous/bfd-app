import pool from "../scripts/db.js";
import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
}


// password validation
export const validatePassword = async (plainPassword, storedHash) => {
    return await bcrypt.compare(plainPassword, storedHash);
};

//create user
export const createUser = async (username, plainPassword) => {
    if(!username) throw new Error("Username is required.");
    if(!plainPassword) throw new Error("Password is required.");

    //hash password before insert
    const passwordHash = await hashPassword(plainPassword);

    const [result] = await pool.execute(
        "INSERT INTO users (username, password) values (?, ?)",
        [username, passwordHash]
    );
}

    
export const findUserByUsername = async (username) => {
    const [results] = await pool.query(
        "SELECT userId, username, password FROM users WHERE username = ? LIMIT 1",
        [username]
    );
    return results[0];
};

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