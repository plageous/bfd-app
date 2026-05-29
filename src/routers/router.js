import { Router } from "express";
import * as perCtl from '../controllers/per.controller.js'

const router = Router();

router.get("/", (req, res) => {
    res.render("home", {
        title: "Luxuper",
        subtitle: "Premium Computer Peripherals"
    });
});

export default router;