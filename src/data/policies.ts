import { PolicySection } from '../types';

export const TERMS_AND_CONDITIONS: PolicySection[] = [
  {
    id: 'product-safety',
    title: 'Product Safety & Coat Suitability Standards',
    shortSummary: 'Rigorous review of ingredients, manufacturer guidance, and individual suitability.',
    iconName: 'Shield',
    rules: [
      {
        heading: 'Ingredient & Safety Review',
        text: 'Product safety and suitability are extremely important to us. Before introducing products into our spa, we review ingredients, manufacturer guidance and intended use. Treatments are selected with the individual dog and coat in mind.'
      },
      {
        heading: 'Specialist Bathing & Coat Care Focus',
        text: 'We specialise in bathing, coat care and spa treatments rather than clipping or breed styling. We focus exclusively on epidermal health, deep clarification, undercoat removal, and therapeutic hydrotherapy.'
      },
      {
        heading: 'Sensitive Skin & Allergies',
        text: 'Please notify us of any known sensitivities or dermatological conditions. We carry hypoallergenic, soothing oat, and clarifying formulas to care gently for allergy-prone skin.'
      }
    ]
  },
  {
    id: 'pricing-starting-rates',
    title: 'Pricing & Transparent Starting Rates',
    shortSummary: 'How our size, shedding level, and time-based pricing works.',
    iconName: 'Sparkles',
    rules: [
      {
        heading: 'Starting Price Policy',
        text: 'Prices are starting prices and may vary depending on your dog’s size, coat type, coat condition, shedding level and the time required.'
      },
      {
        heading: 'Compacted Shedding & Heavy Undercoat',
        text: 'Dogs with severe undercoat buildup or heavy seasonal impaction requiring extensive carding and high-velocity evacuation may incur an additional time charge, discussed openly before proceeding.'
      },
      {
        heading: 'Transparent Quotations',
        text: 'We assess coat length, density, and skin health during initial check-in and confirm the final cost with you before beginning treatment.'
      }
    ]
  },
  {
    id: 'garden-studio-health',
    title: 'Vaccinations & Health Guidelines',
    shortSummary: 'Maintaining a clean, hygienic private garden studio environment.',
    iconName: 'Award',
    rules: [
      {
        heading: 'Core Immunisations',
        text: 'All dogs visiting West Park Dog Spa must be current on standard UK vaccinations (Distemper, Hepatitis, Parvovirus, Leptospirosis). Proof of vaccination may be sent prior to your appointment.'
      },
      {
        heading: 'Puppy Protocols',
        text: 'Puppies attending Puppy’s First Spa must have received their second round of vaccinations.'
      },
      {
        heading: 'Illness & Rescheduling',
        text: 'If your dog is experiencing vomiting, kennel cough symptoms, fever, or open skin lesions within 48 hours of your scheduled spa time, please inform us to reschedule without penalty.'
      }
    ]
  },
  {
    id: 'cancellations',
    title: 'Cancellations, Rescheduling & 1-on-1 Appointments',
    shortSummary: 'Respecting dedicated 1-on-1 time slots in our home garden studio.',
    iconName: 'CalendarClock',
    rules: [
      {
        heading: '48-Hour Notice Policy',
        text: 'Because West Park Dog Spa operates strictly on individual 1-on-1 appointments in a quiet garden studio, short-notice cancellations leave an empty suite. We kindly request at least 48 hours advance notice for cancellations or date changes.'
      },
      {
        heading: 'Short-Notice Rescheduling',
        text: 'Cancellations made with less than 24 hours notice or unnotified absences may incur a 50% reservation fee prior to booking subsequent visits.'
      },
      {
        heading: 'Punctual Drop-Off',
        text: 'Please arrive promptly at your scheduled time so we can provide your pet with their full, unhurried spa ritual.'
      }
    ]
  },
  {
    id: 'gentle-handling',
    title: 'Gentle Handling & Fear-Free Care',
    shortSummary: 'Zero force, cage-free calm, and soothing positive reinforcement.',
    iconName: 'HeartHandshake',
    rules: [
      {
        heading: 'Calm Environment',
        text: 'Our dedicated garden studio is a low-stress, quiet space. We use gentle water pressure, warm towels, and variable-speed dryers to ensure your pet remains comfortable and relaxed.'
      },
      {
        heading: 'Reactivity & Sensitivities',
        text: 'Please share details regarding any sensitivities to touch, paws, or water. We tailor our bathing rhythm with treat rewards and breaks to keep stress levels minimal.'
      }
    ]
  },
  {
    id: 'collection-pickup',
    title: 'Collection & Timely Pick-Up',
    shortSummary: 'Cage-free studio policies for post-bath collection.',
    iconName: 'CheckCircle2',
    rules: [
      {
        heading: 'Timely Collection',
        text: 'We are a cage-free private studio and do not provide day boarding. We will send you a text notification 15–20 minutes before your dog is finished. Please collect your pet within 30 minutes of completion.'
      },
      {
        heading: 'Veterinary Authorisation',
        text: 'In the rare event of a medical emergency during care, our staff will contact the owner immediately. If unreachable, you authorise West Park Dog Spa to contact our local veterinary partner (Beechwood Veterinary Group) in the best interest of your pet.'
      }
    ]
  }
];
