import express from "express";
import {
  addPelicula,
  getPeliculaById,
  getPeliculas,
} from "../controllers/peliculas.controller.js";

const router = express.Router();

router.post("/", addPelicula);
router.get("/", getPeliculas);
router.get("/:id", getPeliculaById);

export default router;
