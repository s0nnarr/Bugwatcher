import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Sequelize } from "sequelize";
import userRouter from './routers/userRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));



const sequelize = new Sequelize(
    "postgres",
    `${process.env.POSTGRES_USERNAME}`,
    `${process.env.POSTGRES_PASS}`,

{
    host: "localhost",
    port: 5433,
    dialect: "postgres",
    logging: false
});

// console.log(`Postgres pass: ${process.env.POSTGRES_PASS}`);
// console.log(`Postgres username: ${process.env.POSTGRES_USERNAME}`);


const startServer = async () => {
    try {
        console.log("Testing database connection...");
        await sequelize.authenticate();
        console.log("Connected to PostgreSQL.");
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (err) {
        console.log(`Internal server error: ${err}`);
    }
}

startServer();

/* Routers */
app.use('/users', userRouter);