import mongoose from "mongoose";

const siteSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
    },
    items: [],
  },
  { timestamps: true }
);

const Site = mongoose.model("Site", siteSchema);

export default Site;
