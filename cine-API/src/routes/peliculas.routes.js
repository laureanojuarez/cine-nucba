import { Router } from "express";
import fetch from "node-fetch";
import { Pelicula } from "../models/Pelicula.js";
import { Funcion } from "../models/Funcion.js";
import { crearSalaConAsientos } from "../controllers/asientos.controller.js";

export const peliculasRouter = Router();

const FECHA_UNICA = new Date("2025-12-01T20:00:00");
const FILAS = 8;
const COLUMNAS = 10;

async function ensurePeliculaFuncion({ externalId, titulo, duracion, genero }) {
  let peli = await Pelicula.findOne({ where: { externalId } });
  if (!peli) {
    peli = await Pelicula.create({
      externalId,
      titulo,
      duracion: duracion || 100,
      genero: genero || "General",
    });
    const sala = await crearSalaConAsientos({
      nombre: `Sala ${peli.id}`,
      filas: FILAS,
      columnas: COLUMNAS,
    });
    await Funcion.create({
      fecha: FECHA_UNICA,
      peliculaId: peli.id,
      salaId: sala.id,
    });
  }
  const funcion = await Funcion.findOne({ where: { peliculaId: peli.id } });
  return { peliculaId: peli.id, funcionId: funcion.id };
}

peliculasRouter.post("/ensure", async (req, res) => {
  try {
    const { externalId, titulo, duracion, genero } = req.body;
    if (!externalId || !titulo)
      return res.status(400).json({ message: "Faltan datos" });
    const data = await ensurePeliculaFuncion({
      externalId,
      titulo,
      duracion,
      genero,
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error" });
  }
});

peliculasRouter.post("/sync-popular", async (_req, res) => {
  try {
    const key = process.env.TMDB_API_KEY;
    if (!key) return res.status(500).json({ message: "Falta TMDB_API_KEY" });
    const r = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1&api_key=${key}`
    );
    const json = await r.json();
    const results = json.results?.slice(0, 20) || [];
    const out = [];
    for (const m of results) {
      const genero =
        m.genre_ids && m.genre_ids[0] ? `G${m.genre_ids[0]}` : "General";
      out.push(
        await ensurePeliculaFuncion({
          externalId: m.id,
          titulo: m.title,
          duracion: 100,
          genero,
        })
      );
    }
    res.json(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error sync" });
  }
});
