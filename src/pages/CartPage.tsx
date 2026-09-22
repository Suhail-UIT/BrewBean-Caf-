import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, subtotal, taxes, deliveryCharge, getGrandTotal } = useCart();
  const [orderType, setOrderType] = useState<'Dine-in' | 'Takeaway' | 'Delivery'>('Delivery');
  const navigate = useNavigate();

  const currentDeliveryFee = deliveryCharge(orderType);
  const grandTotal = getGrandTotal(orderType);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-[#EFE9E1] flex items-center justify-center mx-auto text-[#8B5A2B]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-black text-[#2C1810]">
            Your Bag is Empty
          </h1>
          <p className="text-sm text-[#7D6E66] max-w-sm mx-auto">
            You haven’t added any handcrafted coffees or kitchen treats yet.
          </p>
        </div>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2C1810] hover:bg-[#432619] text-white font-bold rounded-2xl text-xs tracking-wide transition-all shadow-md"
        >
          <span>Explore Artisanal Menu</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E8DFD8] pb-6">
        <div>
          <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block">
            Order Review
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#2C1810]">
            Shopping Bag
          </h1>
        </div>
        <Link
          to="/menu"
          className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-[#8B5A2B] hover:text-[#2C1810] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product._id}
              className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#E8DFD8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Product info */}
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 bg-stone-200"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center ${
                        product.vegetarian ? 'border-emerald-600' : 'border-rose-700'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          product.vegetarian ? 'bg-emerald-600' : 'bg-rose-700'
                        }`}
                      />
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#2C1810]">
                      {product.name}
                    </h3>
                  </div>
                  <span className="text-xs text-[#8C7A70] block">
                    {product.category} • ₹{product.price} each
                  </span>
                </div>
              </div>

              {/* Quantity Stepper & Price */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EFE8E1]">
                {/* Quantity controller */}
                <div className="flex items-center bg-[#EFE9E1] rounded-xl p-1 border border-[#DDD3C9]">
                  <button
                    onClick={() => updateQuantity(product._id, -1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white hover:bg-stone-50 font-bold text-xs text-[#2C1810] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-[#2C1810]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product._id, 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white hover:bg-stone-50 font-bold text-xs text-[#2C1810] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal for item */}
                <span className="font-serif font-bold text-base text-[#2C1810] min-w-[70px] text-right">
                  ₹{product.price * quantity}
                </span>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/menu"
              className="sm:hidden inline-flex items-center gap-2 text-xs font-bold text-[#8B5A2B]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary sidebar */}
        <div className="lg:col-span-4 bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 border border-[#E8DFD8] shadow-sm space-y-6">
          <h2 className="font-serif font-bold text-xl text-[#2C1810] border-b border-[#E8DFD8] pb-3">
            Bill Details
          </h2>

          {/* Order Type selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider block">
              Dining Preference
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['Delivery', 'Takeaway', 'Dine-in'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                    orderType === type
                      ? 'bg-[#2C1810] text-white border-[#2C1810] shadow-xs'
                      : 'bg-white text-[#5C4D44] border-[#DDD3C9] hover:bg-[#F4EFEA]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-3 text-xs sm:text-sm text-[#5C4D44] pt-2">
            <div className="flex justify-between">
              <span>Item Subtotal</span>
              <span className="font-semibold text-[#2C1810]">₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>GST & Restaurant Taxes (5%)</span>
              <span className="font-semibold text-[#2C1810]">₹{taxes}</span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span>Delivery Charge</span>
                {orderType !== 'Delivery' && (
                  <span className="block text-[10px] text-emerald-700 font-bold">
                    (Waived for {orderType})
                  </span>
                )}
              </div>
              <span className="font-semibold text-[#2C1810]">
                {currentDeliveryFee > 0 ? `₹${currentDeliveryFee}` : 'FREE'}
              </span>
            </div>

            <div className="pt-3 border-t border-[#E8DFD8] flex justify-between items-baseline">
              <div>
                <span className="font-serif font-bold text-base text-[#2C1810] block">
                  Grand Total
                </span>
                <span className="text-[11px] text-[#8C7A70]">Total Payable</span>
              </div>
              <span className="font-serif font-black text-2xl text-[#2C1810]">
                ₹{grandTotal}
              </span>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={() => navigate(`/checkout?type=${orderType}`)}
            className="w-full py-4 rounded-2xl bg-[#2C1810] hover:bg-[#432619] text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-[11px] text-[#8C7A70] justify-center pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Safe & Secure Order Processing</span>
          </div>
        </div>
      </div>
    </div>
  );
};
