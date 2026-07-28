import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-slate-900 py-10 text-slate-300">
      <Container className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-semibold text-white">[NOME_MEDICA]</p>
          <p className="text-sm">CRM [CRM] · Geriatria e Medicina de Família</p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/[INSTAGRAM]"
            className="text-sm underline decoration-slate-600 underline-offset-4 hover:text-white"
          >
            Instagram: [INSTAGRAM]
          </a>
          <a
            href="https://wa.me/[TELEFONE]"
            className="text-sm underline decoration-slate-600 underline-offset-4 hover:text-white"
          >
            WhatsApp
          </a>
        </div>
      </Container>
      <p className="mt-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} [NOME_MEDICA]. Todos os direitos reservados.
      </p>
    </footer>
  );
}
