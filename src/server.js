import app from './app.js';
import dotenv from 'dotenv';
import router from './routers/router.js';

//read environment variables
dotenv.config();

//use the router
app.use('/', router);


const port = process.env.PORT_;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})