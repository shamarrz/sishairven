export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  modified?: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  readingTime: number;
  published: boolean;
}

export const posts: BlogPost[] = [
  // ═══════════════════════════════════════════════════════════
  // EXISTING POSTS (Updated)
  // ═══════════════════════════════════════════════════════════
  {
    slug: 'best-hair-dryers-2025',
    title: 'Best Hair Dryers 2025: Salon-Quality Results at Home',
    description: 'Professional stylists review the top hair dryers for every budget. From the Dyson Supersonic to budget-friendly options under $50.',
    date: '2025-01-15',
    author: 'Elyn Makna',
    category: 'Reviews',
    tags: ['hair-dryers', 'styling-tools', 'reviews', 'dyson', 'ghd'],
    image: '/blog/hair-dryers-2025.jpg',
    readingTime: 8,
    published: true
  },
  {
    slug: 'dyson-vs-ghd-vs-revlon',
    title: 'Dyson vs ghd vs Revlon: Which Styling Tool Is Worth Your Money?',
    description: 'The ultimate comparison of three iconic hair tools. We test the Dyson Supersonic, ghd Platinum+, and Revlon One-Step to help you decide.',
    date: '2025-01-18',
    author: 'Elyn Makna',
    category: 'Reviews',
    tags: ['hair-dryers', 'comparison', 'dyson', 'ghd', 'revlon'],
    image: '/blog/dyson-vs-ghd-revlon.jpg',
    readingTime: 12,
    published: true
  },
  {
    slug: 'keratin-treatment-guide',
    title: 'Keratin Treatment Complete Guide: Everything You Need to Know',
    description: 'The definitive guide to keratin treatments. Learn about different types, costs, aftercare, and whether it\'s right for your hair type.',
    date: '2025-01-20',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['keratin', 'treatments', 'guides', 'smooth-hair'],
    image: '/blog/keratin-treatment.jpg',
    readingTime: 15,
    published: true
  },
  {
    slug: 'balayage-vs-highlights',
    title: 'Balayage vs Highlights: Which Coloring Technique Is Right for You?',
    description: 'Everything you need to know about balayage and traditional highlights. Learn the differences, costs, maintenance, and which technique suits your style.',
    date: '2025-01-22',
    author: 'Elyn Makna',
    category: 'Education',
    tags: ['balayage', 'highlights', 'hair-color', 'education'],
    image: '/blog/balayage-vs-highlights.jpg',
    readingTime: 14,
    published: true
  },
  {
    slug: 'summer-hair-care-tips',
    title: 'Summer Hair Care: How to Protect Your Hair from Sun, Chlorine & Salt',
    description: 'Essential summer hair care tips from a professional stylist. Learn how to protect your hair from UV damage, chlorine, salt water, and humidity.',
    date: '2025-01-25',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['summer', 'hair-care', 'uv-protection', 'swimming'],
    image: '/blog/summer-hair-care.jpg',
    readingTime: 13,
    published: true
  },
  {
    slug: 'best-products-damaged-hair',
    title: 'Best Products for Damaged Hair: Repair & Restore Your Strands',
    description: 'Professional recommendations for repairing heat and chemical damage. Featuring Olaplex, Kérastase, Briogeo, and more science-backed treatments.',
    date: '2025-01-28',
    author: 'Elyn Makna',
    category: 'Reviews',
    tags: ['damaged-hair', 'repair', 'olaplex', 'treatments'],
    image: '/blog/damaged-hair-products.jpg',
    readingTime: 16,
    published: true
  },
  {
    slug: 'how-to-make-blowout-last',
    title: 'How to Make Your Blowout Last All Week: Pro Stylist Secrets',
    description: 'Learn professional techniques to extend your blowout for 5-7 days. Tips for sleeping, styling, and maintaining that salon-fresh look.',
    date: '2025-02-01',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['blowout', 'styling', 'hair-care', 'tips'],
    image: '/blog/blowout-lasting.jpg',
    readingTime: 11,
    published: true
  },

  // ═══════════════════════════════════════════════════════════
  // NEW POSTS - HAIR TOOLS DEEP DIVE (Week 1)
  // ═══════════════════════════════════════════════════════════
  {
    slug: 'best-hair-dryers-curly-hair',
    title: 'Best Hair Dryers for Curly Hair 2025: From Waves to Coils',
    description: 'The top hair dryers specifically designed for curly hair. Featuring diffusers, ionic technology, and attachments that enhance natural texture.',
    date: '2025-02-05',
    author: 'Elyn Makna',
    category: 'Reviews',
    tags: ['curly-hair', 'hair-dryers', 'diffuser', 'reviews'],
    image: '/blog/curly-hair-dryers.jpg',
    readingTime: 10,
    published: true
  },
  {
    slug: 'best-hair-dryers-fine-hair',
    title: 'Best Hair Dryers for Fine Hair: Add Volume Without Damage',
    description: 'Specialized hair dryers that add volume to fine hair without causing damage. Features ionic technology, cool shots, and volumizing attachments.',
    date: '2025-02-08',
    author: 'Elyn Makna',
    category: 'Reviews',
    tags: ['fine-hair', 'hair-dryers', 'volume', 'reviews'],
    image: '/blog/fine-hair-dryers.jpg',
    readingTime: 9,
    published: true
  },
  {
    slug: 'best-budget-hair-dryers',
    title: 'Best Budget Hair Dryers Under $50 That Actually Work',
    description: 'Professional-quality results without the premium price tag. We tested 20+ affordable hair dryers to find the best options under $50.',
    date: '2025-02-10',
    author: 'Elyn Makna',
    category: 'Reviews',
    tags: ['budget', 'hair-dryers', 'affordable', 'reviews'],
    image: '/blog/budget-hair-dryers.jpg',
    readingTime: 8,
    published: true
  },
  {
    slug: 'hair-dryer-damage-prevention',
    title: 'How to Use a Hair Dryer Without Damaging Your Hair',
    description: 'Expert techniques for drying hair safely. Learn proper heat settings, distance, timing, and protective products to prevent heat damage.',
    date: '2025-02-12',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['heat-protection', 'hair-dryers', 'damage-prevention', 'guides'],
    image: '/blog/hair-dryer-safety.jpg',
    readingTime: 7,
    published: true
  },

  // ═══════════════════════════════════════════════════════════
  // NEW POSTS - HAIR CARE FUNDAMENTALS (Week 2)
  // ═══════════════════════════════════════════════════════════
  {
    slug: 'complete-hair-oils-guide',
    title: 'Complete Guide to Hair Oils: Moroccanoil, Kerastase, Olaplex & More',
    description: 'Everything you need to know about hair oils. Compare benefits, learn application techniques, and find the perfect oil for your hair type.',
    date: '2025-02-15',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['hair-oils', 'moroccanoil', 'olaplex', 'kerastase'],
    image: '/blog/hair-oils-guide.jpg',
    readingTime: 12,
    published: true
  },
  {
    slug: 'repair-heat-damaged-hair',
    title: 'How to Repair Heat-Damaged Hair: A Step-by-Step Recovery Plan',
    description: 'Proven strategies for reversing heat damage. From emergency treatments to long-term recovery, learn how to restore your hair\'s health.',
    date: '2025-02-18',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['heat-damage', 'repair', 'treatments', 'recovery'],
    image: '/blog/heat-damage-repair.jpg',
    readingTime: 14,
    published: true
  },
  {
    slug: 'best-deep-conditioning-treatments',
    title: 'Best Deep Conditioning Treatments: Masks That Actually Work',
    description: 'Professional reviews of the best hair masks and deep conditioners. From drugstore finds to luxury treatments, find your perfect match.',
    date: '2025-02-20',
    author: 'Elyn Makna',
    category: 'Reviews',
    tags: ['deep-conditioning', 'hair-masks', 'reviews', 'treatments'],
    image: '/blog/deep-conditioners.jpg',
    readingTime: 10,
    published: true
  },
  {
    slug: 'protein-vs-moisture',
    title: 'Protein vs Moisture: What Your Hair Actually Needs',
    description: 'Understanding the protein-moisture balance is key to healthy hair. Learn how to identify what your hair needs and build the right routine.',
    date: '2025-02-22',
    author: 'Elyn Makna',
    category: 'Education',
    tags: ['protein', 'moisture', 'hair-health', 'education'],
    image: '/blog/protein-vs-moisture.jpg',
    readingTime: 11,
    published: true
  },
  {
    slug: 'how-often-wash-hair',
    title: 'How Often Should You Wash Your Hair? The Science-Backed Answer',
    description: 'The truth about hair washing frequency. Learn how your hair type, lifestyle, and products should determine your washing schedule.',
    date: '2025-02-25',
    author: 'Elyn Makna',
    category: 'Education',
    tags: ['hair-washing', 'routines', 'scalp-health', 'education'],
    image: '/blog/hair-washing.jpg',
    readingTime: 9,
    published: true
  },

  // ═══════════════════════════════════════════════════════════
  // NEW POSTS - STYLING TOOLS & TECHNIQUES (Week 3)
  // ═══════════════════════════════════════════════════════════
  {
    slug: 'flat-iron-vs-curling-iron',
    title: 'Flat Iron vs Curling Iron: Which Styling Tool Should You Buy First?',
    description: 'A comprehensive comparison to help you choose the right styling tool. Learn techniques, versatility, and which tool fits your styling goals.',
    date: '2025-03-01',
    author: 'Elyn Makna',
    category: 'Reviews',
    tags: ['flat-iron', 'curling-iron', 'styling-tools', 'comparison'],
    image: '/blog/flat-iron-curling.jpg',
    readingTime: 10,
    published: true
  },
  {
    slug: 'best-hot-air-brushes',
    title: 'Best Hot Air Brushes for Volume: Salon Blowouts at Home',
    description: 'Top hot air brushes that deliver salon-quality volume. Reviews of Revlon, L\'ange, Dyson Airwrap, and more volumizing tools.',
    date: '2025-03-05',
    author: 'Elyn Makna',
    category: 'Reviews',
    tags: ['hot-air-brush', 'volume', 'blowout', 'reviews'],
    image: '/blog/hot-air-brushes.jpg',
    readingTime: 9,
    published: true
  },
  {
    slug: 'salon-blowout-at-home',
    title: 'How to Get a Salon-Quality Blowout at Home: Step-by-Step Tutorial',
    description: 'Master the professional blowout technique at home. Complete tutorial with video-style instructions, product recommendations, and troubleshooting.',
    date: '2025-03-08',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['blowout', 'tutorial', 'styling', 'guides'],
    image: '/blog/salon-blowout-home.jpg',
    readingTime: 15,
    published: true
  },
  {
    slug: 'best-flat-irons-thick-hair',
    title: 'Best Hair Straighteners for Thick Hair: Tame the Mane',
    description: 'Professional flat irons that can handle thick, coarse, and unruly hair. High heat, wide plates, and durable designs for lasting smoothness.',
    date: '2025-03-12',
    author: 'Elyn Makna',
    category: 'Reviews',
    tags: ['flat-iron', 'thick-hair', 'reviews', 'styling-tools'],
    image: '/blog/flat-irons-thick-hair.jpg',
    readingTime: 8,
    published: true
  },
  {
    slug: 'curling-iron-temperature-guide',
    title: 'Curling Iron Temperature Guide: The Right Heat for Your Hair Type',
    description: 'Stop guessing and start styling correctly. Learn the optimal temperature settings for fine, medium, and thick hair to prevent damage.',
    date: '2025-03-15',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['curling-iron', 'heat-settings', 'damage-prevention', 'guides'],
    image: '/blog/curling-heat-guide.jpg',
    readingTime: 7,
    published: true
  },

  // ═══════════════════════════════════════════════════════════
  // NEW POSTS - COLOR & TREATMENTS (Week 4)
  // ═══════════════════════════════════════════════════════════
  {
    slug: 'make-hair-color-last',
    title: 'How to Make Hair Color Last Longer: Colorist Secrets Revealed',
    description: 'Professional tips for extending the life of your color. From washing techniques to product recommendations, keep your color vibrant longer.',
    date: '2025-03-20',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['hair-color', 'maintenance', 'color-care', 'guides'],
    image: '/blog/color-lasting.jpg',
    readingTime: 10,
    published: true
  },
  {
    slug: 'best-purple-shampoos',
    title: 'Best Purple Shampoos for Blonde Hair: Tone Without Damage',
    description: 'Top-rated purple shampoos that neutralize brassiness while keeping hair healthy. Reviews for every shade of blonde and silver.',
    date: '2025-03-22',
    author: 'Elyn Makna',
    category: 'Reviews',
    tags: ['purple-shampoo', 'blonde-hair', 'toning', 'reviews'],
    image: '/blog/purple-shampoo.jpg',
    readingTime: 9,
    published: true
  },
  {
    slug: 'at-home-keratin-treatments',
    title: 'At-Home Keratin Treatments That Actually Work',
    description: 'Salon-quality smoothing treatments you can do at home. Product reviews, application guides, and realistic expectations for DIY keratin.',
    date: '2025-03-25',
    author: 'Elyn Makna',
    category: 'Reviews',
    tags: ['keratin', 'at-home', 'smooth-hair', 'reviews'],
    image: '/blog/at-home-keratin.jpg',
    readingTime: 12,
    published: true
  },
  {
    slug: 'olaplex-complete-guide',
    title: 'Olaplex Complete Guide: No. 3, 6, 7, 8, 9 Explained',
    description: 'The ultimate guide to the Olaplex system. Learn what each product does, how to use them together, and build your perfect routine.',
    date: '2025-03-28',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['olaplex', 'bond-repair', 'product-guide', 'guides'],
    image: '/blog/olaplex-guide.jpg',
    readingTime: 14,
    published: true
  },

  // ═══════════════════════════════════════════════════════════
  // NEW POSTS - SEASONAL & SPECIAL CARE (Week 5)
  // ═══════════════════════════════════════════════════════════
  {
    slug: 'winter-hair-care',
    title: 'Winter Hair Care: Fighting Static, Dryness & Hat Hair',
    description: 'Essential winter hair care tips. Learn how to combat static, dryness, and the dreaded hat hair while keeping your locks healthy.',
    date: '2025-04-01',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['winter', 'hair-care', 'static', 'dryness'],
    image: '/blog/winter-hair-care.jpg',
    readingTime: 10,
    published: true
  },
  {
    slug: 'frizzy-hair-humidity',
    title: 'Best Products for Frizzy Hair in Humidity: Beat the Poof',
    description: 'Top anti-frizz products that actually work in high humidity. Serums, creams, and sprays for smooth hair in any weather.',
    date: '2025-04-05',
    author: 'Elyn Makna',
    category: 'Reviews',
    tags: ['frizz', 'humidity', 'anti-frizz', 'reviews'],
    image: '/blog/anti-frizz-humidity.jpg',
    readingTime: 9,
    published: true
  },
  {
    slug: 'post-swim-hair-care',
    title: 'Post-Swim Hair Care: Remove Chlorine & Salt Buildup',
    description: 'Essential routine for swimmers. Learn how to protect hair before swimming and repair damage from chlorine and salt water.',
    date: '2025-04-08',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['swimming', 'chlorine', 'salt-water', 'hair-care'],
    image: '/blog/post-swim-care.jpg',
    readingTime: 8,
    published: true
  },
  {
    slug: 'protect-hair-while-sleeping',
    title: 'How to Protect Your Hair While Sleeping: Overnight Care Tips',
    description: 'Wake up with better hair. Learn the best sleeping positions, pillowcases, protective styles, and overnight treatments.',
    date: '2025-04-10',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['sleep', 'night-routine', 'hair-protection', 'guides'],
    image: '/blog/sleep-hair-care.jpg',
    readingTime: 7,
    published: true
  },

  // ═══════════════════════════════════════════════════════════
  // NEW POSTS - HAIR TYPE SPECIFIC (Week 6)
  // ═══════════════════════════════════════════════════════════
  {
    slug: 'curly-hair-routine',
    title: 'Complete Curly Hair Routine: Products, Techniques & Tips',
    description: 'The definitive guide to curly hair care. Learn the CGM method, find product recommendations, and master styling techniques for every curl type.',
    date: '2025-04-15',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['curly-hair', 'routines', 'cgm', 'curl-care'],
    image: '/blog/curly-routine.jpg',
    readingTime: 16,
    published: true
  },
  {
    slug: 'fine-hair-volumizing-guide',
    title: 'Fine Hair Volumizing Guide: Products That Actually Add Body',
    description: 'Professional techniques and products for adding volume to fine hair. From root lifters to blow-drying methods, get the body you want.',
    date: '2025-04-18',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['fine-hair', 'volume', 'styling', 'guides'],
    image: '/blog/fine-hair-volume.jpg',
    readingTime: 11,
    published: true
  },
  {
    slug: 'thick-hair-management',
    title: 'Thick Hair Management: Taming & Styling Strategies',
    description: 'Essential tips for managing thick, heavy hair. Learn about thinning techniques, the right tools, and products that work with your hair type.',
    date: '2025-04-20',
    author: 'Elyn Makna',
    category: 'Guides',
    tags: ['thick-hair', 'management', 'styling', 'guides'],
    image: '/blog/thick-hair.jpg',
    readingTime: 10,
    published: true
  }
];

export function getPublishedPosts(): BlogPost[] {
  return posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(post => post.slug === slug && post.published);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getPublishedPosts().filter(post => post.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getPublishedPosts().filter(post => post.tags.includes(tag));
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];
  
  return getPublishedPosts()
    .filter(post => post.slug !== currentSlug)
    .filter(post => 
      post.category === current.category || 
      post.tags.some(tag => current.tags.includes(tag))
    )
    .slice(0, limit);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Categories for navigation
export const categories = [
  { name: 'Reviews', slug: 'reviews', description: 'In-depth product reviews and comparisons' },
  { name: 'Guides', slug: 'guides', description: 'Step-by-step tutorials and how-tos' },
  { name: 'Education', slug: 'education', description: 'Learn about hair science and techniques' }
];

// Popular tags for SEO
export const popularTags = [
  'hair-dryers', 'styling-tools', 'olaplex', 'keratin', 
  'curly-hair', 'fine-hair', 'thick-hair', 'hair-color',
  'summer', 'winter', 'repair', 'volume'
];
