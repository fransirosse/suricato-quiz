import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Importa Tailwind CSS via globals.css

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Next.js 14+ App',
  description: 'Aplicação Next.js 14+ com App Router e design inspirado em Pokémon',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // Layout raiz minimalista e profissional
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 antialiased`}>
        {/* Envolve os children com fundo gradiente Pokémon */}
        {children}
      </body>
    </html>
  );
}