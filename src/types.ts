export type DogSize = 'small' | 'medium' | 'large';

export interface TransformationItem {
  id: string;
  dogName: string;
  breed: string;
  age: string;
  category: 'short-coat' | 'deshed' | 'spa-treatment' | 'deep-clean' | 'puppy';
  categoryLabel: string;
  service: string;
  beforeImage: string;
  afterImage: string;
  beforeDescription: string;
  afterDescription: string;
  duration: string;
  groomerNotes: string;
  packageUsed: string;
}

export interface PricingPackage {
  id: string;
  category: 'bath-blowdry' | 'signature-experience' | 'puppy';
  categoryLabel: string;
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  popular?: boolean;
  startingPriceNote?: string;
  prices: {
    small: number;
    medium: number;
    large: number;
  };
  durationEstimate: string;
  features: string[];
  recommendedFor: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  flagEmoji?: string;
  priceNote: string;
  basePrice: number;
  description: string;
  subtitle?: string;
  category: 'spa-foam' | 'mud-ritual' | 'wellness' | 'face-paws' | 'conditioning';
  iconName: string;
}

export interface FertilityServiceOption {
  id: string;
  label: string;
  price: number;
  priceNote: string;
}

export interface FertilityTreatment {
  id: string;
  number: string;
  categoryLabel: string;
  name: string;
  shortName: string;
  tagline: string;
  priceNote: string;
  basePrice: number;
  durationEstimate: string;
  description: string;
  includedInService: string[];
  iconName: 'Microscope' | 'FlaskConical' | 'HeartPulse' | 'ScanLine';
  options?: FertilityServiceOption[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'health' | 'pricing' | 'puppy' | 'booking' | 'spa' | 'fertility';
}

export interface PolicySection {
  id: string;
  title: string;
  shortSummary: string;
  iconName: string;
  rules: {
    heading: string;
    text: string;
  }[];
}

export type InquiryServiceType = 'spa' | 'fertility';

export interface InquiryFormData {
  id: string;
  createdAt: string;
  serviceType: InquiryServiceType;
  ownerName: string;
  email: string;
  phone: string;
  dogName: string;
  breed: string;
  dogAge: string;
  weightCategory: DogSize;
  packageInterest: string;
  includeDeepClean?: boolean;
  selectedSpaUpgrades?: string[];
  coatCondition: 'good' | 'heavy-shedding' | 'dry-skin' | 'sensitive' | 'unsure';
  temperament: string[];
  // Fertility-specific fields
  fertilityServices?: string[];
  dogRole?: 'bitch' | 'stud' | 'pair';
  breedingStage?: string;
  semenType?: 'fresh' | 'chilled' | 'na';
  preferredContact: 'phone' | 'email' | 'text';
  preferredDays: string[];
  message: string;
  status: 'new' | 'reviewed';
}
