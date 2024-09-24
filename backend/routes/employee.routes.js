import express from "express";
import upload from "../utils/multer.js";
import checkPerms from "../middleware/checkPerms.js";
import { createSiteData } from "../controller/employee.controller.js";

const router = express.Router();

router.post("/createSiteData", checkPerms, upload.any(), createSiteData);

export default router;
