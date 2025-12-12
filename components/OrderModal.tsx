import React, { useState, useEffect } from 'react';
import { X, Check, AlertTriangle, Scale } from 'lucide-react';
import { Product, OrderFormState } from '../types';
import { ADDONS, CAKE_BATTERS, KIT_FILLINGS_DEFAULT, WHATSAPP_NUMBER } from '../constants';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, product }) => {
  const isCakeByKg = product.category === 'cake';

  const [form, setForm] = useState<OrderFormState>({
    customerName: '',
    batter: '',
    filling: '',
    selectedAddons: [],
    notes: '',
    weight: isCakeByKg ? 1.5 : 1 // Valor inicial padrão
  });

  const [kitWeight, setKitWeight] = useState<number>(0);

  // Reset form when product changes or modal opens
  useEffect(() => {
    if (isOpen) {
      // Tentar extrair peso do kit automaticamente
      let initialWeight = 1;
      if (!isCakeByKg) {
        const weightRegex = /(\d+)\s*Kg/i;
        const match = product.description.match(weightRegex) || product.name.match(weightRegex);
        if (match && match[1]) {
           initialWeight = parseInt(match[1], 10);
        }
      } else {
        initialWeight = 1.5; // Peso mínimo sugerido para bolo por kg
      }

      setKitWeight(initialWeight);
      setForm({
        customerName: '',
        batter: '',
        filling: '',
        selectedAddons: [],
        notes: '',
        weight: initialWeight
      });
    }
  }, [isOpen, product, isCakeByKg]);

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
    const activeWeight = isCakeByKg ? (form.weight || 0) : kitWeight;
    let total = 0;

    if (isCakeByKg) {
      // Preço Base = Peso * Preço do Kg (Tier)
      total = activeWeight * product.price;
    } else {
      // Preço Fixo do Kit
      total = product.price;
    }

    // Valor Adicionais Checkbox
    const addonsTotal = form.selectedAddons.reduce((sum, addonId) => {
      const addon = ADDONS.find(a => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);
    total += addonsTotal;

    // Valor Adicional Massa Colorida
    // Lógica: R$ 10 por Kg de bolo
    if (form.batter === 'Colorida') {
        total += (activeWeight * 10);
    }

    return total;
  };

  const handleSendToWhatsApp = () => {
    if (!form.customerName.trim()) {
      alert("Por favor, preencha seu nome.");
      return;
    }
    if (isCakeByKg && (!form.weight || form.weight <= 0)) {
        alert("Por favor, informe o peso aproximado do bolo.");
        return;
    }

    const activeWeight = isCakeByKg ? form.weight : kitWeight;
    const addonsNames = form.selectedAddons
      .map(id => ADDONS.find(a => a.id === id)?.name)
      .filter(Boolean);

    let extraCostsText = "";
    if (form.batter === 'Colorida') {
        extraCostsText = ` (+ R$ ${(activeWeight! * 10).toFixed(2)} ref. Massa Colorida ${activeWeight}kg)`;
    }

    const addonsString = addonsNames.join(', ');
    const productTitle = isCakeByKg 
        ? `${product.name} (${activeWeight} Kg)` 
        : product.name;

    const message = `
Olá! Me chamo *${form.customerName}*.
Gostaria de orçar o *${productTitle}*.

⚖️ *Tipo:* ${isCakeByKg ? 'Bolo por Kg' : 'Kit Festa'}
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

  // Determinar lista de recheios
  const fillingOptions = isCakeByKg 
    ? (product.availableFillings || []) 
    : KIT_FILLINGS_DEFAULT;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-brand-brown/50 bg-opacity-75 transition-opacity backdrop-blur-sm" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-brand-green/30">
          <div className="bg-brand-green px-4 py-3 flex justify-between items-center">
             <h3 className="text-lg leading-6 font-bold text-white font-cute" id="modal-title">
              {isCakeByKg ? 'Montar Bolo' : `Orçamento: ${product.name}`}
            </h3>
            <button onClick={onClose} className="text-white hover:text-green-100 transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="space-y-4">

              {/* Header Info para Bolo por Kg */}
              {isCakeByKg && (
                  <div className="bg-brand-cream/50 p-3 rounded-lg text-sm text-brand-brown mb-2">
                      <span className="font-bold">{product.name}</span>
                      <br/>
                      Preço da Categoria: <span className="font-bold text-brand-green">R$ {product.price.toFixed(2)} /kg</span>
                  </div>
              )}
              
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-brand-brown mb-1">Nome do Cliente <span className="text-brand-green">*</span></label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
                  value={form.customerName}
                  onChange={(e) => setForm({...form, customerName: e.target.value})}
                  placeholder="Seu nome completo"
                />
              </div>

               {/* Peso (Apenas para Bolo por Kg) */}
               {isCakeByKg && (
                <div>
                   <label className="block text-sm font-bold text-brand-brown mb-1">Peso Desejado (Kg) <span className="text-brand-green">*</span></label>
                   <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Scale className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="number"
                            step="0.5"
                            min="1"
                            className="focus:ring-brand-green focus:border-brand-green block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                            placeholder="Ex: 1.5"
                            value={form.weight}
                            onChange={(e) => setForm({...form, weight: parseFloat(e.target.value)})}
                        />
                   </div>
                   <p className="text-xs text-gray-500 mt-1">Peso mínimo recomendado: 1 Kg</p>
                </div>
               )}

              {/* Batter */}
              <div className="bg-brand-cream p-3 rounded-lg border border-brand-green/20">
                <label className="block text-sm font-bold text-brand-brown mb-1">Massa do Bolo</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
                  value={form.batter}
                  onChange={(e) => setForm({...form, batter: e.target.value})}
                >
                  <option value="">Selecione uma opção</option>
                  {CAKE_BATTERS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                
                {/* Avisos Dinâmicos de Massa */}
                {form.batter === 'Chocolate' && (
                  <div className="mt-2 text-xs flex items-start text-orange-600 font-semibold animate__animated animate__fadeIn">
                    <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0" />
                    ⚠️ Atenção: Somente com 1 dia de antecedência.
                  </div>
                )}
                {form.batter === 'Colorida' && (
                  <div className="mt-2 text-xs flex items-start text-brand-brown font-semibold animate__animated animate__fadeIn">
                     <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0 text-brand-green" />
                     <span>
                        ⚠️ Acréscimo de R$ 10,00 por kg.
                        <br/>
                        <span className="text-gray-500 font-normal">
                             Custo Extra: + R$ {((isCakeByKg ? (form.weight || 0) : kitWeight) * 10).toFixed(2)}
                        </span>
                     </span>
                  </div>
                )}
              </div>

              {/* Filling */}
              <div>
                <label className="block text-sm font-bold text-brand-brown mb-1">
                    {isCakeByKg ? 'Escolha o Recheio (Incluso no valor do Kg)' : 'Recheio Preferido'}
                </label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
                  value={form.filling}
                  onChange={(e) => setForm({...form, filling: e.target.value})}
                >
                  <option value="">Selecione uma opção</option>
                  {fillingOptions.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              {/* Addons */}
              <div>
                <label className="block text-sm font-bold text-brand-brown mb-2">Adicionais Extras</label>
                <div className="grid grid-cols-1 gap-2 bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                  {ADDONS.map(addon => (
                    <div key={addon.id} className="flex items-center">
                      <input
                        id={`addon-${addon.id}`}
                        type="checkbox"
                        className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded cursor-pointer"
                        checked={form.selectedAddons.includes(addon.id)}
                        onChange={() => handleAddonChange(addon.id)}
                      />
                      <label htmlFor={`addon-${addon.id}`} className="ml-2 block text-sm text-gray-700 cursor-pointer">
                        {addon.name} <span className="text-brand-green font-semibold">(+ R$ {addon.price.toFixed(2)})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-bold text-brand-brown mb-1">Observações</label>
                <textarea
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
                  value={form.notes}
                  onChange={(e) => setForm({...form, notes: e.target.value})}
                  placeholder="Detalhes extras..."
                />
              </div>

              {/* Total */}
              <div className="mt-4 p-4 bg-brand-cream rounded-lg border border-brand-green/30">
                <div className="flex justify-between items-center">
                  <span className="text-brand-brown font-medium">Valor Estimado:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-brand-green font-cute block">
                        R$ {calculateTotal().toFixed(2)}
                    </span>
                    {isCakeByKg && (
                        <span className="text-xs text-gray-500">
                             Ref. {form.weight} kg
                        </span>
                    )}
                  </div>
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
                form.customerName.trim() ? 'bg-brand-green hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
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