import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export const Hero: React.FC = () => {
  return (
    <section className="w-full bg-brand-cream">
      <ScrollReveal 
        animation="animate__fadeIn" 
        className="relative w-full"
      >
        {/* Container ajustado para height auto para não cortar a imagem */}
        <div className="w-full relative overflow-hidden bg-brand-cream group">
            <img
              className="w-full h-auto object-contain shadow-sm"
              src="/assets/hero-bg.jpg"
              alt="Confeitaria Léilis Reis - Doces Finos"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('h-64', 'flex', 'items-center', 'justify-center', 'bg-brand-cream');
                const span = document.createElement('span');
                span.innerText = 'Imagem não encontrada: assets/hero-bg.jpg';
                span.className = 'text-brand-brown opacity-50 font-bold';
                e.currentTarget.parentElement?.appendChild(span);
              }}
            />
        </div>
      </ScrollReveal>
    </section>
  );
};