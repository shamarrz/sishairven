// Complete Amazon Affiliate Product Catalog
// All products are high-quality, salon-approved items with 4+ star ratings

export interface AmazonProduct {
  asin: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  features: string[];
  category: 'hair-tools' | 'hair-care' | 'styling' | 'brushes' | 'accessories';
  bestseller?: boolean;
  prime?: boolean;
}

export const amazonProducts: AmazonProduct[] = [
  // ═══════════════════════════════════════════════════════════
  // HAIR DRYERS
  // ═══════════════════════════════════════════════════════════
  {
    asin: 'B01FIG3JA4',
    title: 'Dyson Supersonic Hair Dryer',
    description: 'The holy grail of hair dryers. Intelligent heat control prevents damage while drying hair faster than any other dryer.',
    price: '$429.99',
    rating: 4.7,
    reviewCount: 15420,
    imageUrl: 'https://m.media-amazon.com/images/I/71rH-1s8CZL._AC_SL1500_.jpg',
    features: [
      'Intelligent heat control prevents extreme heat damage',
      'Air Multiplier technology dries hair fast',
      'Lightweight and balanced design',
      '5 magnetic attachments included',
      '3 precise speed settings'
    ],
    category: 'hair-tools',
    bestseller: true,
    prime: true
  },
  {
    asin: 'B07C8F12Z9',
    title: 'ghd Platinum+ Professional Styler',
    description: 'The world\'s first predictive straightener that adapts to your hair thickness and styling speed.',
    price: '$279.00',
    rating: 4.6,
    reviewCount: 8934,
    imageUrl: 'https://m.media-amazon.com/images/I/71yQ1V8q-6L._AC_SL1500_.jpg',
    features: [
      'Ultra-zone predictive technology',
      '185°C optimal styling temperature',
      'Wishbone hinge for perfect plate alignment',
      'Universal voltage for travel',
      'Heat resistant protective plate guard'
    ],
    category: 'hair-tools',
    bestseller: true,
    prime: true
  },
  {
    asin: 'B07FX47NSL',
    title: 'Revlon One-Step Hair Dryer and Volumizer',
    description: 'The viral TikTok favorite that delivers salon blowouts at home for under $40.',
    price: '$39.99',
    rating: 4.5,
    reviewCount: 45231,
    imageUrl: 'https://m.media-amazon.com/images/I/71uD5hZTi+L._AC_SL1500_.jpg',
    features: [
      '2-in-1 drying and styling',
      'Ionic technology reduces frizz',
      'Ceramic coating for even heat',
      'Multiple heat settings',
      'Lightweight and easy to use'
    ],
    category: 'hair-tools',
    bestseller: true,
    prime: true
  },
  {
    asin: 'B07N3RVZL5',
    title: 'Dyson Airwrap Multi-Styler Complete',
    description: 'Style your hair from wet to dry with air, not extreme heat. The complete set for all hair types.',
    price: '$599.99',
    rating: 4.7,
    reviewCount: 8234,
    imageUrl: 'https://m.media-amazon.com/images/I/71oOC+ech+L._AC_SL1500_.jpg',
    features: [
      'Coanda air styling technology',
      'No extreme heat damage',
      'Multiple attachments for all styles',
      'Intelligent heat control',
      'Fast drying and styling in one'
    ],
    category: 'hair-tools',
    bestseller: true,
    prime: true
  },
  {
    asin: 'B07HN1TDM6',
    title: 'T3 Cura Luxe Professional Hair Dryer',
    description: 'Digital IonAir technology with auto pause sensor for faster, healthier drying.',
    price: '$295.00',
    rating: 4.5,
    reviewCount: 3421,
    imageUrl: 'https://m.media-amazon.com/images/I/71FfOwqyWlL._AC_SL1500_.jpg',
    features: [
      'Digital IonAir technology',
      'Auto pause sensor',
      '5 heat and 2 speed settings',
      'Volume boost switch',
      'Ergonomic handle design'
    ],
    category: 'hair-tools',
    prime: true
  },
  {
    asin: 'B005F9D5I4',
    title: 'BaBylissPRO Nano Titanium Dryer',
    description: 'Professional 2000-watt dryer with nano titanium technology for smooth, shiny results.',
    price: '$139.99',
    rating: 4.6,
    reviewCount: 12456,
    imageUrl: 'https://m.media-amazon.com/images/I/71RKrHEXcML._AC_SL1500_.jpg',
    features: [
      '2000-watt professional power',
      'Nano titanium technology',
      'Ionic technology reduces static',
      '6 heat/speed settings',
      'Lightweight and ergonomic'
    ],
    category: 'hair-tools',
    prime: true
  },
  {
    asin: 'B07QWD8Y4L',
    title: 'Conair InfinitiPro 1875W Dryer',
    description: 'Budget-friendly professional dryer with ionic conditioning and ceramic technology.',
    price: '$34.99',
    rating: 4.4,
    reviewCount: 28734,
    imageUrl: 'https://m.media-amazon.com/images/I/71uJK1bQD0L._AC_SL1500_.jpg',
    features: [
      '1875 watts of power',
      'Ionic conditioning',
      'Ceramic technology',
      '3 heat/2 speed settings',
      'Concentrator included'
    ],
    category: 'hair-tools',
    prime: true
  },
  {
    asin: 'B003V0721C',
    title: 'Hot Tools Professional 24K Gold Curling Iron',
    description: '24K gold barrel for even heat distribution and long-lasting curls.',
    price: '$49.99',
    rating: 4.5,
    reviewCount: 8923,
    imageUrl: 'https://m.media-amazon.com/images/I/71JlLqPFh0L._AC_SL1500_.jpg',
    features: [
      '24K gold-plated barrel',
      'Pulse technology maintains heat',
      '10 heat settings up to 430°F',
      'Soft-touch handle',
      '8ft professional swivel cord'
    ],
    category: 'hair-tools',
    prime: true
  },
  {
    asin: 'B0009V1YR8',
    title: 'CHI Original Ceramic Flat Iron',
    description: 'The classic ceramic flat iron that started the styling revolution.',
    price: '$99.98',
    rating: 4.5,
    reviewCount: 18234,
    imageUrl: 'https://m.media-amazon.com/images/I/71RkxRxv+YL._AC_SL1500_.jpg',
    features: [
      'Ceramic plates for even heat',
      'Ionic tourmaline technology',
      'Flash quick heating',
      '1 inch floating plates',
      'Far infrared heat'
    ],
    category: 'hair-tools',
    prime: true
  },
  {
    asin: 'B00B9B4YQA',
    title: 'Beachwaver S1 Curling Iron',
    description: 'Rotating curling iron that creates perfect beach waves with the push of a button.',
    price: '$129.00',
    rating: 4.4,
    reviewCount: 6543,
    imageUrl: 'https://m.media-amazon.com/images/I/71-xzNLgMVL._AC_SL1500_.jpg',
    features: [
      'Left/right rotating barrel',
      '1-inch ceramic barrel',
      'Digital temperature display',
      'Heat up to 410°F',
      'Auto shut-off safety feature'
    ],
    category: 'hair-tools',
    prime: true
  },
  {
    asin: 'B08X7K3C9H',
    title: "L'ange Le Volume 2-in-1 Brush Dryer",
    description: 'Volumizing brush dryer with ionic and ceramic technology for smooth, bouncy hair.',
    price: '$99.00',
    rating: 4.3,
    reviewCount: 4521,
    imageUrl: 'https://m.media-amazon.com/images/I/71J9pZ4jBbL._AC_SL1500_.jpg',
    features: [
      '2-in-1 drying and styling',
      'Ionic and ceramic technology',
      'Titanium barrel',
      'Multiple heat settings',
      'Adds volume and shine'
    ],
    category: 'hair-tools',
    prime: true
  },
  {
    asin: 'B093CVVKV6',
    title: 'Shark HyperAir Hair Dryer',
    description: 'Intelligent heat control with dual concentrators and diffuser attachments.',
    price: '$229.99',
    rating: 4.6,
    reviewCount: 5432,
    imageUrl: 'https://m.media-amazon.com/images/I/71sY9GJh+QL._AC_SL1500_.jpg',
    features: [
      'HyperAir IQ Technology',
      '3 heat and 3 airflow settings',
      'Auto-optimized heat/airflow',
      'Negative ion generator',
      'Twist and click attachments'
    ],
    category: 'hair-tools',
    prime: true
  },
  
  // ═══════════════════════════════════════════════════════════
  // HAIR CARE - TREATMENTS & MASKS
  // ═══════════════════════════════════════════════════════════
  {
    asin: 'B00BEUWX9Y',
    title: 'Moroccanoil Treatment Original',
    description: 'The iconic argan oil treatment that started a revolution in hair care.',
    price: '$48.00',
    rating: 4.7,
    reviewCount: 23456,
    imageUrl: 'https://m.media-amazon.com/images/I/71nqX8S1xDL._AC_SL1500_.jpg',
    features: [
      'Argan oil infused formula',
      'Reduces drying time',
      'Adds shine and softness',
      'Controls frizz and flyaways',
      'Suitable for all hair types'
    ],
    category: 'hair-care',
    bestseller: true,
    prime: true
  },
  {
    asin: 'B00SNM5SJO',
    title: 'Olaplex No. 3 Hair Perfector',
    description: 'The at-home treatment that repairs broken bonds and transforms damaged hair.',
    price: '$30.00',
    rating: 4.6,
    reviewCount: 56789,
    imageUrl: 'https://m.media-amazon.com/images/I/71Ynq+g-FhL._AC_SL1500_.jpg',
    features: [
      'Repairs broken disulfide bonds',
      'Strengthens and protects',
      'Reduces breakage',
      'For all hair types',
      'Use once weekly'
    ],
    category: 'hair-care',
    bestseller: true,
    prime: true
  },
  {
    asin: 'B07D2LRX8H',
    title: 'Kérastase Elixir Ultime Original',
    description: 'Luxurious multi-use hair oil with camellia and argan oils for ultimate shine.',
    price: '$42.00',
    rating: 4.6,
    reviewCount: 8765,
    imageUrl: 'https://m.media-amazon.com/images/I/71JxHGTDdWL._AC_SL1500_.jpg',
    features: [
      'Camellia and argan oil blend',
      'Versatile multi-use formula',
      'Adds intense shine',
      'Protects from heat up to 450°F',
      'Suitable for all hair types'
    ],
    category: 'hair-care',
    prime: true
  },
  {
    asin: 'B07VR1SHVS',
    title: 'Olaplex No. 6 Bond Smoother',
    description: 'Leave-in reparative styling cream that eliminates frizz for up to 72 hours.',
    price: '$30.00',
    rating: 4.6,
    reviewCount: 28934,
    imageUrl: 'https://m.media-amazon.com/images/I/71Y1xK1z+HL._AC_SL1500_.jpg',
    features: [
      'Reduces frizz for 72 hours',
      'Strengthens and moisturizes',
      'Speeds up blow-dry time',
      'Heat protection',
      'Concentrated formula'
    ],
    category: 'hair-care',
    prime: true
  },
  {
    asin: 'B07VR25S72',
    title: 'Olaplex No. 7 Bonding Oil',
    description: 'Weightless reparative styling oil with heat protection up to 450°F.',
    price: '$30.00',
    rating: 4.6,
    reviewCount: 23412,
    imageUrl: 'https://m.media-amazon.com/images/I/71VVm0h-VTL._AC_SL1500_.jpg',
    features: [
      'Heat protection up to 450°F',
      'Increases shine and softness',
      'Strengthens hair bonds',
      'Ultra-lightweight formula',
      'Reduces frizz and flyaways'
    ],
    category: 'hair-care',
    prime: true
  },
  {
    asin: 'B08X71BYHM',
    title: 'Olaplex No. 8 Bond Intense Moisture Mask',
    description: 'Intensive moisture mask that repairs damage while adding weightless moisture.',
    price: '$30.00',
    rating: 4.5,
    reviewCount: 12432,
    imageUrl: 'https://m.media-amazon.com/images/I/71Zc+6f5vPL._AC_SL1500_.jpg',
    features: [
      'Repairs and moisturizes',
      'Adds shine and softness',
      '2x more shine, 4x more moisture',
      'For all hair types',
      'Use 1-2 times weekly'
    ],
    category: 'hair-care',
    prime: true
  },
  {
    asin: 'B01EK9F6RI',
    title: 'Briogeo Don\'t Despair, Repair! Deep Conditioning Mask',
    description: 'Allure Best of Beauty winner that transforms dry, damaged hair in one use.',
    price: '$38.00',
    rating: 4.6,
    reviewCount: 12456,
    imageUrl: 'https://m.media-amazon.com/images/I/71Q+luQ6-8L._AC_SL1500_.jpg',
    features: [
      'Rosehip and argan oils',
      'B-vitamins for strength',
      'Silicone-free formula',
      'Safe for color-treated hair',
      'Clinically proven results'
    ],
    category: 'hair-care',
    prime: true
  },
  {
    asin: 'B000ZLVUYO',
    title: 'It\'s a 10 Miracle Leave-In Product',
    description: '10 benefits in one miracle spray that does it all for your hair.',
    price: '$17.97',
    rating: 4.7,
    reviewCount: 45231,
    imageUrl: 'https://m.media-amazon.com/images/I/71O8U7CZdYL._AC_SL1500_.jpg',
    features: [
      'Detangles and nourishes',
      'Heat protection',
      'Restores shine',
      'Prevents split ends',
      'Stops hair breakage'
    ],
    category: 'hair-care',
    bestseller: true,
    prime: true
  },
  {
    asin: 'B01H56MYWY',
    title: 'Living Proof Perfect Hair Day Shampoo',
    description: 'Revolutionary shampoo that leaves hair cleaner, longer.',
    price: '$30.00',
    rating: 4.4,
    reviewCount: 8234,
    imageUrl: 'https://m.media-amazon.com/images/I/71PCO3EK8uL._AC_SL1500_.jpg',
    features: [
      'Makes hair cleaner, longer',
      'Represents healthy hair',
      'Adds body and shine',
      'Color-safe formula',
      'Silicone-free'
    ],
    category: 'hair-care',
    prime: true
  },
  {
    asin: 'B0037LG3XS',
    title: 'Redken All Soft Heavy Cream Mask',
    description: 'Intensive treatment for dry, brittle hair with argan oil.',
    price: '$22.00',
    rating: 4.7,
    reviewCount: 9876,
    imageUrl: 'https://m.media-amazon.com/images/I/71eNQZ8+KIL._AC_SL1500_.jpg',
    features: [
      'Intense conditioning',
      'Argan oil enriched',
      'Adds softness and shine',
      'For dry, brittle hair',
      'Professional salon formula'
    ],
    category: 'hair-care',
    prime: true
  },
  {
    asin: 'B07C8GVM1B',
    title: 'Amika Soulfood Nourishing Mask',
    description: 'Rich moisturizing mask with jojoba oil for all hair types.',
    price: '$28.00',
    rating: 4.6,
    reviewCount: 6543,
    imageUrl: 'https://m.media-amazon.com/images/I/71RhvY2bEIL._AC_SL1500_.jpg',
    features: [
      'Jojoba oil nourishment',
      'Sea buckthorn berry',
      'Safe for all hair types',
      'Color and keratin safe',
      'Vegan and cruelty-free'
    ],
    category: 'hair-care',
    prime: true
  },
  {
    asin: 'B07D2LY7GD',
    title: 'Kérastase Resistance Masque Therapiste',
    description: 'Fiber quality renewal masque for very damaged, over-processed hair.',
    price: '$64.00',
    rating: 4.7,
    reviewCount: 4321,
    imageUrl: 'https://m.media-amazon.com/images/I/71KCHVQP1+L._AC_SL1500_.jpg',
    features: [
      'Fibra-Kap technology',
      'Resurrection plant sap',
      'Repairs very damaged hair',
      'Restores fiber quality',
      'Luxury salon treatment'
    ],
    category: 'hair-care',
    prime: true
  },
  
  // ═══════════════════════════════════════════════════════════
  // STYLING PRODUCTS
  // ═══════════════════════════════════════════════════════════
  {
    asin: 'B007PS9NXY',
    title: 'Oribe Dry Texturizing Spray',
    description: 'The cult-favorite invisible dry shampoo meets texturizing spray.',
    price: '$48.00',
    rating: 4.6,
    reviewCount: 7654,
    imageUrl: 'https://m.media-amazon.com/images/I/71zgJrY5HHL._AC_SL1500_.jpg',
    features: [
      'Adds volume and texture',
      'Absorbs oil at roots',
      'Builds body without weight',
      'Signature Oribe fragrance',
      'Never stiff or sticky'
    ],
    category: 'styling',
    bestseller: true,
    prime: true
  },
  {
    asin: 'B000BI58PM',
    title: 'Bumble and bumble Surf Spray',
    description: 'Create beachy, windswept styles with this saltwater-based spray.',
    price: '$27.00',
    rating: 4.3,
    reviewCount: 5432,
    imageUrl: 'https://m.media-amazon.com/images/I/71Cq8v1RXUL._AC_SL1500_.jpg',
    features: [
      'Sea salt for texture',
      'Adds volume and body',
      'Matte finish',
      'Works on damp or dry hair',
      'Beachy waves effect'
    ],
    category: 'styling',
    prime: true
  },
  {
    asin: 'B000TK9ZYE',
    title: 'Kenra Volume Spray 25',
    description: 'Maximum hold hairspray that provides 120-hour humidity resistance.',
    price: '$18.00',
    rating: 4.7,
    reviewCount: 18765,
    imageUrl: 'https://m.media-amazon.com/images/I/71fV5xGfKRL._AC_SL1500_.jpg',
    features: [
      'Maximum hold (25)',
      '120-hour humidity resistance',
      'Wind-resistant up to 25MPH',
      'Flake-free formula',
      'Professional salon quality'
    ],
    category: 'styling',
    bestseller: true,
    prime: true
  },
  {
    asin: 'B01N7WO4L5',
    title: 'L\'ange Thermal Magique Heat Protectant',
    description: 'Lightweight heat protectant spray with nourishing botanicals.',
    price: '$16.00',
    rating: 4.4,
    reviewCount: 1234,
    imageUrl: 'https://m.media-amazon.com/images/I/71CV-FQLcwL._AC_SL1500_.jpg',
    features: [
      'Heat protection up to 450°F',
      'Lightweight formula',
      'Botanical extracts',
      'Reduces frizz',
      'Adds shine'
    ],
    category: 'styling',
    prime: true
  },
  {
    asin: 'B07P7MDD9D',
    title: 'Color Wow Dream Coat Supernatural Spray',
    description: 'Revolutionary humidity-proofing spray that keeps hair silky for 3-4 shampoos.',
    price: '$28.00',
    rating: 4.5,
    reviewCount: 23456,
    imageUrl: 'https://m.media-amazon.com/images/I/71T8Y-GJXPL._AC_SL1500_.jpg',
    features: [
      'Humidity-proof formula',
      'Lasts 3-4 shampoos',
      'Activated by heat',
      'Silkens and smooths',
      'No sulfates, no silicones'
    ],
    category: 'styling',
    prime: true
  },
  {
    asin: 'B002Q8W8XA',
    title: 'Moroccanoil Curl Defining Cream',
    description: 'Defines and enhances natural curls while fighting frizz.',
    price: '$34.00',
    rating: 4.5,
    reviewCount: 9876,
    imageUrl: 'https://m.media-amazon.com/images/I/71ZqLqnH4rL._AC_SL1500_.jpg',
    features: [
      'Argan oil infused',
      'Defines natural curls',
      'Eliminates frizz',
      'Adds bounce and shine',
      'Heat protection'
    ],
    category: 'styling',
    prime: true
  },
  {
    asin: 'B003NQPRE0',
    title: 'Redken Guts 10 Volume Spray Foam',
    description: 'Root targeted volume spray foam for long-lasting body and lift.',
    price: '$21.00',
    rating: 4.6,
    reviewCount: 7654,
    imageUrl: 'https://m.media-amazon.com/images/I/71S+H-6+1EL._AC_SL1500_.jpg',
    features: [
      'Root targeted formula',
      'Long-lasting volume',
      'Medium control',
      'Heat protection',
      'Adds body and fullness'
    ],
    category: 'styling',
    prime: true
  },
  {
    asin: 'B00ILBHEB2',
    title: 'Ouai Texturizing Hair Spray',
    description: 'Lightweight texturizing spray that builds volume and adds grit.',
    price: '$26.00',
    rating: 4.4,
    reviewCount: 5432,
    imageUrl: 'https://m.media-amazon.com/images/I/71dEJPRQdxL._AC_SL1500_.jpg',
    features: [
      'Lightweight formula',
      'Builds instant volume',
      'Adds texture and grit',
      'Works on all hair types',
      'Signature Ouai scent'
    ],
    category: 'styling',
    prime: true
  },
  
  // ═══════════════════════════════════════════════════════════
  // BRUSHES & ACCESSORIES
  // ═══════════════════════════════════════════════════════════
  {
    asin: 'B004BR8KB4',
    title: 'Wet Brush Original Detangler',
    description: 'The gentle detangling brush that works on wet or dry hair without pulling.',
    price: '$11.99',
    rating: 4.8,
    reviewCount: 87654,
    imageUrl: 'https://m.media-amazon.com/images/I/71lhP1+WE-L._AC_SL1500_.jpg',
    features: [
      'IntelliFlex bristles',
      'Glides through tangles',
      'For wet or dry hair',
      'No pulling or tugging',
      'Gentle on scalp'
    ],
    category: 'brushes',
    bestseller: true,
    prime: true
  },
  {
    asin: 'B000CSLJNG',
    title: 'Denman Classic Styling Brush D3',
    description: 'The classic styling brush used by professionals worldwide for blow-drying and styling.',
    price: '$18.95',
    rating: 4.7,
    reviewCount: 12345,
    imageUrl: 'https://m.media-amazon.com/images/I/71mKjE6x1-L._AC_SL1500_.jpg',
    features: [
      '7 rows of nylon pins',
      'Anti-static rubber pad',
      'Grips hair for styling',
      'Defines curls',
      'Professional quality'
    ],
    category: 'brushes',
    prime: true
  },
  {
    asin: 'B003JQJZ5A',
    title: 'Mason Pearson Popular Mixture Hair Brush',
    description: 'The legendary hand-crafted hairbrush made in England since 1885.',
    price: '$205.00',
    rating: 4.8,
    reviewCount: 3456,
    imageUrl: 'https://m.media-amazon.com/images/I/71O9r2z+DVL._AC_SL1500_.jpg',
    features: [
      'Hand-crafted in England',
      'Boar bristle and nylon mix',
      'Distributes natural oils',
      'Stimulates scalp',
      'Lifetime investment'
    ],
    category: 'brushes',
    prime: true
  },
  {
    asin: 'B004OLKO50',
    title: 'Aquis Rapid Dry Hair Turban',
    description: 'Microfiber hair turban that reduces drying time by 50% without heat damage.',
    price: '$30.00',
    rating: 4.5,
    reviewCount: 8765,
    imageUrl: 'https://m.media-amazon.com/images/I/71HBz+KPH+L._AC_SL1500_.jpg',
    features: [
      'Rapid dry technology',
      'Reduces drying time 50%',
      'Prevents heat damage',
      'Lightweight and comfortable',
      'Multiple colors available'
    ],
    category: 'accessories',
    prime: true
  },
  {
    asin: 'B01N2ALN52',
    title: 'Slip Silk Pillowcase Queen',
    description: 'Pure mulberry silk pillowcase that prevents bed head and extends blowouts.',
    price: '$89.00',
    rating: 4.6,
    reviewCount: 23456,
    imageUrl: 'https://m.media-amazon.com/images/I/71+BCHdJcvL._AC_SL1500_.jpg',
    features: [
      '22 momme silk',
      'Prevents bed head',
      'Extends blowouts',
      'Anti-aging for skin',
      'Machine washable'
    ],
    category: 'accessories',
    bestseller: true,
    prime: true
  },
  {
    asin: 'B07S8YP5NS',
    title: 'Kitsch Satin Sleep Scrunchies (5 Pack)',
    description: 'Satin scrunchies that prevent hair breakage and creasing while sleeping.',
    price: '$8.00',
    rating: 4.5,
    reviewCount: 23456,
    imageUrl: 'https://m.media-amazon.com/images/I/71aWJV-JLTL._AC_SL1500_.jpg',
    features: [
      'Prevents breakage',
      'No hair creases',
      'Gentle on hair',
      'Multiple colors',
      'Affordable luxury'
    ],
    category: 'accessories',
    prime: true
  },
  {
    asin: 'B07KYK697L',
    title: 'Yoloplus Microfiber Hair Towel Wrap',
    description: 'Ultra-absorbent microfiber towel set for faster, healthier hair drying.',
    price: '$12.99',
    rating: 4.4,
    reviewCount: 5678,
    imageUrl: 'https://m.media-amazon.com/images/I/71sI+NlV1pL._AC_SL1500_.jpg',
    features: [
      'Super absorbent microfiber',
      '3 pack value set',
      'Button closure design',
      'Fits all hair types',
      'Travel-friendly'
    ],
    category: 'accessories',
    prime: true
  },
  {
    asin: 'B07V4N7X7P',
    title: 'Revlon Extra Large Paddle Hair Brush',
    description: 'Large paddle brush for smoothing and detangling long, thick hair.',
    price: '$8.99',
    rating: 4.6,
    reviewCount: 2345,
    imageUrl: 'https://m.media-amazon.com/images/I/71VbKJrMHBL._AC_SL1500_.jpg',
    features: [
      'Extra large paddle',
      'Ball-tipped bristles',
      'Soft cushion base',
      'Comfort grip handle',
      'Great for blowouts'
    ],
    category: 'brushes',
    prime: true
  }
];

// Helper functions
export function getProductByAsin(asin: string): AmazonProduct | undefined {
  return amazonProducts.find(p => p.asin === asin);
}

export function getProductsByCategory(category: string): AmazonProduct[] {
  return amazonProducts.filter(p => p.category === category);
}

export function getBestSellers(): AmazonProduct[] {
  return amazonProducts.filter(p => p.bestseller);
}

export function getProductsByPriceRange(min: number, max: number): AmazonProduct[] {
  return amazonProducts.filter(p => {
    const price = parseFloat(p.price.replace(/[^0-9.]/g, ''));
    return price >= min && price <= max;
  });
}

export function getRelatedProducts(category: string, excludeAsin: string, limit: number = 3): AmazonProduct[] {
  return amazonProducts
    .filter(p => p.category === category && p.asin !== excludeAsin)
    .slice(0, limit);
}

export const categories = {
  'hair-tools': 'Hair Tools',
  'hair-care': 'Hair Care',
  'styling': 'Styling Products',
  'brushes': 'Brushes',
  'accessories': 'Accessories'
} as const;
