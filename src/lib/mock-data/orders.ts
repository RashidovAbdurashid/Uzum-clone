export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "AT_PICKUP_POINT"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED"
  | "RETURNED";

export type PaymentMethod = "CASH_ON_DELIVERY" | "CARD_ON_DELIVERY" | "CLICK" | "PAYME" | "UZUM_BANK" | "INSTALLMENT";

export type DeliveryMethod = "PICKUP_POINT" | "COURIER";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Ожидает подтверждения",
  CONFIRMED: "Подтверждён",
  PROCESSING: "Собирается",
  SHIPPED: "Передан в доставку",
  AT_PICKUP_POINT: "В пункте выдачи",
  DELIVERED: "Доставлен",
  COMPLETED: "Завершён",
  CANCELLED: "Отменён",
  RETURNED: "Возврат",
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  CASH_ON_DELIVERY: "Наличными при получении",
  CARD_ON_DELIVERY: "Картой при получении",
  CLICK: "Click",
  PAYME: "Payme",
  UZUM_BANK: "Uzum Bank",
  INSTALLMENT: "Рассрочка (Uzum Nasiya)",
};

export interface OrderItem {
  productId: string;
  variantId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderStatusHistoryEntry {
  status: OrderStatus;
  comment: string | null;
  createdAt: string; // ISO datetime
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "PENDING" | "PAID";
  deliveryMethod: DeliveryMethod;
  pickupPointId: string | null;
  address: string | null;
  note: string | null;
  statusHistory: OrderStatusHistoryEntry[];
  createdAt: string;
}
