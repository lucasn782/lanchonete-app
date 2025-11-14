import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';

type Product = {
  id: string;
  name: string;
  price: number;
};

type State = {
  products: Product[];
  addProduct: (p: Omit<Product, 'id'>) => void;
  removeProduct: (id: string) => void;
  getById: (id: string) => Product | undefined;
};

export const useProductsStore = create<State>((set, get) => ({
  products: [],
  addProduct: (p) => set((s) => ({ products: [...s.products, { id: nanoid(), ...p }] })),
  removeProduct: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
  getById: (id) => get().products.find((p) => p.id === id),
}));
