import express from "express";
import {verifyToken} from "../middlewares/verify.middleware.js";
import {updateProfile} from "../controllers/profile.controller.js";

const router = express.Router();

router.put("/", verifyToken, updateProfile);

export default router;
