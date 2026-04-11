import express from 'express';
import { getAllEvents } from '../controller/dbtogall.controller.js';

const eventRoutes = express.Router();

eventRoutes.get('/events', getAllEvents);

export default eventRoutes;
