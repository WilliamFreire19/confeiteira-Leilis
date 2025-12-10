import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
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
    const addonsTotal = form.selectedAddons.reduce((sum, addonId) => {
      const addon = ADDONS.find(a => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);
    return product.price + addonsTotal;
  };

  const handleSendToWhatsApp = () => {
    if (!form.customerName.trim()) {
      alert("Por favor, preencha seu nome.");
      return;
    }

    const addonsNames = form.selectedAddons
      .map(id => ADDONS.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const message = `
Olá! Me chamo *${form.customerName}*.
Gostaria de orçar o *${product.name}*.

🧁 *Massa:* ${form.batter || 'A definir'}
🍰 *Recheio:* ${form.filling || 'A definir'}
✨ *Adicionais:* ${addonsNames || 'Nenhum'}

📝 *Obs:* ${form.notes || 'Nenhuma'}

💰 *Valor Base Estimado:* R$ ${calculateTotal().toFixed(2)}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-bubble-pink px-4 py-3 flex justify-between items-center">
             <h3 className="text-lg leading-6 font-bold text-white font-cute" id="modal-title">
              Orçamento: {product.name}
            </h3>
            <button onClick={onClose} className="text-white hover:text-pink-100">
              <X size={24} />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome do Cliente <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-bubble-pink focus:border-bubble-pink sm:text-sm"
                  value={form.customerName}
                  onChange={(e) => setForm({...form, customerName: e.target.value})}
                  placeholder="Seu nome completo"
                />
              </div>

              {/* Batter */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Massa do Bolo</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-bubble-pink focus:border-bubble-pink sm:text-sm"
                  value={form.batter}
                  onChange={(e) => setForm({...form, batter: e.target.value})}
                >
                  <option value="">Selecione uma opção</option>
                  {CAKE_BATTERS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Filling */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Recheio Preferido</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-bubble-pink focus:border-bubble-pink sm:text-sm"
                  value={form.filling}
                  onChange={(e) => setForm({...form, filling: e.target.value})}
                >
                  <option value="">Selecione uma opção</option>
                  {CAKE_FILLINGS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              {/* Addons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adicionais</label>
                <div className="space-y-2">
                  {ADDONS.map(addon => (
                    <div key={addon.id} className="flex items-center">
                      <input
                        id={`addon-${addon.id}`}
                        type="checkbox"
                        className="h-4 w-4 text-bubble-pink focus:ring-bubble-pink border-gray-300 rounded"
                        checked={form.selectedAddons.includes(addon.id)}
                        onChange={() => handleAddonChange(addon.id)}
                      />
                      <label htmlFor={`addon-${addon.id}`} className="ml-2 block text-sm text-gray-900">
                        {addon.name} (+ R$ {addon.price.toFixed(2)})
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Observações</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-bubble-pink focus:border-bubble-pink sm:text-sm"
                  value={form.notes}
                  onChange={(e) => setForm({...form, notes: e.target.value})}
                  placeholder="Detalhes extras..."
                />
              </div>

              {/* Total */}
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Valor Estimado:</span>
                  <span className="text-2xl font-bold text-bubble-pink font-cute">
                    R$ {calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm transition-colors ${
                form.customerName.trim() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={handleSendToWhatsApp}
              disabled={!form.customerName.trim()}
            >
              <Check className="w-4 h-4 mr-2" />
              Enviar Pedido no WhatsApp
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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