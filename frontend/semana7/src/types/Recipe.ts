export interface Recipe {
  name: string;
  ingredients: string;
  time: string;
  type: "Entrada" | "Prato Principal" | "Sobremesa";
}
