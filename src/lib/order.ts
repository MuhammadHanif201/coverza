import type { CartItem } from "@/lib/cart";

export type PaymentMethod = "cod" | "jazzcash" | "easypaisa" | "card";

export type Order = {
  number: string;
  createdAt: string;
  name: string;
  phone: string;
  city: string;
  area: string;
  address: string;
  notes: string;
  payment: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
};

export const paymentLabels: Record<PaymentMethod, string> = {
  cod: "Cash on Delivery",
  jazzcash: "JazzCash",
  easypaisa: "Easypaisa",
  card: "Debit / Credit Card",
};

export const ORDER_KEY = "coverza-last-order";

/** Frontend-only: keeps the last order in the browser until a backend exists. */
export function saveOrder(order: Order) {
  try {
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}

export function newOrderNumber() {
  return `CVZ-${Math.floor(10000 + Math.random() * 90000)}`;
}

export const cities = [
  "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta",
  "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur", "Sargodha", "Sukkur", "Abbottabad", "Other",
];
