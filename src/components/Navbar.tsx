import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (productId?: string, plan?: 'classic' | 'vip') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const navLinks = [
    { href: '#experiencias', label: t('nav.experiences') },
    { href: '#confianza', label: t('nav.trust') },
    { href: '#logistica', label: t('nav.contact') },
    { href: '#faq', label: t('nav.faq') }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy shadow-lg py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a 
            href="https://canavacations.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center"
          >
            <img 
              src="/brand/cana-vacations-logo-on-dark.png"
              alt="Cana Vacations" 
              className="h-14 w-auto object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:scale-105 sm:h-16"
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-white hover:text-coral transition-colors duration-200 font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right section: Language + CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-white hover:text-coral transition-colors duration-200 focus:outline-none"
              aria-label="Change language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-semibold uppercase">{language}</span>
            </button>

            {/* CTA Button */}
            <button
              onClick={() => onOpenBooking()}
              className="bg-coral text-navy-deep font-semibold px-5 py-2.5 rounded-full hover:bg-white hover:text-navy transition-all duration-300 shadow-md shadow-coral/10 hover:shadow-white/10"
            >
              {t('nav.bookNow')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-white hover:text-coral focus:outline-none"
              aria-label="Change language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase">{language}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-coral focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-navy-deep z-40 flex flex-col px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xl font-semibold text-white hover:text-coral transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-6 border-t border-slate/30">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-coral text-navy-deep font-bold py-3 px-6 rounded-full hover:bg-white transition-all text-center"
            >
              {t('nav.bookNow')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
