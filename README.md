# Site institucional + agendamento — Consultório de Geriatria

Landing page institucional e módulo de agendamento online para um
consultório de Geriatria e Medicina de Família, com painel administrativo
simples para gerenciar horários e agendamentos.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/) + SQLite (banco local, fácil de trocar depois)
- [Zod](https://zod.dev/) para validação de formulários no servidor

## Estrutura de pastas

```
prisma/
  schema.prisma        # Modelos: Disponibilidade, BloqueioData, Agendamento
  seed.ts               # Disponibilidade padrão (seg–sex, exemplo)
  migrations/
src/
  app/
    page.tsx             # Landing page
    layout.tsx
    globals.css
    agendar/page.tsx     # Página de agendamento (/agendar)
    admin/page.tsx        # Painel administrativo (/admin)
    api/
      disponibilidade/
        mes/route.ts      # GET resumo do mês (dias com horário disponível)
        dia/route.ts      # GET slots de um dia específico
      agendamentos/route.ts # POST cria um agendamento (paciente)
      admin/
        login/route.ts
        logout/route.ts
        agendamentos/route.ts        # GET lista por data
        agendamentos/[id]/route.ts   # PATCH cancela
        bloqueios/route.ts           # GET/POST datas bloqueadas
        bloqueios/[id]/route.ts      # DELETE remove bloqueio
  components/
    landing/    # Hero, Sobre, Servicos, ParaQuem, Localizacao, FAQ, Header, Footer
    agendamento/ # Calendario, SlotList, FormularioPaciente, ResumoConfirmacao
    admin/      # LoginForm, AdminDashboard
    ui/         # Button, Container
  lib/
    prisma.ts          # Cliente Prisma (singleton)
    disponibilidade.ts # Geração de slots a partir das regras + bloqueios + agendamentos
    validation.ts       # Schemas Zod (validação no servidor)
    auth.ts             # Login do admin (senha via env) + cookie de sessão assinado
  types/
    agendamento.ts
```

## Como funciona o agendamento

1. A médica define **regras de disponibilidade** (dia da semana, faixa de
   horário e duração da consulta) na tabela `Disponibilidade` — pela tela
   "Horários disponíveis" do painel admin (`/admin`), ou via `prisma/seed.ts`
   / diretamente no banco, se preferir.
2. Ao acessar `/agendar`, o sistema gera automaticamente os horários
   (`slots`) de cada dia a partir dessas regras, removendo:
   - dias/horários com um agendamento `CONFIRMADO` já existente;
   - dias inteiros bloqueados (`BloqueioData` — férias, feriados);
   - horários no passado (incluindo o dia de hoje).
3. O paciente escolhe data + horário e preenche seus dados. O formulário é
   validado no cliente (feedback imediato) e novamente no servidor com Zod
   antes de gravar no banco — nunca confie apenas na validação do cliente.
4. Para evitar slot duplicado mesmo com requisições simultâneas, o
   agendamento é criado com uma chave única (`chaveSlot = data_hora`) no
   banco; a segunda tentativa para o mesmo horário recebe erro 409 e é
   informada de que o horário não está mais disponível.
5. Ao cancelar um agendamento pelo painel admin, a `chaveSlot` é liberada
   (`null`), permitindo que o horário volte a ficar disponível para outro
   paciente.

## Painel administrativo (`/admin`)

- Login por senha única, definida na variável de ambiente `ADMIN_PASSWORD`.
- Sessão mantida em cookie `httpOnly` assinado (HMAC-SHA256) com
  `ADMIN_SESSION_SECRET`, válido por 8 horas.
- Permite:
  - listar agendamentos de uma data específica;
  - cancelar um agendamento (libera o horário automaticamente);
  - cadastrar, ativar/desativar e remover horários disponíveis
    (dia da semana + faixa de horário + duração da consulta);
  - bloquear datas futuras (férias, feriados) e remover bloqueios.

⚠️ Este login por senha única é adequado para um consultório com uma única
usuária administradora. Não foi implementado um sistema de múltiplos
usuários/permissões.

## Conteúdo da landing page

O conteúdo (nome, CRM, formação, fotos, telefone/WhatsApp, textos de cada
seção) já foi finalizado a partir do design aprovado no Claude Design
("Landing page para médica geriatra") e não usa mais placeholders
genéricos. Não há endereço físico, mapa nem convênios divulgados no design
final — o atendimento é particular, em consultório, teleconsulta ou visita
domiciliar, mediante agendamento pelo WhatsApp ou pela página `/agendar`.

Caso os dados reais mudem no futuro (novo CRM, telefone, fotos etc.), edite
diretamente nos componentes em `src/components/landing/`.

## Rodando localmente

### Pré-requisitos

- Node.js 18 ou superior
- npm

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# edite .env e defina ADMIN_PASSWORD e ADMIN_SESSION_SECRET com valores próprios

# 3. Criar o banco SQLite e aplicar as migrations
npx prisma migrate dev

# 4. (opcional) popular disponibilidade padrão de exemplo
npx prisma db seed

# 5. Rodar o servidor de desenvolvimento
npm run dev
```

Acesse:

- `http://localhost:3000` — landing page
- `http://localhost:3000/agendar` — agendamento
- `http://localhost:3000/admin` — painel administrativo (senha = `ADMIN_PASSWORD`)

### Scripts disponíveis

| Script                  | Descrição                                   |
| ------------------------ | -------------------------------------------- |
| `npm run dev`            | Servidor de desenvolvimento                  |
| `npm run build`          | Build de produção                            |
| `npm run start`          | Roda o build de produção                     |
| `npm run lint`           | ESLint                                       |
| `npm run prisma:seed`    | Popula a disponibilidade padrão              |
| `npx prisma studio`      | Interface visual para consultar o banco       |

## Deploy na Vercel

A Vercel roda funções serverless com **sistema de arquivos efêmero e
somente leitura** — ou seja, um arquivo SQLite local (`dev.db`) **não
funciona em produção na Vercel**: cada execução pode partir de um disco
"limpo" e as escritas não persistem entre requisições.

Para o deploy, mantenha o SQLite apenas para desenvolvimento local e use um
banco hospedado para produção. Duas opções simples:

### Opção A — Turso (libSQL, compatível com SQLite)

Mantém a mesma "linguagem" SQLite, mudando apenas a forma de conexão.

1. Crie um banco em [turso.tech](https://turso.tech) (ou outro provedor
   libSQL) e gere a URL de conexão e o token de autenticação.
2. Instale o driver adapter do Prisma para libSQL:
   ```bash
   npm install @prisma/adapter-libsql @libsql/client
   ```
3. Ajuste `prisma/schema.prisma` para usar o adapter (`previewFeatures =
   ["driverAdapters"]`) e `src/lib/prisma.ts` para instanciar o
   `PrismaLibSQL` com a URL/token do Turso.
4. Configure na Vercel as variáveis `TURSO_DATABASE_URL` e
   `TURSO_AUTH_TOKEN`.

### Opção B — Postgres (Vercel Postgres, Neon, Supabase etc.)

Caminho mais comum em produção com Next.js na Vercel.

1. Crie um banco Postgres gerenciado e copie a connection string.
2. Em `prisma/schema.prisma`, troque:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
   por:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Gere as migrations novamente para o novo provider:
   ```bash
   npx prisma migrate dev --name init_postgres
   ```
4. Configure em **Vercel → Project Settings → Environment Variables**:
   - `DATABASE_URL` — connection string do Postgres
   - `ADMIN_PASSWORD` — senha do painel admin
   - `ADMIN_SESSION_SECRET` — string aleatória longa (ex: `openssl rand -hex 32`)
5. Defina o **Build Command** do projeto na Vercel como:
   ```bash
   prisma generate && prisma migrate deploy && next build
   ```
   (isso garante que as migrations sejam aplicadas automaticamente a cada
   deploy).

### Passos gerais na Vercel

1. Suba o repositório no GitHub/GitLab/Bitbucket.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório —
   a Vercel detecta o Next.js automaticamente.
3. Configure as variáveis de ambiente (seção acima).
4. Faça o deploy. Depois, sempre que houver mudança no schema do Prisma,
   um novo deploy aplicará as migrations automaticamente (com o build
   command acima).
