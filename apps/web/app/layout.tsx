import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
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
  ],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FBFBF9] dark:bg-[#0D0D10] text-[#18181B] dark:text-[#FAFAFA] transition-colors duration-300 antialiased overflow-x-hidden">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <CartProvider>
                <Navbar />
                <main className="flex-1 page-transition-wrapper">
                  {children}
                </main>
                <CartDrawer />
                <Footer />
              </CartProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
