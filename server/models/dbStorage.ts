import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { IUser, IProduct, IOrder, IReservation, IContact } from './types';
import { INITIAL_PRODUCTS } from './initialData';
import { ProductModel } from './mongoose/Product';
import { UserModel } from './mongoose/User';
import { OrderModel } from './mongoose/Order';
import { ReservationModel } from './mongoose/Reservation';
import { ContactModel } from './mongoose/Contact';

interface DBData {
  users: IUser[];
  products: IProduct[];
  orders: IOrder[];
  reservations: IReservation[];
  contacts: IContact[];
}

const DB_FILE_PATH = path.resolve(process.cwd(), 'data', 'brewbean_db.json');

class DatabaseService {
  private data: DBData = {
    users: [],
    products: [],
    orders: [],
    reservations: [],
    contacts: [],
  };

  constructor() {
    this.init();
  }

  private init() {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(DB_FILE_PATH)) {
      try {
        const fileContent = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        this.data = JSON.parse(fileContent);
      } catch (err) {
        console.error('Error reading DB file, reinitializing with defaults', err);
        this.seedDefaults();
      }
    } else {
      this.seedDefaults();
    }

    // Ensure initial products exist
    if (!this.data.products || this.data.products.length === 0) {
      this.data.products = INITIAL_PRODUCTS;
      this.save();
    }
  }

  private seedDefaults() {
    const adminPasswordHash = bcrypt.hashSync('adminpassword123', 10);
    const customerPasswordHash = bcrypt.hashSync('customer123', 10);

    this.data = {
      users: [
        {
          _id: 'user-admin-1',
          name: 'BrewBean Manager',
          email: 'admin@brewbeancafe.in',
          phone: '+91 98765 42180',
          password: adminPasswordHash,
          role: 'admin',
          createdAt: new Date().toISOString(),
        },
        {
          _id: 'user-cust-1',
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          phone: '+91 98101 23456',
          password: customerPasswordHash,
          role: 'customer',
          createdAt: new Date().toISOString(),
        },
      ],
      products: INITIAL_PRODUCTS,
      orders: [
        {
          _id: 'ord-101',
          orderNumber: 'BB-8492',
          user: {
            name: 'Aarav Patel',
            email: 'aarav.p@example.com',
            phone: '+91 98765 11223',
          },
          customerDetails: {
            name: 'Aarav Patel',
            email: 'aarav.p@example.com',
            phone: '+91 98765 11223',
          },
          items: [
            {
              product: 'prod-c2',
              name: 'Classic Cappuccino',
              price: 160,
              quantity: 2,
              image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
            },
            {
              product: 'prod-b1',
              name: 'Avocado Toast',
              price: 220,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=800&q=80',
            },
          ],
          subtotal: 540,
          taxes: 27,
          deliveryCharge: 0,
          totalAmount: 567,
          orderType: 'Dine-in',
          paymentMethod: 'UPI',
          paymentStatus: 'Paid',
          status: 'Delivered',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          _id: 'ord-102',
          orderNumber: 'BB-9104',
          user: {
            name: 'Meera Iyer',
            email: 'meera.i@example.com',
            phone: '+91 98200 44556',
          },
          customerDetails: {
            name: 'Meera Iyer',
            email: 'meera.i@example.com',
            phone: '+91 98200 44556',
          },
          items: [
            {
              product: 'prod-p1',
              name: 'Margherita Pizza',
              price: 320,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
            },
            {
              product: 'prod-c5',
              name: 'Cold Coffee',
              price: 180,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
            },
          ],
          subtotal: 500,
          taxes: 25,
          deliveryCharge: 30,
          totalAmount: 555,
          orderType: 'Delivery',
          address: {
            street: 'Tower B, Express Trade Towers 2, Sector 62',
            city: 'Noida',
            pincode: '201309',
          },
          paymentMethod: 'UPI',
          paymentStatus: 'Paid',
          status: 'Preparing',
          createdAt: new Date(Date.now() - 1200000).toISOString(),
        },
      ],
      reservations: [
        {
          _id: 'res-201',
          name: 'Rohit Verma',
          phone: '+91 98990 12345',
          email: 'rohit.verma@example.com',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          time: '19:30',
          guests: 4,
          specialRequest: 'Window table preferred for an anniversary celebration.',
          status: 'Confirmed',
          createdAt: new Date().toISOString(),
        },
        {
          _id: 'res-202',
          name: 'Priya Nambiar',
          phone: '+91 97112 34890',
          email: 'priya.n@example.com',
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          time: '16:00',
          guests: 2,
          specialRequest: 'Quiet corner for remote work session with laptop charging port.',
          status: 'Confirmed',
          createdAt: new Date().toISOString(),
        },
      ],
      contacts: [
        {
          _id: 'cnt-301',
          name: 'Sameer Kapoor',
          email: 'sameer.k@techcorp.in',
          phone: '+91 98111 88990',
          message: 'Hi team, do you host corporate coffee tasting events or team lunches on weekdays in your Sector 62 café?',
          createdAt: new Date().toISOString(),
        },
      ],
    };

    this.save();
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  /**
   * Helper to verify if Mongoose has an active MongoDB connection
   */
  private isMongoConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Sync existing data from MongoDB into local memory/cache
   */
  async syncFromMongo(): Promise<void> {
    if (!this.isMongoConnected()) return;
    try {
      const mongoProducts = await ProductModel.find().lean();
      if (mongoProducts && mongoProducts.length > 0) {
        this.data.products = mongoProducts.map((p: any) => ({
          _id: p._id.toString(),
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
          image: p.image,
          ingredients: p.ingredients || [],
          vegetarian: p.vegetarian,
          available: p.available,
          popular: p.popular,
        }));
        this.save();
      }

      const mongoOrders = await OrderModel.find().sort({ createdAt: -1 }).lean();
      if (mongoOrders && mongoOrders.length > 0) {
        this.data.orders = mongoOrders.map((o: any) => ({
          ...o,
          _id: o._id.toString(),
        }));
        this.save();
      }
    } catch (err) {
      console.warn('MongoDB sync note:', err);
    }
  }

  // Users
  getUsers(): IUser[] {
    return this.data.users;
  }

  findUserByEmail(email: string): IUser | undefined {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id: string): IUser | undefined {
    return this.data.users.find((u) => u._id === id);
  }

  createUser(user: Omit<IUser, '_id' | 'createdAt'>): IUser {
    const newUser: IUser = {
      ...user,
      _id: 'user-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      createdAt: new Date().toISOString(),
    };
    this.data.users.push(newUser);
    this.save();

    // Async save to MongoDB
    if (this.isMongoConnected()) {
      UserModel.create({
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        password: newUser.password,
        role: newUser.role,
      }).catch((e) => console.error('Error saving user to MongoDB:', e));
    }

    return newUser;
  }

  // Products
  getProducts(): IProduct[] {
    return this.data.products;
  }

  getProductById(id: string): IProduct | undefined {
    return this.data.products.find((p) => p._id === id);
  }

  createProduct(product: Omit<IProduct, '_id'>): IProduct {
    const newProduct: IProduct = {
      ...product,
      _id: 'prod-' + Date.now(),
    };
    this.data.products.unshift(newProduct);
    this.save();

    // Async save to MongoDB
    if (this.isMongoConnected()) {
      ProductModel.create(product).catch((e) => console.error('Error saving product to MongoDB:', e));
    }

    return newProduct;
  }

  updateProduct(id: string, updates: Partial<IProduct>): IProduct | null {
    const index = this.data.products.findIndex((p) => p._id === id);
    if (index === -1) return null;
    this.data.products[index] = {
      ...this.data.products[index],
      ...updates,
    };
    this.save();

    // Async update to MongoDB
    if (this.isMongoConnected()) {
      ProductModel.findOneAndUpdate(
        { $or: [{ _id: id.length === 24 ? id : null }, { name: this.data.products[index].name }] },
        updates
      ).catch((e) => console.error('Error updating product in MongoDB:', e));
    }

    return this.data.products[index];
  }

  deleteProduct(id: string): boolean {
    const prevLen = this.data.products.length;
    const prodToDelete = this.data.products.find((p) => p._id === id);
    this.data.products = this.data.products.filter((p) => p._id !== id);
    const deleted = this.data.products.length < prevLen;
    if (deleted) {
      this.save();
      // Async delete from MongoDB
      if (this.isMongoConnected() && prodToDelete) {
        ProductModel.findOneAndDelete({
          $or: [{ _id: id.length === 24 ? id : null }, { name: prodToDelete.name }],
        }).catch((e) => console.error('Error deleting product from MongoDB:', e));
      }
    }
    return deleted;
  }

  // Orders
  getOrders(): IOrder[] {
    return this.data.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getOrderById(id: string): IOrder | undefined {
    return this.data.orders.find((o) => o._id === id || o.orderNumber === id);
  }

  createOrder(orderData: Omit<IOrder, '_id' | 'orderNumber' | 'createdAt'>): IOrder {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: IOrder = {
      ...orderData,
      _id: 'ord-' + Date.now(),
      orderNumber: `BB-${randNum}`,
      createdAt: new Date().toISOString(),
    };
    this.data.orders.unshift(newOrder);
    this.save();

    // Async save to MongoDB
    if (this.isMongoConnected()) {
      OrderModel.create({
        ...newOrder,
        customerDetails: newOrder.customerDetails || newOrder.user,
      }).catch((e) => console.error('Error saving order to MongoDB:', e));
    }

    return newOrder;
  }

  updateOrderStatus(id: string, status: IOrder['status']): IOrder | null {
    const order = this.data.orders.find((o) => o._id === id || o.orderNumber === id);
    if (!order) return null;
    order.status = status;
    this.save();

    // Async update to MongoDB
    if (this.isMongoConnected()) {
      OrderModel.findOneAndUpdate(
        { $or: [{ orderNumber: order.orderNumber }, { _id: id.length === 24 ? id : null }] },
        { status }
      ).catch((e) => console.error('Error updating order status in MongoDB:', e));
    }

    return order;
  }

  // Reservations
  getReservations(): IReservation[] {
    return this.data.reservations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createReservation(resData: Omit<IReservation, '_id' | 'createdAt' | 'status'>): IReservation {
    const newRes: IReservation = {
      ...resData,
      status: 'Confirmed',
      _id: 'res-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    this.data.reservations.unshift(newRes);
    this.save();

    // Async save to MongoDB
    if (this.isMongoConnected()) {
      ReservationModel.create(newRes).catch((e) => console.error('Error saving reservation to MongoDB:', e));
    }

    return newRes;
  }

  deleteReservation(id: string): boolean {
    const prevLen = this.data.reservations.length;
    this.data.reservations = this.data.reservations.filter((r) => r._id !== id);
    const deleted = this.data.reservations.length < prevLen;
    if (deleted) {
      this.save();
      if (this.isMongoConnected()) {
        ReservationModel.findOneAndDelete({ _id: id.length === 24 ? id : null }).catch((e) =>
          console.error('Error deleting reservation from MongoDB:', e)
        );
      }
    }
    return deleted;
  }

  // Contact
  getContacts(): IContact[] {
    return this.data.contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createContact(contactData: Omit<IContact, '_id' | 'createdAt'>): IContact {
    const newContact: IContact = {
      ...contactData,
      _id: 'cnt-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    this.data.contacts.unshift(newContact);
    this.save();

    // Async save to MongoDB
    if (this.isMongoConnected()) {
      ContactModel.create(newContact).catch((e) => console.error('Error saving contact to MongoDB:', e));
    }

    return newContact;
  }
}

export const db = new DatabaseService();
