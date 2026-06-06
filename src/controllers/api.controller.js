import { getAllProducts, getProductById } from '../services/service.js'

// GET /api/status
export const status = (req, res) => {
    res.status(200).json({
        "ok": true,
        "service": "Luxuper Premium Computer Peripherals",
        "time": new Date().toUTCString()
    });
}

// GET /api/products
export const getProducts = async (req, res) => {
    const { name, category, minPrice, maxPrice, sort } = req.query;

    let result = await getAllProducts(name); //sends the name query to the SQL call

    if (category) {
        const categories = category.split(",").map(el => el.trim().toLowerCase());
        result = result.filter(el => categories.includes(el.productType.toLowerCase()));
    }

    if (minPrice) result = result.filter(el => Number(el.producePrice) >= Number(minPrice));
    if (maxPrice) result = result.filter(el => Number(el.producePrice) <= Number(maxPrice));

    if (sort) {
        const order = sort.startsWith("-") ? -1 : 1;
        const field = sort.replace(/^-/, "");
        const sortMap = { price: "producePrice", name: "productName" };
        const col = sortMap[field];

        if (col) {
            result = result.sort((a, b) => {
                const valA = a[col];
                const valB = b[col];
                if (typeof valA === "string") { return valA.localeCompare(valB) * order; }
                return (valA - valB) * order;
            });
        }
    }

    return res.status(200).json({
        count: result.length,
        products: result
    });
};

// GET /api/products/:id
export const getById = async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send('Product not found');
    }

    try {
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({message: `Product with ID ${id} not found.`});
        }

        return res.status(200).json({ product });

    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
};