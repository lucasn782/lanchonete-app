import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';
import { useProductsStore } from './productsStore';

export type SaleItem = { id: string; qty: number };
export type Sale = {
  id: string;
  date: string; // YYYY-MM-DD
  items: SaleItem[];
  customer?: string;
  total: number;
};

type State = {
  sales: Sale[];
  addSale: (sale: { items: SaleItem[]; customer?: string }) => void;
  getTodaySummary: () => { totalSales: number; itemsSold: number; revenue: number };
  getRevenueByDay: () => { date: string; revenue: number }[];
  getTopProducts: (n: number) => { productId: string; qty: number }[];
};

const todayStr = () => new Date().toISOString().slice(0, 10);

export const useSalesStore = create<State>((set, get) => ({
  sales: [],
  addSale: ({ items, customer }) => {
    const products = useProductsStore.getState().products;
    const total = items.reduce((sum, it) => {
      const p = products.find((pp) => pp.id === it.id);
      return sum + (p ? p.price * it.qty : 0);
    }, 0);
    const sale: Sale = { id: nanoid(), date: todayStr(), items, customer, total };
    set((s) => ({ sales: [...s.sales, sale] }));
  },
  getTodaySummary: () => {
    const sales = get().sales.filter((s) => s.date === todayStr());
    const totalSales = sales.length;
    const itemsSold = sales.reduce((acc, s) => acc + s.items.reduce((a, i) => a + i.qty, 0), 0);
    const revenue = sales.reduce((acc, s) => acc + s.total, 0);
    return { totalSales, itemsSold, revenue };
  },
  getRevenueByDay: () => {
    const map = new Map<string, number>();
    get().sales.forEach((s) => map.set(s.date, (map.get(s.date) || 0) + s.total));
    return Array.from(map.entries()).map(([date, revenue]) => ({ date, revenue })).sort((a, b) => a.date.localeCompare(b.date));
  },
  getTopProducts: (n: number) => {
    const tally = new Map<string, number>();
    get().sales.forEach((s) => s.items.forEach((i) => tally.set(i.id, (tally.get(i.id) || 0) + i.qty)));
    return Array.from(tally.entries())
      .map(([productId, qty]) => ({ productId, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, n);
  },
}));
