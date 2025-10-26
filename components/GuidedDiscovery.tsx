
import React, { useState } from 'react';
import { CustomerData } from '../types';
import { ZOHO_COLORS } from '../constants';

interface GuidedDiscoveryProps {
  onSubmit: (data: Partial<CustomerData>) => void;
  onBack: () => void;
}

const questions = [
  "What are the top 3 biggest challenges your business is facing right now?",
  "What are your primary business goals for the next 6-12 months?",
  "What software and tools are you currently using to manage sales, support, and operations?",
  "How do you currently track customer interactions and history?",
  "What is the biggest bottleneck in your sales process?",
];

const GuidedDiscovery: React.FC<GuidedDiscoveryProps> = ({ onSubmit, onBack }) => {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const notes = questions.map((q, i) => `Q: ${q}\nA: ${answers[i]}`).join('\n\n');
    if (answers.some(a => a.trim() !== '')) {
      onSubmit({ notes });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-2" style={{ color: ZOHO_COLORS.darkGray }}>Guided Discovery Path</h2>
      <p className="text-gray-600 mb-6">Answer the following questions to build a complete picture of the client's needs. The AI will use this structured input to generate a tailored proposal.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, index) => (
          <div key={index}>
            <label htmlFor={`question-${index}`} className="block text-sm font-medium text-gray-700 mb-1">{q}</label>
            <textarea
              id={`question-${index}`}
              rows={3}
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 transition"
            />
          </div>
        ))}
        
        <div className="flex flex-col sm:flex-row-reverse gap-4">
          <button type="submit" className="w-full sm:w-auto text-white font-bold py-3 px-6 rounded-md transition-colors" style={{ backgroundColor: ZOHO_COLORS.red }}>Generate Proposal</button>
          <button onClick={onBack} type="button" className="w-full sm:w-auto bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-md hover:bg-gray-300 transition">&larr; Back</button>
        </div>
      </form>
    </div>
  );
};

export default GuidedDiscovery;
