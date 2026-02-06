export type Season = 'summer' | 'winter';
export type Language = 'ru' | 'en' | 'cn';

export interface Destination {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  season: ('summer' | 'winter' | 'all')[];
  coordinates: [number, number];
  highlights: string[];
  highlightsEn: string[];
}

export interface Experience {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  category: ExperienceCategory;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  season: ('summer' | 'winter' | 'all')[];
  destination: string;
}

export type ExperienceCategory = 
  | 'gastronomy' 
  | 'ethnography' 
  | 'active' 
  | 'family' 
  | 'wellness' 
  | 'photo';

export interface TripPlan {
  id: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  tripType: 'family' | 'couple' | 'friends' | 'solo';
  budget: 'economy' | 'standard' | 'premium';
  interests: ExperienceCategory[];
  intensity: 'relaxed' | 'moderate' | 'intensive';
}

export interface DayPlan {
  day: number;
  date: Date;
  activities: Activity[];
  route: [number, number][];
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  coordinates: [number, number];
  duration: string;
  price?: number;
}

export interface SafetyAlert {
  id: string;
  type: 'info' | 'warning' | 'danger';
  title: string;
  description: string;
  date: Date;
  location?: string;
}

export interface BookingItem {
  id: string;
  type: 'hotel' | 'tour' | 'transport' | 'ticket';
  title: string;
  image: string;
  price: number;
  date: Date;
  quantity: number;
}

export interface Cart {
  items: BookingItem[];
  total: number;
}

export interface IceCondition {
  location: string;
  thickness: number;
  status: 'safe' | 'caution' | 'dangerous';
  lastUpdated: Date;
}

export interface Translations {
  [key: string]: string | Translations;
}
