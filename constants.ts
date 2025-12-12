import { Product, AddOn } from './types';

export const WHATSAPP_NUMBER = "556592555047";

/* 
  =====================================================================================
  COMO ADICIONAR SUAS IMAGENS:
  1. Coloque suas fotos na pasta 'public/assets' ou 'assets'.
  2. Abaixo, no campo 'image', coloque o nome exato do arquivo (ex: "assets/kit-1.jpg").
  =====================================================================================
*/

export const PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "Kit 01", 
    description: "1 Kg bolo + 10 Doces", 
    price: 70.00,
    // EDITE AQUI O CAMINHO DA IMAGEM DO KIT 1:
    image: "/assets/kit-1.jpg" 
  },
  { 
    id: 2, 
    name: "Kit 02", 
    description: "1 Kg bolo + 05 Brigadeiros + 05 Beijinhos + 20 Salgados", 
    price: 85.00,
    // EDITE AQUI O CAMINHO DA IMAGEM DO KIT 2:
    image: "assets/kit-2.jpg"
  },
  { 
    id: 3, 
    name: "Kit 03", 
    description: "1 Kg bolo + 7 Brigadeiros + 7 Beijinhos + 50 Salgados", 
    price: 120.00,
    // EDITE AQUI O CAMINHO DA IMAGEM DO KIT 3:
    image: "assets/kit-3.jpg"
  },
  { 
    id: 4, 
    name: "Kit 04", 
    description: "1 Kg bolo + 10 Brigadeiros + 10 Beijinhos + 70 Salgados", 
    price: 190.00,
    image: "assets/kit-4.jpg"
  },
  { 
    id: 5, 
    name: "Kit 05", 
    description: "2 Kg bolo + 20 Brigadeiros + 20 Beijinhos + 200 Salgados", 
    price: 260.00,
    image: "assets/kit-5.jpg"
  },
  { 
    id: 6, 
    name: "Kit 06", 
    description: "3 Kg bolo + 25 Brigadeiros + 25 Beijinhos + 300 Salgados", 
    price: 350.00,
    image: "assets/kit-6.jpg"
  },
  { 
    id: 7, 
    name: "Kit 07", 
    description: "4 Kg bolo + 50 Brigadeiros + 50 Beijinhos + 400 Salgados", 
    price: 450.00,
    image: "assets/kit-7.jpg"
  },
  { 
    id: 8, 
    name: "Kit 08", 
    description: "5 Kg bolo + 70 Brigadeiros + 70 Beijinhos + 400 Salgados", 
    price: 600.00,
    image: "assets/kit-8.jpg"
  },
  { 
    id: 9, 
    name: "Kit 09", 
    description: "6 Kg bolo + 100 Brigadeiros + 100 Beijinhos + 700 Salgados", 
    price: 900.00,
    image: "assets/kit-9.jpg"
  },
  { 
    id: 10, 
    name: "Kit 10", 
    description: "7 Kg bolo + 150 Brigadeiros + 150 Beijinhos + 800 Salgados", 
    price: 1050.00,
    image: "assets/kit-10.jpg"
  },
];

export const ADDONS: AddOn[] = [
  { id: 'topper_simples', name: 'Topper Simples', price: 25.00 },
  { id: 'topper_3d', name: 'Topper 3D', price: 55.00 },
  { id: 'papel_arroz', name: 'Papel Arroz', price: 20.00 },
  { id: 'raspas', name: 'Raspas de Chocolate Nobre', price: 10.00 },
  { id: 'geleia', name: 'Geleia', price: 12.00 },
  { id: 'glitter', name: 'Glitter', price: 8.00 },
];

export const CAKE_BATTERS = ["Branca", "Chocolate", "Colorida"];
export const CAKE_FILLINGS = ["Creme de Coco", "Morango com creme", "Pêssego e creme", "NInho cremoso", "Chocolate creme", "4 leites cremoso"];