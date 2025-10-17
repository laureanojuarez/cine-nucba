/*
  Warnings:

  - Added the required column `salaNumber` to the `Sala` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sala" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" INTEGER NOT NULL,
    "salaNumber" INTEGER NOT NULL,
    CONSTRAINT "Sala_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sala" ("id", "movieId") SELECT "id", "movieId" FROM "Sala";
DROP TABLE "Sala";
ALTER TABLE "new_Sala" RENAME TO "Sala";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
