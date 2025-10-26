
import React, { useState, useMemo } from 'react';
import { INDUSTRIES, ZOHO_COLORS } from '../constants';

interface IndustrySelectorProps {
  onSelect: (industry: string, subIndustry: string) => void;
}

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ onSelect }) => {
  const [industry, setIndustry] = useState<string>('');
  const [subIndustry, setSubIndustry] = useState<string>('');

  const subIndustries = useMemo(() => {
    return INDUSTRIES.find((i) => i.name === industry)?.subIndustries || [];
  }, [industry]);

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIndustry(e.target.value);
    setSubIndustry(''); // Reset sub-industry when industry changes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (industry && subIndustry) {
      onSelect(industry, subIndustry);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-2" style={{color: ZOHO_COLORS.darkGray}}>Contextual Discovery Engine</h2>
      <p className="text-gray-600 mb-6">Start by selecting the client's industry. This is the anchor for building a credible, specific proposal.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            id="industry"
            value={industry}
            onChange={handleIndustryChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 transition"
          >
            <option value="" disabled>Select an industry...</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind.name} value={ind.name}>
                {ind.name}
              </option>
            ))}
          </select>
        </div>
        
        {industry && (
          <div className="animate-fade-in-fast">
            <label htmlFor="subIndustry" className="block text-sm font-medium text-gray-700 mb-1">
              Sub-Industry
            </label>
            <select
              id="subIndustry"
              value={subIndustry}
              onChange={(e) => setSubIndustry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 transition"
              disabled={!industry}
            >
              <option value="" disabled>Select a sub-industry...</option>
              {subIndustries.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={!industry || !subIndustry}
          className="w-full text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: ZOHO_COLORS.red }}
        >
          Lock Industry & Proceed
        </button>
      </form>
    </div>
  );
};

export default IndustrySelector;
