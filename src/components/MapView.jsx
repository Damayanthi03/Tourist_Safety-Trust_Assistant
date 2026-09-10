import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useTravel } from '../context/TravelContext';
import { 
  ShieldCheck, AlertTriangle, Phone, Navigation, Hotel, 
  Car, UtensilsCrossed, Compass, HeartPulse, Building, Eye
} from 'lucide-react';

// Component to dynamically re-center map when location/filter changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// Generate rich, responsive DivIcons for Leaflet
function createCustomMarker(type, isVerified = true) {
  let bgColor = '#7C3AED'; // default purple
  let iconHtml = '📍';
  let badgeBorder = '#581C87';

  if (type === 'police') {
    bgColor = '#DC2626'; // Red
    iconHtml = '🚓';
    badgeBorder = '#991B1B';
  } else if (type === 'hospital') {
    bgColor = '#E11D48'; // Rose/Red
    iconHtml = '🏥';
    badgeBorder = '#9F1239';
  } else if (type === 'petrol') {
    bgColor = '#EA580C'; // Orange
    iconHtml = '⛽';
    badgeBorder = '#9A3412';
  } else if (type === 'hotel') {
    bgColor = isVerified ? '#059669' : '#D97706'; // Green if verified, Amber if unverified
    iconHtml = isVerified ? '🏨' : '⚠️';
    badgeBorder = isVerified ? '#065F46' : '#92400E';
  } else if (type === 'restaurant') {
    bgColor = '#8B5CF6'; // Violet
    iconHtml = '🍽️';
    badgeBorder = '#6D28D9';
  } else if (type === 'attraction') {
    bgColor = '#6D28D9'; // Royal Purple
    iconHtml = '🏰';
    badgeBorder = '#4C1D95';
  }

  const html = `
    <div style="
      background: ${bgColor};
      width: 36px;
      height: 36px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2.5px solid #FFFFFF;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      cursor: pointer;
      position: relative;
    ">
      <span style="
        transform: rotate(45deg);
        font-size: 16px;
        display: block;
        line-height: 1;
      ">${iconHtml}</span>
      ${isVerified ? `
        <div style="
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          background: #10B981;
          border-radius: 50%;
          border: 1.5px solid #FFF;
        "></div>` : ''
      }
    </div>
  `;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: html,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
}

export default function MapView({ onSelectHotel }) {
  const { hotels, mapServices, activeMapCategory, setActiveMapCategory, defaultLocation } = useTravel();
  const [selectedPoi, setSelectedPoi] = useState(null);

  // Combine hotels and POIs with unified format
  const formattedHotels = hotels.map(h => ({
    id: h.id,
    type: 'hotel',
    name: h.name,
    address: h.address,
    phone: '08922-299100 (Front Desk)',
    emergency: 'In-house Safe Desk',
    coordinates: h.coordinates,
    distance: h.distanceFromCenter,
    openStatus: '24/7 Check-in',
    verified: h.verified,
    badge: h.verificationTier,
    pricePerNight: h.pricePerNight,
    rating: h.rating,
    trustScore: h.trustScore,
    warning: h.warning
  }));

  const allPois = [...formattedHotels, ...mapServices];

  const filteredPois = allPois.filter(poi => {
    if (activeMapCategory === 'all') return true;
    if (activeMapCategory === 'hotels') return poi.type === 'hotel';
    if (activeMapCategory === 'police') return poi.type === 'police';
    if (activeMapCategory === 'hospital') return poi.type === 'hospital';
    if (activeMapCategory === 'petrol') return poi.type === 'petrol';
    if (activeMapCategory === 'attraction') return poi.type === 'attraction';
    if (activeMapCategory === 'restaurant') return poi.type === 'restaurant';
    return true;
  });

  const categories = [
    { id: 'all', label: 'All Services', icon: Compass, count: allPois.length },
    { id: 'hotels', label: 'Verified Hotels', icon: Hotel, count: formattedHotels.length },
    { id: 'police', label: 'Police Stations', icon: ShieldCheck, count: mapServices.filter(p => p.type === 'police').length },
    { id: 'hospital', label: 'Hospitals / ER', icon: HeartPulse, count: mapServices.filter(p => p.type === 'hospital').length },
    { id: 'petrol', label: 'Petrol & EV', icon: Car, count: mapServices.filter(p => p.type === 'petrol').length },
    { id: 'attraction', label: 'Attractions', icon: Building, count: mapServices.filter(p => p.type === 'attraction').length },
    { id: 'restaurant', label: 'Verified Dining', icon: UtensilsCrossed, count: mapServices.filter(p => p.type === 'restaurant').length }
  ];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-purple-md border border-purple-100 space-y-5">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-lg border border-purple-200">
              Interactive Leaflet Map
            </span>
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> GPS Verified Coordinates
            </span>
          </div>
          <h2 className="text-2xl font-black text-purple-950 mt-1">
            Explore Destination: <span className="text-purple-700">{defaultLocation.city}</span>
          </h2>
          <p className="text-sm text-slate-500">
            Real-time verified services, emergency stations, tourist points & vetted stays.
          </p>
        </div>

        {/* Live Safety Status Indicator */}
        <div className="bg-purple-50/80 border border-purple-100 rounded-2xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-purple-900">Safety Coverage Zone</div>
            <div className="text-xs text-purple-600">4 Police Units & 3 Hospitals Synced</div>
          </div>
        </div>
      </div>

      {/* Filter Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeMapCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveMapCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-purple-700 text-white shadow-md shadow-purple-500/30'
                  : 'bg-purple-50/70 hover:bg-purple-100 text-purple-900 border border-purple-200/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-purple-900 text-purple-100' : 'bg-purple-200/70 text-purple-800'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Leaflet Map Frame */}
      <div className="w-full h-[520px] rounded-2xl overflow-hidden relative border border-purple-100 shadow-inner">
        <MapContainer
          center={defaultLocation.coordinates}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <ChangeView center={defaultLocation.coordinates} zoom={14} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredPois.map((poi) => (
            <Marker
              key={`${poi.type}-${poi.id}`}
              position={poi.coordinates}
              icon={createCustomMarker(poi.type, poi.verified)}
            >
              <Popup>
                <div className="min-w-[240px] text-slate-800 p-1">
                  {/* Badge & Type */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                      {poi.type}
                    </span>
                    {poi.verified ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1 border border-amber-200">
                        <AlertTriangle className="w-3 h-3" /> Unverified
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h4 className="font-extrabold text-sm text-purple-950 mb-1 leading-tight">
                    {poi.name}
                  </h4>

                  {/* Address */}
                  <p className="text-xs text-slate-500 mb-2 leading-relaxed">
                    {poi.address}
                  </p>

                  {/* Details */}
                  <div className="bg-purple-50/60 rounded-lg p-2 text-xs space-y-1 mb-3 border border-purple-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Distance:</span>
                      <span className="font-semibold text-purple-900">{poi.distance} from center</span>
                    </div>
                    {poi.openStatus && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Timing:</span>
                        <span className="font-semibold text-purple-900">{poi.openStatus}</span>
                      </div>
                    )}
                    {poi.pricePerNight && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Tariff:</span>
                        <span className="font-bold text-purple-700">₹{poi.pricePerNight} / night</span>
                      </div>
                    )}
                    {poi.trustScore && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Trust Score:</span>
                        <span className="font-bold text-emerald-600">{poi.trustScore}% Safe</span>
                      </div>
                    )}
                  </div>

                  {poi.warning && (
                    <div className="p-2 mb-2 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800 font-medium">
                      {poi.warning}
                    </div>
                  )}

                  {/* Action Buttons inside Popup */}
                  <div className="flex items-center gap-2">
                    {poi.phone && (
                      <a
                        href={`tel:${poi.phone}`}
                        className="flex-1 text-center py-1.5 px-2 bg-purple-700 text-white rounded-lg text-xs font-bold hover:bg-purple-800 transition flex items-center justify-center gap-1"
                      >
                        <Phone className="w-3 h-3" /> Call
                      </a>
                    )}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${poi.coordinates[0]},${poi.coordinates[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-1.5 px-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition flex items-center justify-center gap-1"
                    >
                      <Navigation className="w-3 h-3 text-purple-600" /> Route
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-purple-100 text-xs hidden sm:block">
          <div className="font-bold text-purple-950 mb-1.5 text-[11px] uppercase tracking-wider">Map Markers Guide</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-600 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Verified Hotel
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> Police Station
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span> Hospital / ER
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Petrol & EV
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-700"></span> Tourist Spot
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500"></span> Verified Food
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
