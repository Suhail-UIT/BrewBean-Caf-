import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Heart, Award, ShieldCheck, Leaf, Users, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Karan Mehra',
      role: 'Head of Coffee & Master Roaster',
      bio: 'SCA certified Q-Grader with over 10 years curating specialty Arabica beans across Chikmagalur, Araku Valley, and Coorg.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Chef Ananya Sen',
      role: 'Executive Pastry & Bakery Chef',
      bio: 'Trained in French and Italian bakery techniques, bringing artisanal sourdough crusts, cheesecakes, and chocolate truffles to life.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Vikram Joshi',
      role: 'Hospitality & Café Experience Lead',
      bio: 'Focused on creating a warm, comfortable sanctuary for remote workers, families, and everyday coffee enthusiasts in Noida.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    },
  ];

  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      caption: 'Warm terracotta wooden interiors & ambient lighting',
    },
    {
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      caption: 'Manual pour-over station & single-origin beans',
    },
    {
      url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      caption: 'Quiet workstation zones with dedicated power plugs',
    },
    {
      url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
      caption: 'Classic cappuccino microfoam latte art',
    },
    {
      url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
      caption: 'Fresh hand-stretched Margherita from our stone oven',
    },
    {
      url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      caption: 'Rich Belgian chocolate truffle cake slice',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Page Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-[#F4EFEA] py-16 sm:py-24 border-b border-[#E8DFD8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider inline-flex items-center gap-1.5 bg-[#EFE9E1] px-3.5 py-1.5 rounded-full">
            <Coffee className="w-3.5 h-3.5" /> Our Journey
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#2C1810] tracking-tight">
            Crafted for the Love of Coffee & Gathering
          </h1>
          <p className="text-base sm:text-lg text-[#65554B] leading-relaxed max-w-2xl mx-auto">
            BrewBean Café was born from a desire to bring genuine specialty coffee culture and comforting, unpretentious artisanal food to the heart of Sector 62, Noida.
          </p>
        </div>
      </section>

      {/* 2. Our Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE9E1] text-xs font-bold text-[#8B5A2B]">
              Our Story
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2C1810]">
              From Chikmagalur Coffee Estates to Noida’s Digital Hub
            </h2>
            <p className="text-sm sm:text-base text-[#65554B] leading-relaxed">
              In early 2021, we noticed that professionals, students, and families in Sector 62 Noida had to choose between noisy fast-food joints or generic coffee chains with lackluster beans. We set out to build the café we always wished existed.
            </p>
            <p className="text-sm text-[#7D6E66] leading-relaxed">
              We partnered directly with heritage coffee planters in the Bababudangiri hills of Chikmagalur. Today, every bean served in our signature espresso, cappuccino, or cold brew is shade-grown, ethically picked, and roasted in small batches for maximum flavor clarity.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 border-t border-[#E8DFD8]">
              <div>
                <span className="font-serif font-black text-2xl text-[#2C1810] block">100%</span>
                <span className="text-xs text-[#8C7A70]">Single-Origin Arabica</span>
              </div>
              <div>
                <span className="font-serif font-black text-2xl text-[#2C1810] block">0%</span>
                <span className="text-xs text-[#8C7A70]">Artificial Flavors</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-stone-200">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80"
                alt="Barista brewing coffee at BrewBean Café"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Philosophy Pillars */}
      <section className="bg-[#FAF7F2] py-16 border-y border-[#E8DFD8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block">
              Core Principles
            </span>
            <h2 className="text-3xl font-serif font-black text-[#2C1810]">
              Our Culinary & Roasting Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EFE9E1] flex items-center justify-center text-[#8B5A2B]">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#2C1810]">
                Fresh, Unprocessed Food
              </h3>
              <p className="text-xs sm:text-sm text-[#65554B] leading-relaxed">
                We make our burger patties from scratch, slow-simmer our pasta sauces from Italian peeled tomatoes, and proof our pizza dough naturally without artificial preservatives.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EFE9E1] flex items-center justify-center text-[#8B5A2B]">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#2C1810]">
                Precision Brewing
              </h3>
              <p className="text-xs sm:text-sm text-[#65554B] leading-relaxed">
                Water mineral composition, grind micron size, and extraction yield are monitored daily to ensure your morning cappuccino tastes as nuanced as your evening cold coffee.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EFE9E1] flex items-center justify-center text-[#8B5A2B]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#2C1810]">
                Heartwarming Hospitality
              </h3>
              <p className="text-xs sm:text-sm text-[#65554B] leading-relaxed">
                Whether you're sitting for 4 hours with your laptop and a single espresso or hosting a 10-person family brunch, you are treated as family from the moment you step in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why BrewBean? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2C1810] rounded-3xl p-8 sm:p-14 text-white space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider block mb-2">
              The Workspace Haven
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight">
              Why Professionals & Remote Teams Choose BrewBean
            </h2>
            <p className="text-xs sm:text-sm text-[#D5C6BA] mt-2 leading-relaxed">
              We built our layout specifically considering the needs of Noida’s tech ecosystem and creative community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <CheckCircle2 className="w-5 h-5 text-[#D4A373]" />
              <h4 className="font-bold text-sm text-white">300 Mbps Fiber</h4>
              <p className="text-xs text-[#BDB0A4]">High bandwidth Wi-Fi with dual fallbacks for uninterrupted Zoom calls.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <CheckCircle2 className="w-5 h-5 text-[#D4A373]" />
              <h4 className="font-bold text-sm text-white">Power at Every Table</h4>
              <p className="text-xs text-[#BDB0A4]">Dedicated international sockets and USB-C ports so your devices stay charged.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <CheckCircle2 className="w-5 h-5 text-[#D4A373]" />
              <h4 className="font-bold text-sm text-white">Ergonomic Seating</h4>
              <p className="text-xs text-[#BDB0A4]">Cushioned lumbar-support chairs and solid oak desks designed for long sessions.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <CheckCircle2 className="w-5 h-5 text-[#D4A373]" />
              <h4 className="font-bold text-sm text-white">All-Day Fuel</h4>
              <p className="text-xs text-[#BDB0A4]">Wholesome high-protein breakfasts, fresh salads, and continuous clean water.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block">
            Meet the Artisans
          </span>
          <h2 className="text-3xl font-serif font-black text-[#2C1810]">
            The People Behind Your Cup & Plate
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E8DFD8] text-center space-y-4"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-[#DDD3C9]"
              />
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2C1810]">{member.name}</h3>
                <span className="text-xs font-semibold text-[#8B5A2B] block mt-0.5">{member.role}</span>
              </div>
              <p className="text-xs text-[#65554B] leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Café Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block">
            Visual Tour
          </span>
          <h2 className="text-3xl font-serif font-black text-[#2C1810]">
            Café Gallery
          </h2>
          <p className="text-xs sm:text-sm text-[#7D6E66]">
            A glimpse into the sights, roasts, and daily rhythm at BrewBean Café Sector 62.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-200 border border-[#E8DFD8] shadow-xs"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <p className="text-xs font-semibold text-white">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
