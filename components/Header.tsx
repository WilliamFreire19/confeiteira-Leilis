import React, { useState } from 'react';
import { Menu, X, Cake } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Início", href: "#" },
    { label: "Kits", href: "#kits" },
    { label: "Onde Estamos", href: "#localizacao" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur-sm shadow-sm border-b border-brand-green/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-brand-green p-2 rounded-full shadow-sm">
              <Cake className="h-6 w-6 text-white" />
            </div>
            <span className="font-cute text-2xl text-brand-brown font-bold">
              Confeitaria Da Léilis Reis
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-cute text-lg text-brand-brown-light hover:text-brand-green transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-brand-brown hover:text-brand-green"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-green/20 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-brown hover:text-brand-green hover:bg-white/50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};