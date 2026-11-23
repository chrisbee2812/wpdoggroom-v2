import { FertilityTreatment } from '../types';

export const FERTILITY_TREATMENTS: FertilityTreatment[] = [
  {
    id: 'vaginal-cytology',
    number: '01',
    categoryLabel: 'Cycle Timing & Diagnostics',
    name: 'Canine Vaginal Cytology',
    shortName: 'Vaginal Cytology (Ovulation & Cycle Staging)',
    tagline: 'Precision cellular staging to pinpoint the optimal breeding window',
    priceNote: 'From £25 per session',
    basePrice: 25,
    durationEstimate: 'Est. Duration: ~15–20 mins',
    description:
      'A quick, gentle diagnostic swab used to track your girl’s reproductive cycle stages (proestrus, estrus, and diestrus) under high-definition microscopy. By assessing epithelial cell cornification, we help breeders pinpoint peak fertility and reduce wasted stud fees or missed matings.',
    includedInService: [
      'Gentle, stress-free vaginal swab sample collection',
      'Rapid Diff-Quik slide staining & microscopic cellular evaluation',
      'Clear percentage breakdown of parabasal, intermediate, and cornified superficial cells',
      'Tailored breeding timeline guidance & recommended re-test schedule'
    ],
    iconName: 'Microscope',
    options: [
      {
        id: 'cytology-single',
        label: 'Single Cytology Session',
        price: 25,
        priceNote: 'From £25 per session'
      }
    ]
  },
  {
    id: 'semen-analysis',
    number: '02',
    categoryLabel: 'Stud Health & Fertility',
    name: 'Canine Semen Analysis',
    shortName: 'Semen Collection & Microscopic Analysis',
    tagline: 'Comprehensive evaluation of motility, concentration & morphology',
    priceNote: 'From £45 per session',
    basePrice: 45,
    durationEstimate: 'Est. Duration: ~30–45 mins',
    description:
      'A calm, hygienic semen collection and full microscopic fertility assessment for stud dogs. Ideal prior to mating, before shipping chilled semen, or as a routine reproductive health check to verify sperm viability and overall stud performance.',
    includedInService: [
      'Calm, unhurried 1-on-1 collection in a quiet, temperature-controlled studio',
      'Fractionated sample handling to protect sperm viability',
      'Warm-stage microscopic evaluation of total & progressive motility',
      'Sperm concentration count & morphology check (normal vs. abnormal cells)',
      'Detailed written fertility report & optional semen chilling/extender prep'
    ],
    iconName: 'FlaskConical',
    options: [
      {
        id: 'semen-standard',
        label: 'Semen Collection & Microscopic Analysis',
        price: 45,
        priceNote: 'From £45 per session'
      }
    ]
  },
  {
    id: 'artificial-insemination',
    number: '03',
    categoryLabel: 'Assisted Reproduction',
    name: 'Canine Artificial Insemination (AI)',
    shortName: 'Canine Artificial Insemination (AI)',
    tagline: 'Safe, hygienic & low-stress insemination for optimal conception rates',
    priceNote: 'From £50 per single insemination (or £85 for a 2-session mating package)',
    basePrice: 50,
    durationEstimate: 'Est. Duration: ~30–45 mins',
    description:
      'A professional, stress-free alternative to natural mating—ideal for maiden dogs, size differences, physical limitations, or timed breedings using fresh or chilled semen. Performed in our calm private studio with full pre-insemination semen checks included.',
    includedInService: [
      'Pre-insemination microscopic motility check to assess sperm movement',
      'Gentle, sterile intravaginal insemination using single-use catheters',
      'Calm, supported post-insemination rest period to encourage uptake',
      'Complimentary repeat-visit discount for 48-hour follow-up insemination'
    ],
    iconName: 'HeartPulse',
    options: [
      {
        id: 'ai-single',
        label: 'Single Insemination',
        price: 50,
        priceNote: 'From £50 per single insemination'
      },
      {
        id: 'ai-two-session',
        label: '2-Session Mating Package',
        price: 85,
        priceNote: '£85 for 2-session mating package'
      }
    ]
  },
  {
    id: 'pregnancy-ultrasound',
    number: '04',
    categoryLabel: 'Gestation Monitoring',
    name: 'Canine Pregnancy Ultrasound',
    shortName: 'Canine Pregnancy Ultrasound Scan',
    tagline: 'Early pregnancy confirmation, heartbeat checks & litter insights',
    priceNote: 'From £35 per scan (£25 re-scan)',
    basePrice: 35,
    durationEstimate: 'Est. Duration: ~20–30 mins',
    description:
      'A safe, non-invasive abdominal ultrasound performed from Day 25–30 post-mating. Confirm pregnancy early, check fetal heartbeats and development, and get an estimated litter indication in a relaxed, gentle environment.',
    includedInService: [
      'Gentle, non-invasive ultrasound scan (no harsh shaving required in most coats)',
      'Confirmation of gestation sacs & visible fetal heartbeats',
      'Estimated puppy count & gestational stage check',
      'Digital ultrasound images & video clips sent directly to your phone'
    ],
    iconName: 'ScanLine',
    options: [
      {
        id: 'ultrasound-initial',
        label: 'Initial Pregnancy Ultrasound Scan',
        price: 35,
        priceNote: 'From £35 per scan'
      },
      {
        id: 'ultrasound-rescan',
        label: 'Follow-Up Re-Scan',
        price: 25,
        priceNote: '£25 re-scan'
      }
    ]
  }
];

export const FERTILITY_DISCLAIMER =
  'All fertility sessions are carried out 1-on-1 in our hygienic, quiet garden studio using sterile single-use consumables. Prices are starting estimates and depend on individual breeding requirements or follow-up visits.';
