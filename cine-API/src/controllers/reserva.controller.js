import Reserva from "../models/Reserva.js";

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
