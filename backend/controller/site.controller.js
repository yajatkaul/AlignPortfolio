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

export const removeSite = async (req, res) => {
  try {
    const id = req.session.userId;

    const user = await User.findById(id);
    if (!user.role.includes("Employee"))
      return res.status(400).json({ error: "Unauthorized" });

    const site_id = req.params.id;

    await Site.findByIdAndDelete(site_id);

    res.status(200).json({
      result: "Site removed successfully",
    });
  } catch (error) {
    console.error("Error deleting site:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

export const getSites = async (req, res) => {
  try {
    const category = req.params.category;
    const limit = parseInt(req.query.limit) || 3;
    const skip = parseInt(req.query.skip) || 0;

    const sites = await Site.find({ category: category })
      .skip(skip)
      .limit(limit);

    if (!sites || sites.length === 0) {
      return res.status(400).json({ error: "No more sites found" });
    }

    res.status(200).json(sites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
