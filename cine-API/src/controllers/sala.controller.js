import Reserva from "../models/Reserva.js";
import Sala from "../models/Sala.js";
import Seat from "../models/Seat.js";

export const deleteSala = async (req, res) => {
  try {
    const {salaId} = req.body;
    if (!salaId) {
      return res.status(400).json({error: "Faltan datos obligatorios"});
    }

    const existSala = await Sala.findByPk(salaId);
    if (!existSala) {
      return res.status(404).json({error: "La sala no existe"});
    }

    await Seat.destroy({where: {salaId: existSala.id}});
    await Sala.destroy({where: {id: existSala.id}});

    res.status(200).json({message: "Sala eliminada correctamente"});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error interno del servidor"});
  }
};
export const getSalaByMovieId = async (req, res) => {
  try {
    const {id} = req.params;
    if (!id) return res.status(400).json({error: "Falta el parametro id"});

    const salas = await Sala.findAll({
      where: {movieId: parseInt(id)},
      include: [
        {
          model: Seat,
          // Incluye las reservas para cada asiento
          include: [{model: Reserva}],
        },
      ],
    });

    const salasConAsientos = salas.map((sala) => {
      const seats = sala.Seats.map((seat) => {
        // Si el asiento tiene al menos una reserva, no está disponible
        const ocupado = seat.Reservas && seat.Reservas.length > 0;
        return {
          ...seat.toJSON(),
          disponible: !ocupado,
        };
      });
      return {
        ...sala.toJSON(),
        Seats: seats,
      };
    });

    if (salasConAsientos.length === 0) {
      return res.status(404).json({error: "No hay salas para esta película"});
    }
    res.json(salasConAsientos);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error interno del servidor"});
  }
};
