import { TransformationItem } from '../types';

export const TRANSFORMATION_GALLERY: TransformationItem[] = [
  {
    id: 'buster-frenchie',
    dogName: 'Buster',
    breed: 'French Bulldog',
    age: '3 Years',
    category: 'short-coat',
    categoryLabel: 'Short-Haired Breeds',
    service: 'The Short-Coat Spa & Fresh Face',
    // Muddy/dull short-haired dog -> Pristine gleaming coat and nourished folds
    beforeImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
    beforeDescription: 'Dull short coat, irritated facial fold wrinkles from humid weather, and dry cracked paw pads.',
    afterDescription: 'Tailored gentle bath, Fresh Face muzzle & fold cleanse, Luxury Paw Spa with organic balm, and gleaming botanical shine.',
    duration: '1 hr 15 mins',
    groomerNotes: 'Buster loved the warm paw soak. We reviewed ingredient safety to select an ultra-mild, fragrance-free facial cleanser suited for brachycephalic skin folds.',
    packageUsed: 'The Short-Coat Spa'
  },
  {
    id: 'bruno-labrador',
    dogName: 'Bruno',
    breed: 'Yellow Labrador',
    age: '4 Years',
    category: 'deshed',
    categoryLabel: 'Deshed Bath & Blow-Out',
    service: 'Specialist Deshedding & Undercoat Release',
    // Heavy shedding dog with loose tufts -> Sleek smooth glossy waterproof coat
    beforeImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
    beforeDescription: 'Compacted seasonal shedding undercoat shedding in clumps across furniture, rough dry topcoat.',
    afterDescription: 'Enriched deshedding bath, high-velocity warm blow-out (released over 800g of dead undercoat), and silky conditioning rinse.',
    duration: '1 hr 45 mins',
    groomerNotes: 'Never shave a Labrador! High-velocity blow-out removed loose hair effortlessly without disturbing his natural weather-resistant topcoat.',
    packageUsed: 'Deshed Bath & Blow-Out'
  },
  {
    id: 'milo-pug',
    dogName: 'Milo',
    breed: 'Pug',
    age: '2.5 Years',
    category: 'spa-treatment',
    categoryLabel: 'Japanese Marshmallow Foam',
    service: 'Japanese Marshmallow Foam Spa Treatment',
    // Scruffy short coat -> Velvety dense marshmallow foam conditioned softness
    beforeImage: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80',
    beforeDescription: 'Persistent shedding, itchy dander along the back, and dry coat lacking luster.',
    afterDescription: 'Luxurious dense honey, argan & Ghassoul clay foam therapy deeply massaged into the skin, followed by gentle drying.',
    duration: '1 hr 30 mins',
    groomerNotes: 'The marshmallow foam creates micro-bubbles that lift dander and moisturise the epidermal barrier. Milo was visibly relaxed in the warm bath.',
    packageUsed: 'The Ultimate Dog Spa'
  },
  {
    id: 'roxy-staffy',
    dogName: 'Roxy',
    breed: 'Staffordshire Bull Terrier',
    age: '3 Years',
    category: 'spa-treatment',
    categoryLabel: 'Korean Carbonated Spa',
    service: 'Korean Carbonated Spa Bath & Cloud Coat',
    // Dull coat -> High-gloss conditioned shine
    beforeImage: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=900&q=80',
    beforeDescription: 'Short coarse hair prone to summer pollen flare-ups, seasonal shedding, and mild belly redness.',
    afterDescription: 'Micro-bubble carbonated spa bath improving skin circulation, paired with Cloud Coat intensive conditioning for supreme softness.',
    duration: '1 hr 20 mins',
    groomerNotes: 'Korean carbonated bathing neutralizes skin pH and enhances moisture absorption. Her coat feels like velvet with zero irritation.',
    packageUsed: 'The Ultimate Dog Spa'
  },
  {
    id: 'hugo-dalmatian',
    dogName: 'Hugo',
    breed: 'Dalmatian',
    age: '5 Years',
    category: 'deep-clean',
    categoryLabel: 'Deep Clean & Bamboo Charcoal',
    service: 'Japanese Bamboo Charcoal Deep Clean',
    // Grimy coat after walks -> Pristine crisp spots and brilliant shine
    beforeImage: 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=900&q=80',
    beforeDescription: 'Heavy Leeds woodland mud, outdoor grime trapped in short needle hairs, stubborn doggy odor.',
    afterDescription: 'Deep clarifying charcoal wash pulling impurities out of pores, warm blow-dry, and Luxury Paw balm for rough pads.',
    duration: '1 hr 30 mins',
    groomerNotes: 'Activated bamboo charcoal naturally absorbs oils and stains without harsh stripping chemicals, leaving Hugo’s white coat vibrant and fresh.',
    packageUsed: 'Deep Clean + Charcoal Upgrade'
  },
  {
    id: 'penny-dachshund',
    dogName: 'Penny',
    breed: 'Smooth Miniature Dachshund',
    age: '2 Years',
    category: 'spa-treatment',
    categoryLabel: 'Sea Mud Thalassotherapy',
    service: 'Thalassotherapy Sea Mud Spa Ritual',
    // Sensitive dry coat -> Silky, marine mineral restored coat
    beforeImage: 'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=900&q=80',
    beforeDescription: 'Dry skin flakes, rough elbows, and nervous trembling during conventional bathing attempts.',
    afterDescription: 'Marine-derived sea mud mask wrap, warm hydrotherapy rinse, Fresh Face treatment, and gentle low-speed towel & warm air dry.',
    duration: '1 hr 10 mins',
    groomerNotes: 'In our quiet garden studio with zero other dogs around, Penny felt completely safe. The sea mud treatment left her short coat remarkably glossy.',
    packageUsed: 'The Short-Coat Spa + Sea Mud'
  }
];
