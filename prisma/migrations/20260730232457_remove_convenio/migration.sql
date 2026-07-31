/*
  Warnings:

  - You are about to drop the column `convenio` on the `Agendamento` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agendamento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
    "nomePaciente" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "motivo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMADO',
    "chaveSlot" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);
INSERT INTO "new_Agendamento" ("atualizadoEm", "chaveSlot", "criadoEm", "data", "dataNascimento", "email", "horaFim", "horaInicio", "id", "motivo", "nomePaciente", "status", "telefone") SELECT "atualizadoEm", "chaveSlot", "criadoEm", "data", "dataNascimento", "email", "horaFim", "horaInicio", "id", "motivo", "nomePaciente", "status", "telefone" FROM "Agendamento";
DROP TABLE "Agendamento";
ALTER TABLE "new_Agendamento" RENAME TO "Agendamento";
CREATE UNIQUE INDEX "Agendamento_chaveSlot_key" ON "Agendamento"("chaveSlot");
CREATE INDEX "Agendamento_data_idx" ON "Agendamento"("data");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
