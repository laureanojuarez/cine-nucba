import express from "express";
import {deleteSala, getSalaByMovieId} from "../controllers/sala.controller.js";
import {verifyToken} from "../middlewares/verify.middleware.js";

const router = express.Router();

router.delete("/", verifyToken, deleteSala);
router.get("/movie/:id", getSalaByMovieId);

export default router;
