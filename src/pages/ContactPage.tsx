import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChevronDown, MessageSquare } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FAQ open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Where exactly in Sector 62, Noida are you located?',
      a: 'We are situated in the central commercial district of Sector 62, Noida, close to major corporate IT parks and universities, easily accessible via Electronic City Metro Station with ample parking space.',
    },
    {
      q: 'Do you provide high-speed Wi-Fi and charging points?',
      a: 'Yes! We offer high-speed 300 Mbps fiber-optic internet free of charge to all patrons. Every booth and workstation table is equipped with dedicated universal electrical outlets and USB ports.',
    },
    {
      q: 'Can I host a team meeting or birthday celebration here?',
      a: 'Absolutely. You can reserve tables for groups up to 15 people directly via our "Book a Table" page or call us for custom catering menus and party arrangements.',
    },
    {
      q: 'Do you offer vegan, gluten-free, or Jain food choices?',
      a: 'Yes, we provide oat milk and almond milk alternatives for all espresso beverages, gluten-free pizza crust options upon request, and multiple freshly made vegetarian and vegan items clearly marked on our menu.',
    },
    {
      q: 'What are your operating hours and delivery timings?',
      a: 'BrewBean Café is open 7 days a week, Monday through Sunday, from 8:00 AM in the morning to 11:00 PM at night. Delivery and takeaway are available during all open hours.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out your name, email, and message.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/contact', {
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
      });

      setSubmitted(true);
      showToast('Message sent! We will get back to you shortly.', 'success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      console.error('Contact submit error:', err);
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider inline-flex items-center gap-1.5 bg-[#EFE9E1] px-3 py-1 rounded-full">
          <MessageSquare className="w-3.5 h-3.5" /> Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#2C1810] tracking-tight">
          Visit Us or Say Hello
        </h1>
        <p className="text-sm text-[#7D6E66] leading-relaxed">
          Have a question about our menu, corporate catering, or looking for directions to our Sector 62 café? We'd love to hear from you.
        </p>
      </div>

      {/* Main Grid: Contact Info Cards & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] space-y-6">
            <h2 className="font-serif font-bold text-xl text-[#2C1810] border-b border-[#E8DFD8] pb-3">
              Café Information
            </h2>

            <div className="space-y-5 text-xs sm:text-sm text-[#5C4D44]">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#EFE9E1] flex items-center justify-center text-[#8B5A2B] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#2C1810] block font-serif text-sm">Location Address:</strong>
                  <p className="mt-0.5 text-[#65554B]">
                    Sector 62, Noida, Uttar Pradesh, 201309, India
                  </p>
                  <span className="text-[11px] text-[#8C7A70] block mt-0.5">
                    Near Noida Electronic City Metro Station
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#EFE9E1] flex items-center justify-center text-[#8B5A2B] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#2C1810] block font-serif text-sm">Phone Number:</strong>
                  <a
                    href="tel:+919876542180"
                    className="mt-0.5 text-[#8B5A2B] font-bold hover:underline block"
                  >
                    +91 98765 42180
                  </a>
                  <span className="text-[11px] text-[#8C7A70]">Available 8 AM - 11 PM for inquiries</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#EFE9E1] flex items-center justify-center text-[#8B5A2B] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#2C1810] block font-serif text-sm">Email Address:</strong>
                  <a
                    href="mailto:hello@brewbeancafe.in"
                    className="mt-0.5 text-[#8B5A2B] font-bold hover:underline block"
                  >
                    hello@brewbeancafe.in
                  </a>
                  <span className="text-[11px] text-[#8C7A70]">Queries replied within 24 business hours</span>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#EFE9E1] flex items-center justify-center text-[#8B5A2B] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#2C1810] block font-serif text-sm">Opening Hours:</strong>
                  <p className="mt-0.5 text-[#2C1810] font-semibold">
                    Monday - Sunday: 8:00 AM - 11:00 PM
                  </p>
                  <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
                    Open all 365 days including holidays
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map Preview */}
          <div className="bg-[#FAF7F2] rounded-3xl p-4 border border-[#E8DFD8] shadow-xs overflow-hidden">
            <div className="w-full h-56 rounded-2xl overflow-hidden relative bg-stone-200 border border-[#DDD3C9]">
              {/* Embedded Google Map iframe focused on Sector 62 Noida */}
              <iframe
                title="BrewBean Café Location Map"
                src="https://maps.google.com/maps?q=Sector%2062,%20Noida,%20Uttar%20Pradesh,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-3 text-center">
              <a
                href="https://maps.google.com/?q=Sector+62+Noida+Uttar+Pradesh"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#8B5A2B] hover:underline"
              >
                Open in Google Maps App ↗
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7 bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-6">
          <h2 className="font-serif font-bold text-xl text-[#2C1810] border-b border-[#E8DFD8] pb-3">
            Send us a Message
          </h2>

          {submitted && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thank you! Your message has been sent successfully. Our team will get back to you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="priya@example.com"
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Corporate Catering / Feedback / Event Hosting"
                className="w-full px-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                Your Message *
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how we can help you or share your thoughts about your recent visit..."
                className="w-full p-3.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#2C1810] hover:bg-[#432619] active:bg-[#1D100A] text-white font-bold text-xs tracking-wide rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#D4A373]" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#E8DFD8] space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block">
            Frequently Asked
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#2C1810]">
            Common Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#E8DFD8]">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                >
                  <span className="font-serif font-bold text-base text-[#2C1810] group-hover:text-[#8B5A2B] transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C7A70] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#8B5A2B]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-[#65554B] leading-relaxed mt-2.5 pr-6">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
