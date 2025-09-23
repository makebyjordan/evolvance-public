import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // 1. Importar la fuente desde next/font
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/AuthContext';

// 2. Configurar la fuente que se va a usar
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Asegura que el texto sea visible mientras carga la fuente
  variable: '--font-inter', // Opcional: para usar con variables CSS en Tailwind
});

export const metadata: Metadata = {
  title: 'Evol-vance',
  description: 'Diseñamos el Futuro de tu Crecimiento.',
  // 3. Añadir la información del favicon aquí
  icons: {
    icon: '/favicon.ico', // Asegúrate de que este archivo exista en tu carpeta /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 4. Se elimina la etiqueta <head> y se aplica la fuente al <html>
    <html lang="es" className={`${inter.variable} dark`}>
      {/* El <head> es generado automáticamente por Next.js */}
      <body className="font-body antialiased">
        <AuthProvider>
            {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}