import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import DrawerLayout from '@/components/DrawerLayout';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JeepMe — Cebu Jeepney Route Finder',
  description:
    'Discover the best jeepney routes in Cebu City, Philippines. Pin your origin and destination to find the right jeepney code, fare, and boarding instructions.',
  keywords: ['jeepney', 'cebu', 'transit', 'route finder', 'philippines', 'commute'],
  authors: [{ name: 'JeepMe' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0F172A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="jeepme">
      <body className={`${inter.variable} font-sans antialiased`}>
        <DrawerLayout>
          {children}
        </DrawerLayout>
      </body>
    </html>
  );
}
