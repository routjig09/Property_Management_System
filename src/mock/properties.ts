import type { Property, PropertyFilters } from '../types';
import { hydrateArray } from './persist';

export const mockProperties: Property[] = [
  {
    id: 1,
    title: 'Luxury 3BHK at Prestige Lakeside Habitat',
    description: 'Spacious 3BHK apartment with beautiful lake view. Comes with modern amenities and premium fittings.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    status: 'PUBLISHED',
    price: 25000000,
    maintenanceCharge: 8000,
    location: {
      state: 'Karnataka',
      city: 'Bangalore',
      area: 'Whitefield',
      address: 'Varthur Hobli'
    },
    building: {
      name: 'Prestige Lakeside Habitat',
      tower: 'A',
      floor: 14,
      totalFloors: 24
    },
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    area: 1850,
    builtUpArea: 1850,
    carpetArea: 1450,
    furnishing: 'SEMI_FURNISHED',
    parking: 2,
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop', isPrimary: true },
      { id: 2, url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', isPrimary: false }
    ],
    amenities: ['Lift', 'Swimming Pool', 'Gym', 'Clubhouse', 'Security', 'Power Backup'],
    isVerified: true,
    viewCount: 1250,
    favoriteCount: 45,
    inquiryCount: 12,
    createdAt: '2023-10-15T10:00:00Z',
    updatedAt: '2023-11-01T14:30:00Z'
  },
  {
    id: 2,
    title: 'Premium 2BHK in Indiranagar',
    description: 'Fully furnished 2BHK in the heart of Indiranagar. Walking distance to Metro station.',
    propertyType: 'APARTMENT',
    listingType: 'RENT',
    status: 'AVAILABLE',
    price: 45000,
    securityDeposit: 250000,
    location: {
      state: 'Karnataka',
      city: 'Bangalore',
      area: 'Indiranagar'
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    furnishing: 'FULLY_FURNISHED',
    parking: 1,
    images: [
      { id: 3, url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Lift', 'Security', 'Power Backup', 'CCTV'],
    isVerified: true,
    viewCount: 850,
    favoriteCount: 22,
    inquiryCount: 5,
    createdAt: '2023-11-10T09:00:00Z',
    updatedAt: '2023-11-12T11:00:00Z'
  },
  {
    id: 3,
    title: 'Modern Villa in Jubilee Hills',
    description: 'Ultra luxury villa with private pool and garden in Jubilee Hills.',
    propertyType: 'VILLA',
    listingType: 'SALE',
    status: 'PUBLISHED',
    price: 85000000,
    location: {
      state: 'Telangana',
      city: 'Hyderabad',
      area: 'Jubilee Hills'
    },
    bedrooms: 5,
    bathrooms: 6,
    area: 5500,
    furnishing: 'SEMI_FURNISHED',
    parking: 4,
    images: [
      { id: 4, url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Swimming Pool', 'Garden', 'Security', 'Power Backup', 'Clubhouse'],
    isVerified: true,
    viewCount: 3200,
    favoriteCount: 110,
    inquiryCount: 25,
    createdAt: '2023-09-01T08:00:00Z',
    updatedAt: '2023-10-20T10:00:00Z'
  },
  {
    id: 4,
    title: 'Commercial Office Space in Hitech City',
    description: 'Fully furnished plug and play office space suitable for IT/ITES companies.',
    propertyType: 'OFFICE',
    listingType: 'RENT',
    status: 'AVAILABLE',
    price: 150000,
    location: {
      state: 'Telangana',
      city: 'Hyderabad',
      area: 'Hitech City'
    },
    bedrooms: 0,
    bathrooms: 4,
    area: 3000,
    furnishing: 'FULLY_FURNISHED',
    parking: 5,
    images: [
      { id: 5, url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Lift', 'Security', 'Power Backup', 'CCTV', 'Central AC'],
    isVerified: true,
    viewCount: 450,
    favoriteCount: 15,
    inquiryCount: 8,
    createdAt: '2023-11-20T10:00:00Z',
    updatedAt: '2023-11-22T09:00:00Z'
  },
  {
    id: 5,
    title: 'Sea Facing Apartment in Worli',
    description: 'Luxurious 4BHK apartment with breathtaking views of the Arabian Sea.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    status: 'PUBLISHED',
    price: 120000000,
    location: {
      state: 'Maharashtra',
      city: 'Mumbai',
      area: 'Worli'
    },
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    furnishing: 'UNFURNISHED',
    parking: 3,
    images: [
      { id: 6, url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Lift', 'Gym', 'Clubhouse', 'Security', 'Power Backup'],
    isVerified: true,
    viewCount: 5000,
    favoriteCount: 210,
    inquiryCount: 45,
    createdAt: '2023-08-15T12:00:00Z',
    updatedAt: '2023-11-25T15:00:00Z'
  },
  {
    id: 6,
    title: 'Elegant 3BHK Penthouse in Patia',
    description: 'Modern penthouse with private terrace garden near Infocity IT hub.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    status: 'PUBLISHED',
    price: 13500000,
    location: {
      state: 'Odisha',
      city: 'Bhubaneswar',
      area: 'Patia'
    },
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    furnishing: 'SEMI_FURNISHED',
    parking: 2,
    images: [
      { id: 7, url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Lift', 'Garden', 'Security', 'Power Backup', 'Clubhouse'],
    isVerified: true,
    viewCount: 940,
    favoriteCount: 38,
    inquiryCount: 9,
    createdAt: '2023-10-01T11:00:00Z',
    updatedAt: '2023-11-10T14:00:00Z'
  },
  {
    id: 7,
    title: 'Independent Bungalow in Saheed Nagar',
    description: 'Spacious independent house in prime commercial and residential locality.',
    propertyType: 'INDEPENDENT_HOUSE',
    listingType: 'SALE',
    status: 'PUBLISHED',
    price: 28000000,
    location: {
      state: 'Odisha',
      city: 'Bhubaneswar',
      area: 'Saheed Nagar'
    },
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    furnishing: 'FULLY_FURNISHED',
    parking: 2,
    images: [
      { id: 8, url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Garden', 'Boundary Wall', 'Power Backup', 'Security'],
    isVerified: true,
    viewCount: 1420,
    favoriteCount: 52,
    inquiryCount: 14,
    createdAt: '2023-09-20T09:30:00Z',
    updatedAt: '2023-10-25T16:00:00Z'
  },
  {
    id: 8,
    title: '3BHK Luxury Apartment in Koregaon Park',
    description: 'Charming 3BHK surrounded by greenery in Pune\'s most desirable neighborhood.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    status: 'PUBLISHED',
    price: 19500000,
    location: {
      state: 'Maharashtra',
      city: 'Pune',
      area: 'Koregaon Park'
    },
    bedrooms: 3,
    bathrooms: 3,
    area: 1750,
    furnishing: 'SEMI_FURNISHED',
    parking: 2,
    images: [
      { id: 9, url: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Lift', 'Gym', 'Swimming Pool', 'Security', 'Power Backup'],
    isVerified: true,
    viewCount: 1680,
    favoriteCount: 64,
    inquiryCount: 18,
    createdAt: '2023-10-05T14:00:00Z',
    updatedAt: '2023-11-15T12:00:00Z'
  },
  {
    id: 9,
    title: '2BHK Apartment in Baner',
    description: 'Contemporary 2BHK apartment close to Hinjewadi IT Park.',
    propertyType: 'APARTMENT',
    listingType: 'RENT',
    status: 'AVAILABLE',
    price: 32000,
    securityDeposit: 100000,
    location: {
      state: 'Maharashtra',
      city: 'Pune',
      area: 'Baner'
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    furnishing: 'SEMI_FURNISHED',
    parking: 1,
    images: [
      { id: 10, url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Lift', 'Gym', 'Security', 'Children\'s Play Area'],
    isVerified: true,
    viewCount: 620,
    favoriteCount: 19,
    inquiryCount: 7,
    createdAt: '2023-11-01T10:00:00Z',
    updatedAt: '2023-11-05T11:00:00Z'
  },
  {
    id: 10,
    title: 'Heritage Villa in Greater Kailash',
    description: 'Extensive 4BHK Villa with lush lawns and classic architecture in South Delhi.',
    propertyType: 'VILLA',
    listingType: 'SALE',
    status: 'PUBLISHED',
    price: 95000000,
    location: {
      state: 'Delhi',
      city: 'New Delhi',
      area: 'Greater Kailash'
    },
    bedrooms: 4,
    bathrooms: 5,
    area: 4200,
    furnishing: 'FULLY_FURNISHED',
    parking: 3,
    images: [
      { id: 11, url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Garden', 'Security', 'Boundary Wall', 'Power Backup', 'CCTV'],
    isVerified: true,
    viewCount: 2900,
    favoriteCount: 95,
    inquiryCount: 21,
    createdAt: '2023-08-30T16:00:00Z',
    updatedAt: '2023-10-18T14:00:00Z'
  },
  {
    id: 11,
    title: 'Modern 3BHK Apartment in Vasant Kunj',
    description: 'Well ventilated 3BHK with peaceful green surroundings near DDA park.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    status: 'PUBLISHED',
    price: 32000000,
    location: {
      state: 'Delhi',
      city: 'New Delhi',
      area: 'Vasant Kunj'
    },
    bedrooms: 3,
    bathrooms: 3,
    area: 1900,
    furnishing: 'SEMI_FURNISHED',
    parking: 2,
    images: [
      { id: 12, url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Lift', 'Security', 'Garden', 'Power Backup'],
    isVerified: true,
    viewCount: 1150,
    favoriteCount: 42,
    inquiryCount: 11,
    createdAt: '2023-10-12T08:00:00Z',
    updatedAt: '2023-11-08T10:00:00Z'
  },
  {
    id: 12,
    title: 'Luxury 3BHK in Gachibowli Financial District',
    description: 'High-rise apartment close to major multinational corporate offices.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    status: 'PUBLISHED',
    price: 18000000,
    location: {
      state: 'Telangana',
      city: 'Hyderabad',
      area: 'Gachibowli'
    },
    bedrooms: 3,
    bathrooms: 3,
    area: 1780,
    furnishing: 'FULLY_FURNISHED',
    parking: 2,
    images: [
      { id: 13, url: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Lift', 'Swimming Pool', 'Gym', 'Clubhouse', 'Power Backup'],
    isVerified: true,
    viewCount: 1750,
    favoriteCount: 58,
    inquiryCount: 16,
    createdAt: '2023-09-25T11:30:00Z',
    updatedAt: '2023-10-30T15:00:00Z'
  },
  {
    id: 13,
    title: 'Studio Apartment in Koramangala',
    description: 'Cozy, stylish studio apartment for young working professionals in Koramangala 4th Block.',
    propertyType: 'APARTMENT',
    listingType: 'RENT',
    status: 'AVAILABLE',
    price: 28000,
    securityDeposit: 150000,
    location: {
      state: 'Karnataka',
      city: 'Bangalore',
      area: 'Koramangala'
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    furnishing: 'FULLY_FURNISHED',
    parking: 1,
    images: [
      { id: 14, url: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Lift', 'Security', 'Wifi', 'Power Backup'],
    isVerified: true,
    viewCount: 2100,
    favoriteCount: 88,
    inquiryCount: 30,
    createdAt: '2023-11-15T12:00:00Z',
    updatedAt: '2023-11-20T10:00:00Z'
  },
  {
    id: 14,
    title: 'Commercial Shop in Bandra West',
    description: 'Prime ground floor retail space with high footfall in Bandra.',
    propertyType: 'SHOP',
    listingType: 'RENT',
    status: 'AVAILABLE',
    price: 220000,
    location: {
      state: 'Maharashtra',
      city: 'Mumbai',
      area: 'Bandra West'
    },
    bedrooms: 0,
    bathrooms: 1,
    area: 950,
    furnishing: 'UNFURNISHED',
    parking: 1,
    images: [
      { id: 15, url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Security', 'CCTV', 'Power Backup'],
    isVerified: true,
    viewCount: 890,
    favoriteCount: 31,
    inquiryCount: 14,
    createdAt: '2023-11-05T09:00:00Z',
    updatedAt: '2023-11-18T14:00:00Z'
  },
  {
    id: 15,
    title: 'Residential Plot in Chandrasekharpur',
    description: 'Corner plot with dual road access in prime residential sector.',
    propertyType: 'PLOT',
    listingType: 'SALE',
    status: 'PUBLISHED',
    price: 9000000,
    location: {
      state: 'Odisha',
      city: 'Bhubaneswar',
      area: 'Chandrasekharpur'
    },
    bedrooms: 0,
    bathrooms: 0,
    area: 2400,
    furnishing: 'UNFURNISHED',
    parking: 0,
    images: [
      { id: 16, url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop', isPrimary: true }
    ],
    amenities: ['Boundary Wall'],
    isVerified: true,
    viewCount: 560,
    favoriteCount: 14,
    inquiryCount: 6,
    createdAt: '2023-10-28T15:00:00Z',
    updatedAt: '2023-11-02T10:00:00Z'
  }
];

// Restore any admin-added/edited/deleted properties saved from a previous session
// (see propertyApi.ts, which calls persistArray('properties', mockProperties) after
// every create/update/delete) so the catalog survives a page refresh.
hydrateArray('properties', mockProperties);

export const getFeaturedProperties = (): Property[] => {
  return mockProperties.filter(p => p.isVerified && p.status === 'PUBLISHED').slice(0, 6);
};

export const getLatestProperties = (): Property[] => {
  return [...mockProperties].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8);
};

export const searchProperties = (filters: PropertyFilters) => {
  let filtered = [...mockProperties];

  if (filters.state) filtered = filtered.filter(p => p.location.state === filters.state);
  if (filters.city) filtered = filtered.filter(p => p.location.city === filters.city);
  if (filters.area) filtered = filtered.filter(p => p.location.area === filters.area);
  
  if (filters.propertyType && filters.propertyType.length > 0) {
    filtered = filtered.filter(p => filters.propertyType!.includes(p.propertyType));
  }
  
  if (filters.listingType) filtered = filtered.filter(p => p.listingType === filters.listingType);
  
  if (filters.status && filters.status.length > 0) {
    filtered = filtered.filter(p => filters.status!.includes(p.status));
  }
  
  if (filters.bhk && filters.bhk.length > 0) {
    filtered = filtered.filter(p => filters.bhk!.includes(p.bedrooms));
  }
  
  if (filters.minPrice) filtered = filtered.filter(p => p.price >= filters.minPrice!);
  if (filters.maxPrice) filtered = filtered.filter(p => p.price <= filters.maxPrice!);
  
  if (filters.minArea) filtered = filtered.filter(p => p.area >= filters.minArea!);
  if (filters.maxArea) filtered = filtered.filter(p => p.area <= filters.maxArea!);

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price_low_high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high_low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'area_small_large':
        filtered.sort((a, b) => a.area - b.area);
        break;
      case 'area_large_small':
        filtered.sort((a, b) => b.area - a.area);
        break;
      case 'most_popular':
        filtered.sort((a, b) => b.viewCount - a.viewCount);
        break;
    }
  }

  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedData = filtered.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total: filtered.length,
    page,
    limit,
    totalPages: Math.ceil(filtered.length / limit)
  };
};
