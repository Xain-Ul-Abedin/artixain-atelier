import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

export const metadata: Metadata = {
  title: 'Artixain | Luxury Gemstone Studio & Bespoke Atelier',
  description:
    'Design bespoke natural crystal and mineral gemstone bracelets with real-time procedural shaders, anthropometric wrist calibration, and single-admin atelier fulfillment.',
  keywords: [
    'Artixain',
    'Custom Gemstone Bracelet',
    'Crystal Jewelry Studio',
    'Bespoke Atelier',
    'Natural Crystals',
    'Tiger Eye',
    'Obsidian',
    'Labradorite'
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FBFBF9] dark:bg-[#0D0D10] text-[#18181B] dark:text-[#FAFAFA] antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <CartDrawer />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
