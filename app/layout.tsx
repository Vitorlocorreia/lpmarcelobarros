import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marcelo Barros | Advogados Associados",
  description: "Estratégia jurídica para proteger o que realmente importa.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
