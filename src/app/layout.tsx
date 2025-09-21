import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Evol-vance',
  description: 'Diseñamos el Futuro de tu Crecimiento.',
  // --- AÑADE ESTO ---
  icons: {
    icon: '/favicon.ico', // O la ruta a tu icono en la carpeta /public
    apple: '/apple-touch-icon.png', // Opcional: para dispositivos Apple
  },
  // --------------------
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ... el resto de tu código sigue igual
  return (
    <html lang="es" className="dark">
      <head>
        {/* Next.js añadirá aquí las etiquetas del favicon desde metadata */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
            {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}