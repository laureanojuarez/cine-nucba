import express from "express";
import {verifyToken} from "../middlewares/verify.middleware";
import {updateProfile} from "../controllers/profile.controller";

const router = express.Router();

router.put("/", verifyToken, updateProfile);

export default router;
