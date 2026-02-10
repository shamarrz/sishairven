<script>
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { getProductByAsin, getProductsByCategory } from '$lib/utils/amazon-products';

  const uvProducts = getProductsByCategory('styling').slice(0, 3);
  const moroccanoil = getProductByAsin('B00BEUWX9Y');
  const silkPillowcase = getProductByAsin('B01N2ALN52');
</script>

<div class="prose prose-invert prose-pink max-w-none">
  <p class="text-xl text-gray-300 leading-relaxed mb-8">
    Summer is the season of beach days, pool parties, and outdoor adventures – but your hair pays 
    the price. Between UV radiation, chlorine, salt water, and humidity, summer can wreak havoc on 
    even the healthiest hair. As a stylist, I see the damage every September: brittle ends, faded 
    color, and dry, frizzy texture. But it doesn't have to be this way.
  </p>

  <div class="bg-gradient-to-r from-yellow-500/20 via-pink-bright/20 to-cyan-500/20 p-6 rounded-lg my-8">
    <h2 class="text-xl font-display text-white mb-4">Summer Hair Survival in Numbers</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div>
        <p class="text-3xl font-bold text-pink-bright">40%</p>
        <p class="text-gray-300 text-sm">more UV damage to hair in summer</p>
      </div>
      <div>
        <p class="text-3xl font-bold text-pink-bright">3x</p>
        <p class="text-gray-300 text-sm">faster color fading in sunlight</p>
      </div>
      <div>
        <p class="text-3xl font-bold text-pink-bright">85%</p>
        <p class="text-gray-300 text-sm">humidity increase in summer months</p>
      </div>
      <div>
        <p class="text-3xl font-bold text-pink-bright">15%</p>
        <p class="text-gray-300 text-sm">moisture loss from chlorine exposure</p>
      </div>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">The Summer Hair Threats</h2>

  <div class="grid md:grid-cols-2 gap-6 my-8">
    <div class="bg-black-soft/30 p-6 rounded-lg">
      <h3 class="text-yellow-400 font-semibold mb-3 flex items-center">
        <span class="text-2xl mr-2">☀️</span> UV Radiation
      </h3>
      <p class="text-gray-300 text-sm">
        The sun breaks down hair proteins and lipids, leading to dryness, brittleness, and color fade. 
        UV rays penetrate the hair cuticle, damaging the cortex and weakening the hair structure.
      </p>
    </div>
    <div class="bg-black-soft/30 p-6 rounded-lg">
      <h3 class="text-cyan-400 font-semibold mb-3 flex items-center">
        <span class="text-2xl mr-2">🏊</span> Chlorine
      </h3>
      <p class="text-gray-300 text-sm">
        Chlorine strips natural oils, dries out hair, and can cause a chemical reaction with color 
        treatments, leading to that dreaded green tint in blonde hair.
      </p>
    </div>
    <div class="bg-black-soft/30 p-6 rounded-lg">
      <h3 class="text-blue-400 font-semibold mb-3 flex items-center">
        <span class="text-2xl mr-2">🌊</span> Salt Water
      </h3>
      <p class="text-gray-300 text-sm">
        Salt draws moisture out of hair, leaving it dry, tangled, and prone to breakage. The 
        combination of salt and sun is particularly damaging.
      </p>
    </div>
    <div class="bg-black-soft/30 p-6 rounded-lg">
      <h3 class="text-purple-400 font-semibold mb-3 flex items-center">
        <span class="text-2xl mr-2">💨</span> Humidity
      </h3>
      <p class="text-gray-300 text-sm">
        Humid air causes the hair cuticle to swell, leading to frizz and loss of style. It also 
        makes hair more susceptible to environmental damage.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">1. UV Protection Is Non-Negotiable</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    Just like your skin, your hair needs sun protection. UV rays break down the proteins in hair, 
    leading to dryness, brittleness, and color fade. I tell every client: if you're spending more 
    than 30 minutes in the sun, your hair needs protection.
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">How to Protect Your Hair from UV</h3>
  
  <ul class="text-gray-300 space-y-3 mb-6">
    <li>
      <strong>Use UV-protectant products:</strong> Look for hair products with UV filters. Sprays 
      are easiest to reapply throughout the day.
    </li>
    <li>
      <strong>Wear a hat:</strong> The most effective protection is physical. A wide-brimmed hat 
      blocks up to 90% of UV rays.
    </li>
    <li>
      <strong>Apply hair sunscreen:</strong> Yes, it exists! Products like Color Wow Dream Coat 
      provide UV protection while fighting humidity.
    </li>
    <li>
      <strong>Time your exposure:</strong> Avoid direct sun during peak hours (10am-4pm) when UV 
      rays are strongest.
    </li>
  </ul>

  <div class="bg-pink-bright/10 border-l-4 border-pink-bright p-6 my-8">
    <p class="text-white font-medium">
      <strong>Stylist Secret:</strong> Apply your UV protectant to damp hair before heading out. 
      The moisture helps distribute the product evenly and provides a barrier against sun damage.
    </p>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">2. Pre-Swim Hair Care</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    The best defense against chlorine and salt water damage happens before you even get wet. Here's 
    my pre-swim routine that I recommend to every client:
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">The Pre-Swim Ritual</h3>
  
  <div class="space-y-4 mb-8">
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</span>
      <div>
        <h4 class="text-white font-semibold">Rinse with fresh water</h4>
        <p class="text-gray-300 text-sm">Wet your hair completely before swimming. Saturated hair 
        absorbs less chlorinated or salt water.</p>
      </div>
    </div>
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</span>
      <div>
        <h4 class="text-white font-semibold">Apply a protective layer</h4>
        <p class="text-gray-300 text-sm">Coat damp hair with conditioner or hair oil. This creates 
        a barrier that prevents chlorine and salt from penetrating.</p>
      </div>
    </div>
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</span>
      <div>
        <h4 class="text-white font-semibold">Put it up</h4>
        <p class="text-gray-300 text-sm">Tie hair in a bun or braid. This limits the surface area 
        exposed to water and prevents tangling.</p>
      </div>
    </div>
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">4</span>
      <div>
        <h4 class="text-white font-semibold">Wear a swim cap (optional but recommended)</h4>
        <p class="text-gray-300 text-sm">For serious swimmers, a silicone swim cap provides the 
        best protection, especially for color-treated hair.</p>
      </div>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">3. Post-Swim Recovery</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    What you do after swimming is just as important as before. Chlorine and salt left on hair 
    continue to cause damage long after you're out of the water.
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Immediate Post-Swim Steps</h3>
  
  <ul class="text-gray-300 space-y-3 mb-6">
    <li><strong>Rinse immediately:</strong> Fresh water removes most chlorine and salt before it can bind to hair.</li>
    <li><strong>Clarify once a week:</strong> Use a clarifying shampoo weekly to remove mineral buildup. I love Chelating shampoos for serious swimmers.</li>
    <li><strong>Deep condition:</strong> Follow every swim with a deep conditioning treatment to restore lost moisture.</li>
    <li><strong>For blondes:</strong> If you notice a green tint, use a tomato juice rinse or purple shampoo to neutralize it.</li>
  </ul>

  <div class="my-8">
    <h4 class="text-white font-semibold mb-4">Recommended Recovery Products</h4>
    <div class="grid md:grid-cols-2 gap-6">
      {#if moroccanoil}
        <ProductCard product={moroccanoil} />
      {/if}
      {#if silkPillowcase}
        <ProductCard product={silkPillowcase} />
      {/if}
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">4. Fight the Frizz</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    Summer humidity is the enemy of smooth styles. When humidity is high, hair absorbs moisture 
    from the air, causing the cuticle to swell and frizz to form. Here's how to maintain smooth 
    hair even in 90% humidity:
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Anti-Humidity Strategies</h3>
  
  <div class="space-y-4 mb-8">
    <div class="bg-black-soft/30 p-4 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">Seal the Cuticle</h4>
      <p class="text-gray-300 text-sm">
        Use products that smooth and seal the cuticle. Look for ingredients like silicones, oils, 
        and polymers that create a barrier against moisture.
      </p>
    </div>
    <div class="bg-black-soft/30 p-4 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">Cool Water Rinse</h4>
      <p class="text-gray-300 text-sm">
        Finish every shower with a cool water rinse. This closes the cuticle, making it harder 
        for humidity to penetrate.
      </p>
    </div>
    <div class="bg-black-soft/30 p-4 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">Serums and Oils</h4>
      <p class="text-gray-300 text-sm">
        Apply a lightweight serum or oil to damp hair before styling. I recommend argan or 
        jojoba oil – they're light but effective.
      </p>
    </div>
    <div class="bg-black-soft/30 p-4 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">Smoothing Treatments</h4>
      <p class="text-gray-300 text-sm">
        Consider a professional keratin treatment before summer starts. It seals the cuticle 
        and makes hair significantly more humidity-resistant.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">5. Adjust Your Washing Routine</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    Summer heat means more sweat, but that doesn't mean you should wash more often. Over-washing 
    strips natural oils that protect hair from summer damage.
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Smart Summer Washing</h3>
  
  <ul class="text-gray-300 space-y-3 mb-8">
    <li>
      <strong>Extend time between washes:</strong> Aim for 2-3 days between shampoos. Use dry 
      shampoo on off days.
    </li>
    <li>
      <strong>Use cooler water:</strong> Hot water opens the cuticle and increases frizz. 
      Lukewarm water is gentler.
    </li>
    <li>
      <strong>Sulfate-free is key:</strong> Sulfates strip color and moisture. Switch to 
      gentler formulas in summer.
    </li>
    <li>
      <strong>Co-wash option:</strong> Use conditioner-only washing on days when hair isn't 
      heavily soiled.
    </li>
    <li>
      <strong>Clarify weekly:</strong> Remove product and mineral buildup with a weekly 
      clarifying treatment.
    </li>
  </ul>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">6. Protect Your Color</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    Color fades 3x faster in summer. UV rays break down color molecules, while chlorine and salt 
    strip artificial pigment. If you've invested in salon color, protect that investment:
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Color-Saving Summer Tips</h3>
  
  <div class="grid md:grid-cols-2 gap-6 mb-8">
    <div>
      <h4 class="text-pink-bright font-semibold mb-2">For Blondes</h4>
      <ul class="text-gray-300 text-sm space-y-1">
        <li>• Use purple shampoo weekly</li>
        <li>• Apply UV protectant daily</li>
        <li>• Rinse hair after EVERY swim</li>
        <li>• Consider a gloss treatment mid-summer</li>
        <li>• Avoid clear coats with alcohol</li>
      </ul>
    </div>
    <div>
      <h4 class="text-pink-bright font-semibold mb-2">For Brunettes</h4>
      <ul class="text-gray-300 text-sm space-y-1">
        <li>• Use color-depositing conditioner</li>
        <li>• Blue shampoo prevents brassiness</li>
        <li>• Oil treatments maintain richness</li>
        <li>• Avoid excessive sun exposure</li>
        <li>• Refresh balayage with gloss</li>
      </ul>
    </div>
  </div>

  <div class="bg-pink-bright/10 border-l-4 border-pink-bright p-6 my-8">
    <p class="text-white font-medium">
      <strong>Booking Tip:</strong> Schedule a gloss treatment halfway through summer to refresh 
      your color's vibrancy and add shine. It's more affordable than a full color service and 
      makes a huge difference.
    </p>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">7. Weekly Deep Conditioning</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    Summer stress demands extra moisture. I recommend upgrading from occasional deep conditioning 
    to weekly treatments during summer months.
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">The Summer Conditioning Protocol</h3>
  
  <div class="bg-black-soft/30 p-6 rounded-lg mb-8">
    <ol class="text-gray-300 space-y-3">
      <li>
        <strong>Week 1-2:</strong> Hydrating mask focus – restore moisture lost to sun and heat.
      </li>
      <li>
        <strong>Week 3-4:</strong> Protein treatment – rebuild structure weakened by UV exposure.
      </li>
      <li>
        <strong>Week 5-6:</strong> Bond repair – use Olaplex or similar to mend broken bonds.
      </li>
      <li>
        <strong>Week 7-8:</strong> Clarifying + deep moisture – remove buildup and rehydrate.
      </li>
    </ol>
  </div>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">DIY Summer Hair Mask</h3>
  
  <div class="bg-black-soft/30 p-6 rounded-lg mb-8">
    <h4 class="text-pink-bright font-semibold mb-3">Coconut & Honey Hydration Mask</h4>
    <ul class="text-gray-300 text-sm space-y-2">
      <li>• 2 tablespoons coconut oil (melted)</li>
      <li>• 1 tablespoon raw honey</li>
      <li>• 1 tablespoon plain yogurt</li>
    </ul>
    <p class="text-gray-300 text-sm mt-4">
      Mix and apply to damp hair. Leave for 30 minutes, then shampoo and condition as normal. 
      Use weekly for soft, hydrated summer hair.
    </p>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">8. Summer Styling Do's and Don'ts</h2>

  <div class="grid md:grid-cols-2 gap-6 my-8">
    <div class="bg-green-900/30 p-6 rounded-lg border border-green-500/30">
      <h3 class="text-green-400 font-semibold mb-4 flex items-center">
        <span class="text-xl mr-2">✓</span> Do's
      </h3>
      <ul class="text-gray-300 text-sm space-y-2">
        <li>• Embrace air-drying and natural texture</li>
        <li>• Use heat protectant if heat styling</li>
        <li>• Opt for loose braids and buns</li>
        <li>• Apply leave-in conditioner daily</li>
        <li>• Sleep on silk or satin pillowcases</li>
        <li>• Trim ends before summer starts</li>
        <li>• Stay hydrated – healthy hair starts within</li>
      </ul>
    </div>
    <div class="bg-red-900/30 p-6 rounded-lg border border-red-500/30">
      <h3 class="text-red-400 font-semibold mb-4 flex items-center">
        <span class="text-xl mr-2">✗</span> Don'ts
      </h3>
      <ul class="text-gray-300 text-sm space-y-2">
        <li>• Don't use hot tools on high heat</li>
        <li>• Don't skip heat protectant</li>
        <li>• Don't go to bed with wet hair</li>
        <li>• Don't over-wash (even if sweating)</li>
        <li>• Don't skip UV protection</li>
        <li>• Don't swim with hair down</li>
        <li>• Don't use harsh clarifying shampoos daily</li>
      </ul>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">9. Post-Summer Recovery Plan</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    When summer ends, your hair needs rehabilitation. Here's my professional recovery protocol:
  </p>

  <div class="space-y-4 mb-8">
    <div class="flex items-start bg-black-soft/30 p-4 rounded-lg">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</span>
      <div>
        <h4 class="text-white font-semibold">Schedule a trim</h4>
        <p class="text-gray-300 text-sm">Remove ½ to 1 inch of damaged ends. This prevents splits from traveling up the hair shaft.</p>
      </div>
    </div>
    <div class="flex items-start bg-black-soft/30 p-4 rounded-lg">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</span>
      <div>
        <h4 class="text-white font-semibold">Book a gloss treatment</h4>
        <p class="text-gray-300 text-sm">Refresh faded color and add shine. More affordable than full color and incredibly effective.</p>
      </div>
    </div>
    <div class="flex items-start bg-black-soft/30 p-4 rounded-lg">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</span>
      <div>
        <h4 class="text-white font-semibold">Invest in bond repair</h4>
        <p class="text-gray-300 text-sm">Use Olaplex No. 3 weekly for a month to rebuild broken bonds from sun damage.</p>
      </div>
    </div>
    <div class="flex items-start bg-black-soft/30 p-4 rounded-lg">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">4</span>
      <div>
        <h4 class="text-white font-semibold">Deep condition twice weekly</h4>
        <p class="text-gray-300 text-sm">Restore lost moisture with intensive treatments. Alternate between protein and moisture masks.</p>
      </div>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Summer Hair Care Checklist</h2>

  <div class="bg-black-soft/30 p-6 rounded-lg">
    <p class="text-gray-300 mb-4">Save this checklist for your summer prep:</p>
    <ul class="grid md:grid-cols-2 gap-3 text-gray-300 text-sm">
      <li class="flex items-center"><span class="text-pink-bright mr-2">☐</span> UV protectant spray</li>
      <li class="flex items-center"><span class="text-pink-bright mr-2">☐</span> Wide-brimmed hat</li>
      <li class="flex items-center"><span class="text-pink-bright mr-2">☐</span> Leave-in conditioner</li>
      <li class="flex items-center"><span class="text-pink-bright mr-2">☐</span> Hair oil/serum</li>
      <li class="flex items-center"><span class="text-pink-bright mr-2">☐</span> Clarifying shampoo</li>
      <li class="flex items-center"><span class="text-pink-bright mr-2">☐</span> Deep conditioning mask</li>
      <li class="flex items-center"><span class="text-pink-bright mr-2">☐</span> Silk/satin pillowcase</li>
      <li class="flex items-center"><span class="text-pink-bright mr-2">☐</span> Swim cap (for pool)</li>
      <li class="flex items-center"><span class="text-pink-bright mr-2">☐</span> Color-protecting products</li>
      <li class="flex items-center"><span class="text-pink-bright mr-2">☐</span> Hydrating shampoo</li>
    </ul>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">The Bottom Line</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    Summer doesn't have to mean damaged hair. With the right protection and care routine, you can 
    enjoy all the season has to offer while maintaining healthy, beautiful hair. The key is being 
    proactive – protect before damage occurs rather than trying to repair it after.
  </p>

  <p class="text-gray-300 leading-relaxed mb-6">
    If your hair has already suffered summer damage, don't panic. Most damage is repairable with 
    professional treatments and consistent at-home care. Book a consultation at Hairven, and I'll 
    create a personalized recovery plan for your hair.
  </p>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Frequently Asked Questions</h2>

  <div class="space-y-6 mt-8">
    <div>
      <h4 class="text-white font-semibold mb-2">How often should I wash my hair in summer?</h4>
      <p class="text-gray-300 text-sm">
        Stick to 2-3 times per week, even if you're sweating more. Over-washing strips protective oils. 
        Use dry shampoo between washes and rinse with water after swimming.
      </p>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-2">What's the best way to get chlorine green out of blonde hair?</h4>
      <p class="text-gray-300 text-sm">
        Use a clarifying or chelating shampoo immediately after swimming. For stubborn green, try a 
        tomato juice rinse (the acidity neutralizes the green) or a professional color correction.
      </p>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-2">Can I use regular sunscreen on my hair?</h4>
      <p class="text-gray-300 text-sm">
        It's not ideal – regular sunscreen can weigh hair down and make it greasy. Use products 
        specifically formulated for hair with UV filters.
      </p>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-2">Should I get a keratin treatment before summer?</h4>
      <p class="text-gray-300 text-sm">
        Yes! A keratin treatment before summer seals the cuticle, making hair more resistant to 
        humidity and UV damage. It's one of the best pre-summer investments you can make.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Related Articles</h2>
  <ul class="text-gray-300 space-y-2">
    <li>→ <a href="/blog/keratin-treatment-guide" class="text-pink-bright hover:underline">Complete Keratin Treatment Guide</a></li>
    <li>→ <a href="/blog/best-products-damaged-hair" class="text-pink-bright hover:underline">Best Products for Damaged Hair</a></li>
    <li>→ <a href="/blog/balayage-vs-highlights" class="text-pink-bright hover:underline">Balayage vs Highlights: Which to Choose</a></li>
  </ul>
</div>
