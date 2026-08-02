import type { Order, OrderItem, PaymentMethod, DeliveryMethod, OrderStatus } from "./mock-data/orders";

const globalForOrders = globalThis as unknown as {
  mockOrders: Map<string, Order> | undefined;
};

const orders = globalForOrders.mockOrders ?? new Map<string, Order>();
if (process.env.NODE_ENV !== "production") globalForOrders.mockOrders = orders;

let nextOrderSeq = 10001;

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  return `UZM-${year}-${nextOrderSeq++}`;
}

export interface CreateOrderInput {
  userId: string;
  items: OrderItem[];
  deliveryMethod: DeliveryMethod;
  pickupPointId: string | null;
  address: string | null;
  paymentMethod: PaymentMethod;
  note: string | null;
}

const DELIVERY_FEE_COURIER = 25000;

export const ordersStore = {
  create(input: CreateOrderInput): Order {
    const subtotal = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = input.deliveryMethod === "COURIER" ? DELIVERY_FEE_COURIER : 0;
    const now = new Date().toISOString();

    const order: Order = {
      id: `order_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      orderNumber: generateOrderNumber(),
      userId: input.userId,
      status: "PENDING",
      items: input.items,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      paymentMethod: input.paymentMethod,
      paymentStatus: "PENDING",
      deliveryMethod: input.deliveryMethod,
      pickupPointId: input.pickupPointId,
      address: input.address,
      note: input.note,
      statusHistory: [{ status: "PENDING", comment: "Заказ создан", createdAt: now }],
      createdAt: now,
    };

    orders.set(order.id, order);
    return order;
  },

  findById(id: string): Order | null {
    return orders.get(id) ?? null;
  },

  findByUser(userId: string): Order[] {
    return [...orders.values()].filter((o) => o.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  /** Admin/seller only - customers never see other people's orders. */
  listAllForAdmin(): Order[] {
    return [...orders.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  updateStatus(orderId: string, status: OrderStatus, comment?: string): Order | null {
    const order = orders.get(orderId);
    if (!order) return null;
    order.status = status;
    order.statusHistory.push({ status, comment: comment ?? null, createdAt: new Date().toISOString() });
    if (status !== "CANCELLED" && status !== "PENDING") order.paymentStatus = "PAID";
    return order;
  },
};
