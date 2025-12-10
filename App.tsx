import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { Product } from './types';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProductGrid onOrderClick={handleOpenModal} />
        <LocationSection />
      </main>
      <Footer />
      
      {selectedProduct && (
        <OrderModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          product={selectedProduct} 
        />
      )}
    </div>
  );
};

export default App;