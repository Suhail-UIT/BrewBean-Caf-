import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, Phone, ChefHat, PackageCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { Order } from '../types';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error('Error fetching order confirmation:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="h-64 bg-stone-200/60 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      {/* Success banner card */}
      <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-10 border border-[#E8DFD8] shadow-lg text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
          Order Successfully Placed
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2C1810]">
          Thank you for your order!
        </h1>

        <p className="text-sm text-[#65554B] max-w-md mx-auto">
          Your order has been received by BrewBean Café, Sector 62, Noida. Our baristas and chefs are already preparing your food with fresh ingredients.
        </p>

        {/* Order Reference and ETA */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4 border-t border-[#E8DFD8]">
          <div className="bg-[#EFE9E1] p-3.5 rounded-2xl">
            <span className="text-[11px] text-[#8C7A70] uppercase font-bold block">Order Number</span>
            <span className="font-serif font-black text-xl text-[#2C1810]">
              {order?.orderNumber || id}
            </span>
          </div>
          <div className="bg-[#EFE9E1] p-3.5 rounded-2xl">
            <span className="text-[11px] text-[#8C7A70] uppercase font-bold block">Estimated Time</span>
            <span className="font-serif font-black text-xl text-[#2C1810] flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4 text-[#8B5A2B]" /> 25-35 Mins
            </span>
          </div>
        </div>
      </div>

      {/* Progress Status Tracker */}
      <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] space-y-6">
        <h2 className="font-serif font-bold text-lg text-[#2C1810]">
          Live Order Status
        </h2>

        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#E8DFD8] w-full z-0" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#8B5A2B] w-1/3 z-0" />

          {/* Step 1: Confirmed */}
          <div className="relative z-10 flex flex-col items-center bg-[#FAF7F2] px-2">
            <div className="w-9 h-9 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <PackageCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[#2C1810] mt-2">Confirmed</span>
          </div>

          {/* Step 2: Preparing */}
          <div className="relative z-10 flex flex-col items-center bg-[#FAF7F2] px-2">
            <div className="w-9 h-9 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <ChefHat className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[#2C1810] mt-2">Kitchen Prep</span>
          </div>

          {/* Step 3: Out/Ready */}
          <div className="relative z-10 flex flex-col items-center bg-[#FAF7F2] px-2">
            <div className="w-9 h-9 rounded-full bg-[#EFE9E1] text-[#8C7A70] flex items-center justify-center font-bold text-xs">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#8C7A70] mt-2">
              {order?.orderType === 'Delivery' ? 'On the Way' : 'Ready for Pickup'}
            </span>
          </div>
        </div>
      </div>

      {/* Order Itemized Summary */}
      {order && (
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] space-y-6">
          <h2 className="font-serif font-bold text-lg text-[#2C1810] border-b border-[#E8DFD8] pb-3">
            Itemized Receipt
          </h2>

          <div className="divide-y divide-[#EFE8E1]">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#8B5A2B] text-xs bg-[#EFE9E1] px-2 py-0.5 rounded-md">
                    {item.quantity}x
                  </span>
                  <span className="font-medium text-[#2C1810]">{item.name}</span>
                </div>
                <span className="font-serif font-bold text-[#2C1810]">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E8DFD8] space-y-2 text-xs text-[#65554B]">
            <div className="flex justify-between">
              <span>Item Subtotal</span>
              <span className="font-bold text-[#2C1810]">₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Restaurant Taxes (5% GST)</span>
              <span className="font-bold text-[#2C1810]">₹{order.taxes}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold text-[#2C1810]">
                {order.deliveryCharge > 0 ? `₹${order.deliveryCharge}` : 'FREE'}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-[#E8DFD8] text-base">
              <span className="font-serif font-bold text-[#2C1810]">Grand Total</span>
              <span className="font-serif font-black text-2xl text-[#2C1810]">
                ₹{order.totalAmount}
              </span>
            </div>
          </div>

          <div className="bg-[#EFE9E1] p-4 rounded-2xl text-xs text-[#5C4D44] space-y-1">
            <p>
              <strong className="text-[#2C1810]">Order Type:</strong> {order.orderType}
            </p>
            <p>
              <strong className="text-[#2C1810]">Payment Method:</strong> {order.paymentMethod} ({order.paymentStatus})
            </p>
            {order.address?.street && (
              <p>
                <strong className="text-[#2C1810]">Address:</strong> {order.address.street}, {order.address.city} - {order.address.pincode}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to="/menu"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#2C1810] hover:bg-[#432619] text-white font-bold rounded-2xl text-xs tracking-wide transition-all shadow-md text-center"
        >
          Explore More Items
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto px-8 py-3.5 bg-white border border-[#DDD3C9] hover:bg-stone-50 text-[#2C1810] font-bold rounded-2xl text-xs tracking-wide transition-all text-center"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};
