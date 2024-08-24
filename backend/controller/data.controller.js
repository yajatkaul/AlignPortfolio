import Site from "../models/site.model.js";

export const getSites = async (req, res) => {
  try {
    const work = await Site.find();

    res.status(200).json(work);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSite = async (req, res) => {
  try {
    const { id } = req.params;

    const site = await Site.findById(id);

    res.status(200).json(site);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
