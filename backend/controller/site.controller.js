import Site from "../models/site.model.js";
import User from "../models/user.model.js";

export const addSite = async (req, res) => {
  try {
    const id = req.session.userId;

    const user = await User.findById(id);
    if (!user.role.includes("Employee"))
      return res.status(400).json({ error: "Unauthorized" });

    const { siteName, category } = req.body;

    if (!siteName || !category) {
      return res
        .status(400)
        .json({ message: "Site name and category are required." });
    }

    const fileLocations = [];
    req.files.forEach((file) => {
      fileLocations.push(file.path);
    });

    // Create a new Site document and save it to the database
    const newSite = new Site({
      siteName,
      category,
      files: fileLocations,
    });

    await newSite.save();

    res.status(200).json({
      result: "Site uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading site:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

export const getSites = async (req, res) => {
  try {
    const category = req.params.category;

    const sites = await Site.find({ category: category });

    if (!sites) return res.status(400).json({ error: "Invalid Category" });

    res.status(200).json(sites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
