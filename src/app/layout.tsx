import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartDrawer } from '@/components/CartDrawer';
import { GoogleCloudConsoleGuideModal } from '@/components/GoogleCloudConsoleGuideModal';
import { AuthModal } from '@/components/AuthModal';

export const metadata: Metadata = {
  title: 'ShopWithOlly | Haute Fine Female Jewelry Atelier',
  description:
    'Exclusive fine jewelry creations for women. Handcrafted 18k gold necklaces, baroque pearl drop earrings, Swiss-engineered wristwatches, and diamond tennis bracelets. Insured worldwide shipping.',
  keywords: [
    'ShopWithOlly',
    'female jewelry',
    'fine earrings',
    'gold necklaces',
    'luxury wristwatches',
    'diamond bracelets',
    'haute joaillerie',
  ],
  authors: [{ name: 'ShopWithOlly Atelier' }],
  openGraph: {
    title: 'ShopWithOlly | Haute Fine Female Jewelry Atelier',
    description:
      'Timeless elegance sculpted for the modern muse. 18K solid gold, natural gemstones, and bespoke craftsmanship.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <GoogleCloudConsoleGuideModal />
            <AuthModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
