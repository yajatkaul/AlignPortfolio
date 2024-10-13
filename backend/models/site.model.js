import mongoose from "mongoose";

//Schema
const siteSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    siteName: {
      type: String,
      required: true,
    },
    files: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Site = mongoose.model("Site", siteSchema);

export default Site;
