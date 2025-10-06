import { Sala } from "../models/Sala.js";
import { Asiento } from "../models/Asiento.js";

export async function crearSalaConAsientos({ nombre, filas, columnas }) {
  const capacidad = filas * columnas;
  const sala = await Sala.create({ nombre, filas, columnas, capacidad });

  const bulk = [];
  for (let f = 0; f < filas; f++) {
    const filaLetra = String.fromCharCode(65 + f); // A, B, C...
    for (let c = 1; c <= columnas; c++) {
      bulk.push({
        fila: filaLetra,
        numero: c,
        etiqueta: `${filaLetra}${c}`,
        salaId: sala.id,
      });
    }
  }
  await Asiento.bulkCreate(bulk);
  return sala;
}
