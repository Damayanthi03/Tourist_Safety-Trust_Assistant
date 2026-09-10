import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTravel } from '../context/TravelContext';
import { 
  UserCheck, ShieldCheck, Check, X, AlertTriangle, 
  Trash2, PlusCircle, BellRing, Building, FileCheck 
} from 'lucide-react';

export default function AdminPanel() {
  const { user } = useAuth();
  const { hotels, verifyHotel, removeHotel, addScamAlert, alerts } = useTravel();

  const [newAlertTitle, setNewAlertTitle] = useState('');
  const [newAlertLocation, setNewAlertLocation] = useState('Vizianagaram');
  const [newAlertDesc, setNewAlertDesc] = useState('');
  const [newAlertSeverity, setNewAlertSeverity] = useState('high');
  const [alertSuccess, setAlertSuccess] = useState(false);

  const pendingHotels = hotels.filter(h => !h.verified);
  const verifiedHotels = hotels.filter(h => h.verified);

  const handlePublishAlert = (e) => {
    e.preventDefault();
    if (!newAlertTitle || !newAlertDesc) return;

    addScamAlert({
      title: newAlertTitle,
      location: newAlertLocation,
      description: newAlertDesc,
      severity: newAlertSeverity,
      recommendation: "Verified by District Tourism Safety Authority. Follow advisory."
    });

    setAlertSuccess(true);
    setTimeout(() => setAlertSuccess(false), 4000);
    setNewAlertTitle('');
    setNewAlertDesc('');
  };

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-purple-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-purple-200 border border-white/20">
            <UserCheck className="w-3.5 h-3.5" />
            <span>District Administration Console</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            Trust & Verification Management Portal
          </h2>
          <p className="text-sm text-purple-200 leading-relaxed">
            Logged in as <strong>{user?.name || "Officer P. Rao (Admin)"}</strong> • Authorize vetted hotels, audit KYC credentials, and issue live tourist safety alerts.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center min-w-[120px]">
            <div className="text-xs text-purple-200 uppercase font-bold">Pending Review</div>
            <div className="text-2xl font-black text-amber-300 mt-1">{pendingHotels.length} Stays</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center min-w-[120px]">
            <div className="text-xs text-purple-200 uppercase font-bold">Verified Stays</div>
            <div className="text-2xl font-black text-emerald-300 mt-1">{verifiedHotels.length} Stays</div>
          </div>
        </div>
      </div>

      {/* PENDING HOTEL VERIFICATION LIST */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-purple-sm border border-purple-100 space-y-5">
        <div className="flex items-center justify-between border-b border-purple-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <FileCheck className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h3 className="text-xl font-black text-purple-950">
                Pending Verification Requests
              </h3>
              <p className="text-xs text-slate-500">
                Audit trade licenses and grant official Trust Badges.
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            {pendingHotels.length} Pending Actions
          </span>
        </div>

        {pendingHotels.length === 0 ? (
          <div className="p-8 text-center bg-purple-50/50 rounded-2xl border border-purple-100 text-slate-500 text-xs">
            🎉 All hotel registrations have been reviewed! No pending applications.
          </div>
        ) : (
          <div className="space-y-4">
            {pendingHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="p-5 rounded-2xl border border-amber-200 bg-amber-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4 transition"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-base text-purple-950">{hotel.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      Pending Audit
                    </span>
                    <span className="text-xs font-bold text-purple-700">₹{hotel.pricePerNight}/night</span>
                  </div>

                  <div className="text-xs text-slate-600 flex flex-wrap gap-4">
                    <span>📍 {hotel.address}</span>
                    <span>📄 License: <strong className="font-mono text-purple-900">{hotel.licenseNo}</strong></span>
                  </div>

                  <div className="text-xs text-slate-500 flex flex-wrap gap-1.5 pt-1">
                    {hotel.safetyFeatures?.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white rounded border border-slate-200 text-[11px]">
                        {f}
                      </span>
                    ))}
                  </div>

                  {hotel.warning && (
                    <div className="text-xs text-rose-700 font-semibold pt-1">
                      ⚠️ {hotel.warning}
                    </div>
                  )}
                </div>

                {/* Approve / Reject Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => verifyHotel(hotel.id, true)}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve & Grant Shield</span>
                  </button>
                  <button
                    onClick={() => verifyHotel(hotel.id, false)}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject / Flag Fake</span>
                  </button>
                  <button
                    onClick={() => removeHotel(hotel.id)}
                    className="p-2.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BROADCAST NEW SAFETY ADVISORY */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-purple-sm border border-purple-100 space-y-5">
        <div className="flex items-center justify-between border-b border-purple-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <BellRing className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-xl font-black text-purple-950">
                Broadcast Live Safety or Scam Advisory
              </h3>
              <p className="text-xs text-slate-500">
                Publish instantaneous warnings to all tourists currently visiting Vizianagaram.
              </p>
            </div>
          </div>
        </div>

        {alertSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-bold animate-in fade-in">
            ✅ Safety Advisory Broadcasted! Tourists can view it live in the Safety & Scam Center.
          </div>
        )}

        <form onSubmit={handlePublishAlert} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Advisory Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Caution: Fake Prepaid Booth at East Gate"
                value={newAlertTitle}
                onChange={(e) => setNewAlertTitle(e.target.value)}
                className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Target Location / Spot *</label>
              <input
                type="text"
                required
                placeholder="e.g. Vizianagaram Fort Square"
                value={newAlertLocation}
                onChange={(e) => setNewAlertLocation(e.target.value)}
                className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/30"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Warning Details & Advisory Action *</label>
            <textarea
              rows={3}
              required
              placeholder="Describe the suspicious activity and instruct tourists on precautions..."
              value={newAlertDesc}
              onChange={(e) => setNewAlertDesc(e.target.value)}
              className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/30"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-2xl shadow-md shadow-purple-600/30 transition active:scale-95 flex items-center gap-2"
            >
              <BellRing className="w-4 h-4" />
              <span>Publish Real-Time Advisory</span>
            </button>
          </div>
        </form>
      </div>

      {/* CURRENT VERIFIED HOTELS DIRECTORY (With Revoke Option) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-purple-sm border border-purple-100 space-y-4">
        <h3 className="text-lg font-black text-purple-950 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Active Verified Hotel Registry ({verifiedHotels.length} Stays)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-purple-100 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">Hotel Name</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Tariff</th>
                <th className="py-3 px-4 font-bold">License ID</th>
                <th className="py-3 px-4 font-bold">Trust Score</th>
                <th className="py-3 px-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50 text-slate-700 font-medium">
              {verifiedHotels.map(h => (
                <tr key={h.id} className="hover:bg-purple-50/40 transition">
                  <td className="py-3 px-4 font-bold text-purple-950">{h.name}</td>
                  <td className="py-3 px-4 capitalize font-semibold">
                    <span className={`px-2 py-0.5 rounded-md ${h.category === 'low' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'}`}>
                      {h.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold">₹{h.pricePerNight}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{h.licenseNo}</td>
                  <td className="py-3 px-4 font-black text-emerald-600">{h.trustScore}%</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => verifyHotel(h.id, false)}
                      className="text-rose-600 hover:text-rose-800 font-bold hover:underline"
                    >
                      Revoke Verification
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
