export type ProductCategory = 'earrings' | 'necklaces' | 'wristwatches' | 'bracelets';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  materials: string[];
  gemstone?: string;
  carat?: string;
  metal: string;
  dimensions?: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  category: ProductCategory;
  price: number;
  quantity: number;
  image: string;
  metal: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shipping: number;
  tax: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: 'card' | 'google_pay' | 'apple_pay' | 'bank_transfer';
  mailgunStatus?: {
    sent: boolean;
    messageId?: string;
    mode: 'live' | 'preview_simulation';
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'guest';
}
