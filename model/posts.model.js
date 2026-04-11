import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  content: String,
  imgUrl: String,
  instagramUrl: String, // optional
  year: Number,
  date: String,
  event_type: String,
  timestamp: String
});

export default mongoose.model("Event", eventSchema);