import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const LocationSection: React.FC = () => {
  return (
    <section id="localizacao" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 font-cute text-bubble-pink">
            Onde Estamos
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Venha nos visitar ou faça seu pedido para retirada
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Info Cards */}
          <div className="space-y-6">
            
            {/* Card 1: Address */}
            <ScrollReveal animation="animate__fadeInLeft" delay="0.1s">
              <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border-l-4 border-bubble-pink">
                <div className="bg-pink-100 p-3 rounded-full flex-shrink-0">
                  <MapPin className="h-6 w-6 text-bubble-pink" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 font-cute">Endereço</h4>
                  <p className="text-gray-600">Retirada no Local (Cuiabá - MT)</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Phone */}
            <ScrollReveal animation="animate__fadeInLeft" delay="0.2s">
              <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border-l-4 border-bubble-pink">
                <div className="bg-pink-100 p-3 rounded-full flex-shrink-0">
                  <Phone className="h-6 w-6 text-bubble-pink" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 font-cute">Contato</h4>
                  <p className="text-gray-600">(65) 9255-5047</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3: Hours */}
            <ScrollReveal animation="animate__fadeInLeft" delay="0.3s">
              <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border-l-4 border-bubble-pink">
                <div className="bg-pink-100 p-3 rounded-full flex-shrink-0">
                  <Clock className="h-6 w-6 text-bubble-pink" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 font-cute">Horário</h4>
                  <p className="text-gray-600">Segunda a Sábado (Consulte horários)</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Waze Button */}
            <ScrollReveal animation="animate__fadeInUp" delay="0.4s" className="pt-4">
              <a 
                href="https://waze.com/ul?q=Cuiaba" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-brick-orange text-white text-lg font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <Navigation className="h-6 w-6" />
                Abrir no Waze
              </a>
            </ScrollReveal>

          </div>

          {/* Right Column: Google Maps Iframe */}
          <ScrollReveal animation="animate__fadeInRight" delay="0.4s" className="h-full w-full">
            <div className="h-full min-h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
               <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123164.38209867086!2d-56.16877028135891!3d-15.596081372545934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x939db187541629d3%3A0x673995cb70d3810!2sCuiab%C3%A1%2C%20MT!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '400px' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de Localização"
              />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};