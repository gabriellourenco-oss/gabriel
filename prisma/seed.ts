import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existentes = await prisma.disponibilidade.count();
  if (existentes > 0) {
    console.log("Disponibilidade já configurada, pulando seed.");
    return;
  }

  // Disponibilidade padrão de exemplo: segunda a sexta, manhã e tarde, consultas de 30min
  await prisma.disponibilidade.createMany({
    data: [
      { diaSemana: 1, horaInicio: "08:00", horaFim: "12:00", duracaoMin: 30 },
      { diaSemana: 1, horaInicio: "14:00", horaFim: "18:00", duracaoMin: 30 },
      { diaSemana: 2, horaInicio: "08:00", horaFim: "12:00", duracaoMin: 30 },
      { diaSemana: 3, horaInicio: "08:00", horaFim: "12:00", duracaoMin: 30 },
      { diaSemana: 3, horaInicio: "14:00", horaFim: "18:00", duracaoMin: 30 },
      { diaSemana: 4, horaInicio: "08:00", horaFim: "12:00", duracaoMin: 30 },
      { diaSemana: 5, horaInicio: "08:00", horaFim: "12:00", duracaoMin: 30 },
    ],
  });

  console.log("Disponibilidade padrão criada com sucesso.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
