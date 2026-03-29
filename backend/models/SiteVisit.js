// SiteVisit model - stores site visit form submissions
import mongoose from "mongoose";

const siteVisitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    project: {
      type: String,
      required: true,
      enum: [
        "Srikakulam Greens",
        "Vizag Valley Estate",
        "Kadapa Farmlands",
        "Not sure yet",
      ],
    },
    date: {
      type: Date,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const SiteVisit = mongoose.model("SiteVisit", siteVisitSchema);

export default SiteVisit;
