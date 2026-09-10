import express from 'express';
import cors from 'cors';
import { HOTELS_DATA, MAP_SERVICES, SCAM_ALERTS, DEFAULT_LOCATION, EMERGENCY_CONTACTS } from '../src/data/travelData.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory persistent state for server lifetime
let hotels = [...HOTELS_DATA];
let alerts = [...SCAM_ALERTS];

// 1. GET Hotels (supports ?category=low|premium&verified=true)
app.get('/api/hotels', (req, res) => {
  const { category, verified, minPrice, maxPrice } = req.query;
  let result = [...hotels];

  if (category && category !== 'all') {
    result = result.filter(h => h.category === category);
  }
  if (verified === 'true') {
    result = result.filter(h => h.verified);
  }
  if (minPrice) {
    result = result.filter(h => h.pricePerNight >= Number(minPrice));
  }
  if (maxPrice) {
    result = result.filter(h => h.pricePerNight <= Number(maxPrice));
  }

  res.json({ success: true, count: result.length, data: result });
});

// 2. POST Register Hotel (Provider role)
app.post('/api/hotels/register', (req, res) => {
  const newHotel = {
    ...req.body,
    id: `h-srv-${Date.now()}`,
    rating: 4.0,
    reviewsCount: 1,
    trustScore: 70,
    verified: false,
    verificationTier: "⚠️ Pending Admin Verification",
    isTopPick: false,
    rank: 99
  };

  hotels.unshift(newHotel);
  res.status(201).json({ success: true, message: "Hotel submitted for verification", data: newHotel });
});

// 3. POST Admin Verify Hotel
app.post('/api/admin/verify', (req, res) => {
  const { hotelId, approve } = req.body;
  const hotel = hotels.find(h => h.id === hotelId);

  if (!hotel) {
    return res.status(404).json({ success: false, message: "Hotel not found" });
  }

  if (approve) {
    hotel.verified = true;
    hotel.trustScore = Math.max(hotel.trustScore, 96);
    hotel.verificationTier = "Govt & Admin Verified";
    hotel.warning = undefined;
  } else {
    hotel.verified = false;
    hotel.trustScore = 20;
    hotel.verificationTier = "❌ Rejected by Admin (Suspicious/Non-compliant)";
    hotel.warning = "Flagged by Admin: Failed physical KYC or fire safety compliance audit.";
  }

  res.json({ success: true, message: approve ? "Hotel verified" : "Hotel rejected", data: hotel });
});

// 4. GET Emergency Services & Contacts
app.get('/api/emergency', (req, res) => {
  const location = req.query.location || DEFAULT_LOCATION.city;
  const police = MAP_SERVICES.filter(p => p.type === 'police');
  const hospitals = MAP_SERVICES.filter(p => p.type === 'hospital');

  res.json({
    success: true,
    location,
    nationalContacts: EMERGENCY_CONTACTS,
    policeStations: police,
    hospitals: hospitals,
    sosCoordinates: DEFAULT_LOCATION.coordinates
  });
});

// 5. POST AI Budget Recommendations
app.post('/api/budget-recommendations', (req, res) => {
  const { totalBudget = 15000, durationDays = 3, travellers = 2 } = req.body;

  const lowBudget = hotels
    .filter(h => h.category === 'low' && h.verified)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const premium = hotels
    .filter(h => h.category === 'premium' && h.verified)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const estimatedHotelExpense = Math.round(totalBudget * 0.38);
  const foodExpense = Math.round(totalBudget * 0.22);
  const transportExpense = Math.round(totalBudget * 0.16);
  const activitiesExpense = Math.round(totalBudget * 0.14);
  const reserveFund = totalBudget - (estimatedHotelExpense + foodExpense + transportExpense + activitiesExpense);

  res.json({
    success: true,
    inputs: { totalBudget, durationDays, travellers },
    breakdown: {
      accommodation: estimatedHotelExpense,
      food: foodExpense,
      transport: transportExpense,
      activities: activitiesExpense,
      reserve: Math.max(0, reserveFund)
    },
    recommendations: {
      lowBudgetTop3: lowBudget,
      premiumTop3: premium
    }
  });
});

// 6. GET / POST Scam Alerts
app.get('/api/alerts', (req, res) => {
  res.json({ success: true, count: alerts.length, data: alerts });
});

app.post('/api/alerts', (req, res) => {
  const newAlert = {
    ...req.body,
    id: `alert-${Date.now()}`,
    datePosted: "Just Now",
    badge: "Admin Broadcast"
  };
  alerts.unshift(newAlert);
  res.status(201).json({ success: true, message: "Advisory broadcasted", data: newAlert });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', platform: 'Tourist Safety & Trust Assistant API', location: DEFAULT_LOCATION.city });
});

app.listen(PORT, () => {
  console.log(`[Tourist Safety API] Server running on http://localhost:${PORT}`);
});
