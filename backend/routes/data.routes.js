import express from "express";
import { getSite, getSites } from "../controller/data.controller.js";

const router = express.Router();

router.get("/getSites", getSites);
router.get("/getSite/:id", getSite);

export default router;
