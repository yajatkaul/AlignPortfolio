import express from "express";
import {
  getSite,
  getSites,
  removeSite,
} from "../controller/data.controller.js";

const router = express.Router();

router.get("/getSites", getSites);
router.get("/getSite/:id", getSite);

router.get("/site/:id", removeSite);

export default router;
