-- CreateTable
CREATE TABLE "Verifaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "algorithm" TEXT NOT NULL,
    "digits" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "charSet" TEXT NOT NULL,
    "expiredAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Verifaction_target_type_idx" ON "Verifaction"("target", "type");
