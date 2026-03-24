export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "kit" | "cake" | "docinho" | "salgado"; // Diferencia Kit, Bolo por Kg, Docinhos e Salgados
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

  // Campos para Docinhos
  docinhoFlavor?: "brigadeiro" | "beijinho" | "meia-a-meia"; // Sabor do docinho
  brigadeirosCount?: number; // Quantidade de brigadeiros (para meia-a-meia)
  beijinhosCount?: number; // Quantidade de beijinhos (para meia-a-meia)
  docinhoQuantity?: number; // Quantidade de centos (multiplicador de 100)

  // Campos para Salgados
  salgadoQuantity?: number; // Quantidade de centos/porções
  salgadoFlavors?: string[]; // Sabores selecionados (para salgados assados e mini pizza)
  pizzaFlavors?: { [key: string]: number }; // Sabores com quantidades (para mini pizza)
}
