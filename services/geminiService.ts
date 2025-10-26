import { GoogleGenAI, Type } from "@google/genai";
import { CustomerData, Proposal } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    solutions: {
      type: Type.ARRAY,
      description: "List of recommended Zoho services and their business outcomes.",
      items: {
        type: Type.OBJECT,
        properties: {
          serviceName: {
            type: Type.STRING,
            description: 'The name of the recommended Zoho service (e.g., "Zoho CRM", "Zoho One").',
          },
          outcomes: {
            type: Type.ARRAY,
            description: 'A list of 2-4 short, clear, tangible, outcome-focused bullet points describing the service\'s benefit for the client.',
            items: {
              type: Type.STRING,
            },
          },
        },
        required: ["serviceName", "outcomes"],
      },
    },
    summary: {
      type: Type.STRING,
      description: "A concise executive summary of the synergistic benefits of integrating the recommended services. This summary MUST NOT contain any percentages or specific numerical quantifications."
    }
  },
  required: ["solutions", "summary"],
};

function constructPrompt(data: CustomerData): string {
  let prompt = `
    You are an expert Zoho sales consultant with deep knowledge of business operations. Your task is to generate a personalized, compelling Zoho One proposal for a potential client.

    **Client Profile:**
    - **Industry:** ${data.industry}
    - **Sub-Industry:** ${data.subIndustry}
    `;

  if (data.companySize) prompt += `- **Company Size:** ${data.companySize} employees\n`;
  if (data.timeline) prompt += `- **Implementation Timeline:** ${data.timeline}\n`;
  
  if (data.notes) {
      prompt += `
    **Meeting Notes Analysis:**
    Here are the unstructured notes from the sales meeting. Analyze them to understand the client's core pain points, goals, and existing toolset.
    
    <notes>
    ${data.notes}
    </notes>
    `;
  } else {
      if (data.challenges.length > 0) {
          prompt += `
    **Primary Challenges:**
    ${data.challenges.map(c => `- **${c.title}**${c.description ? `: ${c.description}` : ''}`).join('\n')}
    `;
      }
      if (data.goals.length > 0) {
        prompt += `
    **Business Goals:**
    ${data.goals.map(g => `- **${g.title}**${g.description ? `: ${g.description}` : ''}`).join('\n')}
    `;
    }
  }

  if(data.currentTools) {
    prompt += `
    **Current Tools:** ${data.currentTools}
    `;
  }

  prompt += `
    **Your Task:**
    Based on the client's profile, identify their key problems and map them to solutions from the Zoho ecosystem. Recommend a set of Zoho products from the following list: Zoho CRM, Zoho Desk, Zoho Inventory, Zoho Books, Zoho Workplace, Zoho Sites, or the all-in-one Zoho One suite if their needs are broad.

    **CRITICAL OUTPUT CONSTRAINTS:**
    1.  **Outcome-Focused, Not Feature-Focused:** For each recommended product, you MUST provide 2-4 short and clear bullet points describing the BUSINESS OUTCOME. Do NOT list technical features.
    2.  **Quantify When Possible (in outcomes only):** Use strong, action-oriented language. Quantify benefits in the 'outcomes' where it makes sense (e.g., "Reduce manual data entry by 40%," "Increase sales productivity by 25%").
    3.  **Example of a GOOD outcome:** "Never miss a sale due to stockouts with real-time inventory tracking."
    4.  **Example of a BAD feature description:** "Includes inventory management module."
    5.  **Generate a Summary:** After the solutions, provide a "Concise Executive Summary". This summary must explain the synergistic benefits of adopting the recommended Zoho services together.
    6.  **NO NUMBERS IN SUMMARY:** The executive summary MUST NOT contain any percentages or specific numerical quantifications (e.g., avoid "increase efficiency by 30%"). Instead, use qualitative descriptors (e.g., "significantly boost efficiency").
    7.  **JSON Format:** The final output MUST be a JSON object that strictly adheres to the provided schema.
    `;
    return prompt;
}


export const generateZohoProposal = async (data: CustomerData): Promise<Proposal> => {
    const prompt = constructPrompt(data);
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.5,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);

        return {
            solutions: parsedResponse.solutions,
            summary: parsedResponse.summary,
        };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(error.message || "An unexpected error occurred with the AI service.");
        }
        throw new Error("Failed to generate proposal due to an unknown error.");
    }
};