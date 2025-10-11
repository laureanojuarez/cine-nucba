import express from "express";
import {
  addPelicula,
  getPeliculas,
} from "../controllers/peliculas.controller.js";

const router = express.Router();

router.post("/", addPelicula);
router.get("/", getPeliculas);

export default router;
