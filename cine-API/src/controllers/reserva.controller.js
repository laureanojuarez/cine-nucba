import Reserva from "../models/Reserva.js";
import Sala from "../models/Sala.js";
import Seat from "../models/Seat.js";

export const reservarPelicula = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const { funcionId, seatIds, precio } = req.body;

    if (!funcionId || !Array.isArray(seatIds) || seatIds.length === 0) {
      await t.rollback();
      return res.status(400).json({ error: "funcionId y seatIds son obligatorios" });
    }

    // bloquear asientos libres
    const rows = await ButacaFuncion.findAll({ where: { funcionId, seatId: seatIds }, transaction: t, lock: t.LOCK.UPDATE });
    const noLibres = rows.filter(r => r.estado !== "libre").map(r => r.seatId);
    if (noLibres.length) {
      await t.rollback();
      return res.status(409).json({ error: `Asientos no disponibles: ${noLibres.join(",")}` });
    }

    await Promise.all(rows.map(r => r.update({ estado: "reservada" }, { transaction: t })));

    const reservas = await Promise.all(
      seatIds.map(seatId =>
        Reserva.create({ userId, funcionId, seatId, precio: precio ?? null }, { transaction: t })
      )
    );

    await t.commit();
    res.status(201).json({ message: "Reserva exitosa", reservas });
  } catch (e) {
    await t.rollback();
    res.status(500).json({ error: "Error al reservar" });
  }
};

export const getReservasByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const reservas = await Reserva.findAll({
      where: {userId},
      include: [
        { model: Sala },
        { model: Seat },
        ],
      order: [["fecha_compra", "DESC"]],
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({error: "Error interno del servidor"});
  }
};
