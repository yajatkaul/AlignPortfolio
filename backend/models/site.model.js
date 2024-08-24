import mongoose from "mongoose";

const siteSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
      minlength: 1,
    },
    items: [],
  },
  { timestamps: true }
);

const Site = mongoose.model("Site", siteSchema);

export default Site;
