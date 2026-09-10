import React, { useState } from 'react';
import { ShieldCheck, MapPin, AlertTriangle, Sparkles, PhoneCall, Hotel, DollarSign, Compass, Menu, X, UserCheck, Building2, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTravel } from '../context/TravelContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { role, setRole, user } = useAuth();
  const { destination, setDestination, sosActive, triggerSOS, cancelSOS } = useTravel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Plan Trip', icon: Compass },
    { id: 'map', label: 'Explore Map', icon: MapPin },
    { id: 'hotels', label: 'Verified Hotels', icon: Hotel },
    { id: 'budget', label: 'AI Budget & Picks', icon: DollarSign },
    { id: 'safety', label: 'Safety & Scams', icon: AlertTriangle },
    { id: 'ai', label: 'AI Assistant', icon: Sparkles },
    ...(role === 'provider' ? [{ id: 'provider', label: 'My Listings', icon: Building2 }] : []),
    ...(role === 'admin' ? [{ id: 'admin', label: 'Admin Portal', icon: UserCheck }] : [])
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-purple-sm transition-all">
      {/* Top Notification / Safety Ticker */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium tracking-wide">Live Safe Zone:</span>
            <span className="text-purple-200">
              Demo Active in <strong className="text-white">Vizianagaram</strong> • 100% Police & Hospital Data Verified
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setActiveTab('safety')}
              className="text-purple-200 hover:text-white transition flex items-center gap-1 font-medium"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Scam Advisory Active</span>
            </button>
            <div className="h-3 w-px bg-purple-700 hidden sm:block"></div>
            <button
              onClick={() => setActiveTab('emergency')}
              className="text-rose-200 hover:text-white font-semibold flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-rose-400 animate-pulse" />
              <span>Helpline: 112 / 100</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Neat Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-500/20 text-white transition-transform hover:scale-105">
              <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-purple-950 font-sans">
                  Tourist<span className="text-purple-700">Safety</span>
                </span>
                <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-purple-200">
                  AI Companion
                </span>
              </div>
              <p className="text-xs text-purple-600/80 font-medium">
                Verified Travel & Trust Ecosystem
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-50 text-purple-800 shadow-sm border border-purple-200/80 font-bold'
                      : 'text-slate-600 hover:text-purple-800 hover:bg-purple-50/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-700' : 'text-slate-400 group-hover:text-purple-600'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Emergency SOS + Role Selector */}
          <div className="hidden sm:flex items-center space-x-3">
            
            {/* Quick Demo Location Pill */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-purple-50 text-purple-900 rounded-lg text-xs font-semibold border border-purple-200/70">
              <MapPin className="w-3.5 h-3.5 text-purple-600" />
              <span>Vizianagaram</span>
            </div>

            {/* Emergency SOS Button */}
            <button
              onClick={() => setActiveTab('emergency')}
              className="relative group flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-rose-500/25 hover:from-red-700 hover:to-rose-700 transition active:scale-95 pulse-emergency"
              title="Emergency SOS Instant Support"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>SOS Help</span>
            </button>

            {/* Role Switcher Pill (Tourist / Hotelier / Admin) */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-purple-100/70 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition"
              >
                {role === 'tourist' && <User className="w-3.5 h-3.5 text-purple-700" />}
                {role === 'provider' && <Building2 className="w-3.5 h-3.5 text-purple-700" />}
                {role === 'admin' && <UserCheck className="w-3.5 h-3.5 text-purple-700" />}
                <span className="capitalize">Role: {role}</span>
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-purple-lg border border-purple-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-purple-50 text-[11px] font-semibold text-purple-500 uppercase tracking-wider">
                    Demo Role Switcher
                  </div>

                  <button
                    onClick={() => { setRole('tourist'); setActiveTab('home'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center space-x-2.5 text-xs font-semibold hover:bg-purple-50 transition ${role === 'tourist' ? 'text-purple-700 bg-purple-50/70' : 'text-slate-700'}`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold">Tourist / Traveler</div>
                      <div className="text-[10px] text-slate-400 font-normal">Explore stays, map & budgets</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setRole('provider'); setActiveTab('provider'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center space-x-2.5 text-xs font-semibold hover:bg-purple-50 transition ${role === 'provider' ? 'text-purple-700 bg-purple-50/70' : 'text-slate-700'}`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold">Hotel / Service Provider</div>
                      <div className="text-[10px] text-slate-400 font-normal">Register hotel & verify KYC</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setRole('admin'); setActiveTab('admin'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center space-x-2.5 text-xs font-semibold hover:bg-purple-50 transition ${role === 'admin' ? 'text-purple-700 bg-purple-50/70' : 'text-slate-700'}`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                      <UserCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold">Admin Authority</div>
                      <div className="text-[10px] text-slate-400 font-normal">Verify hotels & post alerts</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Mobile menu hamburger */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('emergency')}
              className="px-2.5 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold"
            >
              SOS
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-purple-900 rounded-xl hover:bg-purple-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-purple-100 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => { setActiveTab(link.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive ? 'bg-purple-100 text-purple-800' : 'text-slate-700 hover:bg-purple-50'
                }`}
              >
                <Icon className="w-5 h-5 text-purple-600" />
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-purple-100">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Switch Demo Role</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { setRole('tourist'); setActiveTab('home'); setMobileMenuOpen(false); }}
                className={`py-2 px-2 text-xs font-bold rounded-lg border text-center ${role === 'tourist' ? 'bg-purple-600 text-white border-purple-600' : 'bg-purple-50 text-purple-800 border-purple-200'}`}
              >
                Tourist
              </button>
              <button
                onClick={() => { setRole('provider'); setActiveTab('provider'); setMobileMenuOpen(false); }}
                className={`py-2 px-2 text-xs font-bold rounded-lg border text-center ${role === 'provider' ? 'bg-purple-600 text-white border-purple-600' : 'bg-purple-50 text-purple-800 border-purple-200'}`}
              >
                Provider
              </button>
              <button
                onClick={() => { setRole('admin'); setActiveTab('admin'); setMobileMenuOpen(false); }}
                className={`py-2 px-2 text-xs font-bold rounded-lg border text-center ${role === 'admin' ? 'bg-purple-600 text-white border-purple-600' : 'bg-purple-50 text-purple-800 border-purple-200'}`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
