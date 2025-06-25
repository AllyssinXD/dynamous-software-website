import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema({
  ip: String,
  country: String,
  city: String,
  latitude: Number,
  longitude: Number,
  page: String,
  elementClicked: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Analytics ||
  mongoose.model("Analytics", AnalyticsSchema);