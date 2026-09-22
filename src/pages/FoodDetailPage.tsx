import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingBag, CheckCircle, Star, Sparkles, Heart } from 'lucide-react';
import api from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const FoodDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);

        // Fetch related products from the same category
        const allRes = await api.get(`/products?category=${res.data.category}`);
        const related = allRes.data.filter((p: Product) => p._id !== res.data._id);
        setRelatedProducts(related.slice(0, 3));
      } catch (err) {
        console.error('Error fetching product details', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-96 bg-stone-200/60 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#2C1810]">Product Not Found</h2>
        <p className="text-xs text-[#7D6E66]">
          The item you are looking for is unavailable or may have been removed.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2C1810] text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#7D6E66] hover:text-[#2C1810] transition-colors bg-[#EFE9E1] px-3.5 py-2 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Large Food Image */}
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E8DFD8] aspect-[4/3] bg-stone-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Veg / Non-veg tag */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center bg-white/95 backdrop-blur-xs shadow-md ${
                  product.vegetarian ? 'border-emerald-600' : 'border-rose-700'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    product.vegetarian ? 'bg-emerald-600' : 'bg-rose-700'
                  }`}
                />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md">
                {product.vegetarian ? 'Pure Vegetarian' : 'Non-Vegetarian'}
              </span>
            </div>

            {product.popular && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-[#8B5A2B] text-white text-xs font-bold flex items-center gap-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-current" /> Bestseller
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#2C1810]">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-xs text-[#8C7A70] uppercase font-semibold">Price:</span>
              <span className="font-serif text-3xl font-extrabold text-[#2C1810]">
                ₹{product.price}
              </span>
              <span className="text-xs text-[#7D6E66]">incl. all taxes</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#65554B] leading-relaxed border-t border-b border-[#E8DFD8] py-4">
            {product.description}
          </p>

          {/* Ingredients list */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] block">
                Fresh Ingredients & Craft
              </span>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-[#EFE9E1] text-[#4A3B32] text-xs font-semibold border border-[#DDD3C9]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector & Add to Cart */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center bg-[#EFE9E1] rounded-2xl p-1 border border-[#DDD3C9]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white hover:bg-[#F4EFEA] text-[#2C1810] font-bold transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#2C1810]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white hover:bg-[#F4EFEA] text-[#2C1810] font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main CTA */}
            <button
              type="button"
              disabled={!product.available}
              onClick={handleAddToCart}
              className="w-full sm:w-auto min-w-[240px] px-8 py-4 rounded-2xl bg-[#2C1810] hover:bg-[#432619] active:bg-[#1D100A] text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart • ₹{product.price * quantity}</span>
            </button>
          </div>

          {/* Kitchen notice */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFD8] text-xs text-[#7D6E66] space-y-1">
            <p className="font-bold text-[#2C1810]">Chef’s Note:</p>
            <p>
              Prepared fresh upon order in our Sector 62 kitchen. Dine-in, takeaway, and contactless delivery available.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#E8DFD8] space-y-8">
          <div>
            <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block mb-1">
              Pairing Recommendations
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#2C1810]">
              You May Also Love
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
