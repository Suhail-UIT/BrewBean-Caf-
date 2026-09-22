import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Coffee,
  Sparkles,
  Calendar,
  ArrowRight,
  Wifi,
  Leaf,
  Award,
  Armchair,
  Star,
  Quote,
  Clock,
  MapPin,
  CheckCircle2,
  Tag,
  Utensils,
} from 'lucide-react';
import api from '../services/api';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export const HomePage: React.FC = () => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await api.get('/products');
        const all: Product[] = res.data;
        // Filter popular or top 6 items as requested: Classic Cappuccino, Hazelnut Latte, Margherita Pizza, Creamy Alfredo Pasta, Crispy Chicken Burger, Chocolate Truffle Cake
        const popularNames = [
          'Classic Cappuccino',
          'Hazelnut Latte',
          'Margherita Pizza',
          'Creamy Alfredo Pasta',
          'Crispy Chicken Burger',
          'Chocolate Truffle Cake',
        ];
        const curated = all.filter((p) => popularNames.includes(p.name));
        setPopularProducts(curated.length >= 6 ? curated : all.slice(0, 6));
      } catch (err) {
        console.error('Error fetching popular products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  const categories = [
    {
      name: 'Coffee',
      tag: 'Handcrafted brews & cold coffees',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Breakfast',
      tag: 'Fresh omelettes, pancakes & toasts',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Pizza',
      tag: 'Artisan hand-stretched stone-baked crusts',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Pasta',
      tag: 'Rich creamy Alfredo & slow-simmered Arrabbiata',
      image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Burgers',
      tag: 'Crispy chicken & hearty spiced veg patties',
      image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Desserts',
      tag: 'Fudge brownies, truffle cakes & cheesecakes',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const whyChooseUsFeatures = [
    {
      icon: <Leaf className="w-6 h-6 text-[#2D5A3A]" />,
      title: 'Fresh Ingredients',
      description: 'Locally sourced fresh farm produce, certified organic dairy, and baked sourdough delivered daily to our kitchen.',
    },
    {
      icon: <Award className="w-6 h-6 text-[#8B5A2B]" />,
      title: 'Expertly Crafted Coffee',
      description: '100% single-origin Arabica beans from Chikmagalur estates, calibrated roast profiles, and SCA-trained baristas.',
    },
    {
      icon: <Armchair className="w-6 h-6 text-[#A37042]" />,
      title: 'Comfortable Ambience',
      description: 'Warm terracotta tones, ergonomic oak wood workstations, cozy lounge corners, and calming indie acoustics.',
    },
    {
      icon: <Wifi className="w-6 h-6 text-[#1A4F70]" />,
      title: 'Free Wi-Fi',
      description: 'Complimentary fiber-optic 300 Mbps Wi-Fi with dedicated power outlets at every desk for seamless remote work.',
    },
  ];

  const reviews = [
    {
      name: 'Rahul Sharma',
      role: 'Senior Software Engineer, Sector 62',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      comment: 'Great coffee, peaceful atmosphere and very friendly staff. Perfect place to work for a few hours with great high-speed internet and quiet corners.',
      rating: 5,
    },
    {
      name: 'Ananya Verma',
      role: 'Content Strategist & Freelancer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      comment: 'The pasta and cold coffee were amazing. Definitely coming back. The creamy Alfredo was genuinely cooked to perfection with real herbs.',
      rating: 5,
    },
    {
      name: 'Arjun Mehta',
      role: 'Product Designer, Noida',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      comment: 'Beautiful ambience and good food at reasonable prices. The hazelnut latte and sourdough sandwich make my morning meetings so much better.',
      rating: 5,
    },
  ];

  const handleOrderSpecialCombo = () => {
    // Add combo representation to cart
    const comboProduct: Product = {
      _id: 'combo-special-1',
      name: 'Coffee & Breakfast Combo',
      description: 'Freshly brewed artisan cappuccino or latte paired with your choice of farm masala omelette or warm pancake stack.',
      price: 249,
      category: 'Breakfast',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Artisan Coffee', 'Breakfast Choice', 'Maple Syrup or Toast'],
      vegetarian: true,
      available: true,
      popular: true,
    };
    addToCart(comboProduct, 1);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4EFEA] to-[#FAF7F2] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#E8DFD8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8E1] border border-[#DDD3C9] text-xs font-semibold text-[#8B5A2B]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Modern Indian Café & Bakery • Sector 62, Noida</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#2C1810] tracking-tight leading-[1.12]">
                Fresh Coffee. <br />
                <span className="text-[#8B5A2B] italic font-normal">Good Food.</span> <br />
                Better Moments.
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-[#65554B] max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Your neighbourhood café for handcrafted coffee, delicious food and moments worth sharing. Designed for coffee connoisseurs, food lovers, and remote professionals seeking comfort and inspiration.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2C1810] hover:bg-[#432619] text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Explore Menu</span>
                </Link>
                <Link
                  to="/book-table"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FAF7F2] hover:bg-[#EFEAE4] border-2 border-[#8B5A2B] text-[#8B5A2B] font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Table</span>
                </Link>
              </div>

              {/* Quick Info Bar */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#E8DFD8]/80 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#EFE9E1] flex items-center justify-center text-[#8B5A2B]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2C1810] block">8 AM - 11 PM</span>
                    <span className="text-[11px] text-[#8C7A70]">Open all 7 days</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#EFE9E1] flex items-center justify-center text-[#8B5A2B]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2C1810] block">Sector 62</span>
                    <span className="text-[11px] text-[#8C7A70]">Noida, UP</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="w-8 h-8 rounded-full bg-[#EFE9E1] flex items-center justify-center text-[#8B5A2B]">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2C1810] block">Free Wi-Fi</span>
                    <span className="text-[11px] text-[#8C7A70]">Work friendly</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
                    alt="BrewBean Café handcrafted coffee and warm artisanal setting"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating badge inside image */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block">
                          House Roast Signature
                        </span>
                        <p className="font-serif font-bold text-base text-[#2C1810]">
                          Hazelnut Latte & Warm Brownie
                        </p>
                      </div>
                      <span className="font-serif font-extrabold text-lg text-[#2C1810] bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#E8DFD8]">
                        ₹190
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating secondary badge */}
                <div className="hidden sm:flex absolute -top-5 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-[#E8DFD8] items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8B5A2B] flex items-center justify-center text-white">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#2C1810]">4.9 / 5 Rated in Noida</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#E8DFD8] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80"
                  alt="BrewBean Café interior seating in Sector 62 Noida"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 p-4 rounded-xl bg-[#EFE9E1] border border-[#DDD3C9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-[#2C1810]">Comfortable Seating & Air-Conditioned</span>
                </div>
                <span className="text-[11px] text-[#8C7A70] font-medium">Quiet Work Zone</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE9E1] text-xs font-bold text-[#8B5A2B]">
                About BrewBean Café
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2C1810] tracking-tight leading-tight">
                A Modern Sanctuary for Coffee Lovers & Remote Creators in Noida
              </h2>

              <p className="text-sm sm:text-base text-[#65554B] leading-relaxed">
                BrewBean Café is a contemporary neighborhood café located in the vibrant hub of Sector 62, Noida. Designed specifically for coffee lovers, food enthusiasts, and professionals looking for a cozy, inspiring environment to work, unwind, or catch up with friends.
              </p>

              <p className="text-sm text-[#7D6E66] leading-relaxed">
                From morning pour-overs and wholesome breakfast bowls to stone-fired pizzas, creamy pastas, and melt-in-mouth chocolate desserts, everything we serve is prepared fresh to order using premium quality ingredients.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#8B5A2B] hover:text-[#5C3917] transition-colors group"
                >
                  <span>Read our full story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-[#DDD3C9]">•</span>
                <Link
                  to="/book-table"
                  className="text-sm font-semibold text-[#2C1810] hover:underline"
                >
                  Reserve a workstation table
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block mb-1">
              Curated Offerings
            </span>
            <h2 className="text-3xl font-serif font-black text-[#2C1810] tracking-tight">
              Featured Categories
            </h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#8B5A2B] hover:text-[#2C1810] transition-colors"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/menu?category=${cat.name}`}
              className="group bg-[#FAF7F2] rounded-2xl border border-[#E8DFD8] p-3 text-center hover:shadow-lg hover:border-[#D4A373] transition-all flex flex-col items-center"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-stone-200">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif font-bold text-base text-[#2C1810] group-hover:text-[#8B5A2B] transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-[#8C7A70] line-clamp-1 mt-0.5">
                {cat.tag}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. POPULAR ITEMS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block mb-1">
              Guest Favorites
            </span>
            <h2 className="text-3xl font-serif font-black text-[#2C1810] tracking-tight">
              Popular Items
            </h2>
            <p className="text-xs sm:text-sm text-[#7D6E66] mt-1">
              Handpicked customer bestsellers freshly prepared in our café kitchen.
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EFE9E1] text-[#2C1810] text-xs font-bold hover:bg-[#E4DBD0] transition-colors"
          >
            <span>See All 21 Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-stone-200/60 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {popularProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. SPECIAL OFFER SECTION (Combo Offer) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2C1810] via-[#4A2E1B] to-[#2C1810] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-[#5C3D2B]">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#D4A373]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4A373]/20 border border-[#D4A373]/40 text-[#D4A373] text-xs font-bold tracking-wider uppercase">
                <Tag className="w-3.5 h-3.5" /> Morning Special Offer
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white">
                Coffee & Breakfast Combo
              </h2>

              <p className="text-base text-[#E5D7CC] leading-relaxed max-w-xl">
                Start your morning with a freshly brewed handcrafted coffee and a delicious breakfast of your choice (Masala Omelette, Pancake Stack, or Veg Sandwich).
              </p>

              <div className="flex items-baseline gap-3 pt-2 justify-center lg:justify-start">
                <span className="text-xs uppercase tracking-wider text-[#D4A373] font-bold">Special Price:</span>
                <span className="font-serif text-4xl font-extrabold text-white">₹249</span>
                <span className="text-sm text-[#A39284] line-through">₹360</span>
                <span className="text-xs bg-emerald-700/80 text-emerald-100 font-bold px-2 py-0.5 rounded-md">Save 30%</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleOrderSpecialCombo}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D4A373] hover:bg-[#E5B586] text-[#2C1810] font-extrabold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Order Now (₹249)</span>
                </button>
                <Link
                  to="/menu?category=Breakfast"
                  className="text-xs text-[#E5D7CC] hover:text-white underline font-semibold"
                >
                  View included breakfast items
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80"
                  alt="Coffee & Breakfast Combo at BrewBean Café"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block mb-1">
            The BrewBean Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2C1810] tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-sm text-[#7D6E66] mt-2">
            Every detail at BrewBean Café is intentionally designed to elevate your palate and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUsFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E8DFD8] hover:border-[#8B5A2B]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EFE9E1] flex items-center justify-center mb-5">
                  {feat.icon}
                </div>
                <h3 className="font-serif font-bold text-xl text-[#2C1810] mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5A50] leading-relaxed">
                  {feat.description}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#EFE8E1]">
                <span className="text-[11px] font-bold text-[#8B5A2B] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Guaranteed Standard
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block mb-1">
            Community Love
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2C1810] tracking-tight">
            What Our Guests Say
          </h2>
          <p className="text-sm text-[#7D6E66] mt-2">
            Real stories from our patrons, food lovers, and remote coworkers in Noida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#FAF7F2] rounded-3xl p-7 border border-[#E8DFD8] shadow-xs flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-[#D4A373]/40 absolute top-6 right-6" />
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#4A3B32] italic leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#EFE8E1]">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#DDD3C9]"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#2C1810]">{rev.name}</h4>
                  <span className="text-[11px] text-[#8C7A70]">{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. VISIT & RESERVATION CTA STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFE9E1] rounded-3xl p-8 sm:p-12 border border-[#DDD3C9] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810]">
              Planning to visit us in Sector 62, Noida?
            </h3>
            <p className="text-xs sm:text-sm text-[#65554B] mt-1">
              Walk-ins are always warmly welcomed, or reserve your table in advance for meetings or celebrations.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <Link
              to="/book-table"
              className="flex-1 lg:flex-none px-6 py-3 rounded-xl bg-[#2C1810] hover:bg-[#432619] text-white font-bold text-xs tracking-wide transition-all text-center"
            >
              Book a Table
            </Link>
            <Link
              to="/contact"
              className="flex-1 lg:flex-none px-6 py-3 rounded-xl bg-white border border-[#DDD3C9] hover:bg-stone-50 text-[#2C1810] font-bold text-xs tracking-wide transition-all text-center"
            >
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
