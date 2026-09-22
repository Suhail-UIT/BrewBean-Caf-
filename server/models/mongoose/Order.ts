import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderDoc extends Document {
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
  items: Array<{
    product: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
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
  createdAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: {
      userId: { type: String },
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    customerDetails: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    items: [
      {
        product: { type: String },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        image: { type: String },
      },
    ],
    subtotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    deliveryCharge: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    orderType: {
      type: String,
      enum: ['Dine-in', 'Takeaway', 'Delivery'],
      default: 'Delivery',
    },
    address: {
      street: { type: String },
      city: { type: String },
      pincode: { type: String },
    },
    paymentMethod: {
      type: String,
      enum: ['Cash on Delivery', 'UPI', 'Card'],
      default: 'UPI',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
      default: 'Pending',
    },
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Ready', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret._id = ret._id.toString();
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const OrderModel = mongoose.models.Order || mongoose.model<IOrderDoc>('Order', OrderSchema);
