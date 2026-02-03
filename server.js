import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mailRoutes from './Routes/mail.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.use('/api/mail', mailRoutes);

app.get('/', (req, res) => {
    res.send('NSS Website Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
