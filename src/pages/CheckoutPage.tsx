import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, CheckCircle2, CreditCard, Banknote, QrCode, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, taxes, deliveryCharge, getGrandTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialType = (searchParams.get('type') as any) || 'Delivery';
  const [orderType, setOrderType] = useState<'Dine-in' | 'Takeaway' | 'Delivery'>(initialType);

  // Form states
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Noida');
  const [pincode, setPincode] = useState('201309');
  const [tableNumber, setTableNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'UPI' | 'Card'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock UPI handle state
  const [upiId, setUpiId] = useState('');

  const currentDeliveryFee = deliveryCharge(orderType);
  const grandTotal = getGrandTotal(orderType);

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#2C1810]">Your bag is empty</h2>
        <p className="text-xs text-[#7D6E66]">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/menu" className="inline-block px-6 py-2.5 bg-[#2C1810] text-white rounded-xl text-xs font-bold">
          Go to Menu
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !email) {
      showToast('Please provide your name, phone number, and email.', 'error');
      return;
    }

    if (orderType === 'Delivery' && (!street || !city || !pincode)) {
      showToast('Please provide your complete delivery address.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        items: items.map((i) => ({
          product: i.product._id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.image,
        })),
        orderType,
        address:
          orderType === 'Delivery'
            ? { street, city, pincode }
            : { street: `Dine-in / Takeaway: ${orderType} ${tableNumber ? 'Table #' + tableNumber : ''}`, city, pincode },
        paymentMethod,
        customerDetails: {
          name: fullName,
          email,
          phone,
        },
      };

      const res = await api.post('/orders', orderPayload);
      const createdOrder = res.data;

      // Clear cart
      clearCart();

      showToast('Order confirmed successfully!', 'success');
      navigate(`/order-confirmation/${createdOrder._id || createdOrder.orderNumber}`);
    } catch (err: any) {
      console.error('Order checkout error:', err);
      showToast(err.response?.data?.message || 'Failed to place order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Back button */}
      <div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#7D6E66] hover:text-[#2C1810] bg-[#EFE9E1] px-3.5 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bag</span>
        </Link>
      </div>

      <div className="border-b border-[#E8DFD8] pb-4">
        <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block">
          Final Step
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#2C1810]">
          Checkout & Order Details
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form: Details, Address, Payment */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Dining Mode */}
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E8DFD8] space-y-4">
            <h2 className="font-serif font-bold text-lg text-[#2C1810]">
              1. Order Type
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {(['Delivery', 'Takeaway', 'Dine-in'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all border text-center ${
                    orderType === type
                      ? 'bg-[#2C1810] text-white border-[#2C1810] shadow-sm'
                      : 'bg-white text-[#5C4D44] border-[#DDD3C9] hover:bg-[#F4EFEA]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Customer Information */}
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E8DFD8] space-y-4">
            <h2 className="font-serif font-bold text-lg text-[#2C1810]">
              2. Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 42180"
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                />
              </div>
            </div>
          </div>

          {/* 3. Address or Dine-in Details */}
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E8DFD8] space-y-4">
            <h2 className="font-serif font-bold text-lg text-[#2C1810]">
              3. {orderType === 'Delivery' ? 'Delivery Address (Noida / NCR)' : `${orderType} Details`}
            </h2>

            {orderType === 'Delivery' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                    Street Address & Apartment / House No. *
                  </label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. Tower 4, Flat 502, Cleo County, Sector 121"
                    className="w-full px-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Noida"
                      className="w-full px-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="201309"
                      className="w-full px-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                    />
                  </div>
                </div>
              </div>
            ) : orderType === 'Dine-in' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                    Table Number (if already seated at Sector 62 café)
                  </label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. Table 04 (or leave blank if waiting)"
                    className="w-full px-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#EFE9E1] text-xs text-[#5C4D44] space-y-1">
                <p className="font-bold text-[#2C1810]">Takeaway Pickup Note:</p>
                <p>Your order will be ready at our pickup counter at Sector 62, Noida in approximately 15–20 minutes.</p>
              </div>
            )}
          </div>

          {/* 4. Payment Options */}
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E8DFD8] space-y-4">
            <h2 className="font-serif font-bold text-lg text-[#2C1810]">
              4. Payment Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* UPI Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all ${
                  paymentMethod === 'UPI'
                    ? 'bg-amber-50/50 border-[#8B5A2B] shadow-xs'
                    : 'bg-white border-[#DDD3C9] hover:bg-[#F4EFEA]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <QrCode className="w-5 h-5 text-[#8B5A2B]" />
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'UPI' ? 'border-[#8B5A2B]' : 'border-stone-300'
                    }`}
                  >
                    {paymentMethod === 'UPI' && <span className="w-2 h-2 rounded-full bg-[#8B5A2B]" />}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-sm text-[#2C1810] block">UPI Payment</span>
                  <span className="text-[11px] text-[#8C7A70]">GPay, PhonePe, Paytm</span>
                </div>
              </button>

              {/* Card Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('Card')}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all ${
                  paymentMethod === 'Card'
                    ? 'bg-amber-50/50 border-[#8B5A2B] shadow-xs'
                    : 'bg-white border-[#DDD3C9] hover:bg-[#F4EFEA]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <CreditCard className="w-5 h-5 text-[#8B5A2B]" />
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'Card' ? 'border-[#8B5A2B]' : 'border-stone-300'
                    }`}
                  >
                    {paymentMethod === 'Card' && <span className="w-2 h-2 rounded-full bg-[#8B5A2B]" />}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-sm text-[#2C1810] block">Credit / Debit Card</span>
                  <span className="text-[11px] text-[#8C7A70]">Visa, Mastercard, RuPay</span>
                </div>
              </button>

              {/* Cash on Delivery */}
              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'bg-amber-50/50 border-[#8B5A2B] shadow-xs'
                    : 'bg-white border-[#DDD3C9] hover:bg-[#F4EFEA]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Banknote className="w-5 h-5 text-[#8B5A2B]" />
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'Cash on Delivery' ? 'border-[#8B5A2B]' : 'border-stone-300'
                    }`}
                  >
                    {paymentMethod === 'Cash on Delivery' && <span className="w-2 h-2 rounded-full bg-[#8B5A2B]" />}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-sm text-[#2C1810] block">
                    {orderType === 'Delivery' ? 'Cash on Delivery' : 'Pay at Counter'}
                  </span>
                  <span className="text-[11px] text-[#8C7A70]">Cash or POS swipe</span>
                </div>
              </button>
            </div>

            {/* UPI interactive detail mock */}
            {paymentMethod === 'UPI' && (
              <div className="p-4 rounded-2xl bg-white border border-[#DDD3C9] space-y-3 animate-fade-in">
                <span className="text-xs font-bold text-[#4A3B32] block">
                  Simulated Instant UPI
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@okhdfcbank / yourname@upi"
                    className="flex-1 px-3.5 py-2 bg-[#FAF7F2] border border-[#DDD3C9] rounded-xl text-xs text-[#2C1810] focus:ring-1 focus:ring-[#8B5A2B]"
                  />
                  <span className="px-3 py-2 bg-[#EFE9E1] text-[#2C1810] font-bold text-xs rounded-xl flex items-center">
                    Verified
                  </span>
                </div>
                <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Quick simulated one-click authorization
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Order Summary */}
        <div className="lg:col-span-4 bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 border border-[#E8DFD8] shadow-sm space-y-6 sticky top-28">
          <h2 className="font-serif font-bold text-xl text-[#2C1810] border-b border-[#E8DFD8] pb-3">
            Order Review
          </h2>

          {/* Items brief list */}
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {items.map(({ product, quantity }) => (
              <div key={product._id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 max-w-[70%]">
                  <span className="font-bold text-[#8B5A2B]">{quantity}x</span>
                  <span className="text-[#2C1810] font-medium truncate">{product.name}</span>
                </div>
                <span className="font-bold text-[#2C1810]">₹{product.price * quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 text-xs text-[#5C4D44] border-t border-[#E8DFD8] pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#2C1810]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST & Taxes (5%)</span>
              <span className="font-semibold text-[#2C1810]">₹{taxes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Delivery Charges</span>
              <span className="font-semibold text-[#2C1810]">
                {currentDeliveryFee > 0 ? `₹${currentDeliveryFee}` : 'FREE'}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[#E8DFD8]">
              <span className="font-serif font-bold text-base text-[#2C1810]">Total Payable</span>
              <span className="font-serif font-black text-2xl text-[#2C1810]">₹{grandTotal}</span>
            </div>
          </div>

          {/* Place order button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-[#2C1810] hover:bg-[#432619] active:bg-[#1D100A] text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4 text-[#D4A373]" />
                <span>Confirm & Place Order (₹{grandTotal})</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
