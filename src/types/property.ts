export type PropertyType = 'APARTMENT' | 'VILLA' | 'INDEPENDENT_HOUSE' | 'PLOT' | 'COMMERCIAL' | 'OFFICE' | 'SHOP';
export type ListingType = 'SALE' | 'RENT';
export type PropertyStatus = 'DRAFT' | 'AVAILABLE' | 'PUBLISHED' | 'SOLD' | 'RENTED' | 'UNPUBLISHED';
export type FurnishingType = 'UNFURNISHED' | 'SEMI_FURNISHED' | 'FULLY_FURNISHED';

export interface PropertyLocation {
  state: string;
  city: string;
  area: string;
  locality?: string;
  address?: string;
  pincode?: string;
}

export interface PropertyBuilding {
  name?: string;
  tower?: string;
  floor?: number;
  totalFloors?: number;
  apartmentNumber?: string;
}

export interface PropertyImage {
  id: number;
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  price: number;
  maintenanceCharge?: number;
  securityDeposit?: number;
  location: PropertyLocation;
  building?: PropertyBuilding;
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  area: number;
  builtUpArea?: number;
  carpetArea?: number;
  furnishing?: FurnishingType;
  parking?: number;
  images: PropertyImage[];
  amenities: string[];
  isVerified: boolean;
  viewCount: number;
  favoriteCount: number;
  inquiryCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  state?: string;
  city?: string;
  area?: string;
  locality?: string;
  propertyType?: PropertyType[];
  listingType?: ListingType;
  status?: PropertyStatus[];
  bhk?: number[];
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  furnishing?: FurnishingType[];
  building?: string;
  floor?: number;
  amenities?: string[];
  sortBy?: SortOption;
  page?: number;
  limit?: number;
}

export type SortOption = 'newest' | 'price_low_high' | 'price_high_low' | 'area_small_large' | 'area_large_small' | 'most_popular';
