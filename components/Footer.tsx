import React from 'react';
import { Cake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-brown text-brand-cream py-8 border-t border-brand-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <Cake className="h-6 w-6 text-brand-green" />
          <span className="font-cute text-xl font-bold">Confeitaria Léilis Reis</span>
        </div>
        <p className="text-center text-gray-300 text-sm">
          © {new Date().getFullYear()} Confeitaria Léilis Reis. Doces Finos.
        </p>
        <p className="text-center text-brand-green text-xs mt-2">
          Saborie sem moderação.
        </p>
      </div>
    </footer>
  );
};