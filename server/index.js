import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import cors from 'cors'


dotenv.config();




const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/user",router);//for user routes
app.use("/api/blog",blogRouter);//for  blog routes
const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
    console.log(`listening on ${PORT}`);
});
const username=process.env.DB_USERNAME;
const  password=process.env.DB_PASSWORD;
Connection(username, password);

