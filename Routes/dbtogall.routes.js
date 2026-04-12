import express from 'express';
import { getAllEvents } from '../controller/dbtogall.controller.js';

const eventRoutes = express.Router();

eventRoutes.get('/', getAllEvents);

export default eventRoutes;
