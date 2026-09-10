import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import { 
  AlertTriangle, ShieldCheck, Search, CheckCircle, 
  XCircle, HelpCircle, Eye, AlertOctagon, Lightbulb, BellRing 
} from 'lucide-react';

export default function SafetyCenter() {
  const { alerts, hotels, defaultLocation } = useTravel();
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerifyLookup = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const term = searchTerm.toLowerCase().trim();

    // Check against verified hotels
    const matchedHotel = hotels.find(h => 
      h.name.toLowerCase().includes(term) || 
      h.licenseNo.toLowerCase().includes(term)
    );

    if (matchedHotel) {
      if (matchedHotel.verified) {
        setVerificationResult({
          status: 'verified',
          title: `Verified Trusted Listing: ${matchedHotel.name}`,
          details: `Registered under License ID: ${matchedHotel.licenseNo}. Has passed police verification & fire safety audit. Trust Score: ${matchedHotel.trustScore}%.`,
          badge: matchedHotel.verificationTier
        });
      } else {
        setVerificationResult({
          status: 'unverified',
          title: `⚠️ Unverified / Suspicious Listing: ${matchedHotel.name}`,
          details: `This service has NOT submitted government identity proof or has failed verification audits. ${matchedHotel.warning || 'Platform advises against advance payments.'}`,
          badge: 'Unverified Entity'
        });
      }
    } else {
      // If not found in database
      setVerificationResult({
        status: 'not_found',
        title: `Service Not Registered in ${defaultLocation.city} Safety Registry`,
        details: `"${searchTerm}" is not listed among our verified tourism providers. Be cautious of private operators soliciting advance transfers without verifiable credentials.`,
        badge: 'Unknown Service'
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-purple-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Fraud Prevention & Tourist Safety</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            Safety & Scam Awareness Center
          </h2>
          <p className="text-sm text-purple-200 leading-relaxed">
            Real-time advisories, scam protection mechanisms, and instant verification of local hotels, guides, and transit operators in {defaultLocation.city}.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center">
          <div className="text-xs text-purple-200 uppercase font-bold">Active Alerts</div>
          <div className="text-3xl font-black text-amber-400 mt-1">{alerts.length} Warnings</div>
          <div className="text-[11px] text-purple-200 mt-0.5">Monitored by Vizianagaram Police</div>
        </div>
      </div>

      {/* Trust & Service Verifier Lookup Tool */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-purple-sm border border-purple-100 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <h3 className="text-xl font-black text-purple-950">
              Instant Service & Hotel Trust Verifier
            </h3>
            <p className="text-xs text-slate-500">
              Verify if a hotel, homestay, or travel guide is authorized by the District Tourism Board.
            </p>
          </div>
        </div>

        <form onSubmit={handleVerifyLookup} className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-purple-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search hotel name or License ID (e.g. 'Mayura', 'SVN Lake', 'AP-VZM-HTL-2024-8841')..."
              className="w-full bg-purple-50/50 border border-purple-200 rounded-2xl pl-12 pr-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-purple-600/20 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Trust</span>
          </button>
        </form>

        {/* Verification Result Card */}
        {verificationResult && (
          <div className={`mt-4 p-5 rounded-2xl border transition-all animate-in fade-in ${
            verificationResult.status === 'verified'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : verificationResult.status === 'unverified'
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-start gap-3">
              {verificationResult.status === 'verified' && (
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              )}
              {verificationResult.status === 'unverified' && (
                <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              )}
              {verificationResult.status === 'not_found' && (
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              )}

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-sm">{verificationResult.title}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/70 border border-black/10">
                    {verificationResult.badge}
                  </span>
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  {verificationResult.details}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Scam Alerts Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-purple-950 flex items-center gap-2">
              <BellRing className="w-5 h-5 text-purple-700" />
              <span>Real-Time Travel Scam Alerts in Vizianagaram</span>
            </h3>
            <p className="text-xs text-slate-500">
              Verified reports collected by tourist helplines & local law enforcement.
            </p>
          </div>
          <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
            Updated Hourly
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-3xl p-6 border shadow-purple-sm transition-all hover:shadow-purple-md flex flex-col justify-between space-y-4 ${
                alert.severity === 'high' 
                  ? 'border-rose-200 bg-gradient-to-br from-white to-rose-50/30' 
                  : 'border-purple-100'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    alert.severity === 'high'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {alert.severity} Risk
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{alert.datePosted}</span>
                </div>

                <h4 className="text-base font-black text-purple-950">
                  {alert.title}
                </h4>

                <div className="text-xs text-purple-700 font-bold flex items-center gap-1">
                  <span>📍 Hotspot:</span>
                  <span className="text-slate-700">{alert.location}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {alert.description}
                </p>
              </div>

              {/* Recommendation Box */}
              <div className="p-3 bg-purple-50/80 rounded-2xl border border-purple-100 text-xs text-purple-950 font-medium">
                🛡️ <strong>Safety Advisory:</strong> {alert.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Best Practices Checklist */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-purple-sm border border-purple-100 space-y-4">
        <h3 className="text-lg font-black text-purple-950 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>General Tourist Trust & Safety Guidelines</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1.5">
            <div className="font-extrabold text-purple-950">1. Verification Check</div>
            <p className="text-slate-600 leading-relaxed">
              Always look for our green "Admin & Govt Verified" badge before booking hotels or paying tour advances.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1.5">
            <div className="font-extrabold text-purple-950">2. Emergency Dialers</div>
            <p className="text-slate-600 leading-relaxed">
              Save 112 (National Emergency) and 1091 (Disha Women Safety) on speed dial. Both respond within minutes in Vizianagaram.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1.5">
            <div className="font-extrabold text-purple-950">3. Night Transit</div>
            <p className="text-slate-600 leading-relaxed">
              After 10:00 PM, stick to well-lit roads (Station Road, Fort Road, MG Road) and share live route pins with family.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
