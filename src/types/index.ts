export type Division =
  | 'Dhaka'
  | 'Chattogram'
  | 'Rajshahi'
  | 'Khulna'
  | 'Barishal'
  | 'Sylhet'
  | 'Rangpur'
  | 'Mymensingh';

export type FoodCategory =
  | 'sweet'
  | 'curry'
  | 'rice'
  | 'bakery'
  | 'beverage'
  | 'snack'
  | 'fish'
  | 'fruit'
  | 'other';

export type VerificationStatus =
  | 'gi-certified'
  | 'heritage-verified'
  | 'locally-verified'
  | 'coming-soon';

export interface District {
  id: string;
  name: string;
  bnName: string;
  division: Division;
  divisionBn: string;
  lat: number;
  long: number;
  description: string;
  aliases?: string[];
}

export interface Food {
  id: string;
  districtId: string;
  name: string;
  bnName: string;
  englishTitle: string;
  description: string;
  category: FoodCategory;
  verificationStatus: VerificationStatus;
  source: string;
  sourceUrl?: string;
  imageUrl?: string;
  tags: string[];
}

export type DistrictFilter = 'all' | 'explored' | 'in-progress' | 'unexplored';

export interface DistrictStats {
  district: District;
  totalFoods: number;
  triedFoods: number;
  percentage: number;
  status: 'unexplored' | 'in-progress' | 'completed';
}

export interface UserProgress {
  version: number;
  triedFoodIds: string[];
  lastUpdated: string;
}

export interface FoodPlace {
  id: string;
  name: string;
  bnName: string;
  districtId: string;
  division: Division;
  famousFoodIds: string[];
  category: FoodCategory;
  address: string;
  addressBn: string;
  description: string;
  imageUrl?: string;
  priceRange?: string;
  priceRangeVerified: boolean;
  openingHours?: string;
  openingHoursVerified: boolean;
  rating?: number;
  ratingCount?: number;
  ratingVerified: boolean;
  establishedYear?: number;
  phone?: string;
  phoneVerified?: boolean;
  mapUrl?: string;
  verificationStatus: VerificationStatus;
  source: string;
  sourceUrl?: string;
  tags: string[];
}
