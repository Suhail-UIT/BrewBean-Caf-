export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: 'admin' | 'customer';
  createdAt: string;
}

export interface IProduct {
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

export interface IOrderItem {
  product: string; // Product ID
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface IOrder {
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
  items: IOrderItem[];
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

export interface IReservation {
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

export interface IContact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}
