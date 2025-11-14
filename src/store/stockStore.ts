import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';

type StockItem = {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  min: number; // threshold for low stock
};

type State = {
  items: StockItem[];
  addStockItem: (p: Omit<StockItem, 'id'>) => void;
  updateQuantity: (id: string, qty: number) => void;
  getLowStock: () => StockItem[];
};

export const useStockStore = create<State>((set, get) => ({
  items: [],
  addStockItem: (p) => set((s) => ({ items: [...s.items, { id: nanoid(), ...p }] })),
  updateQuantity: (id, qty) => set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, quantity: Math.max(0, qty) } : i)) })),
  getLowStock: () => get().items.filter((i) => i.quantity <= i.min),
}));
