export type Review = {
  author: string;
  rating: number;
  comment: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: string;
  price: number;
  stock: number;
  reviews: Review[];
};

export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type OrderStatus = "processing" | "shipped" | "delivered";

export type Order = {
  id: string;
  customer: string;
  placedAt: string;
  deliveredAt: string;
  status: OrderStatus;
  total: number;
  itemCount: number;
  shippingAddress: Address;
};

export type CartItem = {
  productId: string;
  quantity: number;
};
