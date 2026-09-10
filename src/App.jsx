import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TravelProvider, useTravel } from './context/TravelContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MapView from './components/MapView';
import HotelsPage from './pages/HotelsPage';
import BudgetPage from './pages/BudgetPage';
import SafetyCenter from './components/SafetyCenter';
import AIAssistant from './components/AIAssistant';
import EmergencySOS from './components/EmergencySOS';
import ProviderPortal from './components/ProviderPortal';
import AdminPanel from './components/AdminPanel';
import { 
  Sparkles, ShieldCheck, Heart, ArrowUp, 
  MessageSquare, PhoneCall, AlertTriangle, UserCheck, Compass 
} from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [floatingChatOpen, setFloatingChatOpen] = useState(false);
  const { role } = useAuth();
  const { selectedHotel, setSelectedHotel, destination, defaultLocation, sosActive } = useTravel();

  const handleSelectHotelFromList = (hotel) => {
    setSelectedHotel(hotel);
    setActiveTab('budget');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF] text-slate-800 selection:bg-purple-200 selection:text-purple-900">
      
      {/* Neat Purple & White Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <Home onNavigate={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'map' && (
          <div className="space-y-6">
            <MapView onSelectHotel={handleSelectHotelFromList} />
          </div>
        )}

        {activeTab === 'hotels' && (
          <HotelsPage 
            onSelectHotel={handleSelectHotelFromList} 
            onGoToBudget={() => setActiveTab('budget')} 
          />
        )}

        {activeTab === 'budget' && (
          <BudgetPage 
            onSelectHotel={(h) => setSelectedHotel(h)} 
            onExploreHotels={() => setActiveTab('hotels')} 
          />
        )}

        {activeTab === 'safety' && (
          <SafetyCenter />
        )}

        {activeTab === 'ai' && (
          <div className="max-w-4xl mx-auto">
            <AIAssistant />
          </div>
        )}

        {activeTab === 'emergency' && (
          <EmergencySOS />
        )}

        {activeTab === 'provider' && (
          <ProviderPortal />
        )}

        {activeTab === 'admin' && (
          <AdminPanel />
        )}
      </main>

      {/* Floating AI Companion Launcher in Bottom Right */}
      {activeTab !== 'ai' && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
          {floatingChatOpen && (
            <div className="w-[360px] sm:w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-purple-200 animate-in fade-in slide-in-from-bottom-5 mb-2">
              <AIAssistant />
            </div>
          )}

          <button
            onClick={() => setFloatingChatOpen(!floatingChatOpen)}
            className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white rounded-2xl shadow-xl shadow-purple-600/30 transition-all transform hover:scale-105 active:scale-95 border border-purple-400/30"
          >
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-200" />
            </div>
            <div className="text-left pr-1">
              <div className="text-xs font-black leading-none">AI Travel Assistant</div>
              <div className="text-[10px] text-purple-200 font-medium">Ask questions in {destination}</div>
            </div>
          </button>
        </div>
      )}

      {/* Neat Clean Footer */}
      <footer className="bg-white border-t border-purple-100 py-10 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-black text-purple-950">
                Tourist<span className="text-purple-700">Safety</span> & Trust Assistant
              </div>
              <p className="text-xs text-slate-500">
                Smart India Hackathon Prototype • Default Safe Hub: {defaultLocation.city}, AP
              </p>
            </div>
          </div>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <button onClick={() => setActiveTab('home')} className="hover:text-purple-800 transition">Plan Trip</button>
            <button onClick={() => setActiveTab('map')} className="hover:text-purple-800 transition">Interactive Map</button>
            <button onClick={() => setActiveTab('hotels')} className="hover:text-purple-800 transition">Verified Hotels</button>
            <button onClick={() => setActiveTab('budget')} className="hover:text-purple-800 transition">Budget Engine</button>
            <button onClick={() => setActiveTab('safety')} className="hover:text-purple-800 transition">Scam Awareness</button>
            <button onClick={() => setActiveTab('emergency')} className="text-rose-600 hover:text-rose-700 font-bold transition">Emergency SOS</button>
          </div>

          <div className="text-xs text-slate-400 font-medium text-center md:text-right">
            Protected by District Tourism Safety Standards • 2026
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TravelProvider>
        <AppContent />
      </TravelProvider>
    </AuthProvider>
  );
}
