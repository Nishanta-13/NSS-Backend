import express from "express";
import recieveInstagramPost from "../controller/gallery.controller.js";
const galleryRouter=express.Router();

galleryRouter.post("/instagram",recieveInstagramPost);
export default galleryRouter;