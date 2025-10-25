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
    const {title, duration, genero, poster, salaNumber} = req.body;

    if (!title || !duration || !genero || !poster || !salaNumber) {
      return res.status(400).json({error: "Faltan datos obligatorios"});
    }

    // Crear la pelicula
    const nuevaPelicula = await Movie.create({
      title,
      duration: parseInt(duration),
      genero,
      poster,
    });

    // Crear la sala asociada
    const sala = await Sala.create({
      movieId: nuevaPelicula.id,
      salaNumber,
    });

    // Crear los asientos para la sala
    const filas = ["A", "B", "C", "D", "E"];
    const asientosPorFila = 10;
    const seats = [];
    for (const fila of filas) {
      for (let numero = 1; numero <= asientosPorFila; numero++) {
        seats.push({
          fila,
          numero,
          salaId: sala.id,
        });
      }
    }
    await Seat.bulkCreate(seats);

    res.status(201).json({
      pelicula: nuevaPelicula,
      sala,
      seatsCreados: seats.length,
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

    const {title, duration, genero, poster} = req.body;

    const updatePelicula = {
      title: title || pelicula.title,
      duration: duration ? parseInt(duration) : pelicula.duration,
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
