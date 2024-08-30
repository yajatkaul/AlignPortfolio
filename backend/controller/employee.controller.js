import Site from "../models/site.model.js";

export const createSiteData = async (req, res) => {
  try {
    const filePaths = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    const { siteName, image, categores } = req.body;

    const items = zip(filePaths, convertToArray(categores));

    const newSite = new Site({
      siteName: siteName,
      items: items,
    });

    await newSite.save();

    res.status(200).json({ result: "Done" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

function zip(arr1, arr2) {
  return arr1.map((value, index) => [value, arr2[index]]);
}

function convertToArray(stringObject) {
  return String(stringObject).split(",");
}
