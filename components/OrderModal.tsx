import React, { useState, useEffect } from "react";
import { X, Check, AlertTriangle, Scale, Plus, Minus } from "lucide-react";
import { Product, OrderFormState } from "../types";
import {
  ADDONS,
  CAKE_BATTERS,
  KIT_FILLINGS_DEFAULT,
  WHATSAPP_NUMBER,
} from "../constants";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const isCakeByKg = product.category === "cake";
  const isDocinho = product.category === "docinho";
  const isSalgado = product.category === "salgado";

  const [form, setForm] = useState<OrderFormState>({
    customerName: "",
    batter: "",
    filling: "",
    selectedAddons: [],
    notes: "",
    weight: isCakeByKg ? 1.5 : 1,
    docinhoFlavor: "brigadeiro",
    docinhoQuantity: 1,
    brigadeirosCount: 50,
    beijinhosCount: 50,
    salgadoQuantity: 1,
    salgadoFlavors: [],
    pizzaFlavors: {
      Calabresa: 0,
      Frango: 0,
      "Pizza (Presunto, Queijo, Azeitona)": 0,
      Queijo: 0,
    },
  });

  const [kitWeight, setKitWeight] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      let initialWeight = 1;
      if (!isCakeByKg) {
        const weightRegex = /(\d+)\s*Kg/i;
        const match =
          product.description.match(weightRegex) ||
          product.name.match(weightRegex);
        if (match && match[1]) {
          initialWeight = parseInt(match[1], 10);
        }
      }

      setKitWeight(initialWeight);
      setForm({
        customerName: "",
        batter: "",
        filling: "",
        selectedAddons: [],
        notes: "",
        weight: initialWeight,
        docinhoFlavor: "brigadeiro",
        docinhoQuantity: 1,
        brigadeirosCount: 50,
        beijinhosCount: 50,
        salgadoQuantity: 1,
        salgadoFlavors: [],
        pizzaFlavors: {
          Calabresa: 0,
          Frango: 0,
          "Pizza (Presunto, Queijo, Azeitona)": 0,
          Queijo: 0,
        },
      });
    }
  }, [isOpen, product, isCakeByKg]);

  const handleAddonChange = (addonId: string) => {
    setForm((prev) => {
      const isSelected = prev.selectedAddons.includes(addonId);
      if (isSelected) {
        return {
          ...prev,
          selectedAddons: prev.selectedAddons.filter((id) => id !== addonId),
        };
      } else {
        return { ...prev, selectedAddons: [...prev.selectedAddons, addonId] };
      }
    });
  };

  const handleSalgadoFlavorChange = (flavor: string) => {
    setForm((prev) => {
      const isSelected = prev.salgadoFlavors?.includes(flavor);
      if (isSelected) {
        return {
          ...prev,
          salgadoFlavors:
            prev.salgadoFlavors?.filter((f) => f !== flavor) || [],
        };
      } else {
        const newFlavors = [...(prev.salgadoFlavors || []), flavor];
        return { ...prev, salgadoFlavors: newFlavors };
      }
    });
  };

  const calculateTotal = () => {
    if (isDocinho) {
      return (form.docinhoQuantity || 1) * product.price;
    }

    if (isSalgado) {
      if (product.id === 303) {
        const totalPizzas = Object.values(form.pizzaFlavors || {}).reduce(
          (a, b) => a + b,
          0,
        );
        return totalPizzas * product.price;
      }
      return (form.salgadoQuantity || 1) * product.price;
    }

    const activeWeight = isCakeByKg ? form.weight || 0 : kitWeight;
    let total = 0;

    if (isCakeByKg) {
      total = activeWeight * product.price;
    } else {
      total = product.price;
    }

    const addonsTotal = form.selectedAddons.reduce((sum, addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);
    total += addonsTotal;

    if (form.batter === "Colorida") {
      total += activeWeight * 10;
    }

    return total;
  };

  const handleSendToWhatsApp = () => {
    if (!form.customerName.trim()) {
      alert("Por favor, preencha seu nome.");
      return;
    }

    if (isDocinho && !form.docinhoFlavor) {
      alert("Por favor, selecione um sabor para o docinho.");
      return;
    }

    if (isSalgado && product.id === 302) {
      if (!form.salgadoFlavors || form.salgadoFlavors.length === 0) {
        alert("Por favor, selecione pelo menos 1 sabor.");
        return;
      }
      if (form.salgadoFlavors.length > 5) {
        alert("Por favor, selecione no máximo 5 sabores.");
        return;
      }
    }

    if (isSalgado && product.id === 303) {
      const totalPizzas = Object.values(form.pizzaFlavors || {}).reduce(
        (a, b) => a + b,
        0,
      );
      if (totalPizzas === 0) {
        alert("Por favor, selecione pelo menos 1 mini pizza.");
        return;
      }
    }

    let message = `Olá! Me chamo *${form.customerName}*.
Gostaria de orçar o *${product.name}*.`;

    if (isDocinho) {
      message += `

*Sabor:* ${form.docinhoFlavor === "brigadeiro" ? "Brigadeiro" : form.docinhoFlavor === "beijinho" ? "Beijinho" : "Meia-a-Meia"}`;

      if (form.docinhoFlavor === "meia-a-meia") {
        message += `
   - Brigadeiro: ${form.brigadeirosCount} unidades
   - Beijinho: ${form.beijinhosCount} unidades`;
      }

      message += `
*Quantidade:* ${form.docinhoQuantity} cento(s) (${(form.docinhoQuantity || 1) * 100} unidades)
*Valor Estimado:* R$ ${calculateTotal().toFixed(2)}`;
    } else if (isSalgado) {
      if (product.id === 301) {
        message += `

*Quantidade:* ${form.salgadoQuantity} cento(s) (${(form.salgadoQuantity || 1) * 100} unidades)`;
      } else if (product.id === 302) {
        message += `

*Sabores Selecionados:* ${form.salgadoFlavors?.join(", ")}
*Quantidade:* ${form.salgadoQuantity} cento(s) (${(form.salgadoQuantity || 1) * 100} unidades)`;
      } else if (product.id === 303) {
        const pizzaDetails = Object.entries(form.pizzaFlavors || {})
          .filter(([_, qty]) => qty > 0)
          .map(([flavor, qty]) => `${flavor}: ${qty}`)
          .join("\n   - ");
        message += `

*Quantidade por Sabor:*
   - ${pizzaDetails}`;
      } else {
        message += `

*Quantidade:* ${form.salgadoQuantity} unidade(s)`;
      }

      message += `
*Valor Estimado:* R$ ${calculateTotal().toFixed(2)}`;
    } else {
      const activeWeight = isCakeByKg ? form.weight : kitWeight;
      const addonsNames = form.selectedAddons
        .map((id) => ADDONS.find((a) => a.id === id)?.name)
        .filter(Boolean);

      let extraCostsText = "";
      if (form.batter === "Colorida") {
        extraCostsText = ` (+ R$ ${(activeWeight! * 10).toFixed(2)} ref. Massa Colorida ${activeWeight}kg)`;
      }

      const addonsString = addonsNames.join(", ");

      message += `

*Tipo:* ${isCakeByKg ? "Bolo por Kg" : "Kit Festa"}
*Massa:* ${form.batter || "A definir"}${extraCostsText}
*Recheio:* ${form.filling || "A definir"}
*Adicionais:* ${addonsString || "Nenhum"}`;
    }

    message += `

*Obs:* ${form.notes || "Nenhuma"}`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(url, "_blank");
  };

  if (!isOpen) return null;

  const fillingOptions = isCakeByKg
    ? product.availableFillings || []
    : KIT_FILLINGS_DEFAULT;

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-brand-brown/50 bg-opacity-75 transition-opacity backdrop-blur-sm"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-brand-green/30">
          <div className="bg-brand-green px-4 py-3 flex justify-between items-center">
            <h3
              className="text-lg leading-6 font-bold text-white font-cute"
              id="modal-title"
            >
              {isDocinho
                ? "Orçamento: Docinhos"
                : isSalgado
                  ? "Orçamento: Salgados"
                  : isCakeByKg
                    ? "Montar Bolo"
                    : `Orçamento: ${product.name}`}
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-green-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="space-y-4">
              {/* Header Info */}
              {(isDocinho || isSalgado) && (
                <div className="bg-brand-cream/50 p-3 rounded-lg text-sm text-brand-brown mb-2">
                  <span className="font-bold">{product.name}</span>
                  <br />
                  Preço:{" "}
                  <span className="font-bold text-brand-green">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-brand-brown mb-1">
                  Nome do Cliente <span className="text-brand-green">*</span>
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
                  value={form.customerName}
                  onChange={(e) =>
                    setForm({ ...form, customerName: e.target.value })
                  }
                  placeholder="Seu nome completo"
                />
              </div>

              {/* ===== SEÇÃO DOCINHOS ===== */}
              {isDocinho && (
                <>
                  {/* Sabor do Docinho */}
                  <div className="bg-brand-cream p-3 rounded-lg border border-brand-green/20">
                    <label className="block text-sm font-bold text-brand-brown mb-2">
                      Sabor Desejado <span className="text-brand-green">*</span>
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="brigadeiro"
                          name="docinho-flavor"
                          value="brigadeiro"
                          checked={form.docinhoFlavor === "brigadeiro"}
                          onChange={() =>
                            setForm({
                              ...form,
                              docinhoFlavor: "brigadeiro" as any,
                            })
                          }
                          className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 cursor-pointer"
                        />
                        <label
                          htmlFor="brigadeiro"
                          className="ml-2 block text-sm text-gray-700 cursor-pointer font-medium"
                        >
                          Brigadeiro
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="beijinho"
                          name="docinho-flavor"
                          value="beijinho"
                          checked={form.docinhoFlavor === "beijinho"}
                          onChange={() =>
                            setForm({
                              ...form,
                              docinhoFlavor: "beijinho" as any,
                            })
                          }
                          className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 cursor-pointer"
                        />
                        <label
                          htmlFor="beijinho"
                          className="ml-2 block text-sm text-gray-700 cursor-pointer font-medium"
                        >
                          Beijinho
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="meia-a-meia"
                          name="docinho-flavor"
                          value="meia-a-meia"
                          checked={form.docinhoFlavor === "meia-a-meia"}
                          onChange={() =>
                            setForm({
                              ...form,
                              docinhoFlavor: "meia-a-meia" as any,
                            })
                          }
                          className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 cursor-pointer"
                        />
                        <label
                          htmlFor="meia-a-meia"
                          className="ml-2 block text-sm text-gray-700 cursor-pointer font-medium"
                        >
                          Meia-a-Meia (Brigadeiro + Beijinho)
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Distribuição para Meia-a-Meia */}
                  {form.docinhoFlavor === "meia-a-meia" && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <label className="block text-sm font-bold text-brand-brown mb-2">
                        Distribuição (100 unidades por cento)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">
                            Brigadeiros
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
                            value={form.brigadeirosCount || 50}
                            onChange={(e) => {
                              const valor = Math.min(
                                100,
                                parseInt(e.target.value) || 0,
                              );
                              setForm({
                                ...form,
                                brigadeirosCount: valor,
                                beijinhosCount: 100 - valor,
                              });
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">
                            Beijinhos
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
                            value={form.beijinhosCount || 50}
                            onChange={(e) => {
                              const valor = Math.min(
                                100,
                                parseInt(e.target.value) || 0,
                              );
                              setForm({
                                ...form,
                                beijinhosCount: valor,
                                brigadeirosCount: 100 - valor,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quantidade de Centos */}
                  <div>
                    <label className="block text-sm font-bold text-brand-brown mb-1">
                      Quantidade <span className="text-brand-green">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            docinhoQuantity: Math.max(
                              1,
                              (form.docinhoQuantity || 1) - 1,
                            ),
                          })
                        }
                        className="p-2 bg-brand-green/20 hover:bg-brand-green/30 rounded-md transition-colors text-brand-green"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus size={18} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm text-center"
                        value={form.docinhoQuantity || 1}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            docinhoQuantity: parseInt(e.target.value) || 1,
                          })
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            docinhoQuantity: (form.docinhoQuantity || 1) + 1,
                          })
                        }
                        className="p-2 bg-brand-green/20 hover:bg-brand-green/30 rounded-md transition-colors text-brand-green"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus size={18} />
                      </button>
                      <span className="text-sm text-gray-600 font-medium ml-2">
                        cento(s)
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      1 cento = 100 unidades
                    </p>
                  </div>
                </>
              )}

              {/* ===== SEÇÃO SALGADOS ===== */}
              {isSalgado && (
                <>
                  {/* Salgados Frito Misto */}
                  {product.id === 301 && (
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                      <p className="text-sm text-gray-700">
                        <span className="font-bold text-brand-brown">
                          Salgados Frito Misto:
                        </span>{" "}
                        Variedade de salgados fritos em óleo.
                      </p>
                    </div>
                  )}

                  {/* Sabores para Salgados Assados */}
                  {product.id === 302 && (
                    <div className="bg-brand-cream p-3 rounded-lg border border-brand-green/20">
                      <label className="block text-sm font-bold text-brand-brown mb-2">
                        Selecione 3 a 5 Sabores Variados{" "}
                        <span className="text-brand-green">*</span>
                      </label>
                      <div className="space-y-2">
                        {[
                          "Coxinha",
                          "Pastel",
                          "Risole",
                          "Enroladinho de Queijo",
                          "Bolinhas de Carne",
                        ].map((sabor) => (
                          <div key={sabor} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`salgado-${sabor}`}
                              checked={
                                form.salgadoFlavors?.includes(sabor) || false
                              }
                              onChange={() => handleSalgadoFlavorChange(sabor)}
                              className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded cursor-pointer"
                            />
                            <label
                              htmlFor={`salgado-${sabor}`}
                              className="ml-2 block text-sm text-gray-700 cursor-pointer"
                            >
                              {sabor}
                            </label>
                          </div>
                        ))}
                      </div>
                      {form.salgadoFlavors &&
                        form.salgadoFlavors.length > 0 && (
                          <p className="text-xs text-gray-600 mt-2">
                            Sabores selecionados: {form.salgadoFlavors.length}/5
                          </p>
                        )}
                    </div>
                  )}

                  {/* Quantidades por Sabor para Mini Pizza */}
                  {product.id === 303 && (
                    <div className="bg-brand-cream p-3 rounded-lg border border-brand-green/20">
                      <label className="block text-sm font-bold text-brand-brown mb-3">
                        Quantidade por Sabor{" "}
                        <span className="text-brand-green">*</span>
                      </label>
                      <div className="space-y-2">
                        {Object.keys(form.pizzaFlavors || {}).map((sabor) => (
                          <div
                            key={sabor}
                            className="flex items-center justify-between"
                          >
                            <label className="text-sm text-gray-700">
                              {sabor}
                            </label>
                            <input
                              type="number"
                              min="0"
                              className="w-16 border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
                              value={form.pizzaFlavors?.[sabor] || 0}
                              onChange={(e) => {
                                setForm({
                                  ...form,
                                  pizzaFlavors: {
                                    ...form.pizzaFlavors,
                                    [sabor]: parseInt(e.target.value) || 0,
                                  },
                                });
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantidade de Centos para Salgados Frito/Assado */}
                  {(product.id === 301 || product.id === 302) && (
                    <div>
                      <label className="block text-sm font-bold text-brand-brown mb-1">
                        Quantidade <span className="text-brand-green">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              salgadoQuantity: Math.max(
                                1,
                                (form.salgadoQuantity || 1) - 1,
                              ),
                            })
                          }
                          className="p-2 bg-brand-green/20 hover:bg-brand-green/30 rounded-md transition-colors text-brand-green"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus size={18} />
                        </button>
                        <input
                          type="number"
                          min="1"
                          className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm text-center"
                          value={form.salgadoQuantity || 1}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              salgadoQuantity: parseInt(e.target.value) || 1,
                            })
                          }
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              salgadoQuantity: (form.salgadoQuantity || 1) + 1,
                            })
                          }
                          className="p-2 bg-brand-green/20 hover:bg-brand-green/30 rounded-md transition-colors text-brand-green"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus size={18} />
                        </button>
                        <span className="text-sm text-gray-600 font-medium ml-2">
                          cento(s)
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        1 cento = 100 unidades
                      </p>
                    </div>
                  )}

                  {/* Quantidade para Tortas */}
                  {(product.id === 304 || product.id === 305) && (
                    <div>
                      <label className="block text-sm font-bold text-brand-brown mb-1">
                        Quantidade <span className="text-brand-green">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              salgadoQuantity: Math.max(
                                1,
                                (form.salgadoQuantity || 1) - 1,
                              ),
                            })
                          }
                          className="p-2 bg-brand-green/20 hover:bg-brand-green/30 rounded-md transition-colors text-brand-green"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus size={18} />
                        </button>
                        <input
                          type="number"
                          min="1"
                          className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm text-center"
                          value={form.salgadoQuantity || 1}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              salgadoQuantity: parseInt(e.target.value) || 1,
                            })
                          }
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              salgadoQuantity: (form.salgadoQuantity || 1) + 1,
                            })
                          }
                          className="p-2 bg-brand-green/20 hover:bg-brand-green/30 rounded-md transition-colors text-brand-green"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus size={18} />
                        </button>
                        <span className="text-sm text-gray-600 font-medium ml-2">
                          unidade(s)
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Peso (Apenas para Bolo por Kg) */}
              {isCakeByKg && (
                <div>
                  <label className="block text-sm font-bold text-brand-brown mb-1">
                    Peso Desejado (Kg){" "}
                    <span className="text-brand-green">*</span>
                  </label>
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
                      onChange={(e) =>
                        setForm({ ...form, weight: parseFloat(e.target.value) })
                      }
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Peso mínimo recomendado: 1 Kg
                  </p>
                </div>
              )}

              {/* Batter */}
              {!isDocinho && !isSalgado && (
                <div className="bg-brand-cream p-3 rounded-lg border border-brand-green/20">
                  <label className="block text-sm font-bold text-brand-brown mb-1">
                    Massa do Bolo
                  </label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
                    value={form.batter}
                    onChange={(e) =>
                      setForm({ ...form, batter: e.target.value })
                    }
                  >
                    <option value="">Selecione uma opção</option>
                    {CAKE_BATTERS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>

                  {form.batter === "Chocolate" && (
                    <div className="mt-2 text-xs flex items-start text-orange-600 font-semibold">
                      <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0" />
                      ⚠️ Atenção: Somente com 1 dia de antecedência.
                    </div>
                  )}
                  {form.batter === "Colorida" && (
                    <div className="mt-2 text-xs flex items-start text-brand-brown font-semibold">
                      <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0 text-brand-green" />
                      <span>
                        ⚠️ Acréscimo de R$ 10,00 por kg.
                        <br />
                        <span className="text-gray-500 font-normal">
                          Custo Extra: + R${" "}
                          {(
                            (isCakeByKg ? form.weight || 0 : kitWeight) * 10
                          ).toFixed(2)}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Filling */}
              {!isDocinho && !isSalgado && (
                <div>
                  <label className="block text-sm font-bold text-brand-brown mb-1">
                    {isCakeByKg
                      ? "Escolha o Recheio (Incluso no valor do Kg)"
                      : "Recheio Preferido"}
                  </label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
                    value={form.filling}
                    onChange={(e) =>
                      setForm({ ...form, filling: e.target.value })
                    }
                  >
                    <option value="">Selecione uma opção</option>
                    {fillingOptions.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Addons */}
              {!isDocinho && !isSalgado && (
                <div>
                  <label className="block text-sm font-bold text-brand-brown mb-2">
                    Adicionais Extras
                  </label>
                  <div className="grid grid-cols-1 gap-2 bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                    {ADDONS.map((addon) => (
                      <div key={addon.id} className="flex items-center">
                        <input
                          id={`addon-${addon.id}`}
                          type="checkbox"
                          className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded cursor-pointer"
                          checked={form.selectedAddons.includes(addon.id)}
                          onChange={() => handleAddonChange(addon.id)}
                        />
                        <label
                          htmlFor={`addon-${addon.id}`}
                          className="ml-2 block text-sm text-gray-700 cursor-pointer"
                        >
                          {addon.name}{" "}
                          <span className="text-brand-green font-semibold">
                            (+ R$ {addon.price.toFixed(2)})
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-bold text-brand-brown mb-1">
                  Observações
                </label>
                <textarea
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Detalhes extras ou preferências..."
                />
              </div>

              {/* Total */}
              <div className="mt-4 p-4 bg-brand-cream rounded-lg border border-brand-green/30">
                <div className="flex justify-between items-center">
                  <span className="text-brand-brown font-medium">
                    Valor Estimado:
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-brand-green font-cute block">
                      R$ {calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
            <button
              onClick={handleSendToWhatsApp}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-green text-base font-bold text-white hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green sm:ml-3 sm:w-auto sm:text-sm transition-colors font-cute"
            >
              <Check className="w-5 h-5 mr-2" />
              Enviar ao WhatsApp
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors font-cute"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
