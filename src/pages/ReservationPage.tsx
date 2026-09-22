import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Users, Coffee, CheckCircle2, MessageSquare, Phone, Mail, User, Sparkles, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export const ReservationPage: React.FC = () => {
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('18:00');
  const [guests, setGuests] = useState(2);
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState<any | null>(null);

  const timeSlots = [
    '09:00', '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30', '21:30'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !email || !date || !time) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.post('/reservations', {
        name,
        phone,
        email,
        date,
        time,
        guests: Number(guests),
        specialRequest,
      });

      setReservationSuccess(res.data.reservation);
      showToast('Your table reservation request has been received.', 'success');
    } catch (err: any) {
      console.error('Reservation error:', err);
      showToast(err.response?.data?.message || 'Failed to book table. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookAnother = () => {
    setReservationSuccess(null);
    setSpecialRequest('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider inline-flex items-center gap-1.5 bg-[#EFE9E1] px-3 py-1 rounded-full">
          <CalendarIcon className="w-3.5 h-3.5" /> Book a Table
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#2C1810] tracking-tight">
          Reserve Your Cozy Table in Noida
        </h1>
        <p className="text-sm text-[#7D6E66] leading-relaxed">
          Whether you're planning a productive morning work session, a casual coffee catchup, or an intimate dinner with loved ones at Sector 62.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Atmosphere & Policy Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-stone-200 border border-[#E8DFD8]">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
              alt="BrewBean Café Table Seating in Sector 62 Noida"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E8DFD8] space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#2C1810]">
              Reservation Notes & Amenities
            </h3>
            <ul className="space-y-3 text-xs text-[#65554B]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B5A2B] shrink-0 mt-0.5" />
                <span><strong>No Reservation Fee:</strong> Table reservations are 100% complimentary.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B5A2B] shrink-0 mt-0.5" />
                <span><strong>Holding Window:</strong> We hold reserved tables for up to 15 minutes past the booking time.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B5A2B] shrink-0 mt-0.5" />
                <span><strong>Workstation Amenities:</strong> High-speed Wi-Fi and universal charging sockets available at all window and counter tables.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B5A2B] shrink-0 mt-0.5" />
                <span><strong>Need Immediate Assistance?</strong> Call us directly at <a href="tel:+919876542180" className="text-[#8B5A2B] font-bold underline">+91 98765 42180</a>.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Form or Success Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {reservationSuccess ? (
              /* Success confirmation state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-10 border border-[#E8DFD8] shadow-xl text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                    Reservation Confirmed
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#2C1810]">
                    Your table reservation request has been received.
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7D6E66] max-w-md mx-auto">
                    We look forward to hosting you at BrewBean Café, Sector 62, Noida! A confirmation email and SMS reminder have been recorded.
                  </p>
                </div>

                {/* Booking details card */}
                <div className="bg-[#EFE9E1] rounded-2xl p-5 text-left max-w-md mx-auto space-y-2.5 text-xs text-[#5C4D44]">
                  <div className="flex justify-between border-b border-[#DDD3C9] pb-2">
                    <span className="text-[#8C7A70] font-semibold">Guest Name:</span>
                    <strong className="text-[#2C1810]">{reservationSuccess.name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#DDD3C9] pb-2">
                    <span className="text-[#8C7A70] font-semibold">Date & Time:</span>
                    <strong className="text-[#2C1810]">
                      {reservationSuccess.date} at {reservationSuccess.time}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-[#DDD3C9] pb-2">
                    <span className="text-[#8C7A70] font-semibold">Number of Guests:</span>
                    <strong className="text-[#2C1810]">{reservationSuccess.guests} People</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#DDD3C9] pb-2">
                    <span className="text-[#8C7A70] font-semibold">Contact:</span>
                    <strong className="text-[#2C1810]">{reservationSuccess.phone}</strong>
                  </div>
                  {reservationSuccess.specialRequest && (
                    <div className="pt-1">
                      <span className="text-[#8C7A70] font-semibold block mb-0.5">Special Note:</span>
                      <p className="italic text-[#2C1810]">"{reservationSuccess.specialRequest}"</p>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleBookAnother}
                    className="px-6 py-3 rounded-xl bg-[#2C1810] text-white text-xs font-bold hover:bg-[#432619] transition-colors cursor-pointer"
                  >
                    Make Another Reservation
                  </button>
                  <a
                    href="/menu"
                    className="px-6 py-3 rounded-xl bg-white border border-[#DDD3C9] text-[#2C1810] text-xs font-bold hover:bg-stone-50 transition-colors"
                  >
                    View Our Menu
                  </a>
                </div>
              </motion.div>
            ) : (
              /* Booking form */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-6"
              >
                <h2 className="font-serif font-bold text-xl text-[#2C1810] border-b border-[#E8DFD8] pb-3">
                  Reservation Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Arjun Mehta"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 42180"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="arjun@example.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                    />
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                      Number of Guests *
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-3" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810] cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Time slot picker */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                      Preferred Time Slot *
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                            time === slot
                              ? 'bg-[#2C1810] text-white border-[#2C1810] shadow-xs'
                              : 'bg-white text-[#5C4D44] border-[#DDD3C9] hover:bg-[#F4EFEA]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Request */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                      Special Request (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="e.g. Quiet corner table for laptop work, window view, birthday dessert surprise, high chair needed..."
                      className="w-full p-3 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#2C1810] hover:bg-[#432619] active:bg-[#1D100A] text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <CalendarIcon className="w-4 h-4 text-[#D4A373]" />
                      <span>Reserve Table</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
