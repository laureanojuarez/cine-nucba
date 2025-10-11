import { Pelicula } from "../models/Pelicula.js";

export const getPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.findAll();

    if (!peliculas) {
      return res.status(404).json({ error: "No se encontraron películas" });
    }

    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const addPelicula = async (req, res) => {
  try {
    const { titulo, duracion, genero } = req.body;

    if (!titulo || !duracion || !genero) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const nuevaPelicula = await Pelicula.create({
      titulo,
      duracion,
      genero,
    });

    res.status(201).json(nuevaPelicula);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
