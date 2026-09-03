export const mockLocations = {
  Karnataka: {
    Bangalore: ['Whitefield', 'Indiranagar', 'Koramangala', 'HSR Layout', 'Jayanagar', 'Yelahanka', 'Electronic City', 'Marathahalli'],
    Mysore: ['Vijayanagar', 'Hebbal', 'Saraswathipuram', 'Gokulam']
  },
  Odisha: {
    Bhubaneswar: ['Patia', 'Jaydev Vihar', 'Saheed Nagar', 'Khandagiri', 'Chandrasekharpur', 'Nayapalli'],
    Cuttack: ['Buxi Bazar', 'Badambadi', 'College Square']
  },
  Maharashtra: {
    Mumbai: ['Andheri', 'Bandra', 'Powai', 'Worli', 'Lower Parel', 'Juhu'],
    Pune: ['Koregaon Park', 'Baner', 'Hinjewadi', 'Wakad', 'Kharadi']
  },
  Telangana: {
    Hyderabad: ['Hitech City', 'Gachibowli', 'Jubilee Hills', 'Banjara Hills', 'Madhapur', 'Kondapur']
  },
  Delhi: {
    'New Delhi': ['Connaught Place', 'Dwarka', 'Vasant Kunj', 'Saket', 'Hauz Khas']
  }
};

export const getStates = (): string[] => {
  return Object.keys(mockLocations);
};

export const getCities = (state: string): string[] => {
  if (!state || !mockLocations[state as keyof typeof mockLocations]) return [];
  return Object.keys(mockLocations[state as keyof typeof mockLocations]);
};

export const getAreas = (state: string, city: string): string[] => {
  if (!state || !city || !mockLocations[state as keyof typeof mockLocations]) return [];
  const cities = mockLocations[state as keyof typeof mockLocations] as Record<string, string[]>;
  return cities[city] || [];
};
