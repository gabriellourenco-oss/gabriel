const VARIANTS = {
  dark: { bg: "#12302E", leaf: "#93A87D", text: "#F3EFE4" },
  light: { bg: "#F3EFE4", leaf: "#C1552B", text: "#12302E" },
} as const;

interface LogoMarkProps {
  size?: number;
  variant?: keyof typeof VARIANTS;
  className?: string;
}

/** Monograma "JT" — círculo petróleo, broto de folha sage, texto em Lora. */
export function LogoMark({ size = 40, variant = "dark", className = "" }: LogoMarkProps) {
  const { bg, leaf, text } = VARIANTS[variant];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`flex-none ${className}`}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="59" fill={bg} />
      <path d="M60 30c-3 6-9 9-9 16a9 9 0 0018 0c0-7-6-10-9-16z" fill={leaf} />
      <path d="M60 30v6" stroke={bg} strokeWidth="1.4" strokeLinecap="round" />
      <text
        x="60"
        y="88"
        textAnchor="middle"
        fontFamily="var(--font-lora), Georgia, serif"
        fontWeight="600"
        fontSize="38"
        fill={text}
      >
        JT
      </text>
    </svg>
  );
}

interface LogoProps {
  size?: number;
  variant?: keyof typeof VARIANTS;
}

/** Lockup horizontal do consultório: monograma + nome + especialidade. */
export function Logo({ size = 40, variant = "dark" }: LogoProps) {
  const light = variant === "light";
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} variant={variant} />
      <span className="font-serif text-[17px] font-semibold leading-tight">
        <span className={light ? "text-cream-100" : "text-brand-600"}>Dra. Juliana</span>
        <br />
        <span
          className={`font-sans text-[11px] font-medium uppercase tracking-wide ${
            light ? "text-brand-300" : "text-ink-500"
          }`}
        >
          Medicina de Família &amp; Geriatria
        </span>
      </span>
    </span>
  );
}
