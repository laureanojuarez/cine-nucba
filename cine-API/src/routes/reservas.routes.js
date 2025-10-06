import { Router } from "express";
import { sequelize } from "../db.js";
import { Funcion } from "../models/Funcion.js";
import { Asiento } from "../models/Asiento.js";
import { Entrada } from "../models/Entrada.js";

export const reservasRouter = Router();

// Body: { funcionId, asientos: ["A5","A6"], precio }
reservasRouter.post("/", async (req, res) => {
  const { funcionId, asientos, precio } = req.body;
  const userId = req.user?.id; // Asumiendo middleware auth
  if (!userId) return res.status(401).json({ error: "No autenticado" });
  if (!Array.isArray(asientos) || asientos.length === 0)
    return res.status(400).json({ error: "Asientos requeridos" });

  const t = await sequelize.transaction();
  try {
    const funcion = await Funcion.findByPk(funcionId, { transaction: t });
    if (!funcion) throw new Error("Función no existe");

    const asientoRows = await Asiento.findAll({
      where: { etiqueta: asientos },
      transaction: t,
    });
    if (asientoRows.length !== asientos.length)
      throw new Error("Algún asiento no existe");

    // Verificar ocupación
    const existentes = await Entrada.findAll({
      where: {
        funcionId,
        asientoId: asientoRows.map((a) => a.id),
      },
      transaction: t,
    });
    if (existentes.length > 0)
      throw new Error("Alguno de los asientos ya está reservado");

    // Crear entradas
    const creadas = await Entrada.bulkCreate(
      asientoRows.map((a) => ({
        funcionId,
        asientoId: a.id,
        userId,
        precio,
      })),
      { transaction: t }
    );

    await t.commit();
    res.json({ ok: true, reservas: creadas });
  } catch (e) {
    await t.rollback();
    res.status(400).json({ error: e.message });
  }
});
