import express from "express";
import {reservarPelicula} from "../controllers/reserva.controller.js";

const router = express.Router();

router.post("/", reservarPelicula);

export default router;
