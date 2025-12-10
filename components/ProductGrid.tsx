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
    <section id="kits" className="py-16 bg-baby-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-base text-bubble-pink font-semibold tracking-wide uppercase font-cute">Nossos Produtos</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl font-cute">
            Escolha o Kit Ideal para Sua Festa
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {PRODUCTS.map((product, index) => (
            <ScrollReveal 
              key={product.id} 
              delay={`${index * 0.1}s`} // Stagger animation delay
              className="flex"
            >
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                
                {/* Image Placeholder Container */}
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 xl:aspect-w-7 xl:aspect-h-8 h-48 relative flex items-center justify-center">
                   {/* Background Placeholder Info */}
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
                      <ImageIcon className="w-10 h-10 mb-1" />
                      <span className="text-xs">assets/kit-{product.id}.jpg</span>
                   </div>

                   {/* 
                      Image Element:
                      Aponta para 'assets/kit-1.jpg', 'assets/kit-2.jpg', etc.
                   */}
                   <img
                    src={`assets/kit-${product.id}.jpg`}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75 relative z-10"
                    onError={(e) => {
                      // Oculta imagem quebrada
                      e.currentTarget.style.opacity = '0';
                    }}
                  />
                  
                  <div className="absolute top-2 right-2 bg-bubble-pink text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm z-20">
                     R$ {product.price.toFixed(2)}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 font-cute mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 flex-grow">
                    {product.description}
                  </p>
                  <button
                    onClick={() => onOrderClick(product)}
                    className="w-full mt-4 flex items-center justify-center bg-bubble-pink text-white px-4 py-2 rounded-lg font-medium hover:bg-bubble-pink-dark transition-colors"
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