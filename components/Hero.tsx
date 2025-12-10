import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export const Hero: React.FC = () => {
  return (
    <section className="w-full bg-mint-light">
      <ScrollReveal 
        animation="animate__fadeIn" 
        className="relative w-full"
      >
        {/* Container da imagem com altura responsiva */}
        <div className="w-full h-64 sm:h-96 md:h-[500px] relative overflow-hidden bg-mint-light group">
            <img
              className="w-full h-full object-cover object-center shadow-sm"
              src="assets/hero-bg.jpg"
              alt="Confeitaria Léilis Reis - Doces Finos"
              onError={(e) => {
                // Fallback visual caso a imagem não seja encontrada
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-mint-light');
                const span = document.createElement('span');
                span.innerText = 'Salve a imagem em: public/assets/hero-bg.jpg';
                span.className = 'text-chocolate opacity-50 font-bold';
                e.currentTarget.parentElement?.appendChild(span);
              }}
            />
            {/* Overlay sutil para garantir contraste se necessário, removido a pedido "sem nada por cima", mas mantendo a estrutura limpa */}
        </div>
      </ScrollReveal>
    </section>
  );
};