import { Router } from "express";
import * as perCtl from '../controllers/per.controller.js';
import * as apiCtl from '../controllers/api.controller.js';
import * as cartCtl from '../controllers/cart.controller.js';

const router = Router();

// primary endpoints
router.get("/", perCtl.homepage);

router.get("/login", perCtl.loginPage);
router.post("/logout", perCtl.logout);
router.post("/login", perCtl.login);


router.get("/register", perCtl.registerPage);
router.post("/register", perCtl.register);

router.get("/products", perCtl.isLoggedIn,perCtl.getProducts);
router.get("/products/:id", perCtl.isLoggedIn, perCtl.getById);

// api endpoints
router.get("/api/status", apiCtl.status);
router.get("/api/products", perCtl.requireAuth, apiCtl.getProducts);
router.get("/api/products/:id", perCtl.requireAuth, apiCtl.getById);

//cart endpoints
router.get("/api/cart", perCtl.requireAuth, cartCtl.getCart);
router.post("/api/cart/items", perCtl.requireAuth, cartCtl.addItem);
router.delete("/api/cart/items/:productId", perCtl.requireAuth, cartCtl.removeItem);
router.post("/api/cart/clear", perCtl.requireAuth, cartCtl.clearCart);

export default router;