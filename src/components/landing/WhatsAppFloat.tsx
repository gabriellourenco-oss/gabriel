const WHATSAPP_LINK =
  "https://wa.me/5533988732087?text=" +
  encodeURIComponent("Olá, Dra. Juliana! Gostaria de agendar uma consulta.");

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener"
      aria-label="Chamar no WhatsApp"
      className="fixed bottom-[22px] right-[22px] z-[60] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_24px_-6px_rgba(0,0,0,0.4)] transition-transform hover:scale-105"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M17 14.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.5 2.7 1.1 2.7.7 3.2.6.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.1.2-1.3-.1-.1-.3-.2-.6-.3z"
          fill="#fff"
        />
        <path
          d="M12 2C6.5 2 2 6.4 2 11.9c0 1.9.5 3.6 1.4 5.2L2 22l5-1.3c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.4 10-9.9S17.5 2 12 2z"
          stroke="#fff"
          strokeWidth="1.4"
        />
      </svg>
    </a>
  );
}
