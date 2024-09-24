import Site from "../models/site.model.js";

export const createSiteData = async (req, res) => {
  try {
    const files = req.files || [];
    const body = req.body;

    // Ensure site name is provided
    const siteName = body.name || body.siteName;
    if (!siteName) {
      return res.status(400).json({ error: "Site name is required" });
    }

    // Map files to categories, storing each item as an array
    const items = files.map((file) => {
      const indexMatch = file.fieldname.match(/file_(\d+)/);
      if (!indexMatch) {
        throw new Error(`Invalid file fieldname: ${file.fieldname}`);
      }
      const index = indexMatch[1];
      const category = body[`category_${index}`];
      if (!category) {
        throw new Error(`Category for file index ${index} is missing`);
      }

      // Construct the file path
      const filePath = `/uploads/${file.filename}`;

      // Return the item as an array [filePath, category]
      return [filePath, category];
    });

    // Create new site document
    const newSite = new Site({
      siteName,
      items,
    });

    await newSite.save();

    res.status(200).json({ result: "Done" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};
