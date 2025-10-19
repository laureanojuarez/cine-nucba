import Movie from "../models/Movie.js";
import Sala from "../models/Sala.js";
import Seat from "../models/Seat.js";

export const addSala = async (req, res) => {
  try {
    const { movieId, salaNumber } = req.body;

    if (!movieId || !salaNumber) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const existMovie = await Movie.findByPk(movieId);

    if (!existMovie) {
      return res.status(404).json({ error: "La película no existe" });
    }

    const salaExistente = await Sala.findOne({
      where: {
        movieId,
      },
    });

    if (salaExistente) {
      return res
        .status(400)
        .json({ error: "Ya existe una sala para esta película" });
    }

    const sala = await Sala.create({
      data: {
        movieId,
        salaNumber,
      },
    });

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

    res.status(201).json({ sala, seatsCreados: seats.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteSala = async (req, res) => {
  try {
    const { salaId } = req.body;
    if (!salaId) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const existSala = await Sala.findByPk(salaId);
    if (!existSala) {
      return res.status(404).json({ error: "La sala no existe" });
    }

    await Seat.destroy({ where: { salaId: existSala.id } });
    await Sala.destroy({ where: { id: existSala.id } });

    res.status(200).json({ message: "Sala eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
export const getSalaByMovieId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Falta el parametro id" });
    }

    const salas = await Sala.findAll({
      where: { movieId: parseInt(id) },
      include: { Seat: true },
    });
    if (salas.length === 0) {
      return res.status(404).json({ error: "No hay salas para esta película" });
    }
    res.json(salas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
