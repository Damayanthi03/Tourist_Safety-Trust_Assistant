import React, { useState } from 'react';
import BudgetRecommendations from '../components/BudgetRecommendations';
import BudgetCalculator from '../components/BudgetCalculator';
import { Sparkles, DollarSign, Award, Calculator } from 'lucide-react';

export default function BudgetPage({ onSelectHotel, onExploreHotels }) {
  const [activeSubTab, setActiveSubTab] = useState('recommendations'); // 'recommendations' | 'calculator'

  return (
    <div className="space-y-8 pb-12">
      {/* Sub navigation bar for Budget Section */}
      <div className="flex items-center justify-center">
        <div className="bg-white p-1.5 rounded-2xl border border-purple-200 shadow-purple-sm inline-flex gap-2">
          <button
            onClick={() => setActiveSubTab('recommendations')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              activeSubTab === 'recommendations'
                ? 'bg-purple-700 text-white shadow-md shadow-purple-600/30'
                : 'text-purple-900 hover:bg-purple-50'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Top 3 Low vs Premium Recommendations</span>
          </button>
          <button
            onClick={() => setActiveSubTab('calculator')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              activeSubTab === 'calculator'
                ? 'bg-purple-700 text-white shadow-md shadow-purple-600/30'
                : 'text-purple-900 hover:bg-purple-50'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>AI Complete Budget Calculator</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'recommendations' ? (
        <BudgetRecommendations 
          onSelectHotel={onSelectHotel} 
          onGoToCalculator={() => setActiveSubTab('calculator')} 
        />
      ) : (
        <BudgetCalculator 
          onExploreHotels={onExploreHotels} 
        />
      )}
    </div>
  );
}
