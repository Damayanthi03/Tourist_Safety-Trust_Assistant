import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTravel } from '../context/TravelContext';
import { 
  Building2, ShieldCheck, Upload, CheckCircle2, 
  AlertCircle, FileText, PlusCircle, Star 
} from 'lucide-react';

export default function ProviderPortal() {
  const { user } = useAuth();
  const { registerHotel, hotels } = useTravel();

  const [formData, setFormData] = useState({
    name: '',
    category: 'low',
    pricePerNight: '',
    address: '',
    licenseNo: '',
    contactPhone: '',
    amenities: 'Free Wi-Fi, 24/7 CCTV, Safe Drinking Water',
    safetyFeatures: 'Fire Safety Certificate, Police Verified Staff',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
    distanceFromCenter: '1.0 km',
    coordinates: [18.1100, 83.4000]
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.pricePerNight || !formData.licenseNo) {
      alert("Please complete hotel name, price per night, and license number.");
      return;
    }

    const newHotel = {
      name: formData.name,
      category: formData.category,
      pricePerNight: Number(formData.pricePerNight),
      address: formData.address || 'Vizianagaram Town Center',
      licenseNo: formData.licenseNo,
      phone: formData.contactPhone,
      amenities: formData.amenities.split(',').map(s => s.trim()),
      safetyFeatures: formData.safetyFeatures.split(',').map(s => s.trim()),
      image: formData.image,
      distanceFromCenter: formData.distanceFromCenter,
      coordinates: formData.coordinates
    };

    registerHotel(newHotel);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({
      name: '',
      category: 'low',
      pricePerNight: '',
      address: '',
      licenseNo: '',
      contactPhone: '',
      amenities: 'Free Wi-Fi, 24/7 CCTV, Safe Drinking Water',
      safetyFeatures: 'Fire Safety Certificate, Police Verified Staff',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
      distanceFromCenter: '1.0 km',
      coordinates: [18.1100, 83.4000]
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-purple-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-purple-200 border border-white/20">
            <Building2 className="w-3.5 h-3.5" />
            <span>Service Provider Portal</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            Register & Certify Your Hospitality Business
          </h2>
          <p className="text-sm text-purple-200 leading-relaxed">
            Join the verified network of authentic hotels and tourism services in Vizianagaram. All listings are reviewed and certified by District Tourism Authorities.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center">
          <div className="text-xs text-purple-200 uppercase font-bold">Why Get Verified?</div>
          <div className="text-lg font-black text-emerald-300 mt-1">3x Higher Bookings</div>
          <div className="text-[11px] text-purple-200 mt-0.5">Trust Shield protection badge</div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-purple-sm border border-purple-100 space-y-6">
        <div className="flex items-center justify-between border-b border-purple-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <PlusCircle className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-xl font-black text-purple-950">
                Submit Hotel for Trust Verification
              </h3>
              <p className="text-xs text-slate-500">
                Please provide verifiable business credentials and safety audits.
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
            KYC Compliance Required
          </span>
        </div>

        {submitted && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex items-center gap-3 text-xs animate-in fade-in">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <div className="font-extrabold text-sm">Application Submitted Successfully!</div>
              <div>Your listing has been submitted for Admin Verification. Switch to the <strong>Admin Role</strong> in the navbar to approve this listing live!</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Hotel / Business Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Palace Suites"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/30"
              >
                <option value="low">Low Budget Category (₹800 - ₹2,000)</option>
                <option value="premium">Premium / High Budget (₹2,500 - ₹6,000+)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Tariff per Night (₹) *</label>
              <input
                type="number"
                required
                placeholder="e.g. 1600"
                value={formData.pricePerNight}
                onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
                className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Govt Trade / Municipal License ID *</label>
              <input
                type="text"
                required
                placeholder="e.g. AP-VZM-HTL-2024-XXXX"
                value={formData.licenseNo}
                onChange={(e) => setFormData({ ...formData, licenseNo: e.target.value })}
                className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/30 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Physical Address in Vizianagaram</label>
            <input
              type="text"
              placeholder="e.g. Near Fort Circle, Cantonment Area, Vizianagaram"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/30"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Verified Safety Features (comma separated)</label>
              <input
                type="text"
                placeholder="Fire NOC, 24/7 CCTV, Doctor on Call"
                value={formData.safetyFeatures}
                onChange={(e) => setFormData({ ...formData, safetyFeatures: e.target.value })}
                className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Amenities (comma separated)</label>
              <input
                type="text"
                placeholder="Wi-Fi, AC, Breakfast, Parking"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/30"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-2xl shadow-md shadow-purple-600/30 transition active:scale-95 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Submit for Admin Trust Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
