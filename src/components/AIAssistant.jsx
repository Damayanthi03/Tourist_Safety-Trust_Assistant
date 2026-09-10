import React, { useState, useRef, useEffect } from 'react';
import { useTravel } from '../context/TravelContext';
import { 
  Sparkles, Send, Bot, User, ShieldCheck, MapPin, 
  Hotel, AlertTriangle, Phone, ThumbsUp, RefreshCw, Compass 
} from 'lucide-react';

export default function AIAssistant() {
  const { destination, budget, durationDays, travellers, hotels, mapServices, defaultLocation } = useTravel();
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I am your **AI Travel & Safety Companion** for **${destination}** 🛡️. 

I'm aware that your budget is **₹${budget.toLocaleString('en-IN')}** for **${durationDays} days** (${travellers} travelers).

How can I help you have a safe, authentic, and cost-effective trip today?`,
      timestamp: 'Just Now',
      suggestions: [
        "Suggest affordable hotels near me",
        "Where is the nearest police station?",
        "What places can I explore in Vizianagaram?",
        "Suggest places within my budget",
        "Which hotel is best for my family?",
        "How can I reduce my travel expenses?"
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Knowledge base and smart conversational response generator
  const generateAIResponse = (userQuery) => {
    const q = userQuery.toLowerCase();

    // 1. Affordable hotels near me
    if (q.includes('affordable') || (q.includes('hotel') && q.includes('cheap')) || q.includes('budget hotel') || q.includes('hotels near me')) {
      const lowStays = hotels.filter(h => h.category === 'low' && h.verified);
      return {
        text: `Here are the top **Admin-Verified Affordable Hotels** in **Vizianagaram** that prioritize your safety without breaking the bank:\n\n` +
          lowStays.map((h, i) => `**${i+1}. ${h.name}** — ₹${h.pricePerNight}/night ⭐${h.rating}\n` +
          `• *Distance:* ${h.distanceFromCenter} from Center\n` +
          `• *Trust Score:* ${h.trustScore}% Verified\n` +
          `• *Safety:* ${h.safetyFeatures?.join(', ')}\n`).join('\n') +
          `\n💡 *Pro-Tip:* All these hotels have confirmed 24/7 CCTV surveillance and verified municipal trade licenses.`,
        actionType: 'hotels'
      };
    }

    // 2. Nearest police station
    if (q.includes('police') || q.includes('cop') || q.includes('station') || q.includes('emergency')) {
      const police = mapServices.filter(p => p.type === 'police');
      return {
        text: `🚨 **Nearest Police Stations in Vizianagaram:**\n\n` +
          `**1. Vizianagaram One Town Police Station**\n` +
          `• *Location:* Main Road, Near Clock Tower (0.7 km away)\n` +
          `• *Direct Phone:* **08922-276100** | Emergency: **112 / 100**\n` +
          `• *Status:* Open 24/7 with Tourist Help Desk\n\n` +
          `**2. Disha Women Police Station & Helpdesk**\n` +
          `• *Location:* Collectorate Road (1.3 km away)\n` +
          `• *Dedicated Helpline:* **1091 (Toll Free)**\n` +
          `• *Facility:* Specialized solo female traveler assistance.\n\n` +
          `🛡️ *You can also tap the red **SOS Help** button in the navbar anytime for instant emergency broadcast.*`,
        actionType: 'emergency'
      };
    }

    // 3. Places to explore in Vizianagaram
    if (q.includes('places') || q.includes('explore') || q.includes('visit') || q.includes('attraction') || q.includes('sightseeing')) {
      const spots = mapServices.filter(p => p.type === 'attraction');
      return {
        text: `🏛️ **Top Must-Visit Attractions in Vizianagaram:**\n\n` +
          spots.map((s, i) => `**${i+1}. ${s.name}**\n` +
          `• *Description:* ${s.description}\n` +
          `• *Entry:* ${s.entryFee} | *Timing:* ${s.openStatus}\n` +
          `• *Distance:* ${s.distance} from Town Center\n`).join('\n') +
          `\n✨ *Recommendation:* Visit Vizianagaram Fort in the morning (9:30 AM - 12 PM) and Ramanarayanam Spiritual Park in the evening for the illuminated light fountain show!`,
        actionType: 'attractions'
      };
    }

    // 4. Family suitability
    if (q.includes('family') || q.includes('kids') || q.includes('parents')) {
      return {
        text: `👨‍👩‍👧‍👦 **Best Safe Recommendations for Families in Vizianagaram:**\n\n` +
          `**1. Top Family Stay: SVN Lake Palace Luxury Resort**\n` +
          `• Multi-room family suites with serene Pedda Cheruvu lake view.\n` +
          `• Doctor on call, gated security perimeter, and pure hygiene dining.\n` +
          `• Tariff: ₹3,500/night ⭐4.7 (Trust: 99%)\n\n` +
          `**2. Top Family Budget Stay: Sri Venkateswara Residency**\n` +
          `• 200m from One Town Police Station, peaceful family-friendly ambiance.\n` +
          `• In-house Pure Vegetarian dining.\n` +
          `• Tariff: ₹1,500/night ⭐4.4 (Trust: 98%)\n\n` +
          `🎪 *Family Activities:* Ramanarayanam theme park has child-friendly gardens, musical fountains, and safe paved paths.`,
        actionType: 'family'
      };
    }

    // 5. Reduce travel expenses / budget tips
    if (q.includes('reduce') || q.includes('expenses') || q.includes('save money') || q.includes('budget tips') || q.includes('cheaper')) {
      return {
        text: `💰 **Smart Ways to Reduce Your Travel Expenses in Vizianagaram:**\n\n` +
          `1. **Prepaid Auto Booths:** Avoid private unmetered autos outside the railway station. Use the official prepaid counter or RTC city buses for ₹10-₹20.\n` +
          `2. **Stay at Admin-Verified Budget Stays:** Book **Hotel Mayura Deluxe** (₹1,200/night). For 3 days, total room expense will only be ₹3,600 (saving ₹6,000+ compared to luxury resorts).\n` +
          `3. **Authentic Local Dining:** Enjoy Andhra meals at *Udupi Sri Krishna Bhavan* or *Swagath Grand Pure Veg* for ₹120–₹180 per full meal with certified FSSAI hygiene.\n` +
          `4. **Free Attractions:** Pedda Cheruvu Lake Walkway and Pydithalli Ammavari Temple have zero entry fees.\n` +
          `5. **Avoid Fake Guides:** Tour Vizianagaram Fort self-guided using the official Archaeological plaques or our app audio snippets!`,
        actionType: 'budget'
      };
    }

    // 6. Generic intelligent travel assistant response
    return {
      text: `Based on your query regarding **"${userQuery}"** in **${destination}**:\n\n` +
        `As your Safety & Trust Companion, I recommend:\n` +
        `• Always choosing accommodations marked with our **Green Verified Shield** to protect against fraud.\n` +
        `• Keeping emergency contacts handy: Police (112), Ambulance (108), Disha Women Safety (1091).\n` +
        `• Allocating your ₹${budget.toLocaleString('en-IN')} budget roughly: 40% Hotel, 25% Food, 15% Commute, 20% Sightseeing & Reserve.\n\n` +
        `Feel free to ask about hotels, nearest police stations, local food, or scam warnings!`,
      actionType: 'general'
    };
  };

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just Now'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Realistic typing delay
    setTimeout(() => {
      const response = generateAIResponse(textToSend);
      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        timestamp: 'Just Now',
        actionType: response.actionType
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleSuggestionClick = (promptText) => {
    handleSend(promptText);
  };

  return (
    <div className="bg-white rounded-3xl shadow-purple-md border border-purple-100 overflow-hidden flex flex-col h-[650px]">
      
      {/* Assistant Header */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 p-4 sm:p-5 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <Bot className="w-6 h-6 text-purple-200" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-purple-900"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-base text-white">AI Travel Assistant</h3>
              <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                Context-Aware
              </span>
            </div>
            <p className="text-xs text-purple-200">
              Synced with {destination} Safety Grid • Budget: ₹{budget.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(prev => [prev[0]])}
          title="Reset conversation"
          className="p-2 text-purple-300 hover:text-white rounded-xl hover:bg-white/10 transition"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-start gap-2.5 max-w-[88%] sm:max-w-[80%]">
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Sparkles className="w-4 h-4 text-purple-200" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-purple-700 text-white rounded-tr-none font-medium'
                    : 'bg-white text-slate-800 rounded-tl-none border border-purple-100 shadow-purple-sm'
                }`}
              >
                {/* Text body with simple markdown rendering */}
                <div className="whitespace-pre-line space-y-1.5">
                  {msg.text.split('\n').map((line, idx) => {
                    // Check bolding
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={idx} className="font-black text-purple-950">{line.replace(/\*\*/g, '')}</p>;
                    }
                    return <p key={idx}>{line}</p>;
                  })}
                </div>

                {/* Optional suggestions for the initial welcome message */}
                {msg.suggestions && (
                  <div className="mt-4 pt-3 border-t border-purple-100 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Popular Questions:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(sug)}
                          className="text-left text-xs bg-purple-50 hover:bg-purple-100 text-purple-900 font-semibold px-3 py-1.5 rounded-xl border border-purple-200/80 transition flex items-center gap-1.5"
                        >
                          <Compass className="w-3 h-3 text-purple-600 shrink-0" />
                          <span>{sug}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`mt-2 text-[10px] ${msg.sender === 'user' ? 'text-purple-200 text-right' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-purple-100 p-3 rounded-2xl rounded-tl-none flex items-center space-x-1.5 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Bar */}
      <div className="px-4 py-2 bg-purple-50/70 border-t border-purple-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider shrink-0">
          Quick Ask:
        </span>
        {[
          "Where is the nearest police station?",
          "Suggest affordable hotels near me",
          "What places can I explore in Vizianagaram?",
          "How can I reduce my travel expenses?"
        ].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestionClick(prompt)}
            className="text-[11px] font-medium bg-white hover:bg-purple-100 text-slate-700 hover:text-purple-900 px-2.5 py-1 rounded-lg border border-purple-200/80 whitespace-nowrap transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-3 sm:p-4 bg-white border-t border-purple-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything (e.g. 'Safe hotels for family', 'Police station near me')..."
            className="flex-1 bg-purple-50/60 border border-purple-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-3 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white rounded-2xl font-bold shadow-md shadow-purple-600/30 transition active:scale-95 flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
