import mongoose from "mongoose";
import Event from "./model/posts.model.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const rawData = fs.readFileSync(
  "../Frontend/project_nss/src/db/past-event.json",
  "utf-8"
);
const data = JSON.parse(rawData);
await mongoose.connect(process.env.MONGO_URI);
await Event.insertMany(data);
console.log("Database seeded successfully");
process.exit(0);