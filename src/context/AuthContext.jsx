import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Role can be: 'tourist' | 'provider' | 'admin'
  const [role, setRole] = useState(() => {
    return localStorage.getItem('sih_user_role') || 'tourist';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sih_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* use default */ }
    }
    return {
      name: "Renuka Tourist",
      email: "renuka.traveler@example.com",
      phone: "+91 98480 12345",
      emergencyContact: "+91 94401 56789 (Family)",
      idVerified: true,
      trustLevel: "Verified Citizen Traveler"
    };
  });

  useEffect(() => {
    localStorage.setItem('sih_user_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('sih_user_profile', JSON.stringify(user));
  }, [user]);

  const switchRole = (newRole) => {
    setRole(newRole);
    if (newRole === 'admin') {
      setUser({
        name: "Officer P. Rao (Admin)",
        email: "vzm.tourism.admin@ap.gov.in",
        department: "District Tourism & Safety Board",
        badgeId: "VZM-ADMIN-GOV-09",
        idVerified: true
      });
    } else if (newRole === 'provider') {
      setUser({
        name: "Suresh Reddy (Hotelier)",
        businessName: "Royal Heritage Stays",
        licenseId: "AP-VZM-LIC-2024-09",
        email: "contact@royalheritagestay.com",
        phone: "+91 98492 44321",
        verified: false,
        verificationStatus: "Under Verification"
      });
    } else {
      setUser({
        name: "Renuka Tourist",
        email: "renuka.traveler@example.com",
        phone: "+91 98480 12345",
        emergencyContact: "+91 94401 56789 (Family)",
        idVerified: true,
        trustLevel: "Verified Citizen Traveler"
      });
    }
  };

  return (
    <AuthContext.Provider value={{ role, setRole: switchRole, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
