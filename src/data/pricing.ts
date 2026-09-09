import { PricingPackage, AddOnItem, DogSize } from '../types';

export const DOG_SIZE_DEFINITIONS: Record<DogSize, { label: string; weight: string; examples: string }> = {
  small: {
    label: 'Small',
    weight: 'Under 10 kg',
    examples: 'Shih Tzu, Toy Poodle, French Bulldog, Dachshund, Yorkie'
  },
  medium: {
    label: 'Medium',
    weight: '10 – 20 kg',
    examples: 'Cocker Spaniel, Miniature Doodle, Beagle, Frenchie Mix, Cavalier'
  },
  large: {
    label: 'Large',
    weight: '20 – 35 kg',
    examples: 'Standard Doodle, Golden Retriever, Border Collie, Labrador, Boxer'
  },
  giant: {
    label: 'Giant & Heavy Coat',
    weight: '35 kg+',
    examples: 'Samoyed, Bernese Mountain Dog, Newfoundland, Great Dane, Chow Chow'
  }
};

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'bath-and-brush',
    name: 'Bath & Fluff Dry',
    tagline: 'Refreshing maintenance for healthy skin & coats',
    description: 'Perfect between haircuts or for short-haired breeds who need a deep revitalizing spa cleanse without body scissoring.',
    prices: {
      small: 42,
      medium: 52,
      large: 66,
      giant: 82
    },
    durationEstimate: '1 hr – 1.5 hrs',
    recommendedFor: 'Smooth coats, short-haired breeds, or regular weekly/bi-weekly freshen-ups',
    features: [
      'Gentle double hydro-bath with pH-balanced botanical shampoo',
      'Organic nourishing coat conditioner & vitamin rinse',
      'Low-noise hand blowout & thorough comb-through',
      'Nail trim, filing & paw pad moisturizing balm',
      'Gentle ear cleanse & hair tidy (plucking on owner request)',
      'Sanitary tidy & paw pad hair shaving',
      'Fresh botanical scented spritz & signature West Park bandana'
    ]
  },
  {
    id: 'full-custom-groom',
    name: 'Full West Park Custom Groom',
    tagline: 'Our signature head-to-paw haircut & styling',
    badge: 'Most Requested',
    popular: true,
    description: 'The ultimate transformation. Includes all luxury hydro-bath elements PLUS full breed-standard clipping, teddy bear face sculpt, or bespoke owner style.',
    prices: {
      small: 68,
      medium: 82,
      large: 98,
      giant: 125
    },
    durationEstimate: '1.75 hrs – 2.5 hrs',
    recommendedFor: 'Doodles, Poodles, Schnauzers, Shih Tzus, Bichons, and all dogs requiring haircut & scissor styling',
    features: [
      'Everything in the Bath & Fluff Dry package',
      'Personalized pre-groom styling consultation with lead stylist',
      'Full body clipping & scissor styling tailored to your lifestyle',
      'Signature hand-scissored round Teddy Bear or Asian-Fusion head',
      'Custom ear shaping & tail plume scissoring',
      'Precision hygiene and sanitary clean trim',
      'Complimentary wild blueberry facial tear-stain cleanse'
    ]
  },
  {
    id: 'deshedding-defense',
    name: 'Intensive De-Shed & Coat Defense',
    tagline: 'Undercoat relief for shedding & double-coated dogs',
    badge: 'Double Coats',
    description: 'Designed specifically to release trapped dead undercoat without damaging the delicate guard hairs of double-coated breeds.',
    prices: {
      small: 56,
      medium: 70,
      large: 88,
      giant: 115
    },
    durationEstimate: '2 hrs – 3 hrs',
    recommendedFor: 'Retrievers, Huskies, Samoyeds, Shepherds, Corgis, Spitz, and heavy shedding dogs',
    features: [
      '3-Step Furminator® de-shedding hydrobath soak',
      'High-velocity warm air undercoat evacuation',
      'Carding rake & undercoat shedding blade treatment',
      'Pad shave, anti-slip paw scissoring & sanitary tidy',
      'Feathering & rear hock contour scissoring (no shaving)',
      'Aloe vera soothing skin mist for friction relief',
      'Reduces household shedding by up to 80% for 4-6 weeks'
    ]
  },
  {
    id: 'puppy-intro',
    name: 'Puppy First Experience',
    tagline: 'Sensory conditioning for puppies up to 5 months',
    badge: 'Under 5 Months',
    description: 'Gentle, positive reinforcement introductory visit to ensure your puppy grows up loving the grooming salon environment.',
    prices: {
      small: 35,
      medium: 42,
      large: 48,
      giant: 55
    },
    durationEstimate: '45 mins – 1 hr',
    recommendedFor: 'Vaccinated puppies having their very first professional salon encounter',
    features: [
      'Gentle warm-water bubble bath using tear-free ultra-mild wash',
      'Desensitization to equipment sounds, clippers vibrations & dryer breeze',
      'Gentle towel and low-speed warm air dry',
      'Gentle paw holding, nail tip trimming & ear inspection',
      'Clear-view eye trim and hygiene check',
      'Lick-mat treat sessions and lots of cuddles & praise',
      'Personalized Puppy Grooming Report Card for the owner'
    ]
  }
];

export const ADD_ON_SERVICES: AddOnItem[] = [
  {
    id: 'blueberry-facial',
    name: 'Wild Blueberry Tear-Stain Facial',
    price: 9,
    description: 'Natural aromatic enzyme foam that gently breaks down tear crust and food stains while calming facial skin.',
    category: 'wellness',
    iconName: 'Sparkles'
  },
  {
    id: 'teeth-freshener',
    name: 'Ultrasonic Teeth Polish & Breath Gel',
    price: 12,
    description: 'Enzymatic peppermint cleaning gel applied with a silicone finger brush to tackle soft tartar and refresh doggy breath.',
    category: 'wellness',
    iconName: 'Smile'
  },
  {
    id: 'nagayu-co2',
    name: 'Nagayu CO2 Hydrotherapy Rinse',
    price: 16,
    description: 'Japanese compressed CO2 tablet rinse that improves dermal blood circulation, eliminates yeast, and soothes itchy skin.',
    category: 'coat',
    iconName: 'Droplets'
  },
  {
    id: 'paw-nose-butter',
    name: 'Organic Paw Butter & Nose Revive',
    price: 8,
    description: 'Deeply moisturizing calendula, shea, and beeswax balm to repair cracked pads from hot pavement and rough terrain.',
    category: 'comfort',
    iconName: 'Heart'
  },
  {
    id: 'hypo-oatmeal-soak',
    name: 'Colloidal Oatmeal Medicated Mask',
    price: 14,
    description: 'Veterinary-grade colloidal oat soak specially formulated for allergy-prone dogs with dry or inflamed skin.',
    category: 'coat',
    iconName: 'ShieldCheck'
  },
  {
    id: 'flea-defense-soak',
    name: 'Botanical Flea & Parasite Deep Wash',
    price: 22,
    description: 'Natural cedarwood and neem oil treatment that safely eliminates topical pests, followed by salon sanitization protocol.',
    category: 'wellness',
    iconName: 'Bug'
  }
];
