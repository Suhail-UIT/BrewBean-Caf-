export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'Coffee' | 'Breakfast' | 'Pizza' | 'Pasta' | 'Burgers' | 'Desserts';
  image: string;
  ingredients: string[];
  vegetarian: boolean;
  available: boolean;
  popular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'customer';
}

export interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user?: {
    userId?: string;
    name: string;
    email: string;
    phone: string;
  };
  customerDetails?: {
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  subtotal: number;
  taxes: number;
  deliveryCharge: number;
  totalAmount: number;
  orderType: 'Dine-in' | 'Takeaway' | 'Delivery';
  address?: {
    street: string;
    city: string;
    pincode: string;
  };
  paymentMethod: 'Cash on Delivery' | 'UPI' | 'Card';
  paymentStatus: 'Pending' | 'Paid';
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Ready' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Reservation {
  _id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface DashboardStats {
  totalOrders: number;
  todayOrders: number;
  totalRevenue: number;
  totalReservations: number;
  totalCustomers: number;
  totalProducts: number;
}
