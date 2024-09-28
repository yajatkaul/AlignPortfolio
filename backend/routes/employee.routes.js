import express from "express";
import upload from "../utils/multer.js"; // Your multer configuration
import checkPerms from "../middleware/checkPerms.js";
import { createSiteData } from "../controller/employee.controller.js";
import multer from "multer";

const router = express.Router();

router.post("/createSiteData", checkPerms, (req, res, next) => {
  upload.any()(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ error: "File size exceeds the 100MB limit." });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Handle unknown errors
      return res.status(500).json({ error: "An unknown error occurred." });
    }
    // Proceed to your controller if no errors
    createSiteData(req, res, next);
  });
});

export default router;
