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
