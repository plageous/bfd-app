import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("home", {
        title: "MVC Starter App",
        subtitle: "Express + EJS + Static Assets"
    });
});

export default router;