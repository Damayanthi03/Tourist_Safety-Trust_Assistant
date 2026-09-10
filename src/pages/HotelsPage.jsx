import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import HotelCard from '../components/HotelCard';
import { ShieldCheck, Search, Filter, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export default function HotelsPage({ onSelectHotel, onGoToBudget }) {
  const { hotels, destination, budget, durationDays, travellers, selectedHotel, setSelectedHotel } = useTravel();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', 'low', 'premium'
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'price_asc', 'price_desc', 'trust'

  const filteredHotels = hotels
    .filter(h => {
      if (onlyVerified && !h.verified) return false;
      if (categoryFilter !== 'all' && h.category !== categoryFilter) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          h.name.toLowerCase().includes(term) ||
          h.address.toLowerCase().includes(term) ||
          h.licenseNo.toLowerCase().includes(term)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'trust') return b.trustScore - a.trustScore;
      if (sortBy === 'price_asc') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price_desc') return b.pricePerNight - a.pricePerNight;
      return 0;
    });

  const handleSelect = (hotel) => {
    setSelectedHotel(hotel);
    if (onSelectHotel) onSelectHotel(hotel);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-purple-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-purple-200 border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Smart Hotel Discovery & Trust Verification</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            Verified Accommodations in {destination}
          </h2>
          <p className="text-sm text-purple-200 leading-relaxed">
            Every listed hotel is authenticated with municipal license numbers and fire safety standards. Choose between verified budget stays and premium comfort.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center">
          <div className="text-xs text-purple-200 uppercase font-bold">Safe Stays Available</div>
          <div className="text-3xl font-black text-white mt-1">{hotels.filter(h => h.verified).length} Hotels</div>
          <div className="text-[11px] text-emerald-300 mt-0.5">100% Police Verified</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-purple-sm border border-purple-100 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-purple-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search by hotel name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-purple-50/50 border border-purple-200 rounded-2xl pl-11 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/30"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              categoryFilter === 'all'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'bg-purple-50 text-purple-900 border border-purple-200'
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setCategoryFilter('low')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              categoryFilter === 'low'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'bg-purple-50 text-purple-900 border border-purple-200'
            }`}
          >
            <span>💵 Low Budget</span>
          </button>
          <button
            onClick={() => setCategoryFilter('premium')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              categoryFilter === 'premium'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'bg-purple-50 text-purple-900 border border-purple-200'
            }`}
          >
            <span>💎 Premium</span>
          </button>

          {/* Only Verified Checkbox */}
          <button
            onClick={() => setOnlyVerified(!onlyVerified)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              onlyVerified
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Only</span>
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-purple-50 border border-purple-200 text-purple-950 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
          >
            <option value="rating">Sort: Highest Rating</option>
            <option value="trust">Sort: Highest Trust Score</option>
            <option value="price_asc">Sort: Price Low to High</option>
            <option value="price_desc">Sort: Price High to Low</option>
          </select>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            onSelect={handleSelect}
            isSelected={selectedHotel?.id === hotel.id}
            rankBadge={hotel.isTopPick ? (hotel.category === 'low' ? 'Top Low-Budget' : 'Top Premium') : null}
          />
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-purple-100 shadow-purple-sm space-y-3">
          <div className="text-4xl">🏨</div>
          <h3 className="font-extrabold text-lg text-purple-950">No Hotels Found Matching Filter</h3>
          <p className="text-xs text-slate-500">Try clearing search terms or toggling the verified-only filter.</p>
          <button
            onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setOnlyVerified(false); }}
            className="px-4 py-2 bg-purple-700 text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
