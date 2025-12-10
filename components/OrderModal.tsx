import React, { useState, useEffect } from 'react';
import { X, Check, AlertTriangle } from 'lucide-react';
import { Product, OrderFormState } from '../types';
import { ADDONS, CAKE_BATTERS, CAKE_FILLINGS, WHATSAPP_NUMBER } from '../constants';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, product }) => {
  const [form, setForm] = useState<OrderFormState>({
    customerName: '',
    batter: '',
    filling: '',
    selectedAddons: [],
    notes: ''
  });

  const [cakeWeight, setCakeWeight] = useState<number>(0);

  // Reset form when product changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({
        customerName: '',
        batter: '',
        filling: '',
        selectedAddons: [],
        notes: ''
      });

      // Extrair peso do bolo (procura por "X Kg" na descrição ou nome)
      // Ex: "Kit 06 - 3 Kg" ou "3 Kg bolo"
      const weightRegex = /(\d+)\s*Kg/i;
      const match = product.description.match(weightRegex) || product.name.match(weightRegex);
      
      if (match && match[1]) {
        setCakeWeight(parseInt(match[1], 10));
      } else {
        setCakeWeight(1); // Default fallback
      }
    }
  }, [isOpen, product]);

  const handleAddonChange = (addonId: string) => {
    setForm(prev => {
      const isSelected = prev.selectedAddons.includes(addonId);
      if (isSelected) {
        return { ...prev, selectedAddons: prev.selectedAddons.filter(id => id !== addonId) };
      } else {
        return { ...prev, selectedAddons: [...prev.selectedAddons, addonId] };
      }
    });
  };

  const calculateTotal = () => {
    // Valor Base
    let total = product.price;

    // Valor Adicionais Checkbox
    const addonsTotal = form.selectedAddons.reduce((sum, addonId) => {
      const addon = ADDONS.find(a => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);
    total += addonsTotal;

    // Valor Adicional Massa Colorida
    if (form.batter === 'Colorida') {
        total += (cakeWeight * 10);
    }

    return total;
  };

  const handleSendToWhatsApp = () => {
    if (!form.customerName.trim()) {
      alert("Por favor, preencha seu nome.");
      return;
    }

    const addonsNames = form.selectedAddons
      .map(id => ADDONS.find(a => a.id === id)?.name)
      .filter(Boolean);

    // Se massa colorida, adicionar essa info explicitamente nos adicionais/obs para clareza
    let extraCostsText = "";
    if (form.batter === 'Colorida') {
        extraCostsText = ` (+ R$ ${(cakeWeight * 10).toFixed(2)} ref. Massa Colorida ${cakeWeight}kg)`;
    }

    const addonsString = addonsNames.join(', ');

    const message = `
Olá! Me chamo *${form.customerName}*.
Gostaria de orçar o *${product.name}*.

🧁 *Massa:* ${form.batter || 'A definir'}${extraCostsText}
🍰 *Recheio:* ${form.filling || 'A definir'}
✨ *Adicionais:* ${addonsString || 'Nenhum'}

📝 *Obs:* ${form.notes || 'Nenhuma'}

💰 *Valor Estimado:* R$ ${calculateTotal().toFixed(2)}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-chocolate/50 bg-opacity-75 transition-opacity backdrop-blur-sm" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-soft-pink">
          <div className="bg-main-pink px-4 py-3 flex justify-between items-center">
             <h3 className="text-lg leading-6 font-bold text-white font-cute" id="modal-title">
              Orçamento: {product.name}
            </h3>
            <button onClick={onClose} className="text-white hover:text-pink-100 transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-chocolate mb-1">Nome do Cliente <span className="text-main-pink">*</span></label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-pink focus:border-main-pink sm:text-sm"
                  value={form.customerName}
                  onChange={(e) => setForm({...form, customerName: e.target.value})}
                  placeholder="Seu nome completo"
                />
              </div>

              {/* Batter */}
              <div className="bg-mint-light/30 p-3 rounded-lg border border-mint-dark/20">
                <label className="block text-sm font-bold text-chocolate mb-1">Massa do Bolo</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-pink focus:border-main-pink sm:text-sm"
                  value={form.batter}
                  onChange={(e) => setForm({...form, batter: e.target.value})}
                >
                  <option value="">Selecione uma opção</option>
                  {CAKE_BATTERS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                
                {/* Avisos Dinâmicos de Massa */}
                {form.batter === 'Chocolate' && (
                  <div className="mt-2 text-xs flex items-start text-brick-orange font-semibold animate__animated animate__fadeIn">
                    <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0" />
                    ⚠️ Atenção: Somente com 1 dia de antecedência.
                  </div>
                )}
                {form.batter === 'Colorida' && (
                  <div className="mt-2 text-xs flex items-start text-chocolate font-semibold animate__animated animate__fadeIn">
                     <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0 text-main-pink" />
                     <span>
                        ⚠️ Acréscimo de R$ 10,00 por kg.
                        <br/>
                        <span className="text-gray-500 font-normal">Bolo estimado em {cakeWeight}kg (+ R$ {(cakeWeight * 10).toFixed(2)})</span>
                     </span>
                  </div>
                )}
              </div>

              {/* Filling */}
              <div>
                <label className="block text-sm font-bold text-chocolate mb-1">Recheio Preferido</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-pink focus:border-main-pink sm:text-sm"
                  value={form.filling}
                  onChange={(e) => setForm({...form, filling: e.target.value})}
                >
                  <option value="">Selecione uma opção</option>
                  {CAKE_FILLINGS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              {/* Addons */}
              <div>
                <label className="block text-sm font-bold text-chocolate mb-2">Adicionais Extras</label>
                <div className="grid grid-cols-1 gap-2 bg-gray-50 p-3 rounded-lg">
                  {ADDONS.map(addon => (
                    <div key={addon.id} className="flex items-center">
                      <input
                        id={`addon-${addon.id}`}
                        type="checkbox"
                        className="h-4 w-4 text-main-pink focus:ring-main-pink border-gray-300 rounded cursor-pointer"
                        checked={form.selectedAddons.includes(addon.id)}
                        onChange={() => handleAddonChange(addon.id)}
                      />
                      <label htmlFor={`addon-${addon.id}`} className="ml-2 block text-sm text-gray-700 cursor-pointer">
                        {addon.name} <span className="text-main-pink font-semibold">(+ R$ {addon.price.toFixed(2)})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-bold text-chocolate mb-1">Observações</label>
                <textarea
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-pink focus:border-main-pink sm:text-sm"
                  value={form.notes}
                  onChange={(e) => setForm({...form, notes: e.target.value})}
                  placeholder="Detalhes extras..."
                />
              </div>

              {/* Total */}
              <div className="mt-4 p-4 bg-mint-light rounded-lg border border-mint-dark/30">
                <div className="flex justify-between items-center">
                  <span className="text-chocolate font-medium">Valor Estimado:</span>
                  <span className="text-2xl font-bold text-main-pink font-cute">
                    R$ {calculateTotal().toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-center mt-2 text-gray-500">
                   *Valor sujeito a confirmação no WhatsApp
                </p>
              </div>

            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-3 text-base font-bold text-white sm:ml-3 sm:w-auto sm:text-sm transition-all transform hover:scale-105 ${
                form.customerName.trim() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={handleSendToWhatsApp}
              disabled={!form.customerName.trim()}
            >
              <Check className="w-5 h-5 mr-2" />
              Enviar Pedido no WhatsApp
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};