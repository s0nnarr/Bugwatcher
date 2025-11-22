import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));


try { 
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error('Error starting the server:', error);
}
