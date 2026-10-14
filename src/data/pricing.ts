import { PricingPackage, AddOnItem, DogSize } from '../types';

export const DOG_SIZE_DEFINITIONS: Record<DogSize, { label: string; weight: string; examples: string }> = {
  small: {
    label: 'Small dogs',
    weight: 'Under 10 kg',
    examples: 'French Bulldog, Pug, Dachshund, Boston Terrier, Jack Russell, Italian Greyhound'
  },
  medium: {
    label: 'Medium dogs',
    weight: '10 – 20 kg',
    examples: 'Staffordshire Bull Terrier, Beagle, English Bulldog, Whippet, Basset Hound'
  },
  large: {
    label: 'Large dogs',
    weight: '20 – 35 kg',
    examples: 'Labrador Retriever, Boxer, Dalmatian, Pointer, Doberman, Vizsla, Weimaraner'
  },
  xl: {
    label: 'XL dogs',
    weight: '35 kg+',
    examples: 'Great Dane, Cane Corso, Mastiff, Rhodesian Ridgeback, Bullmastiff, Rottweiler'
  }
};

// 🫧 BATH & BLOW-DRY BASE PACKAGES
export const BATH_BLOWDRY_PACKAGES: PricingPackage[] = [
  {
    id: 'fresh-and-fluffy',
    category: 'bath-blowdry',
    categoryLabel: '🫧 Bath & Blow-Dry',
    name: 'Fresh & Fluffy',
    tagline: 'Professional cleansing, conditioning & gentle blow-dry',
    description: 'Professional shampoo selected for your dog’s coat, conditioning treatment, blow-dry and brush-through.',
    popular: true,
    badge: 'Popular Routine',
    startingPriceNote: 'from £25',
    prices: {
      small: 25,
      medium: 30,
      large: 35,
      xl: 40
    },
    durationEstimate: '45 mins – 1.25 hrs',
    recommendedFor: 'Coat & skin care for all breeds and smooth coats for routine skin & coat maintenance',
    features: [
      'Tailored professional shampoo selected for your dog’s specific coat & skin type',
      'Hydrating conditioning treatment for a healthy epidermal barrier',
      'Warm-air low-stress blow-dry and thorough brush-through',
      'Gentle ear cleanse & eye wipe',
      'Fresh botanically balanced coat mist',
      'Complimentary skin inspection and coat health check'
    ]
  },
  {
    id: 'therapeutic-bath-blowout',
    category: 'bath-blowdry',
    categoryLabel: '🫧 Bath & Blow-Dry',
    name: 'Therapeutic Bath & Blow-Out',
    tagline: 'High-velocity undercoat release & shedding relief',
    description: 'Specialist deshedding wash and conditioning treatment followed by a high-velocity blow-out and thorough brush-through to remove loose coat.',
    badge: 'Therapeutic Care',
    startingPriceNote: 'from £35',
    prices: {
      small: 35,
      medium: 40,
      large: 45,
      xl: 50
    },
    durationEstimate: '1.25 hrs – 2 hrs',
    recommendedFor: 'Labradors, Pugs, Dalmatians, and all breeds needing therapeutic skin rejuvenation, undercoat release, and coat revitalization',
    features: [
      'Specialist therapeutic wash to release impacted dead coat follicles and soothe the dermis',
      'Enriched conditioning treatment to replenish natural oils without weighing down the coat',
      'High-velocity warm blow-out targeting stubborn dead shedding hairs and trapped dander',
      'Thorough brush-through with professional deshedding and carding tools',
      'Reduces household hair fallout significantly while promoting healthy epidermal respiration'
    ]
  }
];

// 🧼 DEEP CLEAN UPGRADE (Add £5 to Bath & Blow-Dry packages)
export const DEEP_CLEAN_UPGRADE = {
  id: 'deep-clean-upgrade',
  name: 'Deep Clean Clarifying Wash',
  price: 5,
  priceNote: 'Add £5 to Bath & Blow-Dry',
  tagline: 'For dogs needing a little more than their usual bath',
  description: 'For dogs needing a little more than their usual bath. Includes a thorough cleansing wash using products selected for the individual coat, conditioner, blow-dry and brush-through.',
  badge: '+£5 to Bath & Blow-Dry',
  features: [
    'Thorough double clarifying wash targeted to remove deep outdoor grit, grease & sebum',
    'Specialist coat-clarifying products selected for the individual coat type',
    'Deep restorative conditioner massage',
    'High-efficiency warm blow-dry & thorough brush-through'
  ]
};

