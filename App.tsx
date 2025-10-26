import React, { useState, useCallback, useRef } from 'react';
import { AppStep, CustomerData, InputMode, Proposal } from './types';
import Header from './components/Header';
import IndustrySelector from './components/IndustrySelector';
import InputModeSelector from './components/InputModeSelector';
import FreeFormAnalysis from './components/FreeFormAnalysis';
import QuickChecklistBuilder from './components/QuickChecklistBuilder';
import GuidedDiscovery from './components/GuidedDiscovery';
import Loader from './components/Loader';
import ProposalView from './components/ProposalView';
import { generateZohoProposal } from './services/geminiService';
import { ZOHO_COLORS } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('selectIndustry');
  const [industry, setIndustry] = useState<string>('');
  const [subIndustry, setSubIndustry] = useState<string>('');
  const [inputMode, setInputMode] = useState<InputMode>(null);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [error, setError] = useState<string | null>(null);
  const submissionRef = useRef(0);

  const handleIndustrySelect = (selectedIndustry: string, selectedSubIndustry: string) => {
    setIndustry(selectedIndustry);
    setSubIndustry(selectedSubIndustry);
    setStep('selectInputMode');
  };

  const handleInputModeSelect = (mode: InputMode) => {
    setInputMode(mode);
    setStep('inputData');
  };

  const handleBack = () => {
    if (step === 'proposalReady' || step === 'generating') {
      setStep('inputData');
      setProposal(null);
      setError(null);
    } else if (step === 'inputData') {
      setInputMode(null);
      setStep('selectInputMode');
      setError(null);
    } else if (step === 'selectInputMode') {
      setStep('selectIndustry');
    }
  };

  const handleSubmit = useCallback(async (data: Partial<CustomerData>) => {
    const submissionId = ++submissionRef.current;
    setStep('generating');
    setError(null);
    try {
      const fullCustomerData: CustomerData = {
        industry,
        subIndustry,
        challenges: [],
        goals: [],
        currentTools: '',
        ...data,
      };
      const result = await generateZohoProposal(fullCustomerData);
      
      if (submissionId === submissionRef.current) {
        setProposal(result);
        setStep('proposalReady');
      }
    } catch (err) {
      if (submissionId === submissionRef.current) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred. Please try again.';
        setError(errorMessage);
        setStep('inputData');
      }
    }
  }, [industry, subIndustry]);

  const renderContent = () => {
    switch (step) {
      case 'selectIndustry':
        return <IndustrySelector onSelect={handleIndustrySelect} />;
      case 'selectInputMode':
        return <InputModeSelector onSelect={handleInputModeSelect} onBack={handleBack} />;
      case 'inputData':
        const inputForm = () => {
            if (inputMode === 'freeform') return <FreeFormAnalysis onSubmit={handleSubmit} onBack={handleBack} />;
            if (inputMode === 'checklist') return <QuickChecklistBuilder onSubmit={handleSubmit} onBack={handleBack} />;
            if (inputMode === 'guided') return <GuidedDiscovery onSubmit={handleSubmit} onBack={handleBack} />;
            return null;
        }
        return (
            <>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 animate-fade-in" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                {inputForm()}
            </>
        );
      case 'generating':
        return (
          <div className="animate-fade-in">
            <Loader message="Analyzing needs and crafting your proposal..." />
            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleBack}
                    type="button"
                    className="w-full sm:w-auto bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-md hover:bg-gray-300 transition"
                >
                    &larr; Back to Input
                </button>
            </div>
          </div>
        );
      case 'proposalReady':
        return proposal && <ProposalView proposal={proposal} customerData={{ industry, subIndustry }} onBack={handleBack} />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans" style={{ backgroundColor: ZOHO_COLORS.gray }}>
      <Header />
      <main className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;