import Movie from "../models/Movie.js";
import Reserva from "../models/Reserva.js";
import Sala from "../models/Sala.js";
import Seat from "../models/Seat.js";

export const reservarPelicula = async (req, res) => {
  try {
    const {userId, salaId, seatIds} = req.body;

    const reservas = await Promise.all(
      seatIds.map((seatId) =>
        Reserva.create({
          userId,
          salaId,
          seatId,
          reservationDate: new Date(),
        })
      )
    );

    res.status(201).json({message: "Reserva realizada con éxito", reservas});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error interno del servidor"});
  }
};

export const getReservasByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const reservas = await Reserva.findAll({
      where: {userId},
      include: [
        {
          model: Sala,
          include: [Movie],
        },
        {
          model: Seat,
        },
      ],
      order: [["reservationDate", "DESC"]],
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({error: "Error interno del servidor"});
  }
};
