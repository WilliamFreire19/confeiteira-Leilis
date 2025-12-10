import React from 'react';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <ScrollReveal animation="animate__fadeInLeft">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-cute">
                  <span className="block xl:inline">Delícias que adoçam</span>{' '}
                  <span className="block text-bubble-pink xl:inline">a sua festa</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Kits festivos completos com bolos, docinhos e salgados feitos com amor e os melhores ingredientes. Transforme seus momentos em memórias inesquecíveis.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#kits"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-bubble-pink hover:bg-bubble-pink-dark md:py-4 md:text-lg md:px-10 transition-all transform hover:scale-105"
                    >
                      Ver Kits de Festa
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </main>
        </div>
      </div>
      
      {/* Hero Image Section */}
      <ScrollReveal 
        animation="animate__fadeIn" 
        delay="0.5s" 
        className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 h-56 sm:h-72 md:h-96 lg:h-full bg-gray-100 flex items-center justify-center relative overflow-hidden"
      >
        {/* 
          PLACEHOLDER IMAGE LOGIC:
          A imagem abaixo aponta para 'assets/hero-bg.jpg'.
          Crie uma pasta chamada 'assets' na raiz do seu projeto e adicione a imagem com este nome.
          Enquanto a imagem não existir, o bloco cinza com o ícone será exibido.
        */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <ImageIcon className="w-16 h-16 mb-2 opacity-50" />
            <span className="text-sm font-medium">assets/hero-bg.jpg</span>
        </div>
        
        <img
          className="relative w-full h-full object-cover z-10"
          src="assets/hero-bg.jpg"
          alt="Bolo delicioso com cobertura rosa"
          onError={(e) => {
            // Esconde a imagem quebrada para mostrar o placeholder atrás
            e.currentTarget.style.opacity = '0';
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent lg:via-transparent z-20 pointer-events-none"></div>
      </ScrollReveal>
    </section>
  );
};