import { TransformationItem } from '../types';

export const TRANSFORMATION_GALLERY: TransformationItem[] = [
  {
    id: 'milo-cockapoo',
    dogName: 'Milo',
    breed: 'Cockapoo (F1b)',
    age: '2 Years',
    category: 'doodle',
    categoryLabel: 'Doodles & Curly Coats',
    service: 'Full West Park Custom Styling',
    // Scruffy overgrown doodle before -> Pristine sculpted teddy bear after
    beforeImage: 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=900&q=80',
    beforeDescription: 'Overgrown face obscuring eyes, heavy matting behind ears, damp curls from park walks.',
    afterDescription: 'Hand-scissored round Asian-fusion teddy head, rounded feet, 5/8" body clip, and silky botanical conditioning.',
    duration: '2 hrs 15 mins',
    groomerNotes: 'Milo was nervous with the dryer so we used our low-noise infrared diffuser and soothing lavender collar spray.',
    packageUsed: 'Full Styling Groom'
  },
  {
    id: 'bella-samoyed',
    dogName: 'Bella',
    breed: 'Samoyed',
    age: '3.5 Years',
    category: 'double-coat',
    categoryLabel: 'Double Coats & De-shed',
    service: 'Intensive Coat Defense & De-Shedding',
    // Samoyed post-mud/heavy undercoat before -> Pristine cloud blowout after
    beforeImage: 'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=900&q=80',
    beforeDescription: 'Compacted winter undercoat shedding in clumps, stained hocks, and minor skin irritation.',
    afterDescription: 'Triple-stage hydrobath, high-velocity undercoat evacuation (carded 1.5 kg of dead fur!), and Nagayu mineral rinse.',
    duration: '3 hrs 00 mins',
    groomerNotes: 'Never shave a double coat! We thoroughly restored airflow to her skin while keeping her natural thermal insulation intact.',
    packageUsed: 'De-Shedding & Coat Defense'
  },
  {
    id: 'archie-schnauzer',
    dogName: 'Archie',
    breed: 'Miniature Schnauzer',
    age: '4 Years',
    category: 'styling',
    categoryLabel: 'Breed Standard Styling',
    service: 'Traditional Breed Profile Scissoring',
    // Scruffy unkempt beard -> Crisp geometric schnauzer cut
    beforeImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80',
    beforeDescription: 'Disheveled furnishings, stained beard, unblended back jacket with stray guard hairs.',
    afterDescription: 'Clean #7F back jacket line, angled eyebrows, tailored leg furnishings, and fresh blueberry beard brightening treatment.',
    duration: '2 hrs 00 mins',
    groomerNotes: 'Hand-scissored chest and eyebrows to frame his expressive gaze. Clean sanitary trim and ultrasonic teeth polish.',
    packageUsed: 'Full Styling Groom'
  },
  {
    id: 'cooper-golden',
    dogName: 'Cooper',
    breed: 'Golden Retriever',
    age: '5 Years',
    category: 'double-coat',
    categoryLabel: 'Double Coats & De-shed',
    service: 'Bath, De-Shed & Feather Tidy',
    // Muddy/ruffled coat -> Gleaming silky golden retriever coat
    beforeImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
    beforeDescription: 'Heavy dead undercoat trap, overgrown paws causing slipping on floorboards, dry summer coat.',
    afterDescription: 'Silky keratin restoration soak, trimmed cat-paws (anti-slip pad shave), sculpted chest & tail feathers.',
    duration: '2 hrs 10 mins',
    groomerNotes: 'Cooper loved the warm water hydro-massage. His coat now sheds up to 80% less fur around the house.',
    packageUsed: 'De-Shedding & Coat Defense'
  },
  {
    id: 'daisy-shihtzu',
    dogName: 'Daisy',
    breed: 'Shih Tzu Mix',
    age: '6 Years',
    category: 'small-breed',
    categoryLabel: 'Small Breeds',
    service: 'Comfort Teddy Cut & Spa Facial',
    // Overgrown shaggy face -> Round doll face with cute bows/clean ears
    beforeImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80',
    beforeDescription: 'Heavy tear staining, overgrown bangs obstructing vision, tangled ear feathering.',
    afterDescription: 'Signature West Park teddy head trim, tear-stain enzyme wash, rounded bell ears, and soothing paw balm.',
    duration: '1 hr 45 mins',
    groomerNotes: 'Daisy has mild arthritis, so we completed her paws and face on a supportive ergonomic orthopedic pad with zero rushing.',
    packageUsed: 'Full Styling Groom'
  },
  {
    id: 'barnaby-rescue',
    dogName: 'Barnaby',
    breed: 'Labradoodle (Rescue)',
    age: '1.5 Years',
    category: 'senior-rescue',
    categoryLabel: 'Senior & Gentle Care',
    service: 'Gentle Rehabilitation Reset Groom',
    // Severe tangles & frightened look -> Clean, relieved, happy dog
    beforeImage: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    beforeDescription: 'Adopted with severe coat neglect, pelted knots along stomach, deeply afraid of clippers and tables.',
    afterDescription: 'Painless short reset clip, soothing oatmeal bath, lick-mat desensitization with peanut butter treats.',
    duration: '2 hrs 30 mins',
    groomerNotes: 'Took multiple 10-minute cuddle breaks. By the end of the groom, Barnaby was leaning in for chin scratches.',
    packageUsed: 'Full Styling Groom'
  }
];
