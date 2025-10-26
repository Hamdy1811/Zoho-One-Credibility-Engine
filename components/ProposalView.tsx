import React from 'react';
import { Proposal } from '../types';
import { ZOHO_COLORS } from '../constants';

interface ProposalViewProps {
  proposal: Proposal;
  customerData: { industry: string; subIndustry: string };
  onBack: () => void;
}

const ZohoLogoMini: React.FC = () => (
    <svg width="24" height="24" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10H40V40H10V10Z" stroke="#E42527" strokeWidth="15" strokeLinejoin="round"/>
        <path d="M78 10H108V40H78V10Z" stroke="#4CAF50" strokeWidth="15" strokeLinejoin="round"/>
        <path d="M10 78H40V108H10V78Z" stroke="#2196F3" strokeWidth="15" strokeLinejoin="round"/>
        <path d="M78 78H108V108H78V78Z" stroke="#FFB81C" strokeWidth="15" strokeLinejoin="round"/>
    </svg>
);


const ProposalView: React.FC<ProposalViewProps> = ({ proposal, customerData, onBack }) => {
  
  const handleDownload = () => {
    // @ts-ignore
    const { jsPDF } = window.jspdf;
    const proposalElement = document.getElementById('proposal-content');
    
    if (proposalElement) {
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      
      pdf.html(proposalElement, {
        callback: function (doc) {
          const pageCount = doc.internal.getNumberOfPages();
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();

          for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);

            // --- Header ---
            doc.setFillColor(ZOHO_COLORS.red);
            doc.rect(0, 0, pageWidth, 12, 'F'); // x, y, width, height, style
            
            doc.setFontSize(16);
            doc.setTextColor(ZOHO_COLORS.white);
            doc.setFont('helvetica', 'bold');
            doc.text('ZOHO One Proposal', 15, 8);

            // --- Footer ---
            doc.setFillColor(ZOHO_COLORS.darkGray);
            doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');

            doc.setFontSize(10);
            doc.setTextColor(ZOHO_COLORS.white);
            doc.setFont('helvetica', 'normal');
            
            // Page Number (Right Aligned)
            const pageText = `Page ${i} of ${pageCount}`;
            const textWidth = doc.getStringUnitWidth(pageText) * doc.getFontSize() / doc.internal.scaleFactor;
            const textX = pageWidth - textWidth - 15;
            doc.text(pageText, textX, pageHeight - 4);

            // Footer brand text (Left Aligned)
            doc.text('Zoho One Credibility Engine', 15, pageHeight - 4);
          }
          doc.save(`Zoho_One_Proposal_${customerData.subIndustry.replace(/\s/g, '_')}.pdf`);
        },
        margin: [20, 15, 20, 15], // Top, Left, Bottom, Right
        autoPaging: 'text', 
        width: 180, 
        windowWidth: proposalElement.scrollWidth,
      });
    }
  };

  return (
    <div className="animate-fade-in">
        {/* This div is the source for the PDF content */}
        <div id="proposal-content" className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
            <div className="border-b pb-4 mb-6">
                 <h1 className="text-3xl font-bold" style={{color: ZOHO_COLORS.darkGray}}>Zoho One Proposal</h1>
                 <p className="text-gray-600">Prepared for a leader in the {customerData.subIndustry} sector</p>
            </div>
           
            {proposal.solutions.map((solution, index) => (
            <div key={index} className="mb-8 p-6 rounded-lg break-inside-avoid" style={{backgroundColor: ZOHO_COLORS.gray}}>
                <div className="flex items-center mb-4">
                    <ZohoLogoMini />
                    <h2 className="text-2xl font-bold ml-3" style={{color: ZOHO_COLORS.darkGray}}>{solution.serviceName}</h2>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {solution.outcomes.map((outcome, i) => (
                    <li key={i}>{outcome}</li>
                    ))}
                </ul>
            </div>
            ))}

            <div className="mt-12 pt-8 border-t break-inside-avoid">
                <h2 className="text-2xl font-bold mb-4" style={{color: ZOHO_COLORS.darkGray}}>Executive Summary</h2>
                <p className="text-gray-700 leading-relaxed">{proposal.summary}</p>
            </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row-reverse gap-4">
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto text-white font-bold py-3 px-6 rounded-md transition-colors"
              style={{ backgroundColor: ZOHO_COLORS.red }}
            >
              Download Custom Proposal PDF
            </button>
            <button onClick={onBack} type="button" className="w-full sm:w-auto bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-md hover:bg-gray-300 transition">
              &larr; Back to Input
            </button>
        </div>
    </div>
  );
};

export default ProposalView;