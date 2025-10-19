import express from "express";
import {
  deleteSala,
  getSalaByMovieId,
} from "../controllers/sala.controller.js";

const router = express.Router();

router.delete("/", deleteSala);
router.get("/movie/:id", getSalaByMovieId);

export default router;
