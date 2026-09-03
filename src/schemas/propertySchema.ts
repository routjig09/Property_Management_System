import { z } from 'zod';

// Single source of truth for the Add/Edit Property form.
// Note: `area` is the neighbourhood/locality name (e.g. "Whitefield"),
// while `areaSqft` is the built-up area in square feet — kept as distinct
// fields so the location picker and the size input never collide.
export const propertySchema = z.object({
  // Basic Info
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title too long'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  propertyType: z.enum(['APARTMENT', 'VILLA', 'INDEPENDENT_HOUSE', 'PLOT', 'COMMERCIAL', 'OFFICE', 'SHOP']),
  listingType: z.enum(['SALE', 'RENT']),
  status: z.enum(['DRAFT', 'AVAILABLE', 'PUBLISHED', 'SOLD', 'RENTED', 'UNPUBLISHED']).optional(),

  // Location
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  area: z.string().min(1, 'Area is required'),
  address: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode').optional(),

  // Property Details
  bedrooms: z.number().min(0, 'Cannot be negative'),
  bathrooms: z.number().min(0, 'Cannot be negative'),
  balconies: z.number().optional(),
  areaSqft: z.number().min(1, 'Built-up area is required'),
  parking: z.number().optional(),
  furnishing: z.enum(['UNFURNISHED', 'SEMI_FURNISHED', 'FULLY_FURNISHED']).optional(),

  // Pricing
  price: z.number().min(1, 'Price must be greater than 0'),
  maintenanceCharge: z.number().optional(),
  pricePerSqft: z.number().optional(),

  // Amenities & Images
  amenities: z.array(z.string()),
  images: z.array(z.object({
    id: z.number(),
    url: z.string().url(),
    isPrimary: z.boolean(),
  })).optional(),

  // Building Info
  buildingName: z.string().optional(),
  tower: z.string().optional(),
  floor: z.number().optional(),
  totalFloors: z.number().optional(),
  apartmentNumber: z.string().optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
