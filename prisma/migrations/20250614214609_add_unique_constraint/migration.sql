/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `Verifaction` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `Verifaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Verifaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "algorithm" TEXT NOT NULL,
    "digits" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "charSet" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL
);
INSERT INTO "new_Verifaction" ("algorithm", "charSet", "createdAt", "digits", "id", "period", "secret", "target", "type") SELECT "algorithm", "charSet", "createdAt", "digits", "id", "period", "secret", "target", "type" FROM "Verifaction";
DROP TABLE "Verifaction";
ALTER TABLE "new_Verifaction" RENAME TO "Verifaction";
CREATE UNIQUE INDEX "Verifaction_target_type_key" ON "Verifaction"("target", "type");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
