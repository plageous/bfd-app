import { Router } from "express";
import * as perCtl from '../controllers/per.controller.js';
import * as apiCtl from '../controllers/api.controller.js';

const router = Router();

// primary endpoints
router.get("/", perCtl.homepage);

router.get("/login", perCtl.loginPage);
router.get("/logout", perCtl.logout);
router.post("/login", perCtl.login);


router.get("/register", perCtl.registerPage);
router.post("/register", perCtl.register);

router.get("/products", perCtl.isLoggedIn,perCtl.getProducts);
router.get("/products/:id", perCtl.getById);

// api endpoints
router.get("/api/status", apiCtl.status);
router.get("/api/products", apiCtl.getProducts);
router.get("/api/products/:id", apiCtl.getById);

export default router;