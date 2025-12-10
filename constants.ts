import { Product, AddOn } from './types';

export const WHATSAPP_NUMBER = "556592555047";

export const PRODUCTS: Product[] = [
  { id: 1, name: "Kit 01", description: "1 Kg bolo + 10 Doces", price: 70.00 },
  { id: 2, name: "Kit 02", description: "1 Kg bolo + 05 Brigadeiros + 05 Beijinhos + 20 Salgados", price: 85.00 },
  { id: 3, name: "Kit 03", description: "1 Kg bolo + 7 Brigadeiros + 7 Beijinhos + 50 Salgados", price: 120.00 },
  { id: 4, name: "Kit 04", description: "1 Kg bolo + 10 Brigadeiros + 10 Beijinhos + 70 Salgados", price: 190.00 },
  { id: 5, name: "Kit 05", description: "2 Kg bolo + 20 Brigadeiros + 20 Beijinhos + 200 Salgados", price: 260.00 },
  { id: 6, name: "Kit 06", description: "3 Kg bolo + 25 Brigadeiros + 25 Beijinhos + 300 Salgados", price: 350.00 },
  { id: 7, name: "Kit 07", description: "4 Kg bolo + 50 Brigadeiros + 50 Beijinhos + 400 Salgados", price: 450.00 },
  { id: 8, name: "Kit 08", description: "5 Kg bolo + 70 Brigadeiros + 70 Beijinhos + 400 Salgados", price: 600.00 },
  { id: 9, name: "Kit 09", description: "6 Kg bolo + 100 Brigadeiros + 100 Beijinhos + 700 Salgados", price: 900.00 },
  { id: 10, name: "Kit 10", description: "7 Kg bolo + 150 Brigadeiros + 150 Beijinhos + 800 Salgados", price: 1050.00 },
];

// Massa Colorida removida daqui pois tem lógica de preço dinâmica
export const ADDONS: AddOn[] = [
  { id: 'topper_simples', name: 'Topper Simples', price: 30.00 },
  { id: 'topper_3d', name: 'Topper 3D', price: 50.00 },
  { id: 'papel_arroz', name: 'Papel Arroz', price: 20.00 },
  { id: 'raspas', name: 'Raspas de Chocolate Nobre', price: 8.00 },
  { id: 'geleia', name: 'Geleia', price: 12.00 },
  { id: 'glitter', name: 'Glitter', price: 8.00 },
];

export const CAKE_BATTERS = ["Branca", "Chocolate", "Colorida"];
export const CAKE_FILLINGS = ["Ninho", "Brigadeiro", "Coco", "Doce de Leite", "Abacaxi", "Morango"];