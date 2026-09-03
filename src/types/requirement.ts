export type RequirementStatus = 'ACTIVE' | 'MATCHED' | 'CLOSED';

export interface Requirement {
  id: number;
  customerId: number;
  listingType: 'SALE' | 'RENT';
  state?: string;
  city?: string;
  area?: string;
  propertyType?: string;
  bhk?: number;
  minBudget?: number;
  maxBudget?: number;
  preferredArea?: number;
  additionalRequirements?: string;
  status: RequirementStatus;
  createdAt: string;
}
