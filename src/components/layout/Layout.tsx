import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileFloatingCTA } from './MobileFloatingCTA';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col pb-24 md:pb-0">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:p-4">Skip to main content</a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileFloatingCTA />
    </div>
  );
}
