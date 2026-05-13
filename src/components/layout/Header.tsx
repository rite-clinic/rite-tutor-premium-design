import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { ContactCTA } from '@/contexts/ContactModalContext';
import logo from '@/assets/logo.png';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Learning Pathways', href: '/learning-pathways' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blogs' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-foreground text-background py-2">
        <div className="container-wide flex justify-between items-center text-sm">
          <p className="font-medium">
            🎓 Premium 1-on-1 Online Coding Classes for Kids in Bloomington, IN
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:hello@ritetutor.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              hello@ritetutor.com
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-card/95 backdrop-blur-md shadow-premium'
            : 'bg-card'
        }`}
      >
        <nav className="container-wide">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="Rite Tutor" 
                className="h-14 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-1">
              {navigation.slice(0, 7).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted transition-all duration-200">
                  More
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-premium-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {navigation.slice(7).map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a href="tel:+19294218055" className="hidden lg:flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> +1 (929) 421-8055
              </a>
              <ContactCTA variant="hero" size="lg">Book Free Strategy Call</ContactCTA>
            </div>

            {/* Mobile menu button */}
            <button
              className="xl:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden border-t border-border bg-card"
            >
              <div className="container-wide py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/80 hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  <ContactCTA variant="hero" size="lg" className="w-full">Book Free Strategy Call</ContactCTA>
                  <a href="tel:+19294218055" className="flex items-center justify-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary py-2">
                    <Phone className="w-4 h-4" /> +1 (929) 421-8055
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
