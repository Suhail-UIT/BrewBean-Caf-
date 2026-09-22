import React, { useState, useEffect } from 'react';
import {
  Utensils,
  ShoppingBag,
  Calendar,
  IndianRupee,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Product, Order, Reservation } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { user, token, logout, login } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'reservations'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // Product modal state (Add / Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: 180,
    category: 'Coffee',
    image: '',
    ingredients: '',
    vegetarian: true,
    available: true,
    popular: false,
  });

  const categories = ['Coffee', 'Breakfast', 'Pizza', 'Pasta', 'Burgers', 'Desserts'];

  // Admin check
  const isAdmin = user && user.role === 'admin';

  // Load dashboard data
  const loadDashboardData = async () => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const [statsRes, prodRes, ordRes, resvRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/products'),
        api.get('/orders'),
        api.get('/reservations'),
      ]);

      setStats(statsRes.data);
      setProducts(prodRes.data);
      setOrders(ordRes.data);
      setReservations(resvRes.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      showToast('Could not fetch dashboard data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadDashboardData();
    }
  }, [isAdmin]);

  // Handle demo admin login
  const handleQuickAdminLogin = async () => {
    try {
      await login('admin@brewbean.in', 'admin123');
      showToast('Logged in as Administrator!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Login failed', 'error');
    }
  };

  // 1. Order Status Update
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      showToast(`Order status updated to "${newStatus}"`, 'success');
      // Update local state
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus as any } : o))
      );
      // Reload stats
      const statsRes = await api.get('/dashboard/stats');
      setStats(statsRes.data);
    } catch (err: any) {
      showToast('Failed to update order status', 'error');
    }
  };

  // 2. Reservation Status Update
  const handleUpdateReservationStatus = async (reservationId: string, newStatus: string) => {
    try {
      await api.patch(`/reservations/${reservationId}/status`, { status: newStatus });
      showToast(`Reservation marked as "${newStatus}"`, 'success');
      setReservations((prev) =>
        prev.map((r) => (r._id === reservationId ? { ...r, status: newStatus as any } : r))
      );
    } catch (err: any) {
      showToast('Failed to update reservation', 'error');
    }
  };

  // 3. Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this product from the menu?')) return;
    try {
      await api.delete(`/products/${id}`);
      showToast('Product removed from menu', 'success');
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      showToast('Failed to delete product', 'error');
    }
  };

  // 4. Open Product Modal
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      price: 180,
      category: 'Coffee',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      ingredients: 'Coffee, Milk, Sugar',
      vegetarian: true,
      available: true,
      popular: false,
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      category: prod.category,
      image: prod.image,
      ingredients: (prod.ingredients || []).join(', '),
      vegetarian: prod.vegetarian,
      available: prod.available,
      popular: prod.popular || false,
    });
    setIsProductModalOpen(true);
  };

  // 5. Save Product (Create or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: productForm.name,
        description: productForm.description,
        price: Number(productForm.price),
        category: productForm.category,
        image: productForm.image,
        ingredients: productForm.ingredients.split(',').map((s) => s.trim()).filter(Boolean),
        vegetarian: productForm.vegetarian,
        available: productForm.available,
        popular: productForm.popular,
      };

      if (editingProduct) {
        const res = await api.put(`/products/${editingProduct._id}`, payload);
        showToast('Product updated successfully!', 'success');
        setProducts((prev) => prev.map((p) => (p._id === editingProduct._id ? res.data : p)));
      } else {
        const res = await api.post('/products', payload);
        showToast('New product added to menu!', 'success');
        setProducts((prev) => [res.data, ...prev]);
      }
      setIsProductModalOpen(false);
    } catch (err: any) {
      showToast('Failed to save product', 'error');
    }
  };

  // If not logged in as Admin, show login screen / prompt
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-[#EFE9E1] flex items-center justify-center mx-auto text-[#8B5A2B]">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-black text-[#2C1810]">
            Admin Control Center
          </h1>
          <p className="text-xs sm:text-sm text-[#7D6E66]">
            This portal is restricted to BrewBean Café management for live kitchen orders, reservations, and menu editing.
          </p>
        </div>

        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DFD8] text-xs text-left space-y-3">
          <span className="font-bold text-[#2C1810] block">Demo Admin Credentials:</span>
          <div className="space-y-1 text-[#65554B]">
            <p><strong>Email:</strong> admin@brewbean.in</p>
            <p><strong>Password:</strong> admin123</p>
          </div>

          <button
            onClick={handleQuickAdminLogin}
            className="w-full py-3 bg-[#2C1810] hover:bg-[#432619] text-white font-bold rounded-xl text-xs transition-all shadow-md mt-2 cursor-pointer"
          >
            Sign in as Demo Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFD8] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider bg-[#EFE9E1] px-3 py-1 rounded-full">
              Management Portal
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Live Connected
            </span>
          </div>
          <h1 className="text-3xl font-serif font-black text-[#2C1810] mt-1">
            BrewBean Café Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboardData}
            className="p-2.5 rounded-xl bg-white border border-[#DDD3C9] text-[#2C1810] hover:bg-stone-50 transition-colors cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-[#2C1810] block">{user?.name}</span>
            <span className="text-[11px] text-[#8C7A70]">{user?.email}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EFE9E1] text-[#2C1810] text-xs font-bold hover:bg-[#E4DBD0] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8DFD8] overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#2C1810] text-white shadow-xs'
              : 'bg-[#FAF7F2] text-[#65554B] hover:bg-[#EFE9E1]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#2C1810] text-white shadow-xs'
              : 'bg-[#FAF7F2] text-[#65554B] hover:bg-[#EFE9E1]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Live Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reservations')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'reservations'
              ? 'bg-[#2C1810] text-white shadow-xs'
              : 'bg-[#FAF7F2] text-[#65554B] hover:bg-[#EFE9E1]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Table Bookings ({reservations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'products'
              ? 'bg-[#2C1810] text-white shadow-xs'
              : 'bg-[#FAF7F2] text-[#65554B] hover:bg-[#EFE9E1]'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Menu Products ({products.length})</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stat Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E8DFD8] space-y-2">
              <div className="flex items-center justify-between text-[#8B5A2B]">
                <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
                <IndianRupee className="w-5 h-5" />
              </div>
              <span className="font-serif font-black text-3xl text-[#2C1810] block">
                ₹{stats?.totalRevenue ?? 0}
              </span>
              <span className="text-[11px] text-[#8C7A70]">Gross revenue across all orders</span>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E8DFD8] space-y-2">
              <div className="flex items-center justify-between text-[#8B5A2B]">
                <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-serif font-black text-3xl text-[#2C1810] block">
                {stats?.totalOrders ?? orders.length}
              </span>
              <span className="text-[11px] text-[#8C7A70]">Dine-in, takeaway & delivery</span>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E8DFD8] space-y-2">
              <div className="flex items-center justify-between text-[#8B5A2B]">
                <span className="text-xs font-bold uppercase tracking-wider">Table Bookings</span>
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-serif font-black text-3xl text-[#2C1810] block">
                {stats?.totalReservations ?? reservations.length}
              </span>
              <span className="text-[11px] text-[#8C7A70]">Reserved seating requests</span>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E8DFD8] space-y-2">
              <div className="flex items-center justify-between text-[#8B5A2B]">
                <span className="text-xs font-bold uppercase tracking-wider">Active Menu</span>
                <Utensils className="w-5 h-5" />
              </div>
              <span className="font-serif font-black text-3xl text-[#2C1810] block">
                {stats?.totalProducts ?? products.length}
              </span>
              <span className="text-[11px] text-[#8C7A70]">Across 6 food & coffee categories</span>
            </div>
          </div>

          {/* Recent Orders Preview */}
          <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E8DFD8] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl text-[#2C1810]">
                Recent Orders
              </h2>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-bold text-[#8B5A2B] hover:underline"
              >
                View all orders ↗
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8DFD8] text-[#8C7A70] uppercase">
                    <th className="py-2.5 font-bold">Order ID</th>
                    <th className="py-2.5 font-bold">Customer</th>
                    <th className="py-2.5 font-bold">Type</th>
                    <th className="py-2.5 font-bold">Total</th>
                    <th className="py-2.5 font-bold">Payment</th>
                    <th className="py-2.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8E1]">
                  {orders.slice(0, 5).map((o) => {
                    const custName = o.customerDetails?.name || o.user?.name || 'Customer';
                    const custPhone = o.customerDetails?.phone || o.user?.phone || '';
                    return (
                      <tr key={o._id}>
                        <td className="py-3 font-bold text-[#2C1810]">{o.orderNumber}</td>
                        <td className="py-3">
                          <span className="font-medium text-[#2C1810] block">{custName}</span>
                          <span className="text-[11px] text-[#8C7A70]">{custPhone}</span>
                        </td>
                        <td className="py-3 text-[#5C4D44] font-medium">{o.orderType}</td>
                        <td className="py-3 font-bold text-[#2C1810]">₹{o.totalAmount}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 font-semibold text-[#5C4D44]">
                            {o.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                              o.status === 'Delivered' || o.status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : o.status === 'Cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-2xl text-[#2C1810]">
              Orders Management
            </h2>
            <span className="text-xs text-[#7D6E66]">
              {orders.length} total orders recorded
            </span>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#FAF7F2] rounded-3xl p-5 sm:p-6 border border-[#E8DFD8] shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DFD8] pb-3">
                  <div>
                    <span className="font-serif font-black text-lg text-[#2C1810]">
                      #{order.orderNumber}
                    </span>
                    <span className="text-xs text-[#8C7A70] ml-3">
                      {new Date(order.createdAt).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-xl bg-[#EFE9E1] text-[#2C1810]">
                      {order.orderType}
                    </span>

                    {/* Status Changer dropdown */}
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1 rounded-xl border cursor-pointer focus:outline-none ${
                        order.status === 'Delivered' || order.status === 'Completed'
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                          : order.status === 'Cancelled'
                          ? 'bg-rose-50 border-rose-400 text-rose-800'
                          : 'bg-amber-50 border-amber-400 text-amber-800'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                  {/* Items List */}
                  <div className="md:col-span-6 space-y-2">
                    <span className="font-bold text-[#4A3B32] uppercase tracking-wider block">
                      Ordered Items:
                    </span>
                    <div className="divide-y divide-[#EFE8E1]">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-1.5 flex justify-between">
                          <span className="text-[#2C1810]">
                            <strong>{item.quantity}x</strong> {item.name}
                          </span>
                          <span className="font-bold text-[#2C1810]">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer details */}
                  <div className="md:col-span-6 space-y-1.5 bg-[#EFE9E1] p-3.5 rounded-2xl text-[#5C4D44]">
                    <span className="font-bold text-[#2C1810] block">Customer Contact:</span>
                    <p><strong>Name:</strong> {order.customerDetails?.name || order.user?.name || 'Customer'}</p>
                    <p><strong>Phone:</strong> {order.customerDetails?.phone || order.user?.phone || 'N/A'}</p>
                    <p><strong>Email:</strong> {order.customerDetails?.email || order.user?.email || 'N/A'}</p>
                    {order.address?.street && (
                      <p><strong>Address:</strong> {order.address.street}, {order.address.city} - {order.address.pincode}</p>
                    )}
                    <p><strong>Payment:</strong> {order.paymentMethod} ({order.paymentStatus})</p>
                    <p className="font-serif font-black text-sm text-[#2C1810] pt-1">
                      Total: ₹{order.totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RESERVATIONS MANAGEMENT */}
      {activeTab === 'reservations' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-2xl text-[#2C1810]">
              Table Bookings
            </h2>
            <span className="text-xs text-[#7D6E66]">
              {reservations.length} total reservation requests
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reservations.map((resv) => (
              <div
                key={resv._id}
                className="bg-[#FAF7F2] rounded-3xl p-5 border border-[#E8DFD8] space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#E8DFD8] pb-2.5">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#2C1810]">
                      {resv.name}
                    </h3>
                    <span className="text-xs text-[#8C7A70]">{resv.phone} • {resv.email}</span>
                  </div>
                  <select
                    value={resv.status}
                    onChange={(e) => handleUpdateReservationStatus(resv._id, e.target.value)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-xl border cursor-pointer ${
                      resv.status === 'Confirmed'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                        : resv.status === 'Cancelled'
                        ? 'bg-rose-50 border-rose-400 text-rose-800'
                        : 'bg-amber-50 border-amber-400 text-amber-800'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs text-[#5C4D44]">
                  <div className="bg-[#EFE9E1] p-2 rounded-xl">
                    <span className="text-[10px] text-[#8C7A70] block">Date</span>
                    <strong className="text-[#2C1810]">{resv.date}</strong>
                  </div>
                  <div className="bg-[#EFE9E1] p-2 rounded-xl">
                    <span className="text-[10px] text-[#8C7A70] block">Time Slot</span>
                    <strong className="text-[#2C1810]">{resv.time}</strong>
                  </div>
                  <div className="bg-[#EFE9E1] p-2 rounded-xl">
                    <span className="text-[10px] text-[#8C7A70] block">Party Size</span>
                    <strong className="text-[#2C1810]">{resv.guests} Guests</strong>
                  </div>
                </div>

                {resv.specialRequest && (
                  <p className="text-xs text-[#65554B] bg-white p-2.5 rounded-xl border border-[#DDD3C9] italic">
                    "{resv.specialRequest}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif font-bold text-2xl text-[#2C1810]">
                Menu Items Management
              </h2>
              <p className="text-xs text-[#7D6E66]">
                Add, edit prices, descriptions or remove items from the live customer menu.
              </p>
            </div>

            <button
              onClick={handleOpenAddProduct}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#2C1810] hover:bg-[#432619] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Item</span>
            </button>
          </div>

          {/* Product list grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((prod) => (
              <div
                key={prod._id}
                className="bg-[#FAF7F2] rounded-3xl p-4 border border-[#E8DFD8] flex gap-3.5 items-start justify-between"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 bg-stone-200"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-bold text-[#8B5A2B] uppercase">
                    {prod.category}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-[#2C1810] truncate">
                    {prod.name}
                  </h3>
                  <p className="text-xs font-bold text-[#2C1810]">
                    ₹{prod.price}
                  </p>
                  <span
                    className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      prod.vegetarian ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {prod.vegetarian ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>

                {/* Edit / Delete actions */}
                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => handleOpenEditProduct(prod)}
                    className="p-1.5 rounded-lg bg-[#EFE9E1] hover:bg-[#DDD3C9] text-[#2C1810] transition-colors"
                    title="Edit Item"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(prod._id)}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT MODAL: ADD / EDIT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E8DFD8] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <h2 className="font-serif font-bold text-xl text-[#2C1810]">
              {editingProduct ? 'Edit Menu Product' : 'Add New Menu Item'}
            </h2>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Pistachio Matcha Latte"
                  className="w-full px-3.5 py-2 bg-white border border-[#DDD3C9] rounded-xl text-xs text-[#2C1810]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD3C9] rounded-xl text-xs text-[#2C1810]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-white border border-[#DDD3C9] rounded-xl text-xs text-[#2C1810]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Brief appetizing description of flavours, roast, or preparation style..."
                  className="w-full p-2.5 bg-white border border-[#DDD3C9] rounded-xl text-xs text-[#2C1810]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1">
                  Image URL (Unsplash or direct URL) *
                </label>
                <input
                  type="url"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 bg-white border border-[#DDD3C9] rounded-xl text-xs text-[#2C1810]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1">
                  Ingredients (comma separated)
                </label>
                <input
                  type="text"
                  value={productForm.ingredients}
                  onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                  placeholder="e.g. Espresso, Steamed Oat Milk, Cardamom"
                  className="w-full px-3.5 py-2 bg-white border border-[#DDD3C9] rounded-xl text-xs text-[#2C1810]"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-[#2C1810] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.vegetarian}
                    onChange={(e) => setProductForm({ ...productForm, vegetarian: e.target.checked })}
                    className="rounded text-[#8B5A2B]"
                  />
                  <span>Vegetarian</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-[#2C1810] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.popular}
                    onChange={(e) => setProductForm({ ...productForm, popular: e.target.checked })}
                    className="rounded text-[#8B5A2B]"
                  />
                  <span>Mark as Bestseller / Popular</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DFD8]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-[#5C4D44] hover:bg-stone-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2C1810] text-white text-xs font-bold rounded-xl hover:bg-[#432619]"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
