import React, { useState } from 'react';
import { CustomerData, ChallengeGoal } from '../types';
import { ZOHO_COLORS } from '../constants';

interface QuickChecklistBuilderProps {
  onSubmit: (data: Partial<CustomerData>) => void;
  onBack: () => void;
}

const QuickChecklistBuilder: React.FC<QuickChecklistBuilderProps> = ({ onSubmit, onBack }) => {
  const [companySize, setCompanySize] = useState<string>('10');
  const [timeline, setTimeline] = useState<string>('3-6 months');
  const [challenges, setChallenges] = useState<ChallengeGoal[]>([{ title: '', description: '' }]);
  const [goals, setGoals] = useState<ChallengeGoal[]>([{ title: '', description: '' }]);
  const [currentTools, setCurrentTools] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleItemChange = <T extends ChallengeGoal>(
    items: T[],
    setItems: React.Dispatch<React.SetStateAction<T[]>>,
    index: number,
    field: keyof T,
    value: string
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = <T extends ChallengeGoal>(items: T[], setItems: React.Dispatch<React.SetStateAction<T[]>>) => {
    setItems([...items, { title: '', description: '' } as T]);
  };

  const removeItem = <T extends ChallengeGoal>(items: T[], setItems: React.Dispatch<React.SetStateAction<T[]>>, index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const size = parseInt(companySize, 10);
    if (!companySize || isNaN(size) || size <= 0) {
        newErrors.companySize = 'Please enter a valid company size (must be a positive number).';
    }

    const hasChallenges = challenges.some(c => c.title.trim() !== '');
    const hasGoals = goals.some(g => g.title.trim() !== '');

    if (!hasChallenges && !hasGoals) {
        newErrors.lists = 'Please define at least one challenge or goal.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const filteredChallenges = challenges.filter(c => c.title.trim() !== '');
      const filteredGoals = goals.filter(g => g.title.trim() !== '');
      
      onSubmit({ 
        companySize: parseInt(companySize, 10), 
        timeline, 
        challenges: filteredChallenges,
        goals: filteredGoals,
        currentTools
      });
    }
  };
  
  const renderDynamicList = (
    list: ChallengeGoal[], 
    setList: React.Dispatch<React.SetStateAction<ChallengeGoal[]>>,
    listType: 'Challenge' | 'Goal'
  ) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{`Primary ${listType}s`}</label>
        {list.map((item, index) => (
            <div key={index} className="flex items-start gap-2 mb-3 p-3 bg-gray-50 rounded-md border">
                <div className="flex-grow space-y-2">
                    <input 
                        type="text" 
                        placeholder={`${listType} Title (required)`}
                        value={item.title} 
                        onChange={e => handleItemChange(list, setList, index, 'title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 transition" />
                    <textarea 
                        rows={2}
                        placeholder="Description (optional)"
                        value={item.description}
                        onChange={e => handleItemChange(list, setList, index, 'description', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 transition" />
                </div>
                <button type="button" onClick={() => removeItem(list, setList, index)} disabled={list.length <= 1} className="p-2 text-gray-400 hover:text-red-600 disabled:opacity-50 disabled:hover:text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>
        ))}
        <button type="button" onClick={() => addItem(list, setList)} className="text-sm font-semibold text-red-600 hover:text-red-800 transition">+ Add another {listType}</button>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-2" style={{ color: ZOHO_COLORS.darkGray }}>Quick Checklist Builder</h2>
      <p className="text-gray-600 mb-6">For a structured approach. Fill in the key details and list the primary challenges and goals.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">Company Size (Employees)</label>
            <input 
                type="number" 
                id="companySize" 
                value={companySize} 
                onChange={e => setCompanySize(e.target.value)} 
                className={`w-full p-3 border ${errors.companySize ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 transition`} 
                min="1"
            />
             {errors.companySize && <p className="mt-1 text-sm text-red-600">{errors.companySize}</p>}
          </div>
          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">Target Timeline</label>
            <select id="timeline" value={timeline} onChange={e => setTimeline(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 transition">
              <option>Under 3 months</option>
              <option>3-6 months</option>
              <option>6-12 months</option>
              <option>12+ months</option>
            </select>
          </div>
        </div>
         <div>
          <label htmlFor="currentTools" className="block text-sm font-medium text-gray-700 mb-1">Current Tools</label>
          <input type="text" id="currentTools" value={currentTools} onChange={e => setCurrentTools(e.target.value)} placeholder="e.g., Spreadsheets, Outlook, Slack" className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 transition" />
        </div>
        
        {renderDynamicList(challenges, setChallenges, 'Challenge')}
        {renderDynamicList(goals, setGoals, 'Goal')}
        
        {errors.lists && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p>{errors.lists}</p>
            </div>
        )}

        <div className="flex flex-col sm:flex-row-reverse gap-4 pt-4 border-t">
            <button type="submit" className="w-full sm:w-auto text-white font-bold py-3 px-6 rounded-md transition-colors" style={{ backgroundColor: ZOHO_COLORS.red }}>Generate Proposal</button>
            <button onClick={onBack} type="button" className="w-full sm:w-auto bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-md hover:bg-gray-300 transition">&larr; Back</button>
        </div>
      </form>
    </div>
  );
};

export default QuickChecklistBuilder;