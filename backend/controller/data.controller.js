import Site from "../models/site.model.js";
import User from "../models/user.model.js";

export const getSites = async (req, res) => {
  try {
    const { page = 1, limit = 10, types = "" } = req.query;

    console.log(types);

    const typesArray = types.split(",").filter((type) => type.trim() !== "");
    console.log(typesArray);
    let filter = {};
    if (typesArray.length > 0) {
      filter = {
        items: {
          $elemMatch: { $elemMatch: { $in: typesArray } },
        },
      };
    }

    const work = await Site.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(work);
  } catch (err) {
    console.error(err);
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

export const removeSite = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);

    if (!user.role.includes("Admin")) {
      return res.status(400).json({ error: "Unauthorized" });
    }
    const { id } = req.params;

    await Site.findByIdAndDelete(id);

    res.status(200).json({ result: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
