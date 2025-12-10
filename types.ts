export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
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
}