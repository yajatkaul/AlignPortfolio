import express from "express";
import { getSites } from "../controller/data.controller.js";

const router = express.Router();

router.get("/getSites", getSites);

export default router;
