// Shared TypeScript type definitions

export interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface Purchase {
  id: number;
  date: string;
  total: number;
  items: string[];
}

export interface UserInfo {
  client: ClientInfo;
  interestedProducts: Product[];
  previousPurchases: Purchase[];
}

export interface ApiKeys {
  wooCommerceKey: string;
  wooCommerceSecret: string;
  chatwootToken: string;
}
