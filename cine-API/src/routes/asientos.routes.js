import { Router } from "express";
import { Funcion } from "../models/Funcion.js";
import { Sala } from "../models/Sala.js";
import { Pelicula } from "../models/Pelicula.js";
import { Asiento } from "../models/Asiento.js";
import { Entrada } from "../models/Entrada.js";

export const funcionesRouter = Router();

// Listar funciones (opcional filtrado por peliculaId)
funcionesRouter.get("/", async (req, res) => {
  try {
    const { peliculaId } = req.query;
    const where = {};
    if (peliculaId) where.peliculaId = peliculaId;
    const funciones = await Funcion.findAll({
      where,
      include: [Sala, Pelicula],
      order: [["id", "ASC"]],
    });
    res.json(funciones);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error listando funciones" });
  }
});

// Asientos de una función
funcionesRouter.get("/:funcionId/asientos", async (req, res) => {
  try {
    const { funcionId } = req.params;
    console.log("GET /funciones/:funcionId/asientos", funcionId);
    const funcion = await Funcion.findByPk(funcionId, { include: [Sala] });
    if (!funcion) {
      return res.status(404).json({ message: "Función no encontrada" });
    }

    const asientos = await Asiento.findAll({
      where: { salaId: funcion.salaId },
      order: [
        ["fila", "ASC"],
        ["numero", "ASC"],
      ],
    });

    const entradas = await Entrada.findAll({
      where: { funcionId },
      attributes: ["asientoId"],
    });
    const ocupados = new Set(entradas.map((e) => e.asientoId));

    res.json({
      funcionId: Number(funcionId),
      sala: {
        id: funcion.salaId,
        nombre: funcion.sala.nombre,
        filas: funcion.sala.filas,
        columnas: funcion.sala.columnas,
      },
      asientos: asientos.map((a) => ({
        id: a.id,
        fila: a.fila,
        numero: a.numero,
        etiqueta: a.etiqueta,
        status: ocupados.has(a.id) ? "taken" : "free",
      })),
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error obteniendo asientos" });
  }
});
