import express from "express";
import {
  addSala,
  deleteSala,
  getSalaByMovieId,
} from "../controllers/sala.controller.js";

const router = express.Router();

router.post("/", addSala);
router.delete("/", deleteSala);
router.get("/movie/:id", getSalaByMovieId);

export default router;
