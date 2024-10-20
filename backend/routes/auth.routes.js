import express from "express";
import { getOTP, login, logout } from "../controller/auth.controller.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/getotp/:number", getOTP);

router.get("/checkAuth", checkAuth);

export default router;
