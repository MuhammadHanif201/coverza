"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { site } from "@/lib/site";

export type CartItem = {
  /** Unique key: product + model + colour. */
  id: string;
  slug: string;
  name: string;
  model: string;
  color: string;
  hex: string;
  price: number;
  qty: number;
};

type State = { items: CartItem[]; ready: boolean };

type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; item: Omit<CartItem, "id"> }
  | { type: "qty"; id: string; qty: number }
  | { type: "remove"; id: string }
  | { type: "clear" };

const STORAGE_KEY = "coverza-cart";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { items: action.items, ready: true };
    case "add": {
      const id = `${action.item.slug}__${action.item.model}__${action.item.color}`;
      const existing = state.items.find((i) => i.id === id);
      const items = existing
        ? state.items.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + action.item.qty, 10) } : i))
        : [...state.items, { ...action.item, id }];
      return { ...state, items };
    }
    case "qty":
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.id ? { ...i, qty: Math.max(1, Math.min(action.qty, 10)) } : i)),
      };
    case "remove":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "clear":
      return { ...state, items: [] };
  }
}

type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  add: (item: Omit<CartItem, "id">) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], ready: false });

  useEffect(() => {
    let items: CartItem[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) items = JSON.parse(raw);
    } catch {
      /* storage unavailable — start with an empty cart */
    }
    dispatch({ type: "hydrate", items });
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* ignore */
    }
  }, [state]);

  const add = useCallback((item: Omit<CartItem, "id">) => dispatch({ type: "add", item }), []);
  const setQty = useCallback((id: string, qty: number) => dispatch({ type: "qty", id, qty }), []);
  const remove = useCallback((id: string) => dispatch({ type: "remove", id }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((n, i) => n + i.qty, 0);
    const subtotal = state.items.reduce((n, i) => n + i.qty * i.price, 0);
    const delivery = subtotal === 0 || subtotal >= site.freeDeliveryThreshold ? 0 : site.deliveryFee;
    return { items: state.items, ready: state.ready, count, subtotal, delivery, total: subtotal + delivery, add, setQty, remove, clear };
  }, [state, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
