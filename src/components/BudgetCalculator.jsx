import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import { 
  DollarSign, Sparkles, AlertCircle, CheckCircle2, 
  PieChart, Utensils, Car, Ticket, ShieldAlert, Sliders, ArrowUpRight
} from 'lucide-react';

export default function BudgetCalculator({ onExploreHotels }) {
  const { 
    budget, setBudget, 
    durationDays, setDurationDays, 
    travellers, setTravellers, 
    selectedHotel, setSelectedHotel,
    hotels 
  } = useTravel();

  // Custom allocation overrides if user adjusts sliders
  const [customHotelPrice, setCustomHotelPrice] = useState(
    selectedHotel ? selectedHotel.pricePerNight : 1400
  );

  const totalHotelExpense = customHotelPrice * durationDays;
  const foodExpense = Math.round(budget * 0.22);
  const transportExpense = Math.round(budget * 0.16);
  const activitiesExpense = Math.round(budget * 0.14);
  const totalCoreExpenses = totalHotelExpense + foodExpense + transportExpense + activitiesExpense;
  const reserveFund = budget - totalCoreExpenses;

  const isOverBudget = totalCoreExpenses > budget;
  const overageAmount = totalCoreExpenses - budget;

  // AI Advice Generator
  const getAIAdvice = () => {
    if (isOverBudget) {
      const affordableAlternative = hotels
        .filter(h => h.verified && h.category === 'low')
        .sort((a, b) => a.pricePerNight - b.pricePerNight)[0];

      return {
        type: 'warning',
        title: 'Budget Alert: Expense Exceeds Target',
        message: `Your current hotel selection (₹${customHotelPrice}/night × ${durationDays} nights = ₹${totalHotelExpense}) exceeds your budget by ₹${overageAmount.toLocaleString('en-IN')}.`,
        suggestion: `Switch to ${affordableAlternative?.name || 'Hotel Mayura Deluxe'} (₹${affordableAlternative?.pricePerNight || 1200}/night) to save ₹${((customHotelPrice - (affordableAlternative?.pricePerNight || 1200)) * durationDays).toLocaleString('en-IN')} and return to safety surplus!`,
        actionHotel: affordableAlternative
      };
    } else if (reserveFund > (budget * 0.3)) {
      return {
        type: 'info',
        title: 'High Savings Headroom Detected',
        message: `You have an ample safety cushion of ₹${reserveFund.toLocaleString('en-IN')} (${Math.round((reserveFund / budget) * 100)}% of budget).`,
        suggestion: 'You can comfortably upgrade to a verified heritage premium stay or add a guided tour of Ramanarayanam & Bobbili Fort without exceeding limits!'
      };
    } else {
      return {
        type: 'success',
        title: 'Ideal Balanced Travel Budget Allocation',
        message: `Your itinerary allocation is well-balanced across Stays (₹${totalHotelExpense}), Dining (₹${foodExpense}), and Local Commute (₹${transportExpense}).`,
        suggestion: `You have safely preserved an emergency contingency reserve of ₹${reserveFund.toLocaleString('en-IN')}. Perfect for a worry-free journey in Vizianagaram!`
      };
    }
  };

  const advice = getAIAdvice();

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-purple-md border border-purple-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-purple-100 text-purple-900 text-xs font-bold border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>AI-Based Travel Budget Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-purple-950 mt-2">
            Intelligent Expense Estimator & Optimizer
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            End-to-end trip financial forecasting for Vizianagaram. We analyze accommodation, meals, transport, and emergency buffer.
          </p>
        </div>

        {/* Selected Hotel Preview if any */}
        {selectedHotel && (
          <div className="bg-purple-50/80 border border-purple-200/80 rounded-2xl p-4 flex items-center gap-3">
            <img 
              src={selectedHotel.image} 
              alt={selectedHotel.name} 
              className="w-14 h-14 rounded-xl object-cover border border-purple-200" 
            />
            <div>
              <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Active Stay</div>
              <div className="font-extrabold text-sm text-purple-950">{selectedHotel.name}</div>
              <div className="text-xs text-purple-700 font-bold">₹{selectedHotel.pricePerNight}/night • {selectedHotel.trustScore}% Trust</div>
            </div>
          </div>
        )}
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Sliders & Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 shadow-purple-sm border border-purple-100 space-y-6">
          <div className="flex items-center justify-between border-b border-purple-100 pb-3">
            <h3 className="font-extrabold text-base text-purple-950 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-700" />
              <span>Trip Parameters</span>
            </h3>
            <span className="text-xs text-purple-600 font-semibold">Live Realtime Calculation</span>
          </div>

          {/* Budget Input & Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700">Total Travel Budget</label>
              <span className="font-black text-purple-700 text-sm">₹{budget.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="50000"
              step="1000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-purple-700 cursor-pointer h-2 bg-purple-100 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>₹5,000</span>
              <span>₹25,000</span>
              <span>₹50,000+</span>
            </div>
          </div>

          {/* Duration Days */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700">Duration of Journey</label>
              <span className="font-black text-purple-700 text-sm">{durationDays} Days</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 5, 7].map(days => (
                <button
                  key={days}
                  onClick={() => setDurationDays(days)}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    durationDays === days
                      ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                      : 'bg-purple-50/60 hover:bg-purple-100 text-purple-900 border-purple-200'
                  }`}
                >
                  {days} {days === 1 ? 'Day' : 'Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Travellers Count */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700">Number of Travellers</label>
              <span className="font-black text-purple-700 text-sm">{travellers} People</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 6].map(count => (
                <button
                  key={count}
                  onClick={() => setTravellers(count)}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    travellers === count
                      ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                      : 'bg-purple-50/60 hover:bg-purple-100 text-purple-900 border-purple-200'
                  }`}
                >
                  {count} {count === 1 ? 'Solo' : 'Persons'}
                </button>
              ))}
            </div>
          </div>

          {/* Hotel Tariff Slider */}
          <div className="space-y-2 pt-2 border-t border-purple-100">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700">Estimated Hotel Room Rate</label>
              <span className="font-black text-purple-700 text-sm">₹{customHotelPrice} / night</span>
            </div>
            <input
              type="range"
              min="800"
              max="6000"
              step="100"
              value={customHotelPrice}
              onChange={(e) => setCustomHotelPrice(Number(e.target.value))}
              className="w-full accent-purple-700 cursor-pointer h-2 bg-purple-100 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>₹800 (Budget)</span>
              <span>₹3,500 (Comfort)</span>
              <span>₹6,000 (Luxury)</span>
            </div>
          </div>

          {/* Per Person per day pill */}
          <div className="bg-purple-50 rounded-2xl p-3.5 border border-purple-200/80 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-semibold">Spending Power / Person / Day:</span>
            <span className="font-black text-purple-950 text-sm">
              ₹{Math.round(budget / (durationDays * travellers)).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Right Column: AI Expense Breakdown & Suggestions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Detailed Itemized Expense Breakdown */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-purple-sm border border-purple-100 space-y-5">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <h3 className="font-extrabold text-base text-purple-950 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-purple-700" />
                <span>Estimated Category Breakdown</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">Total: ₹{budget.toLocaleString('en-IN')}</span>
            </div>

            <div className="space-y-3.5">
              {/* Accommodation */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-purple-950">
                    <span>🏨 Accommodation ({durationDays} nights @ ₹{customHotelPrice})</span>
                  </span>
                  <span className="text-purple-700">₹{totalHotelExpense.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.round((totalHotelExpense / budget) * 100))}%` }}
                  ></div>
                </div>
              </div>

              {/* Food & Dining */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-purple-950">
                    <Utensils className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Food & Dining (3 meals/day for {travellers} persons)</span>
                  </span>
                  <span className="text-emerald-700">₹{foodExpense.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.round((foodExpense / budget) * 100))}%` }}
                  ></div>
                </div>
              </div>

              {/* Transportation */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-purple-950">
                    <Car className="w-3.5 h-3.5 text-blue-600" />
                    <span>Local Transport (Auto / Taxi / Metro)</span>
                  </span>
                  <span className="text-blue-700">₹{transportExpense.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.round((transportExpense / budget) * 100))}%` }}
                  ></div>
                </div>
              </div>

              {/* Sightseeing & Activities */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-purple-950">
                    <Ticket className="w-3.5 h-3.5 text-amber-600" />
                    <span>Tourist Attractions (Fort, Ramanarayanam entry)</span>
                  </span>
                  <span className="text-amber-700">₹{activitiesExpense.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.round((activitiesExpense / budget) * 100))}%` }}
                  ></div>
                </div>
              </div>

              {/* Emergency Reserve */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-purple-950">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                    <span>Contingency & Emergency Reserve Fund</span>
                  </span>
                  <span className={reserveFund >= 0 ? "text-emerald-700 font-black" : "text-rose-600 font-black"}>
                    {reserveFund >= 0 ? `₹${reserveFund.toLocaleString('en-IN')}` : `-₹${Math.abs(reserveFund).toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${reserveFund >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                    style={{ width: `${Math.max(0, Math.min(100, Math.round((reserveFund / budget) * 100)))}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Total Estimated Box */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              isOverBudget ? 'bg-rose-50 border-rose-200 text-rose-950' : 'bg-purple-50/80 border-purple-200 text-purple-950'
            }`}>
              <div>
                <div className="text-[11px] uppercase font-bold tracking-wider text-slate-500">
                  Total Estimated Trip Outlay
                </div>
                <div className="text-2xl font-black">
                  ₹{totalCoreExpenses.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="text-right">
                <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                  isOverBudget 
                    ? 'bg-rose-600 text-white' 
                    : 'bg-emerald-600 text-white'
                }`}>
                  {isOverBudget ? `Deficit ₹${overageAmount}` : `Within Safe Budget`}
                </span>
              </div>
            </div>
          </div>

          {/* AI Smart Advice Alert Card */}
          <div className={`rounded-3xl p-6 border shadow-sm space-y-3 ${
            advice.type === 'warning'
              ? 'bg-amber-50/90 border-amber-200 text-amber-950'
              : advice.type === 'info'
                ? 'bg-blue-50/90 border-blue-200 text-blue-950'
                : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
          }`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-700" />
              <h4 className="font-black text-sm">{advice.title}</h4>
            </div>

            <p className="text-xs leading-relaxed font-medium">
              {advice.message}
            </p>

            <div className="p-3 bg-white/80 rounded-xl text-xs font-semibold text-slate-700 border border-black/5">
              💡 <strong>AI Suggestion:</strong> {advice.suggestion}
            </div>

            {advice.actionHotel && (
              <button
                onClick={() => {
                  setSelectedHotel(advice.actionHotel);
                  setCustomHotelPrice(advice.actionHotel.pricePerNight);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-xl transition shadow-sm"
              >
                <span>Switch to {advice.actionHotel.name} (₹{advice.actionHotel.pricePerNight}/night)</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
