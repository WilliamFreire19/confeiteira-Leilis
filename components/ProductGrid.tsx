import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { ShoppingBag, Image as ImageIcon } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ProductGridProps {
  onOrderClick: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onOrderClick }) => {
  return (
    <section id="kits" className="py-16 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-base text-brand-green font-semibold tracking-wide uppercase font-cute">Nossos Doces Finos</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-brand-brown sm:text-4xl font-cute">
            Kits Especiais para Sua Celebração
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {PRODUCTS.map((product, index) => (
            <ScrollReveal 
              key={product.id} 
              delay={`${index * 0.1}s`}
              className="flex"
            >
              <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col w-full border border-brand-green/10">
                
                {/* Área da Imagem */}
                <div className="w-full h-64 overflow-hidden bg-white relative flex items-center justify-center p-4">
                   
                   {/* 
                      AQUI ESTA A IMAGEM 
                      Ela pega o caminho que você definiu no arquivo constants.ts
                   */}
                   <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain relative z-10 hover:scale-105 transition-transform duration-500"
                    // Se a imagem não carregar, mostra um ícone padrão
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                    }}
                  />

                  {/* Ícone de erro caso a imagem não exista */}
                  <div className="fallback-icon hidden absolute inset-0 flex flex-col items-center justify-center text-gray-300 z-0">
                      <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                      <span className="text-xs text-center font-bold px-2">
                        Imagem não encontrada:<br/>
                        {product.image}
                      </span>
                   </div>
                  
                  {/* Etiqueta de Preço */}
                  <div className="absolute top-3 right-3 bg-brand-green text-white text-sm font-bold px-3 py-1 rounded-full shadow-md z-20 font-cute">
                     R$ {product.price.toFixed(2)}
                  </div>
                </div>

                {/* Detalhes do Produto */}
                <div className="p-6 flex flex-col flex-grow bg-white border-t border-gray-100">
                  <h3 className="text-xl font-bold text-brand-brown font-cute mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed">
                    {product.description}
                  </p>
                  <button
                    onClick={() => onOrderClick(product)}
                    className="w-full mt-4 flex items-center justify-center bg-brand-green text-white px-4 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-sm hover:shadow-md transform active:scale-95 duration-200"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Solicitar Orçamento
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};