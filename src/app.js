import express from 'express';
import router from './routers/router.js';
import session from "express-session";

//configure Express.js app
const app = express();

// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// attaching users to every req
app.use((req, res, next) => {
    if (req.session.user) {
        req.user = req.session.user;
    }
    else{
        req.user = null;
    }
    next();
});
//view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

//static directories
app.use(express.static('public'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/", router);

export default app;