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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Lexend:wght@300;400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
