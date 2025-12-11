import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection';
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
    <div className="min-h-screen flex flex-col font-body text-brand-brown bg-brand-cream">
      <Header />
      <main className="flex-grow">
        <Hero />
        <InfoSection />
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