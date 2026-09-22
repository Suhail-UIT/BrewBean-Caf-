import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.product._id === product._id);

  return (
    <div className="group bg-[#FAF7F2] rounded-3xl border border-[#E8DFD8] overflow-hidden hover:shadow-xl hover:border-[#D5C6BA] transition-all duration-300 flex flex-col h-full">
      {/* Image container */}
      <Link to={`/menu/${product._id}`} className="relative block overflow-hidden aspect-[4/3] bg-[#EFEAE4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges row */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          {/* Veg / Non-Veg icon */}
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center bg-white/95 backdrop-blur-xs shadow-xs ${
              product.vegetarian ? 'border-emerald-600' : 'border-rose-700'
            }`}
            title={product.vegetarian ? 'Pure Vegetarian' : 'Contains Egg / Meat'}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                product.vegetarian ? 'bg-emerald-600' : 'bg-rose-700'
              }`}
            />
          </div>

          {product.popular && (
            <span className="px-2 py-0.5 rounded-full bg-[#8B5A2B] text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-xs">
              <Star className="w-2.5 h-2.5 fill-current" /> Bestseller
            </span>
          )}
        </div>

        {/* Category tag */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-[11px] font-semibold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <Link
              to={`/menu/${product._id}`}
              className="font-serif font-bold text-lg text-[#2C1810] hover:text-[#8B5A2B] transition-colors leading-snug line-clamp-1"
            >
              {product.name}
            </Link>
          </div>

          <p className="text-xs text-[#705F55] line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>

          {/* Ingredients tags preview */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {product.ingredients.slice(0, 2).map((ing, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-[#EFE9E1] text-[#6B5A50] px-2 py-0.5 rounded-md truncate max-w-[120px]"
                >
                  {ing}
                </span>
              ))}
              {product.ingredients.length > 2 && (
                <span className="text-[10px] text-[#8C7A70] px-1 py-0.5">
                  +{product.ingredients.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price & Add to Cart action */}
        <div className="pt-3 border-t border-[#EFE8E1] flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-[#8C7A70] block">Price</span>
            <span className="font-serif font-bold text-lg text-[#2C1810]">
              ₹{product.price}
            </span>
          </div>

          {/* Action button */}
          {!product.available ? (
            <span className="text-xs font-semibold text-stone-400 bg-stone-100 px-3 py-1.5 rounded-xl">
              Sold Out
            </span>
          ) : cartItem ? (
            <div className="flex items-center bg-[#2C1810] text-white rounded-xl p-1 shadow-xs">
              <button
                type="button"
                onClick={() => updateQuantity(product._id, -1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors font-bold text-sm"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-7 text-center font-bold text-xs">{cartItem.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(product._id, 1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors font-bold text-sm"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer group-hover:bg-[#8B5A2B] group-hover:text-white"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
