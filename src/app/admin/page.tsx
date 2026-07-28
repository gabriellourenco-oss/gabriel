import type { Metadata } from "next";
import { estaAutenticado } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin | [NOME_MEDICA]",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const autenticado = await estaAutenticado();

  if (!autenticado) {
    return <LoginForm />;
  }

  return <AdminDashboard />;
}
