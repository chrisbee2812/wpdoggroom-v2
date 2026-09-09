export type DogSize = 'small' | 'medium' | 'large' | 'giant';

export interface TransformationItem {
  id: string;
  dogName: string;
  breed: string;
  age: string;
  category: 'doodle' | 'double-coat' | 'small-breed' | 'styling' | 'senior-rescue';
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
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  popular?: boolean;
  prices: {
    small: number;
    medium: number;
    large: number;
    giant: number;
  };
  durationEstimate: string;
  features: string[];
  recommendedFor: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'wellness' | 'coat' | 'comfort';
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'health' | 'pricing' | 'puppy' | 'booking';
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

export interface InquiryFormData {
  id: string;
  createdAt: string;
  ownerName: string;
  email: string;
  phone: string;
  dogName: string;
  breed: string;
  dogAge: string;
  weightCategory: DogSize;
  packageInterest: string;
  coatCondition: 'good' | 'some-tangles' | 'matted' | 'unsure';
  temperament: string[];
  preferredContact: 'phone' | 'email' | 'text';
  preferredDays: string[];
  message: string;
  status: 'new' | 'reviewed';
}
