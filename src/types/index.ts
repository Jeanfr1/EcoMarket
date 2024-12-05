export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  carbonFootprint: number;
  sustainabilityScore: number;
  certifications: string[];
  imageUrl: string;
  supplier: Supplier;
}

export interface Supplier {
  id: string;
  name: string;
  sustainablePractices: string[];
  certifications: string[];
  carbonFootprint: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  sustainabilityScore: number;
  carbonOffsetHistory: CarbonOffset[];
}

export interface CarbonOffset {
  id: string;
  amount: number;
  date: Date;
  type: string;
}