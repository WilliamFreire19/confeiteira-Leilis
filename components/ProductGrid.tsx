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
    <section id="kits" className="py-16 bg-mint-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-base text-main-pink font-semibold tracking-wide uppercase font-cute">Nossos Doces Finos</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-chocolate sm:text-4xl font-cute">
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
              <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col w-full border border-mint-dark/30">
                
                {/* Image Placeholder */}
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-50 xl:aspect-w-7 xl:aspect-h-8 h-48 relative flex items-center justify-center">
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
                      <ImageIcon className="w-10 h-10 mb-1" />
                      <span className="text-xs">assets/kit-{product.id}.jpg</span>
                   </div>

                   <img
                    src={`assets/kit-${product.id}.jpg`}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75 relative z-10"
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  />
                  
                  <div className="absolute top-2 right-2 bg-main-pink text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-20 font-cute">
                     R$ {product.price.toFixed(2)}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-chocolate font-cute mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed">
                    {product.description}
                  </p>
                  <button
                    onClick={() => onOrderClick(product)}
                    className="w-full mt-4 flex items-center justify-center bg-main-pink text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-600 transition-colors shadow-sm hover:shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
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