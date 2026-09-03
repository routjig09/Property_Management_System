import { z } from 'zod';

export const requirementSchema = z.object({
  listingType: z.enum(['SALE', 'RENT']),
  state: z.string().optional(),
  city: z.string().optional(),
  area: z.string().optional(),
  propertyType: z.string().optional(),
  bhk: z.number().optional(),
  minBudget: z.number().optional(),
  maxBudget: z.number().optional(),
  preferredArea: z.number().optional(),
  additionalRequirements: z.string().optional()
});

export type RequirementFormData = z.infer<typeof requirementSchema>;
