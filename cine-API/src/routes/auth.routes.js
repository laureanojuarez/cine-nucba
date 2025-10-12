import express from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../controllers/verify.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getCurrentUser);

export default router;
