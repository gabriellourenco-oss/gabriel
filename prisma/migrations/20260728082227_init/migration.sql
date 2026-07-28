-- CreateTable
CREATE TABLE "Disponibilidade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "diaSemana" INTEGER NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
    "duracaoMin" INTEGER NOT NULL DEFAULT 30,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BloqueioData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "motivo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
    "nomePaciente" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "convenio" TEXT NOT NULL,
    "motivo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMADO',
    "chaveSlot" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Disponibilidade_diaSemana_idx" ON "Disponibilidade"("diaSemana");

-- CreateIndex
CREATE UNIQUE INDEX "BloqueioData_data_key" ON "BloqueioData"("data");

-- CreateIndex
CREATE UNIQUE INDEX "Agendamento_chaveSlot_key" ON "Agendamento"("chaveSlot");

-- CreateIndex
CREATE INDEX "Agendamento_data_idx" ON "Agendamento"("data");
