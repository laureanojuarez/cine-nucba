/*
  Warnings:

  - You are about to drop the column `description` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `genero` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "duration" INTEGER NOT NULL
);
INSERT INTO "new_Movie" ("duration", "id", "title") SELECT "duration", "id", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie_title_key" ON "Movie"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
