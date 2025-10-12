import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const salaId = 1; // Cambia esto por el ID de la sala que corresponda
  const filas = ["A", "B", "C", "D", "E"];
  const asientosPorFila = 10;

  const seats = [];
  for (const fila of filas) {
    for (let numero = 1; numero <= asientosPorFila; numero++) {
      seats.push({
        fila,
        numero,
        salaId,
      });
    }
  }

  await prisma.seat.createMany({
    data: seats,
  });

  console.log("Asientos cargados!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
