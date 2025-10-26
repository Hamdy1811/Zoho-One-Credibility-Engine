import React, { useState } from 'react';
import { CustomerData } from '../types';
import { ZOHO_COLORS } from '../constants';

interface FreeFormAnalysisProps {
  onSubmit: (data: Partial<CustomerData>) => void;
  onBack: () => void;
}

const FreeFormAnalysis: React.FC<FreeFormAnalysisProps> = ({ onSubmit, onBack }) => {
  const [notes, setNotes] = useState('');
  const [currentTools, setCurrentTools] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notes.trim()) {
      onSubmit({ notes, currentTools });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-2" style={{ color: ZOHO_COLORS.darkGray }}>Free-Form Analysis</h2>
      <p className="text-gray-600 mb-6">Paste your comprehensive meeting notes below. Our AI will analyze the text to extract core challenges, goals, and currently used tools.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Meeting Notes
          </label>
          <textarea
            id="notes"
            rows={12}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 transition"
            placeholder="e.g., Client is struggling with tracking leads from their website. They manually enter data into spreadsheets, which is time-consuming and error-prone. Their main goal is to increase sales team efficiency by 30% in the next quarter..."
          />
        </div>

        <div>
          <label htmlFor="currentTools" className="block text-sm font-medium text-gray-700 mb-1">
            Current Tools
          </label>
          <input
            id="currentTools"
            type="text"
            value={currentTools}
            onChange={(e) => setCurrentTools(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 transition"
            placeholder="e.g., Google Sheets, Outlook, Slack..."
          />
        </div>

        <div className="flex flex-col sm:flex-row-reverse gap-4">
            <button
              type="submit"
              disabled={!notes.trim()}
              className="w-full sm:w-auto text-white font-bold py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: ZOHO_COLORS.red }}
            >
              Generate Proposal
            </button>
            <button onClick={onBack} type="button" className="w-full sm:w-auto bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-md hover:bg-gray-300 transition">
              &larr; Back
            </button>
        </div>
      </form>
    </div>
  );
};

export default FreeFormAnalysis;