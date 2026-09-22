import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Sparkles, Coffee, Utensils, SlidersHorizontal, X } from 'lucide-react';
import api from '../services/api';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

export const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'popular'>('default');

  const categories = ['All', 'Coffee', 'Breakfast', 'Pizza', 'Pasta', 'Burgers', 'Desserts'];

  // Sync url param if changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to load menu products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Filter & Sort logic
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Vegetarian filter
      if (vegetarianOnly && !product.vegetarian) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesIng = product.ingredients.some((ing) => ing.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesIng) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider inline-flex items-center gap-1.5 bg-[#EFE9E1] px-3 py-1 rounded-full">
          <Coffee className="w-3.5 h-3.5" /> Handcrafted Menu
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#2C1810] tracking-tight">
          Artisanal Coffee & Kitchen Menu
        </h1>
        <p className="text-sm text-[#7D6E66] leading-relaxed">
          From freshly pulled single-origin espresso to hand-stretched pizzas, wholesome breakfasts, and decadent desserts in Sector 62, Noida.
        </p>
      </div>

      {/* Controls Bar: Search, Veg Toggle, Sort */}
      <div className="bg-[#FAF7F2] rounded-3xl p-5 border border-[#E8DFD8] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C7A70] absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coffee, pasta, pizza, desserts, ingredients..."
              className="w-full pl-11 pr-10 py-2.5 bg-white border border-[#DDD3C9] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters right side: Veg toggle & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Vegetarian Toggle */}
            <button
              type="button"
              onClick={() => setVegetarianOnly(!vegetarianOnly)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border ${
                vegetarianOnly
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                  : 'bg-white border-[#DDD3C9] text-[#5C4D44] hover:bg-[#F4EFEA]'
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-sm border border-emerald-600 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </div>
              <span>Pure Veg Only</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-[#DDD3C9] rounded-2xl px-3 py-1.5 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C7A70]" />
              <span className="text-[#8C7A70] font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-[#2C1810] focus:outline-none cursor-pointer"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Bestsellers First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#2C1810] text-white shadow-sm'
                  : 'bg-[#EFE9E1] text-[#5C4D44] hover:bg-[#E4DBD0] hover:text-[#2C1810]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active filters indicators */}
      {(selectedCategory !== 'All' || vegetarianOnly || searchQuery) && (
        <div className="flex items-center gap-2 flex-wrap text-xs text-[#7D6E66]">
          <span className="font-semibold">Filtered by:</span>
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 bg-[#EFE9E1] text-[#2C1810] font-bold px-2.5 py-1 rounded-lg">
              {selectedCategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategorySelect('All')} />
            </span>
          )}
          {vegetarianOnly && (
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg">
              Veg Only
              <X className="w-3 h-3 cursor-pointer" onClick={() => setVegetarianOnly(false)} />
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 bg-[#EFE9E1] text-[#2C1810] font-bold px-2.5 py-1 rounded-lg">
              "{searchQuery}"
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
            </span>
          )}
          <button
            onClick={() => {
              handleCategorySelect('All');
              setVegetarianOnly(false);
              setSearchQuery('');
            }}
            className="text-[#8B5A2B] font-bold hover:underline ml-2 cursor-pointer"
          >
            Reset all
          </button>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-88 bg-stone-200/60 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        /* Empty state */
        <div className="bg-[#FAF7F2] rounded-3xl p-12 border border-[#E8DFD8] text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#EFE9E1] flex items-center justify-center mx-auto text-[#8B5A2B]">
            <Utensils className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#2C1810]">
            No menu items found
          </h3>
          <p className="text-xs text-[#7D6E66]">
            We couldn't find any food or beverage matching your search or filters. Try clearing your filters.
          </p>
          <button
            onClick={() => {
              handleCategorySelect('All');
              setVegetarianOnly(false);
              setSearchQuery('');
            }}
            className="px-6 py-2.5 bg-[#2C1810] text-white rounded-xl text-xs font-bold hover:bg-[#432619] transition-all"
          >
            Show All Menu Items
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
