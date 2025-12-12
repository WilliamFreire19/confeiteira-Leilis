import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { ShoppingBag, Image as ImageIcon, Cake, Gift } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ProductGridProps {
  onOrderClick: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onOrderClick }) => {
  const [activeTab, setActiveTab] = useState<'kit' | 'cake'>('kit');

  // Filtrar produtos com base na aba ativa
  const displayedProducts = PRODUCTS.filter(p => p.category === activeTab);

  return (
    <section id="kits" className="py-16 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-8">
          <h2 className="text-base text-brand-green font-semibold tracking-wide uppercase font-cute">Nossos Doces Finos</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-brand-brown sm:text-4xl font-cute">
            Escolha sua Delícia
          </p>
        </ScrollReveal>

        {/* --- TABS DE FILTRO --- */}
        <ScrollReveal className="flex justify-center mb-12" delay="0.1s">
          <div className="bg-white p-1 rounded-xl shadow-sm inline-flex border border-brand-green/20">
            <button
              onClick={() => setActiveTab('kit')}
              className={`flex items-center px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 font-cute ${
                activeTab === 'kit' 
                  ? 'bg-brand-green text-white shadow-md' 
                  : 'text-gray-500 hover:text-brand-green hover:bg-gray-50'
              }`}
            >
              <Gift className="w-4 h-4 mr-2" />
              KITS FESTA
            </button>
            <button
              onClick={() => setActiveTab('cake')}
              className={`flex items-center px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 font-cute ${
                activeTab === 'cake' 
                  ? 'bg-brand-green text-white shadow-md' 
                  : 'text-gray-500 hover:text-brand-green hover:bg-gray-50'
              }`}
            >
              <Cake className="w-4 h-4 mr-2" />
              BOLOS POR KG
            </button>
          </div>
        </ScrollReveal>

        {/* --- GRID DE PRODUTOS --- */}
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {displayedProducts.map((product, index) => (
            <ScrollReveal 
              key={product.id} 
              delay={`${index * 0.1}s`}
              className="flex"
            >
              <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col w-full border border-brand-green/10">
                
                {/* Área da Imagem */}
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-white xl:aspect-w-7 xl:aspect-h-8 h-64 relative flex items-center justify-center p-4">
                   
                   <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain relative z-10 hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                    }}
                  />

                  {/* Ícone de erro/fallback */}
                  <div className="fallback-icon hidden absolute inset-0 flex flex-col items-center justify-center text-gray-300 z-0">
                      <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                      <span className="text-xs text-center font-bold px-2">
                        Sem Imagem
                      </span>
                   </div>
                  
                  {/* Etiqueta de Preço */}
                  <div className="absolute top-3 right-3 bg-brand-green text-white text-sm font-bold px-3 py-1 rounded-full shadow-md z-20 font-cute">
                     {product.category === 'cake' ? (
                       `R$ ${product.price.toFixed(2)} /kg`
                     ) : (
                       `R$ ${product.price.toFixed(2)}`
                     )}
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
                  
                  {product.category === 'cake' && (
                    <div className="mb-2">
                      <span className="text-xs bg-brand-cream text-brand-brown px-2 py-1 rounded-md font-bold">
                         Somente o Bolo
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => onOrderClick(product)}
                    className="w-full mt-4 flex items-center justify-center bg-brand-green text-white px-4 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-sm hover:shadow-md transform active:scale-95 duration-200"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {product.category === 'cake' ? 'Montar Bolo' : 'Solicitar Orçamento'}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        {displayedProducts.length === 0 && (
           <div className="text-center py-10 text-gray-500">
             Nenhum produto encontrado nesta categoria.
           </div>
        )}

      </div>
    </section>
  );
};