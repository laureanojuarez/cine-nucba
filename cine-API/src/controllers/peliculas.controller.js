import prisma from "../db.js";

export const getPeliculas = async (req, res) => {
  try {
    const peliculas = await prisma.movie.findMany();

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
    const { title, duration, genero } = req.body;

    if (!title || !duration || !genero) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const nuevaPelicula = await prisma.movie.create({
      data: {
        title,
        duration: parseInt(duration),
        genero,
      },
    });
    res.status(201).json(nuevaPelicula);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getPeliculaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pelicula = await prisma.movie.findUnique({
      where: { id: parseInt(id) },
    });
    if (!pelicula) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.json(pelicula);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
