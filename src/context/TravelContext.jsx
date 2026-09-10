import React, { createContext, useContext, useState, useEffect } from 'react';
import { HOTELS_DATA, MAP_SERVICES, SCAM_ALERTS, DEFAULT_LOCATION } from '../data/travelData';

const TravelContext = createContext();

export function TravelProvider({ children }) {
  // Travel requirements state
  const [destination, setDestination] = useState(DEFAULT_LOCATION.city);
  const [durationDays, setDurationDays] = useState(3);
  const [travellers, setTravellers] = useState(2);
  const [budget, setBudget] = useState(15000);
  const [preferences, setPreferences] = useState(['Safe for Family', 'Verified Stays Only']);
  
  // Selected hotel for simulation
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Dynamic Hotel Listings (Admin & Provider synchronized)
  const [hotels, setHotels] = useState(() => {
    const saved = localStorage.getItem('sih_hotels_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* use seed */ }
    }
    return HOTELS_DATA;
  });

  // Dynamic Scam Alerts (Admin can add new)
  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('sih_alerts_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* use seed */ }
    }
    return SCAM_ALERTS;
  });

  // Map POIs
  const [mapServices, setMapServices] = useState(MAP_SERVICES);
  const [activeMapCategory, setActiveMapCategory] = useState('all');

  // Emergency SOS state
  const [sosActive, setSosActive] = useState(false);
  const [sosDispatched, setSosDispatched] = useState(false);

  useEffect(() => {
    localStorage.setItem('sih_hotels_data', JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem('sih_alerts_data', JSON.stringify(alerts));
  }, [alerts]);

  // Provider adds a new listing
  const registerHotel = (newHotel) => {
    const hotelObj = {
      ...newHotel,
      id: `h-user-${Date.now()}`,
      rating: 4.0,
      reviewsCount: 1,
      trustScore: 70, // Base pending score
      verified: false,
      verificationTier: "⚠️ Pending Admin Verification",
      isTopPick: false,
      rank: 99
    };
    setHotels(prev => [hotelObj, ...prev]);
    return hotelObj;
  };

  // Admin verifies a hotel
  const verifyHotel = (hotelId, approve = true) => {
    setHotels(prev => prev.map(h => {
      if (h.id === hotelId) {
        if (approve) {
          return {
            ...h,
            verified: true,
            trustScore: Math.max(h.trustScore, 95),
            verificationTier: "Govt & Admin Verified",
            warning: undefined
          };
        } else {
          return {
            ...h,
            verified: false,
            trustScore: 20,
            verificationTier: "❌ Rejected by Admin (Suspicious/Non-compliant)",
            warning: "Flagged by Admin: Failed physical KYC or fire safety compliance audit."
          };
        }
      }
      return h;
    }));
  };

  // Admin deletes / blacklists hotel
  const removeHotel = (hotelId) => {
    setHotels(prev => prev.filter(h => h.id !== hotelId));
  };

  // Admin adds new alert
  const addScamAlert = (alert) => {
    const newAlert = {
      ...alert,
      id: `alert-${Date.now()}`,
      datePosted: "Just Now",
      badge: "Admin Broadcast"
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  // Calculate Budget Breakdown
  const calculateBudgetBreakdown = (totalBudget = budget, days = durationDays, guests = travellers, hotelPrice = null) => {
    // Standard recommended distribution for balanced travel
    const estimatedHotelCost = hotelPrice 
      ? hotelPrice * days 
      : Math.round(totalBudget * 0.38);

    const foodCost = Math.round(totalBudget * 0.22);
    const transportCost = Math.round(totalBudget * 0.16);
    const activitiesCost = Math.round(totalBudget * 0.14);
    const emergencyReserve = totalBudget - (estimatedHotelCost + foodCost + transportCost + activitiesCost);

    const isExceeded = (estimatedHotelCost + foodCost + transportCost + activitiesCost) > totalBudget;

    return {
      totalBudget,
      durationDays: days,
      travellers: guests,
      breakdown: {
        accommodation: estimatedHotelCost,
        food: foodCost,
        transport: transportCost,
        activities: activitiesCost,
        reserve: Math.max(0, emergencyReserve)
      },
      perPersonPerDay: Math.round(totalBudget / (days * guests)),
      isExceeded,
      deficit: isExceeded ? (estimatedHotelCost + foodCost + transportCost + activitiesCost) - totalBudget : 0
    };
  };

  // Trigger SOS
  const triggerSOS = () => {
    setSosActive(true);
    setSosDispatched(true);
  };

  const cancelSOS = () => {
    setSosActive(false);
    setSosDispatched(false);
  };

  return (
    <TravelContext.Provider value={{
      destination,
      setDestination,
      durationDays,
      setDurationDays,
      travellers,
      setTravellers,
      budget,
      setBudget,
      preferences,
      setPreferences,
      hotels,
      registerHotel,
      verifyHotel,
      removeHotel,
      selectedHotel,
      setSelectedHotel,
      alerts,
      addScamAlert,
      mapServices,
      activeMapCategory,
      setActiveMapCategory,
      calculateBudgetBreakdown,
      sosActive,
      sosDispatched,
      triggerSOS,
      cancelSOS,
      defaultLocation: DEFAULT_LOCATION
    }}>
      {children}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
}
