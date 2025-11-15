import Movie from "../models/Movie.js";
import Sala from "../models/Sala.js";
import Seat from "../models/Seat.js";

export const getPeliculas = async (req, res) => {
  try {
    const peliculas = await Movie.findAll();

    if (!peliculas || peliculas.length === 0) {
      return res.status(404).json({error: "No se encontraron películas"});
    }

    res.json(peliculas);
  } catch (error) {
    res.status(500).json({error: "Error interno del servidor"});
  }
};

export const addPelicula = async (req, res) => {
  try {
    const {titulo, duracion, genero, poster} = req.body;

    if (!titulo || !duracion || !genero || !poster) {
      return res.status(400).json({error: "Faltan datos obligatorios"});
    }

    // Crear la pelicula
    const nuevaPelicula = await Movie.create({
      titulo,
      duracion: parseInt(duracion),
      genero,
      poster,
    });

 

    res.status(201).json({
      pelicula: nuevaPelicula,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error interno del servidor"});
  }
};

export const deletePelicula = async (req, res) => {
  try {
    const {id} = req.params;
    const pelicula = await Movie.findByPk(parseInt(id));

    if (!pelicula) {
      return res.status(404).json({error: "Película no encontrada"});
    }

    await pelicula.destroy();
    res.json({message: "Película eliminada correctamente"});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error interno del servidor"});
  }
};

export const updatePelicula = async (req, res) => {
  try {
    const {id} = req.params;

    const pelicula = await Movie.findByPk(parseInt(id));

    if (!pelicula) {
      return res.status(404).json({error: "Película no encontrada"});
    }

    const {titulo, duracion, genero, poster} = req.body;

    const updatePelicula = {
      titulo: titulo || pelicula.titulo,
      duracion: duracion ? parseInt(duracion) : pelicula.duracion,
      genero: genero || pelicula.genero,
      poster: poster || pelicula.poster,
    };

    await pelicula.update(updatePelicula);
    res.json(pelicula);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error interno del servidor"});
  }
};

export const getPeliculaById = async (req, res) => {
  try {
    const {id} = req.params;
    const pelicula = await Movie.findByPk(parseInt(id));
    if (!pelicula) {
      return res.status(404).json({error: "Película no encontrada"});
    }
    res.json(pelicula);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error interno del servidor"});
  }
};
