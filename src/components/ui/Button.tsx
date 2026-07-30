import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold transition-all focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary:
    "bg-accent-500 text-cream-100 shadow-[0_4px_0_#8F3E1F] hover:bg-accent-400 hover:-translate-y-0.5",
  secondary:
    "bg-transparent text-brand-600 border-[1.5px] border-brand-600/25 hover:bg-brand-600/5",
  accent: "bg-brand-600 text-cream-100 hover:bg-brand-700",
};

type Variant = keyof typeof variants;

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: Variant }) {
  return (
    <Link href={href} className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