// 👑 SIGNATURE SPA EXPERIENCES
export const SIGNATURE_SPA_EXPERIENCES: PricingPackage[] = [
  {
    id: 'the-short-coat-spa',
    category: 'signature-experience',
    categoryLabel: '👑 Signature Spa Experiences',
    name: 'The Short-Coat Spa',
    tagline: 'Perfect for breeds that don’t require traditional haircuts',
    description: 'Perfect for breeds that don’t require traditional haircuts. Professional bath & blow-dry, coat-specific conditioning treatment, Fresh Face and Luxury Paw Spa.',
    badge: 'Signature Care',
    popular: true,
    startingPriceNote: 'From £40',
    prices: {
      small: 40,
      medium: 45,
      large: 50,
      xl: 55
    },
    durationEstimate: '1.25 hrs – 1.75 hrs',
    recommendedFor: 'French Bulldogs, Pugs, Staffies, Boxers, Dachshunds, Labradors, and smooth coats',
    features: [
      'Professional hydro-bath & warm blow-dry',
      'Coat-specific conditioning treatment',
      'Fresh Face gentle professional cleanse for delicate face and muzzle folds (Included in Short Coat Spa)',
      'Luxury Paw Spa warm paw cleanse, moisturising paw treatment & finishing balm (Included in Short Coat Spa)',
      'Nail trim check & gentle ear cleanse',
      'Signature silky coat shine finish'
    ]
  },
  {
    id: 'the-ultimate-dog-spa',
    category: 'signature-experience',
    categoryLabel: '👑 Signature Spa Experiences',
    name: 'The Ultimate Dog Spa',
    tagline: 'Our complete pampering experience',
    description: 'Our complete pampering experience. Professional bath & blow-dry, your choice of 1 included specialist coat treatment (Japanese Marshmallow Foam, Thalassotherapy Sea Mud, Japanese Bamboo Charcoal, or Korean Carbonated Bath), Fresh Face and Luxury Paw Spa included.',
    badge: 'All-Inclusive Luxury',
    startingPriceNote: 'From £50',
    prices: {
      small: 50,
      medium: 55,
      large: 60,
      xl: 65
    },
    durationEstimate: '1.5 hrs – 2.25 hrs',
    recommendedFor: 'Owners seeking head-to-paw luxury, rejuvenation, and advanced dermal conditioning',
    features: [
      'Everything in The Short-Coat Spa',
      '1 Included Specialist Treatment of your choice (Japanese Marshmallow Foam, Thalassotherapy Sea Mud, Japanese Bamboo Charcoal, or Korean Carbonated Spa Bath)',
      'Fresh Face delicate face & muzzle cleansing (Included in Ultimate Dog Spa)',
      'Luxury Paw Spa warm cleanse/wrap, nourishing paw care & organic finishing balm (Included in Ultimate Dog Spa)',
      'Finishing coat care & botanical aromatherapy shine mist',
      'Relaxing 1-on-1 garden studio pampering session'
    ]
  },
  {
    id: 'puppys-first-spa',
    category: 'puppy',
    categoryLabel: '🐶 Puppy Care',
    name: "Puppy’s First Spa 🐶",
    tagline: 'A gentle introduction to bathing, drying and handling in our calm garden studio',
    description: 'A gentle introduction to bathing, drying and handling in our calm garden studio.',
    badge: 'Gentle Intro',
    startingPriceNote: 'From £25',
    prices: {
      small: 25,
      medium: 30,
      large: 35,
      xl: 40
    },
    durationEstimate: '45 mins – 1 hr',
    recommendedFor: 'Vaccinated puppies having their very first calm spa encounter',
    features: [
      'Gentle, low-pressure warm water introduction with tearless ultra-mild wash',
      'Positive desensitization to warm dryer breeze and gentle vibrations',
      'Paw handling, face wiping, and nail inspection at puppy’s pace',
      'Calm garden studio environment with lots of praise, breaks and reassurance',
      'Puppy spa report card & tailored coat care advice for home'
    ]
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  ...BATH_BLOWDRY_PACKAGES,
  ...SIGNATURE_SPA_EXPERIENCES
];

// 🌿 SPECIALIST SPA TREATMENTS (Upgrades / Add-ons)
export const SPECIALIST_SPA_TREATMENTS: AddOnItem[] = [
  {
    id: 'japanese-marshmallow-foam',
    name: 'Japanese Marshmallow Foam Spa',
    flagEmoji: '🇯🇵',
    priceNote: 'Add from £10',
    basePrice: 10,
    subtitle: 'Honey • Argan • Ghassoul Clay',
    description: 'A luxurious dense foam coat treatment selected according to your dog’s coat needs.',
    category: 'spa-foam',
    iconName: 'Sparkles'
  },
  {
    id: 'thalassotherapy-sea-mud',
    name: 'Thalassotherapy Sea Mud Spa',
    flagEmoji: '🌊',
    priceNote: 'Add from £12',
    basePrice: 12,
    subtitle: 'Marine-inspired coat & mineral ritual',
    description: 'A luxurious marine-inspired mud and coat-care ritual using specialist professional spa products.',
    category: 'mud-ritual',
    iconName: 'Droplets'
  },
  {
    id: 'japanese-bamboo-charcoal',
    name: 'Japanese Bamboo Charcoal Deep Clean',
    flagEmoji: '🖤',
    priceNote: 'Add from £8',
    basePrice: 8,
    subtitle: 'Intensive coat freshen-up & clarifying',
    description: 'A specialist deep-cleansing coat treatment using professional bamboo-charcoal products. Ideal for coats needing an intensive freshen-up.',
    category: 'wellness',
    iconName: 'ShieldCheck'
  },
  {
    id: 'korean-carbonated-spa',
    name: 'Korean Carbonated Spa Bath',
    flagEmoji: '🇰🇷',
    priceNote: 'Add from £10',
    basePrice: 10,
    subtitle: 'Micro-bubble carbonated bathing & conditioning',
    description: 'A specialist carbonated bathing experience followed by professional coat conditioning.',
    category: 'spa-foam',
    iconName: 'Waves'
  },
  {
    id: 'cloud-coat-treatment',
    name: 'Cloud Coat Treatment',
    flagEmoji: '☁️',
    priceNote: 'Add from £10',
    basePrice: 10,
    subtitle: 'Intensive silk conditioning & gloss',
    description: 'An intensive conditioning treatment designed to leave the coat beautifully soft, conditioned and glossy.',
    category: 'conditioning',
    iconName: 'Sun'
  },
  {
    id: 'luxury-paw-spa',
    name: 'Luxury Paw Spa',
    flagEmoji: '🐾',
    priceNote: 'Add £7',
    basePrice: 7,
    subtitle: 'Warm wrap & moisturising balm',
    description: 'Warm paw cleanse/wrap followed by professional moisturising paw care and finishing balm.',
    category: 'face-paws',
    iconName: 'Heart'
  },
  {
    id: 'fresh-face',
    name: 'Fresh Face',
    flagEmoji: '✨',
    priceNote: 'Add £5',
    basePrice: 5,
    subtitle: 'Gentle cleanse for face & muzzle',
    description: 'A gentle professional cleanse for the face and muzzle using products specifically suitable for this delicate area.',
    category: 'face-paws',
    iconName: 'Smile'
  }
];

// Alias for backwards compatibility with any component referencing ADD_ON_SERVICES
export const ADD_ON_SERVICES = SPECIALIST_SPA_TREATMENTS;

// 🌟 PACKAGE INCLUSIONS & SPECIALIST CHOICE CONSTANTS
export const SHORT_COAT_INCLUDED_ADDON_IDS = ['fresh-face', 'luxury-paw-spa'];
export const SHORT_COAT_INCLUDED_ADDON_NAMES = ['Fresh Face', 'Luxury Paw Spa'];

export const ULTIMATE_INCLUDED_ADDON_IDS = ['fresh-face', 'luxury-paw-spa'];
export const ULTIMATE_INCLUDED_ADDON_NAMES = ['Fresh Face', 'Luxury Paw Spa'];

export const ULTIMATE_SPECIALIST_CHOICE_IDS = [
  'japanese-marshmallow-foam',
  'thalassotherapy-sea-mud',
  'japanese-bamboo-charcoal',
  'korean-carbonated-spa'
];

export const ULTIMATE_SPECIALIST_CHOICE_NAMES = [
  'Japanese Marshmallow Foam Spa',
  'Thalassotherapy Sea Mud Spa',
  'Japanese Bamboo Charcoal Deep Clean',
  'Korean Carbonated Spa Bath'
];

// 🌿 GOOD TO KNOW GUIDELINES
export const GOOD_TO_KNOW = {
  title: 'Good to know',
  points: [
    {
      title: 'Our Specialty',
      text: 'We specialise in bathing, coat care and spa treatments rather than clipping or breed styling.'
    },
    {
      title: 'Transparent Starting Prices',
      text: 'Prices are starting prices and may vary depending on your dog’s size, coat type, coat condition, shedding level and the time required.'
    },
    {
      title: 'Product Safety & Suitability',
      text: 'Product safety and suitability are extremely important to us. Before introducing products into our spa, we review ingredients, manufacturer guidance and intended use. Treatments are selected with the individual dog and coat in mind.'
    }
  ]
};
