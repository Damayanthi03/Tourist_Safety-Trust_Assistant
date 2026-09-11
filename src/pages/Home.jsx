import React from 'react';
import { useTravel } from '../context/TravelContext';
import { useAuth } from '../context/AuthContext';

import { 
  MapPin, Calendar, Users, DollarSign, ShieldCheck, 
  Sparkles, Compass, ArrowRight, CheckCircle2, AlertTriangle, Building, PhoneCall 
} from 'lucide-react';
import ramanarayanam from "../assets/ramanarayanam.jpg";

export default function Home({ onNavigate }) {
  const { 
    destination, setDestination, 
    durationDays, setDurationDays, 
    travellers, setTravellers, 
    budget, setBudget, 
    preferences, setPreferences,
    defaultLocation 
  } = useTravel();

  const { role, setRole } = useAuth();

  const destinationHighlights = [
    {
      name: "Historic Vizianagaram Fort",
      category: "Heritage Monument",
      badge: "State Protected",
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80",
      description: "18th-century stone fortress with victory gate and Moti Mahal royal hall."
    },
    {
    name: "Ramanarayanam Spiritual Park",
    category: "Spiritual & Light Show",
    badge: "Top Tourist Hub",
    image: ramanarayanam,
    description: "Gigantic Kodanda Rama bow-shaped temple complex with evening laser water shows."
},
    {
      name: "Pedda Cheruvu Promenade",
      category: "Eco Tourism & Lake",
      badge: "Family Friendly",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      description: "Scenic royal reservoir with boating, lighted jogging paths, and sunset views."
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white p-6 sm:p-12 lg:p-16 shadow-purple-lg">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-purple-200 border border-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AI-Powered Trusted Digital Travel Companion</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Travel With Complete <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200">Trust & Safety</span>
          </h1>

          <p className="text-sm sm:text-base text-purple-200/90 max-w-2xl mx-auto leading-relaxed">
            Eliminate scams, unverified hotels, and financial uncertainty. One intelligent unified platform for budget forecasting, interactive maps, verified stays, and 24/7 emergency response.
          </p>
        </div>

        {/* SMART TRIP PLANNER CARD */}
        <div className="relative z-10 mt-10 max-w-5xl mx-auto bg-white rounded-3xl p-5 sm:p-8 text-slate-800 shadow-2xl border border-purple-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-100 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-extrabold text-sm text-purple-950">
                Current Demo Destination: <strong className="text-purple-700 font-black">Vizianagaram, AP</strong>
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Contextual AI Recommendations Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Destination Input */}
            <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-purple-600" /> Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent font-bold text-sm text-purple-950 focus:outline-none"
              />
              <span className="text-[10px] text-purple-600 font-semibold">Demo default: Vizianagaram</span>
            </div>

            {/* 2. Duration Days */}
            <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-purple-600" /> Duration (Days)
              </label>
              <select
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full bg-transparent font-bold text-sm text-purple-950 focus:outline-none cursor-pointer"
              >
                <option value={1}>1 Day (Express Tour)</option>
                <option value={2}>2 Days (Weekend Trip)</option>
                <option value={3}>3 Days (Standard Tour)</option>
                <option value={5}>5 Days (Complete Holiday)</option>
                <option value={7}>7 Days (Extended Stay)</option>
              </select>
              <span className="text-[10px] text-purple-600 font-semibold">{durationDays} Nights Planned</span>
            </div>

            {/* 3. Travellers */}
            <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-purple-600" /> Travellers
              </label>
              <select
                value={travellers}
                onChange={(e) => setTravellers(Number(e.target.value))}
                className="w-full bg-transparent font-bold text-sm text-purple-950 focus:outline-none cursor-pointer"
              >
                <option value={1}>1 Person (Solo Travel)</option>
                <option value={2}>2 Persons (Couple / Friends)</option>
                <option value={3}>3 Persons (Small Family)</option>
                <option value={4}>4 Persons (Family / Group)</option>
                <option value={6}>6+ Persons (Group Tour)</option>
              </select>
              <span className="text-[10px] text-purple-600 font-semibold">{travellers} Traveling</span>
            </div>

            {/* 4. Total Budget */}
            <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-purple-600" /> Total Budget
              </label>
              <div className="flex items-center">
                <span className="font-bold text-purple-800 text-sm">₹</span>
                <input
                  type="number"
                  step="1000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full bg-transparent font-black text-sm text-purple-950 focus:outline-none pl-1"
                />
              </div>
              <span className="text-[10px] text-purple-600 font-semibold">
                ~₹{Math.round(budget / (durationDays * travellers))}/person/day
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-50">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Preferences:</span>
              {['Family Safe', 'Low-Budget Picks', 'Govt Verified', 'Near Transit'].map(pref => (
                <span key={pref} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
                  ✓ {pref}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('budget')}
                className="flex-1 sm:flex-none px-6 py-3.5 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-purple-600/30 transition active:scale-95 flex items-center justify-center gap-2"
              >
                <span>View Top Budget Recommendations</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CORE FEATURE CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Map */}
        <div 
          onClick={() => onNavigate('map')}
          className="bg-white rounded-3xl p-6 border border-purple-100 shadow-purple-sm hover:shadow-purple-md transition cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:bg-purple-700 group-hover:text-white transition">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-purple-950">
              Interactive Destination Map
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore Vizianagaram with live GPS markers for verified hotels, police stations, 24/7 hospitals, petrol pumps, and heritage sights.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-purple-700 group-hover:text-purple-900">
            <span>Open Interactive Map</span>
            <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-1" />
          </div>
        </div>

        {/* Card 2: Hotels */}
        <div 
          onClick={() => onNavigate('hotels')}
          className="bg-white rounded-3xl p-6 border border-purple-100 shadow-purple-sm hover:shadow-purple-md transition cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-purple-950">
              Verified Hotel Stays
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Compare Top 3 Low Budget (₹1,200–₹1,800) vs Top 3 Premium Retreats. All protected by the Admin Trust Verification Shield.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-purple-700 group-hover:text-purple-900">
            <span>Explore Verified Hotels</span>
            <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-1" />
          </div>
        </div>

        {/* Card 3: AI Assistant */}
        <div 
          onClick={() => onNavigate('ai')}
          className="bg-white rounded-3xl p-6 border border-purple-100 shadow-purple-sm hover:shadow-purple-md transition cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-700 group-hover:text-white transition">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-purple-950">
              AI Travel Assistant
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ask instant questions: "Where is the nearest police station?", "Suggest places within my budget", or "How to save on transit?"
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-purple-700 group-hover:text-purple-900">
            <span>Chat With AI Assistant</span>
            <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-1" />
          </div>
        </div>
      </section>

      {/* VIZIANAGARAM HIGHLIGHTS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-purple-950">
              Explore Vizianagaram's Top Sights
            </h2>
            <p className="text-xs text-slate-500">
              Curated safe heritage and cultural destinations for your itinerary.
            </p>
          </div>
          <button
            onClick={() => onNavigate('map')}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
          >
            <span>View All on Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinationHighlights.map((place, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-purple-sm hover:shadow-purple-md transition flex flex-col">
              <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <span className="absolute top-3 left-3 bg-purple-900/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-purple-400/30">
                  {place.badge}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-purple-600 tracking-wider">
                    {place.category}
                  </span>
                  <h3 className="font-extrabold text-base text-purple-950 mt-0.5">
                    {place.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {place.description}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('map')}
                  className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold rounded-xl border border-purple-200 transition"
                >
                  View Route & Safe Arrival
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY TRUST US / PROBLEM & SOLUTION */}
      <section className="bg-gradient-to-r from-purple-50 via-white to-purple-50 rounded-3xl p-8 sm:p-10 border border-purple-200/80 shadow-sm space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
            Why Our Platform Is Different
          </span>
          <h2 className="text-2xl font-black text-purple-950 mt-1">
            Built for Real-Time Safety & Verified Decisions
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Instead of switching between disconnected maps, aggregators, and search engines, our platform guarantees that every hotel, hotline, and advice is verified by local safety authorities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-sm text-purple-950">No Fake Listings</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Every hotel submits proof of trade license and physical safety audits before being granted a Trust Shield.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-sm text-purple-950">Intelligent Budgeting</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Dynamic Top 3 Low-Budget and Top 3 Premium stay comparisons prevent accidental budget depletion.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-sm text-purple-950">One-Click SOS Grid</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Direct integration with Vizianagaram police and ambulance units with instant GPS location broadcast.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
