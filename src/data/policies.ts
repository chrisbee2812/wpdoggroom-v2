import { PolicySection } from '../types';

export const TERMS_AND_CONDITIONS: PolicySection[] = [
  {
    id: 'vaccinations',
    title: 'Vaccination & Health Certification',
    shortSummary: 'Protecting the health, immune systems, and safety of all salon pets.',
    iconName: 'Shield',
    rules: [
      {
        heading: 'Mandatory Vaccines',
        text: 'All dogs entering West Park Dog Grooming must be current on Rabies, DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza), and Bordetella. Proof of vaccination must be provided before or upon the first salon visit.'
      },
      {
        heading: 'Puppy Vaccination Protocols',
        text: 'Puppies under 5 months of age must have received at least their second round of core puppy immunizations prior to attending their Puppy First Experience appointment.'
      },
      {
        heading: 'Illness & Contagious Conditions',
        text: 'If your dog displays vomiting, diarrhea, open wounds, coughing, kennel cough symptoms, or eye discharge within 48 hours of your scheduled visit, please contact us immediately to reschedule without penalty.'
      }
    ]
  },
  {
    id: 'matting',
    title: 'Matting & Humane Care Guarantee',
    shortSummary: 'Zero tolerance for painful de-matting; prioritizing pet comfort above aesthetics.',
    iconName: 'HeartHandshake',
    rules: [
      {
        heading: 'Humane Treatment Priority',
        text: 'West Park Dog Grooming strictly adheres to animal welfare ethics and the UK Animal Welfare Act 2006. We will NOT pull, rip, or repeatedly brush out severely compacted mats, as this causes traumatic pain, skin tears, haematomas, and severe psychological distress.'
      },
      {
        heading: 'Humane Shaving Procedure',
        text: 'When a dog’s coat has felted into tight mats against the dermal layer, the only humane option is to clip beneath the matting with specialized short blades. The stylist will consult the owner whenever possible before clipping.'
      },
      {
        heading: 'Post-De-Matting Sensitivity',
        text: 'Removing heavy mats exposes previously smothered skin to air and sensation. Dogs may experience temporary itching, redness, or clipper warmth sensitivity. We apply soothing organic aloe vera and calendula mist to mitigate discomfort.'
      },
      {
        heading: 'Matting Surcharge',
        text: 'Grooming matted coats requires extraordinary care, blade replacement, and extended table time. A de-matting surcharge of £15 – £35 may apply depending on severity.'
      }
    ]
  },
  {
    id: 'cancellations',
    title: 'Cancellations, Rescheduling & Late Arrivals',
    shortSummary: 'Ensuring seamless 1-on-1 scheduling without crowding or rushing.',
    iconName: 'CalendarClock',
    rules: [
      {
        heading: '48-Hour Notice Policy',
        text: 'Because West Park operates strictly on dedicated 1-on-1 appointments, late cancellations prevent other pets in need of grooming from securing that time. We kindly request at least 48 hours advance notice to cancel or reschedule.'
      },
      {
        heading: 'Late Cancellation & No-Show Fee',
        text: 'Cancellations made with less than 24 hours notice or missed appointments without notification may incur a 50% fee of the reserved service before a subsequent consultation can be confirmed.'
      },
      {
        heading: 'Late Arrival Window',
        text: 'Please arrive promptly at your scheduled start time. Clients arriving more than 15 minutes late may need to adjust their styling package or reschedule to prevent overlapping the next guest’s dedicated slot.'
      }
    ]
  },
  {
    id: 'behavior',
    title: 'Pet Behavior, Reactivity & Safety',
    shortSummary: 'Patient, fear-free handling with strict safety standards for pets and stylists.',
    iconName: 'AlertCircle',
    rules: [
      {
        heading: 'Behavioral Disclosure',
        text: 'Owners must disclose any history of bite tendencies, fear aggression, table reactivity, or past traumatic grooming encounters prior to appointment confirmation.'
      },
      {
        heading: 'Gentle Handling Standards',
        text: 'We never use harsh choke restraints, tranquilizers, or physical discipline. If a dog becomes excessively panicked or aggressive, we will stop the service, provide comfort breaks, and reassess.'
      },
      {
        heading: 'Right to Terminate for Safety',
        text: 'If a dog cannot be groomed safely without risking severe physical injury to itself or salon staff, West Park Dog Grooming reserves the right to halt the session. Charges will be prorated based on services completed.'
      }
    ]
  },
  {
    id: 'senior-special-needs',
    title: 'Senior Pets & Pre-Existing Medical Conditions',
    shortSummary: 'Comfort-first accommodations for aging joints, blind, deaf, and fragile pets.',
    iconName: 'Award',
    rules: [
      {
        heading: 'Comfort Over Perfection Philosophy',
        text: 'For senior dogs (generally 8+ years) or dogs with hip dysplasia, arthritis, or cardiac conditions, our priority is always their physical comfort and dignity rather than a razor-sharp show finish.'
      },
      {
        heading: 'Orthopedic Support & Rest Breaks',
        text: 'We utilize double-cushioned orthopedic table mats, low-entry hydrobaths, and allow senior pets to sit or lie down comfortably throughout their grooming session.'
      }
    ]
  },
  {
    id: 'fleas-parasites',
    title: 'Fleas, Ticks & Parasite Protocol',
    shortSummary: 'Rapid quarantine, botanical treatment, and salon sanitization standards.',
    iconName: 'Sparkles',
    rules: [
      {
        heading: 'Mandatory Parasite Treatment',
        text: 'If live fleas or active ticks are discovered during the pre-bath inspection, the dog will be immediately administered our natural botanical flea bath to eradicate the parasites and soothe irritated skin.'
      },
      {
        heading: 'Sanitisation Surcharge',
        text: 'A mandatory £20 fee covers the specialised treatment shampoo plus full industrial decontamination and fogging of the styling suite to ensure zero cross-contamination for subsequent pets.'
      }
    ]
  },
  {
    id: 'pickup-vet',
    title: 'Pick-Up Windows & Veterinary Authorisation',
    shortSummary: 'Timely pick-ups and emergency medical care authorisation.',
    iconName: 'CheckCircle2',
    rules: [
      {
        heading: 'Timely Collection',
        text: 'We are a calm, cage-free boutique salon and do not provide day boarding. We will notify you 15-20 minutes before completion. Please pick up your pet within 45 minutes of the ready notification. Extended delays may incur a £15/half-hour care fee.'
      },
      {
        heading: 'Emergency Medical Authorisation',
        text: 'In the rare event of a sudden medical emergency, our staff will attempt to contact the owner immediately. If unreachable, you authorise West Park Dog Grooming to seek veterinary treatment at our nearest local practice (Beechwood Veterinary Group / Leeds Vets Now Emergency Clinic) in your pet’s best medical interest.'
      },
      {
        heading: 'Satisfaction Guarantee',
        text: 'We take enormous pride in our craftsmanship. If you notice any touch-up required (such as an uneven nail or stray whisker), contact us within 48 hours and we will happily provide a complimentary adjustment.'
      }
    ]
  }
];
