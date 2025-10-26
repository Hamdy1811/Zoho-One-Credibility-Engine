import React from 'react';
import { InputMode } from '../types';
import { ZOHO_COLORS } from '../constants';

interface InputModeSelectorProps {
  onSelect: (mode: InputMode) => void;
  onBack: () => void;
}

const InputModeSelector: React.FC<InputModeSelectorProps> = ({ onSelect, onBack }) => {
  const modes = [
    { 
      mode: 'guided' as InputMode, 
      title: 'Guided Discovery Path', 
      description: 'For new reps. A sequence of targeted questions to reinforce sales methodology.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
      tooltip: 'This structured Q&A path ensures you cover all essential discovery points. It\'s excellent for reinforcing sales methodology, training new reps, and guaranteeing a consistent, high-quality discovery process for every client.'
    },
    { 
      mode: 'freeform' as InputMode, 
      title: 'Free-Form Analysis', 
      description: 'For experienced reps. Paste unstructured notes for AI to extract key insights.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
      tooltip: 'Save time by pasting your raw meeting notes. The AI will intelligently parse the text to identify key client challenges, goals, and competitors mentioned. This is perfect for experienced reps who prefer a conversational discovery style.'
    },
    { 
      mode: 'checklist' as InputMode, 
      title: 'Quick Checklist Builder', 
      description: 'For structured reps. Use checklists and fields for fast, quantitative data entry.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />,
      tooltip: 'The most direct route to a proposal. Use this when you have clear, structured information from the client. By inputting specific data points, you get a highly accurate and tailored proposal in seconds.'
    },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-2" style={{color: ZOHO_COLORS.darkGray}}>Select Intelligence Gathering Mode</h2>
      <p className="text-gray-600 mb-6">Choose the method that best fits your sales style and experience level.</p>
      
      <div className="space-y-4">
        {modes.map((item) => (
          <button
            key={item.mode}
            onClick={() => onSelect(item.mode)}
            className="group relative w-full text-left p-6 border border-gray-200 rounded-lg hover:shadow-md hover:border-red-300 transition-all flex items-start space-x-4"
          >
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs p-2 text-sm text-white bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {item.tooltip}
            </span>
            <svg className="w-8 h-8 flex-shrink-0" style={{color: ZOHO_COLORS.red}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">{item.icon}</svg>
            <div>
              <h3 className="text-lg font-semibold" style={{color: ZOHO_COLORS.darkGray}}>{item.title}</h3>
              <p className="text-gray-500">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
      <button onClick={onBack} className="mt-6 text-sm text-gray-600 hover:text-black">
        &larr; Back to Industry Selection
      </button>
    </div>
  );
};

export default InputModeSelector;