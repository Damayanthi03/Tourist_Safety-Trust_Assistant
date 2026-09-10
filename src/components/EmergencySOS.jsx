import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import { 
  PhoneCall, ShieldAlert, HeartPulse, ShieldCheck, 
  MapPin, AlertTriangle, CheckCircle2, Share2, Copy, Navigation, PhoneForwarded 
} from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/travelData';

export default function EmergencySOS() {
  const { defaultLocation, mapServices, sosActive, sosDispatched, triggerSOS, cancelSOS } = useTravel();
  const [copiedLocation, setCopiedLocation] = useState(false);
  const [activeCallModal, setActiveCallModal] = useState(null);

  const policeStations = mapServices.filter(p => p.type === 'police');
  const hospitals = mapServices.filter(p => p.type === 'hospital');

  const emergencyMessage = `🚨 EMERGENCY ALERT: I am in Vizianagaram at coordinates [${defaultLocation.coordinates.join(', ')}]. Please assist. Platform: Tourist Safety & Trust Assistant.`;

  const copyCoordinates = () => {
    navigator.clipboard.writeText(emergencyMessage);
    setCopiedLocation(true);
    setTimeout(() => setCopiedLocation(false), 3000);
  };

  const shareViaWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(emergencyMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* High Alert SOS Header Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 text-white transition-all duration-300 shadow-purple-lg relative overflow-hidden ${
        sosActive 
          ? 'bg-gradient-to-r from-red-600 via-rose-700 to-red-800 ring-4 ring-red-400' 
          : 'bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950'
      }`}>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 text-rose-200 border border-white/20">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping"></span>
              <span>24/7 Rapid Emergency Response Grid</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {sosActive ? "🚨 EMERGENCY SOS ACTIVATED!" : "Emergency Support & Rapid Assistance"}
            </h2>
            <p className="text-sm text-purple-200 max-w-xl">
              Instant one-touch connection to Vizianagaram Police, Maharaja District Hospital, ambulance trauma, and tourist helpline.
            </p>
          </div>

          {/* Trigger / Cancel SOS Big Button */}
          <div className="flex flex-col items-center gap-2">
            {!sosActive ? (
              <button
                onClick={triggerSOS}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-base font-black uppercase tracking-wider rounded-2xl shadow-xl shadow-red-600/40 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 pulse-emergency"
              >
                <PhoneCall className="w-6 h-6 animate-bounce" />
                <span>TRIGGER SOS ALARM</span>
              </button>
            ) : (
              <button
                onClick={cancelSOS}
                className="px-6 py-3 bg-white text-red-700 hover:bg-red-50 text-sm font-bold uppercase rounded-2xl shadow-md transition"
              >
                Cancel / Stand Down Alarm
              </button>
            )}
            <span className="text-[11px] text-purple-200 font-medium">
              Default Demo Hub: {defaultLocation.city}, AP
            </span>
          </div>
        </div>

        {/* SOS Dispatch Confirmation Bar */}
        {sosDispatched && (
          <div className="mt-6 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl animate-in fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white text-sm">Emergency Dispatch Simulated</div>
                <div className="text-purple-100">
                  Transmitting GPS [18.1067° N, 83.3956° E] to Vizianagaram One Town Police Desk & Maharaja Hospital.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={shareViaWhatsApp}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Send WhatsApp SOS</span>
              </button>
              <button
                onClick={copyCoordinates}
                className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedLocation ? "Copied!" : "Copy GPS"}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Priority National & State Emergency Numbers */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-purple-sm border border-purple-100 space-y-4">
        <div className="flex items-center justify-between border-b border-purple-100 pb-3">
          <div>
            <h3 className="text-xl font-black text-purple-950 flex items-center gap-2">
              <PhoneForwarded className="w-5 h-5 text-purple-700" />
              <span>National & District Emergency Hotlines</span>
            </h3>
            <p className="text-xs text-slate-500">Toll-free immediate dialers operating 24 hours daily</p>
          </div>
          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            100% Free Toll-Free
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EMERGENCY_CONTACTS.slice(0, 4).map((contact, idx) => (
            <div
              key={idx}
              className="bg-purple-50/50 hover:bg-purple-50 border border-purple-200/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition group"
            >
              <div>
                <div className="text-[11px] font-extrabold text-purple-800 uppercase tracking-wider">
                  {contact.name}
                </div>
                <div className="text-2xl font-black text-purple-950 mt-1">
                  {contact.number}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {contact.description}
                </p>
              </div>

              <a
                href={`tel:${contact.number}`}
                className="w-full py-2 bg-purple-700 group-hover:bg-purple-800 text-white rounded-xl text-xs font-bold text-center transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {contact.number}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Grid: Nearest Police Stations vs Nearest Hospitals in Vizianagaram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Nearest Police Stations */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-purple-sm border border-purple-100 space-y-4">
          <div className="flex items-center justify-between border-b border-purple-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-purple-950">
                  Nearby Police Stations ({defaultLocation.city})
                </h3>
                <p className="text-xs text-slate-500">Fast physical law enforcement support</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
              Open 24/7
            </span>
          </div>

          <div className="space-y-3">
            {policeStations.map((pol) => (
              <div
                key={pol.id}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-purple-950">{pol.name}</h4>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                      {pol.distance}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{pol.address}</p>
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                    <span>Direct Desk: <strong className="text-purple-900">{pol.phone}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${pol.phone}`}
                    className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Dial</span>
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${pol.coordinates[0]},${pol.coordinates[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white border border-slate-200 text-slate-700 hover:text-purple-700 rounded-xl transition"
                    title="Map Directions"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearest Hospitals & Trauma Care */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-purple-sm border border-purple-100 space-y-4">
          <div className="flex items-center justify-between border-b border-purple-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-purple-950">
                  Nearby 24/7 Hospitals & Medical ER
                </h3>
                <p className="text-xs text-slate-500">Trauma care, ICU & emergency ambulance</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
              Trauma Active
            </span>
          </div>

          <div className="space-y-3">
            {hospitals.map((hosp) => (
              <div
                key={hosp.id}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-purple-950">{hosp.name}</h4>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                      {hosp.distance}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{hosp.address}</p>
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                    <span>Emergency: <strong className="text-rose-700">{hosp.emergency}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${hosp.phone}`}
                    className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Dial ER</span>
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${hosp.coordinates[0]},${hosp.coordinates[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white border border-slate-200 text-slate-700 hover:text-purple-700 rounded-xl transition"
                    title="Map Directions"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
