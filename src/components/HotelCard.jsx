import React from 'react';
import { ShieldCheck, Star, MapPin, CheckCircle2, AlertTriangle, Sparkles, Building, Info } from 'lucide-react';

export default function HotelCard({ hotel, onSelect, isSelected = false, rankBadge = null }) {
  return (
    <div className={`relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-purple-lg flex flex-col justify-between ${
      isSelected 
        ? 'border-purple-600 ring-2 ring-purple-600/30 shadow-purple-md' 
        : hotel.verified 
          ? 'border-purple-100 hover:border-purple-300 shadow-sm' 
          : 'border-amber-200 bg-amber-50/20 shadow-sm'
    }`}>
      {/* Top Image & Badge Overlay */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        
        {/* Verification Pill */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hotel.verified ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-md shadow-emerald-900/20 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Admin & Govt Verified</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-600 text-white shadow-md">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Unverified / Caution</span>
            </span>
          )}

          {rankBadge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-900/90 text-purple-200 border border-purple-400/40 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{rankBadge}</span>
            </span>
          )}
        </div>

        {/* Trust Score Gauge in Top Right */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-2xl shadow-md border border-purple-100 flex items-center gap-1.5">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400 leading-none">Trust</div>
            <div className={`text-xs font-black ${hotel.trustScore >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
              {hotel.trustScore}%
            </div>
          </div>
          <div className={`w-2.5 h-2.5 rounded-full ${hotel.trustScore >= 90 ? 'bg-emerald-500 ring-2 ring-emerald-200' : 'bg-amber-500 ring-2 ring-amber-200'}`}></div>
        </div>

        {/* Price Tag in Bottom Right of Image */}
        <div className="absolute bottom-3 right-3 bg-purple-950/85 backdrop-blur-md text-white px-3 py-1 rounded-xl font-black text-sm border border-purple-400/30">
          ₹{hotel.pricePerNight} <span className="text-[11px] font-normal text-purple-200">/ night</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating & Reviews */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-lg text-xs font-bold border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{hotel.rating}</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">({hotel.reviewsCount} reviews)</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-purple-700 font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{hotel.distanceFromCenter} from Center</span>
            </div>
          </div>

          {/* Hotel Name */}
          <h3 className="text-lg font-black text-purple-950 hover:text-purple-700 transition">
            {hotel.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
            {hotel.address}
          </p>

          {/* License proof info */}
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-purple-800 bg-purple-50/80 px-2.5 py-1 rounded-lg border border-purple-100">
            <Building className="w-3 h-3 text-purple-600" />
            <span>Reg ID: <strong className="font-mono">{hotel.licenseNo}</strong></span>
          </div>

          {/* Safety Features Badges */}
          <div className="mt-3">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Verified Safety Highlights:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {hotel.safetyFeatures?.map((safety, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-md border border-emerald-200"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {safety}
                </span>
              ))}
            </div>
          </div>

          {/* Warning Banner if Unverified */}
          {hotel.warning && (
            <div className="mt-3 p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-rose-800 text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{hotel.warning}</span>
            </div>
          )}

          {/* Amenities Chips */}
          <div className="mt-3 flex flex-wrap gap-1">
            {hotel.amenities?.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities?.length > 3 && (
              <span className="text-[11px] text-purple-700 font-semibold px-1 py-0.5">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-purple-50 flex items-center gap-2">
          <button
            onClick={() => onSelect && onSelect(hotel)}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              isSelected
                ? 'bg-purple-800 text-white shadow-md shadow-purple-600/30'
                : 'bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200'
            }`}
          >
            {isSelected ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Selected for Itinerary
              </>
            ) : (
              <>
                <span>Select & Calculate Budget</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
