import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import HotelCard from './HotelCard';
import { Sparkles, DollarSign, Award, CheckCircle2, TrendingUp, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function BudgetRecommendations({ onSelectHotel, onGoToCalculator }) {
  const { hotels, budget, durationDays, travellers, selectedHotel, setSelectedHotel } = useTravel();
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'low', 'premium'

  // Filter top verified hotels
  const lowBudgetHotels = hotels
    .filter(h => h.category === 'low' && h.verified)
    .sort((a, b) => b.rating - a.rating || a.pricePerNight - b.pricePerNight)
    .slice(0, 3);

  const premiumHotels = hotels
    .filter(h => h.category === 'premium' && h.verified)
    .sort((a, b) => b.rating - a.rating || a.trustScore - b.trustScore)
    .slice(0, 3);

  const handleSelect = (hotel) => {
    setSelectedHotel(hotel);
    if (onSelectHotel) onSelectHotel(hotel);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Context Summary */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-purple-lg relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-purple-200 border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Smart Recommendation Engine</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl text-white">
              Intelligent Budget-Based Hotel Recommendations
            </h2>
            <p className="text-sm text-purple-100/85 leading-relaxed">
              Curated verified stays tailored to your allocated budget of <strong className="text-white underline decoration-amber-400">₹{budget.toLocaleString('en-IN')}</strong> for <strong className="text-white">{durationDays} Days</strong> ({travellers} Guests). Compare our Top 3 Budget Champions against Top 3 Premium Retreats.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-white/10 border border-white/15 backdrop-blur-md rounded-2xl p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="text-center sm:text-left">
              <div className="text-xs text-purple-200 uppercase font-semibold">Total Trip Budget</div>
              <div className="text-2xl font-black text-white">₹{budget.toLocaleString('en-IN')}</div>
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
            <div className="text-center sm:text-left">
              <div className="text-xs text-purple-200 uppercase font-semibold">Max Safe Room/Night</div>
              <div className="text-2xl font-black text-amber-300">
                ₹{Math.round((budget * 0.45) / durationDays).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-purple-950/60 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-white text-purple-950 shadow-md font-extrabold'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              Side-by-Side View (Top 6)
            </button>
            <button
              onClick={() => setActiveCategory('low')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeCategory === 'low'
                  ? 'bg-white text-purple-950 shadow-md font-extrabold'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              <span>💵 Top 3 Low Budget</span>
            </button>
            <button
              onClick={() => setActiveCategory('premium')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeCategory === 'premium'
                  ? 'bg-white text-purple-950 shadow-md font-extrabold'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              <span>💎 Top 3 Premium</span>
            </button>
          </div>

          <div className="text-xs text-purple-200 flex items-center gap-1 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% verified against fake listings & unregistered rooms</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: LOW BUDGET CATEGORY */}
      {(activeCategory === 'all' || activeCategory === 'low') && (
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-black text-lg border border-purple-200 shadow-sm">
                💵
              </div>
              <div>
                <h3 className="text-xl font-black text-purple-950 flex items-center gap-2">
                  <span>Low Budget Category</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Highest Value Picks
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Affordable rates (₹1,200 – ₹1,800/night) • Verified clean hygiene • Strategic near station/transport
                </p>
              </div>
            </div>

            <div className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200 self-start sm:self-auto">
              Average 3-Night Stay: ~₹4,500 (Leaves 70% budget for food & sights)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lowBudgetHotels.map((hotel, index) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onSelect={handleSelect}
                isSelected={selectedHotel?.id === hotel.id}
                rankBadge={`#${index + 1} Best Low Budget`}
              />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: HIGH BUDGET / PREMIUM CATEGORY */}
      {(activeCategory === 'all' || activeCategory === 'premium') && (
        <section className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-black text-lg border border-purple-200 shadow-sm">
                💎
              </div>
              <div>
                <h3 className="text-xl font-black text-purple-950 flex items-center gap-2">
                  <span>High Budget / Premium Category</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                    Luxury & Executive Class
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Premium comfort (₹3,500 – ₹4,500/night) • Multi-cuisine dining • 24/7 round-the-clock safety & concierge
                </p>
              </div>
            </div>

            <div className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200 self-start sm:self-auto">
              Average 3-Night Stay: ~₹11,500 (Maximum comfort & luxury amenities)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumHotels.map((hotel, index) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onSelect={handleSelect}
                isSelected={selectedHotel?.id === hotel.id}
                rankBadge={`#${index + 1} Best Luxury`}
              />
            ))}
          </div>
        </section>
      )}

      {/* COMPARATIVE MATRIX TABLE */}
      <div className="bg-white rounded-3xl p-6 shadow-purple-sm border border-purple-100 overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-black text-purple-950">
              Quick Comparison: Low Budget vs Premium
            </h4>
            <p className="text-xs text-slate-500">
              Side-by-side breakdown of features, safety, and price impact for {durationDays} days.
            </p>
          </div>
          <button
            onClick={onGoToCalculator}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 px-3 py-2 rounded-xl border border-purple-200 transition"
          >
            <span>Open AI Budget Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-purple-100 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Top Pick Example</th>
                <th className="py-3 px-4 font-bold">Nightly Tariff</th>
                <th className="py-3 px-4 font-bold">{durationDays}-Day Total Stay</th>
                <th className="py-3 px-4 font-bold">% of Budget</th>
                <th className="py-3 px-4 font-bold">Key Safety Highlights</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50 text-slate-700 font-medium">
              <tr className="hover:bg-purple-50/50 transition">
                <td className="py-3.5 px-4 font-bold text-emerald-700 flex items-center gap-1.5">
                  <span>💵 Low Budget</span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-purple-950">Hotel Mayura Deluxe</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">₹1,200</td>
                <td className="py-3.5 px-4 font-black text-purple-700">₹{1200 * durationDays}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {Math.round(((1200 * durationDays) / budget) * 100)}%
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-500">CCTV, Fire NOC, 200m from One Town Police</td>
              </tr>
              <tr className="hover:bg-purple-50/50 transition">
                <td className="py-3.5 px-4 font-bold text-purple-700 flex items-center gap-1.5">
                  <span>💎 Premium</span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-purple-950">SVN Lake Palace Resort</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">₹3,500</td>
                <td className="py-3.5 px-4 font-black text-purple-700">₹{3500 * durationDays}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
                    {Math.round(((3500 * durationDays) / budget) * 100)}%
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-500">Biometric access, 24/7 Armed Guard, Doctor on call</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
