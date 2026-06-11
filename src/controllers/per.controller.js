import { getAllProducts, getProductById } from '../services/service.js';

export const status = (req, res) => {
    res.status(200).json({
        "ok": true,
        "service": "Luxuper Premium Computer Peripherals",
        "time": new Date().toUTCString()
    });
}

const CATEGORIES = ["Mice", "Keyboard", "Mousepad", "Bundles", "Headphones", "Microphone", "Webcam"];

// GET /products
export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.render("products", {
            products,
            categories: CATEGORIES,
            query: req.query
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// GET /products/:id
export const getById = async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send('Product not found');
    }

    try {
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).render('error', { message: `Product with ID ${id} not found.` });
        }

        return res.status(200).render('product', { product });

    } catch (err) {
        console.error(err);
        return res.status(500).send('Product not found');
    }
};

export const homepage = (req, res) =>
    res.status(200).render("home", {
        title: "Luxuper",
        subtitle: "Premium Computer Peripherals"
    });
export const loginPage = (req, res) => 
    res.status(200).render("login", {
        title: "Welcome back",
        subtitle: "Login to browse our catalog."
    });

export const registerPage = (req, res) => 
res.status(200).render("register", {
    title: "Create an account",
    subtitle: "Register to begin viewing our full catalog."
});