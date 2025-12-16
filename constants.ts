import { Product, AddOn } from './types';

export const WHATSAPP_NUMBER = "556592555047";
export const ADDRESS_TEXT = "Rua C1, nº 22 Bairro Residencial Padova Cuiabá – MT";
export const WAZE_LINK = "https://waze.com/ul?q=Rua+C1+22+Bairro+Residencial+Padova+Cuiaba+MT&navigate=yes";
export const MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d960.9602123100738!2d-56.04984563044103!3d-15.546660199066222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x939db0c733b5720b%3A0xb06afc7c26e09dd9!2sR.%20C1%2C%2015-48%20-%20Res.%20P%C3%A1dova%2C%20Cuiab%C3%A1%20-%20MT%2C%2078056-348!5e0!3m2!1spt-BR!2sbr!4v1765910465812!5m2!1spt-BR!2sbr";

/* 
  LISTAS DE RECHEIOS POR FAIXA DE PREÇO
*/
const FILLINGS_65 = [
  "Creme", "Coco", "Baunilha", "Beijinho cremoso", "Brigadeiro cremoso", 
  "Mousse doce de leite", "Creme de pêssego", "Creme de morango", 
  "Creme de abacaxi", "Salada de frutas (morango, abacaxi, pêssego)", "Paçoca"
];

const FILLINGS_70 = [
  "Prestígio", "Ninho cremoso", "Chocolate cremoso (com raspas nobre)", 
  "Doce de leite", "Dois amores"
];

const FILLINGS_75 = [
  "Ninho com brigadeiro", "Doce de leite com ameixa", "Quatro leites", 
  "Sensação", "Danete", "Beijinho com abacaxi e ninho"
];

const FILLINGS_85 = [
  "Brigadeiro maracujá", "Sonho de valsa", "Beijinho com abacaxi", 
  "Baba de moça", "4 leites e Oreo", 
  "Mousse (Limão, Maracujá, Chocolate, Laka, Ninho, Morango)",
  "Ninho com geleia de morango", "4 leites com morango", "Ouro Branco"
];

const FILLINGS_90 = [
  "Olho de sogra (ameixa e damasco)", 
  "Delícia de morango (creme, raspas branco, ninho, nutella, alpino)"
];

const FILLINGS_95 = [
  "Floresta negra", "Kit Kat com morango", "Nutella com brigadeiro"
];

const FILLINGS_110 = [
  "Martha Rocha", "Nozes", "Kinder Bueno"
];

// RECHEIOS PADRÃO DOS KITS (FIXOS)
export const KIT_FILLINGS_DEFAULT = ["Creme de Coco", "Morango com creme", "Pêssego e creme", "Ninho cremoso", "Chocolate creme", "4 leites cremoso"];

export const PRODUCTS: Product[] = [
  // --- KITS FESTA ---
  { 
    id: 1, name: "Kit 01", description: "1 Kg bolo + 10 Doces", price: 70.00, 
    image: "/assets/kit-1.jpg", category: 'kit' 
  },
  { 
    id: 2, name: "Kit 02", description: "1 Kg bolo + 05 Brigadeiros + 05 Beijinhos + 20 Salgados", price: 85.00, 
    image: "/assets/kit-2.jpg", category: 'kit'
  },
  { 
    id: 3, name: "Kit 03", description: "1 Kg bolo + 7 Brigadeiros + 7 Beijinhos + 50 Salgados", price: 120.00, 
    image: "/assets/kit-3.jpg", category: 'kit'
  },
  { 
    id: 4, name: "Kit 04", description: "1 Kg bolo + 10 Brigadeiros + 10 Beijinhos + 70 Salgados", price: 190.00, 
    image: "/assets/kit-4.jpg", category: 'kit'
  },
  { 
    id: 5, name: "Kit 05", description: "2 Kg bolo + 20 Brigadeiros + 20 Beijinhos + 200 Salgados", price: 260.00, 
    image: "/assets/kit-5.jpg", category: 'kit'
  },
  { 
    id: 6, name: "Kit 06", description: "3 Kg bolo + 25 Brigadeiros + 25 Beijinhos + 300 Salgados", price: 350.00, 
    image: "/assets/kit-6.jpg", category: 'kit'
  },
  { 
    id: 7, name: "Kit 07", description: "4 Kg bolo + 50 Brigadeiros + 50 Beijinhos + 400 Salgados", price: 450.00, 
    image: "/assets/kit-7.jpg", category: 'kit'
  },
  { 
    id: 8, name: "Kit 08", description: "5 Kg bolo + 70 Brigadeiros + 70 Beijinhos + 400 Salgados", price: 600.00, 
    image: "/assets/kit-8.jpg", category: 'kit'
  },
  { 
    id: 9, name: "Kit 09", description: "6 Kg bolo + 100 Brigadeiros + 100 Beijinhos + 700 Salgados", price: 900.00, 
    image: "/assets/kit-9.jpg", category: 'kit'
  },
  { 
    id: 10, name: "Kit 10", description: "7 Kg bolo + 150 Brigadeiros + 150 Beijinhos + 800 Salgados", price: 1050.00, 
    image: "/assets/kit-10.jpg", category: 'kit'
  },

  // --- BOLOS POR KG (Representados como Cards de Categoria) ---
  // Nota: Você pode adicionar imagens genéricas de bolo ou específicas para cada categoria
  {
    id: 101, name: "Linha Tradicional", description: "Recheios clássicos e deliciosos.", price: 65.00,
    image: "/assets/bolo-65.jpg", category: 'cake', availableFillings: FILLINGS_65
  },
  {
    id: 102, name: "Linha Especial", description: "Sabores marcantes como Prestígio e Ninho.", price: 70.00,
    image: "/assets/bolo-70.jpg", category: 'cake', availableFillings: FILLINGS_70
  },
  {
    id: 103, name: "Linha Premium", description: "Combinações perfeitas como Ninho com Brigadeiro.", price: 75.00,
    image: "/assets/bolo-75.jpg", category: 'cake', availableFillings: FILLINGS_75
  },
  {
    id: 104, name: "Linha Gourmet", description: "Recheios sofisticados, Mousses e Frutas.", price: 85.00,
    image: "/assets/bolo-85.jpg", category: 'cake', availableFillings: FILLINGS_85
  },
  {
    id: 105, name: "Linha Gold", description: "Olho de Sogra e Delícia de Morango.", price: 90.00,
    image: "/assets/bolo-90.jpg", category: 'cake', availableFillings: FILLINGS_90
  },
  {
    id: 106, name: "Linha Exclusive", description: "Floresta Negra, Kit Kat e Nutella.", price: 95.00,
    image: "/assets/bolo-95.jpg", category: 'cake', availableFillings: FILLINGS_95
  },
  {
    id: 107, name: "Linha Supreme", description: "Martha Rocha, Nozes e Kinder Bueno.", price: 110.00,
    image: "/assets/bolo-110.jpg", category: 'cake', availableFillings: FILLINGS_110
  }
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
