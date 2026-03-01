import type { Metadata } from 'next';
import { Geist, Geist_Mono, Pacifico } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

/** Handwritten-style font used exclusively in the festive menu section */
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Grill Dashboard',
  description: 'Calculadora de insumos, costos y mermas para carne asada',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable}`}>
        {children}
      </body>
    </html>
  );
}
