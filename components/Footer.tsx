import React from 'react';
import { Cake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bubble-pink text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <Cake className="h-6 w-6" />
          <span className="font-cute text-xl font-bold">Confeitaria da Lélis Reis</span>
        </div>
        <p className="text-center text-pink-100 text-sm">
          © {new Date().getFullYear()} Confeitaria da Lélis Reis. Todos os direitos reservados.
        </p>
        <p className="text-center text-pink-200 text-xs mt-2">
          Feito com 💖 e muito açúcar.
        </p>
      </div>
    </footer>
  );
};