
import { Industry } from './types';

export const ZOHO_COLORS = {
  red: '#E42527',
  gold: '#FFB81C',
  gray: '#F5F5F5',
  darkGray: '#333333',
  white: '#FFFFFF',
};

export const INDUSTRIES: Industry[] = [
  {
    name: 'Retail',
    subIndustries: ['E-commerce', 'Brick & Mortar', 'Grocery', 'Fashion & Apparel'],
  },
  {
    name: 'Logistics',
    subIndustries: ['Supply Chain Management', 'Freight & Shipping', 'Warehousing', 'Last-Mile Delivery'],
  },
  {
    name: 'Financial Services',
    subIndustries: ['Banking', 'Insurance', 'Wealth Management', 'FinTech'],
  },
  {
    name: 'Real Estate',
    subIndustries: ['Residential', 'Commercial', 'Property Management', 'Construction'],
  },
  {
    name: 'Healthcare',
    subIndustries: ['Hospitals & Clinics', 'Telehealth', 'Medical Devices', 'Pharmaceuticals'],
  },
  {
    name: 'Tourism & Hospitality',
    subIndustries: ['Hotels & Resorts', 'Travel Agencies', 'Restaurants', 'Airlines'],
  },
];
