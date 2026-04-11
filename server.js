import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mailRoutes from './Routes/mail.routes.js';
import galleryRouter from './Routes/gallery.routes.js';
dotenv.config();
import eventRoutes from './Routes/dbtogall.routes.js';
import mongoose, { mongo } from "mongoose";

const app = express();
const PORT = process.env.PORT || 5050;

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000").split(',');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: origin not allowed'), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
}));
app.use(express.json());

app.use('/api/mail', mailRoutes);
app.use('/api/gallery', galleryRouter);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('NSS Website Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to MongoDB")).catch((err) => console.error("MongoDB connection error:", err));
