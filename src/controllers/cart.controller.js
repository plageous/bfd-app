// GET /api/cart
export const getCart = (req, res) => {
    const cart = req.session.cart || [];
    return res.status(200).json({ cart });
};

// POST /api/cart/items  — body: { productId, productName, producePrice, image_url }
export const addItem = (req, res) => {
    const { productId, productName, producePrice, image_url } = req.body;

    if (!productId) {
        return res.status(400).json({ message: "productId is required" });
    }

    if (!req.session.cart) req.session.cart = [];

    const existing = req.session.cart.find(item => item.productId === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        req.session.cart.push({ productId, productName, producePrice, image_url, quantity: 1 });
    }

    return res.status(200).json({ cart: req.session.cart });
};

// DELETE /api/cart/items/:productId
export const removeItem = (req, res) => {
    const id = Number(req.params.productId);

    if (!req.session.cart) {
        return res.status(200).json({ cart: [] });
    }

    req.session.cart = req.session.cart.filter(item => item.productId !== id);

    return res.status(200).json({ cart: req.session.cart });
};

// POST /api/cart/clear
export const clearCart = (req, res) => {
    req.session.cart = [];
    return res.status(200).json({ cart: [] });
};