import React from 'react';
import { CreditCard, Clock, Truck, AlertCircle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const InfoSection: React.FC = () => {
  return (
    <section className="bg-mint-light py-10 border-b border-mint-dark/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <ScrollReveal delay="0.1s" className="bg-white p-5 rounded-xl shadow-sm border border-soft-pink/50 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <CreditCard className="text-main-pink w-6 h-6 mr-2" />
              <h3 className="font-cute text-chocolate text-lg font-bold">Pagamento</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              50% de entrada na encomenda, restante na entrega.
              <br/>
              <span className="font-semibold">Aceitamos:</span> Pix, Débito, Dinheiro.
              <br/>
              <span className="text-xs text-brick-orange font-bold">Crédito: + R$ 5,00.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay="0.2s" className="bg-white p-5 rounded-xl shadow-sm border border-soft-pink/50 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <Clock className="text-main-pink w-6 h-6 mr-2" />
              <h3 className="font-cute text-chocolate text-lg font-bold">Prazos</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Pedidos com tema ou Massa de Chocolate:
              <br/>
              <span className="font-bold text-chocolate">1 dia de antecedência.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay="0.3s" className="bg-white p-5 rounded-xl shadow-sm border border-soft-pink/50 hover:shadow-md transition-shadow">
             <div className="flex items-center mb-3">
              <AlertCircle className="text-main-pink w-6 h-6 mr-2" />
              <h3 className="font-cute text-chocolate text-lg font-bold">Regras</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Desistência após pagamento:
              <br/>
              <span className="text-red-500 font-medium">Devolução de apenas 50%.</span>
            </p>
          </ScrollReveal>

           <ScrollReveal delay="0.4s" className="bg-white p-5 rounded-xl shadow-sm border border-soft-pink/50 hover:shadow-md transition-shadow">
             <div className="flex items-center mb-3">
              <Truck className="text-main-pink w-6 h-6 mr-2" />
              <h3 className="font-cute text-chocolate text-lg font-bold">Entrega</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Taxa fixa de entrega:
              <br/>
              <span className="font-bold text-green-600 text-lg">R$ 15,00</span>
              <br/>
              para toda a região.
            </p>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};