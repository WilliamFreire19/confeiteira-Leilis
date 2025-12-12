export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'kit' | 'cake'; // Diferencia Kit de Bolo por Kg
  availableFillings?: string[]; // Lista de recheios específicos para este produto (se for bolo por kg)
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface OrderFormState {
  customerName: string;
  batter: string;
  filling: string;
  selectedAddons: string[];
  notes: string;
  weight?: number; // Peso digitado pelo usuário (apenas para bolos por kg)
}