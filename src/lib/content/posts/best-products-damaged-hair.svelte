<script>
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { getProductsByCategory, getBestSellers, amazonProducts } from '$lib/utils/amazon-products';

  // Get specific products for damaged hair
  const olaplex3 = amazonProducts.find(p => p.asin === 'B00SNM5SJO');
  const olaplex6 = amazonProducts.find(p => p.asin === 'B07VR1SHVS');
  const olaplex7 = amazonProducts.find(p => p.asin === 'B07VR25S72');
  const olaplex8 = amazonProducts.find(p => p.asin === 'B08X71BYHM');
  const briogeo = amazonProducts.find(p => p.asin === 'B01EK9F6RI');
  const itsA10 = amazonProducts.find(p => p.asin === 'B000ZLVUYO');
  const redken = amazonProducts.find(p => p.asin === 'B0037LG3XS');
  const kerastase = amazonProducts.find(p => p.asin === 'B07D2LY7GD');
  const amika = amazonProducts.find(p => p.asin === 'B07C8GVM1B');
  const moroccanoil = amazonProducts.find(p => p.asin === 'B00BEUWX9Y');
</script>

<div class="prose prose-invert prose-pink max-w-none">
  <p class="text-xl text-gray-300 leading-relaxed mb-8">
    Damaged hair isn't just a cosmetic issue – it's a cry for help from hair that has lost its 
    structural integrity. Whether from heat styling, chemical processing, or environmental stress, 
    damaged hair needs the right ingredients to rebuild, strengthen, and heal. After treating 
    thousands of damaged heads of hair, I can tell you: the products you choose matter more than 
    you think.
  </p>

  <div class="bg-gradient-to-r from-red-900/30 to-pink-900/30 p-6 rounded-lg my-8 border border-red-500/20">
    <h2 class="text-xl font-display text-white mb-4">Signs Your Hair Is Damaged</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <ul class="text-gray-300 text-sm space-y-2">
        <li>• Split ends and breakage</li>
        <li>• Tangles easily, even when wet</li>
        <li>• Dull, lacking shine</li>
        <li>• Feels rough or straw-like</li>
      </ul>
      <ul class="text-gray-300 text-sm space-y-2">
        <li>• Frizz that won't smooth out</li>
        <li>• Loss of elasticity (doesn't stretch)</li>
        <li>• Color fades quickly</li>
        <li>• Takes longer to dry</li>
      </ul>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Understanding Hair Damage</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    Before we dive into products, you need to understand what you're treating. Hair damage happens 
    at the molecular level when the protective cuticle is lifted or broken, exposing the cortex. 
    There are three main types:
  </p>

  <div class="grid md:grid-cols-3 gap-6 my-8">
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h3 class="text-red-400 font-semibold mb-2">Heat Damage</h3>
      <p class="text-gray-300 text-sm">
        High temperatures break hydrogen bonds and denature keratin. Caused by flat irons, 
        curling irons, and blow dryers used incorrectly.
      </p>
    </div>
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h3 class="text-yellow-400 font-semibold mb-2">Chemical Damage</h3>
      <p class="text-gray-300 text-sm">
        Color, bleach, perms, and relaxers break disulfide bonds. This is the most severe type 
        of damage and requires bond repair.
      </p>
    </div>
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h3 class="text-blue-400 font-semibold mb-2">Mechanical Damage</h3>
      <p class="text-gray-300 text-sm">
        Rough handling, tight elastics, and brushing wet hair cause breakage and split ends. 
        Often seen in long hair.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">The Gold Standard: Olaplex</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    If you take one thing from this article: <strong>buy Olaplex</strong>. No other product line 
    has revolutionized hair repair like Olaplex. Their patented bond-building technology actually 
    repairs broken disulfide bonds – the bonds that give hair its strength and structure.
  </p>

  <p class="text-gray-300 leading-relaxed mb-6">
    Here's my professional breakdown of each Olaplex product and how to use them:
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Olaplex No. 3 Hair Perfector</h3>
  <p class="text-gray-300 leading-relaxed mb-4">
    The at-home treatment that started it all. No. 3 is NOT a conditioner – it's a bond builder. 
    Use it once a week on damp hair, leave for 10 minutes (or longer for severely damaged hair), 
    then shampoo and condition. For badly damaged hair, I recommend sleeping in it overnight.
  </p>
  
  <div class="my-6">
    {#if olaplex3}
      <ProductCard product={olaplex3} featured={true} />
    {/if}
  </div>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Olaplex No. 6 Bond Smoother</h3>
  <p class="text-gray-300 leading-relaxed mb-4">
    A leave-in reparative styling cream that eliminates frizz for up to 72 hours while continuing 
    to repair bonds. Apply a small amount to damp hair before styling. It also speeds up blow-dry 
    time and provides heat protection.
  </p>
  
  <div class="my-6">
    {#if olaplex6}
      <ProductCard product={olaplex6} />
    {/if}
  </div>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Olaplex No. 7 Bonding Oil</h3>
  <p class="text-gray-300 leading-relaxed mb-4">
    A weightless reparative styling oil with heat protection up to 450°F. Use it as a heat 
    protectant, frizz fighter, and shine enhancer. Just a few drops goes a long way – it's highly 
    concentrated.
  </p>
  
  <div class="my-6">
    {#if olaplex7}
      <ProductCard product={olaplex7} />
    {/if}
  </div>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Olaplex No. 8 Bond Intense Moisture Mask</h3>
  <p class="text-gray-300 leading-relaxed mb-4">
    The newest addition – a multi-benefit repair mask that adds 2x more shine and 4x more moisture 
    while repairing bonds. Use 1-2 times per week in place of your regular conditioner.
  </p>
  
  <div class="my-6">
    {#if olaplex8}
      <ProductCard product={olaplex8} />
    {/if}
  </div>

  <div class="bg-pink-bright/10 border-l-4 border-pink-bright p-6 my-8">
    <h4 class="text-white font-semibold mb-2">My Olaplex Protocol for Damaged Hair</h4>
    <ol class="text-gray-300 text-sm space-y-2 mt-3">
      <li>1. <strong>Weekly:</strong> Olaplex No. 3 (apply to damp hair, leave 10+ min, then wash)</li>
      <li>2. <strong>Daily (damp hair):</strong> Olaplex No. 6 (dime-sized amount, focus on ends)</li>
      <li>3. <strong>Before heat styling:</strong> Olaplex No. 7 (3-4 drops, distribute evenly)</li>
      <li>4. <strong>Bi-weekly:</strong> Olaplex No. 8 (deep moisture treatment)</li>
    </ol>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Best Deep Conditioning Masks</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    While Olaplex repairs bonds, you also need intense moisture to restore softness and manageability. 
    Here are the masks I recommend most:
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Briogeo Don't Despair, Repair!</h3>
  <p class="text-gray-300 leading-relaxed mb-4">
    An Allure Best of Beauty winner that delivers visible results in one use. The formula combines 
    rosehip oil, argan oil, and algae extract to restore hydration, repair damage, and enhance shine. 
    It's 95% naturally-derived, silicone-free, and safe for color-treated hair.
  </p>
  <p class="text-gray-300 text-sm italic mb-4">
    Clinical results: 81% reduction in breakage after two uses.
  </p>
  
  <div class="my-6">
    {#if briogeo}
      <ProductCard product={briogeo} featured={true} />
    {/if}
  </div>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Kérastase Resistance Masque Therapiste</h3>
  <p class="text-gray-300 leading-relaxed mb-4">
    For severely damaged, over-processed hair, this is my luxury pick. The Fibra-Kap™ technology 
    compensates for missing keratin, while resurrection plant sap restores the hair fiber. It's 
    expensive, but for hair on the verge of breaking, it's worth every penny.
  </p>
  
  <div class="my-6">
    {#if kerastase}
      <ProductCard product={kerastase} />
    {/if}
  </div>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Redken All Soft Heavy Cream</h3>
  <p class="text-gray-300 leading-relaxed mb-4">
    A salon classic that's been repairing dry, brittle hair for decades. Enriched with argan oil, 
    it provides intense softness and manageability. At around $22, it's one of the best values 
    in professional hair care.
  </p>
  
  <div class="my-6">
    {#if redken}
      <ProductCard product={redken} />
    {/if}
  </div>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Amika Soulfood Nourishing Mask</h3>
  <p class="text-gray-300 leading-relaxed mb-4">
    Rich in jojoba oil and sea buckthorn, this mask delivers intense hydration without weighing 
    hair down. It's safe for all hair types, color-safe, and has the most addictive scent. Vegan 
    and cruelty-free for the conscious consumer.
  </p>
  
  <div class="my-6">
    {#if amika}
      <ProductCard product={amika} />
    {/if}
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Best Leave-In Treatments</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    Leave-in products provide ongoing protection and repair throughout the day. These are my 
    go-to recommendations:
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">It's a 10 Miracle Leave-In Product</h3>
  <p class="text-gray-300 leading-relaxed mb-4">
    Ten benefits in one spray: repairs, adds shine, detangles, controls frizz, prevents split 
    ends, stops hair breakage, creates silkiness, enhances natural body, acts as a heat protectant, 
    and seals the cuticle. At under $20, it's a staple in every damaged hair routine.
  </p>
  
  <div class="my-6">
    {#if itsA10}
      <ProductCard product={itsA10} featured={true} />
    {/if}
  </div>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Moroccanoil Treatment</h3>
  <p class="text-gray-300 leading-relaxed mb-4">
    The original argan oil treatment that revolutionized hair care. Infused with antioxidant-rich 
    argan oil and shine-boosting vitamins, it conditions, detangles, and speeds up drying time. 
    A little goes a long way – one bottle lasts months.
  </p>
  
  <div class="my-6">
    {#if moroccanoil}
      <ProductCard product={moroccanoil} />
    {/if}
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Products by Damage Type</h2>

  <div class="space-y-6 mb-8">
    <div class="bg-black-soft/30 p-6 rounded-lg">
      <h3 class="text-red-400 font-semibold mb-3">For Heat-Damaged Hair</h3>
      <p class="text-gray-300 text-sm mb-3">
        Focus on protein-based products that rebuild keratin structure.
      </p>
      <ul class="text-gray-300 text-sm space-y-1">
        <li>• <strong>Shampoo:</strong> Redken Extreme (protein reinforcement)</li>
        <li>• <strong>Treatment:</strong> Olaplex No. 3 (bond repair)</li>
        <li>• <strong>Leave-in:</strong> It's a 10 (heat protection + repair)</li>
        <li>• <strong>Oil:</strong> Olaplex No. 7 (heat protection up to 450°F)</li>
      </ul>
    </div>
    
    <div class="bg-black-soft/30 p-6 rounded-lg">
      <h3 class="text-yellow-400 font-semibold mb-3">For Chemically-Damaged Hair</h3>
      <p class="text-gray-300 text-sm mb-3">
        Bleach and color damage requires bond repair and deep moisture.
      </p>
      <ul class="text-gray-300 text-sm space-y-1">
        <li>• <strong>Shampoo:</strong> Olaplex No. 4 (bond maintenance)</li>
        <li>• <strong>Conditioner:</strong> Olaplex No. 5 (bond maintenance)</li>
        <li>• <strong>Weekly:</strong> Olaplex No. 3 + No. 8 combo</li>
        <li>• <strong>Styling:</strong> Olaplex No. 6 (ongoing repair)</li>
      </ul>
    </div>
    
    <div class="bg-black-soft/30 p-6 rounded-lg">
      <h3 class="text-blue-400 font-semibold mb-3">For Mechanically-Damaged Hair</h3>
      <p class="text-gray-300 text-sm mb-3">
        Split ends and breakage need sealing and strengthening.
      </p>
      <ul class="text-gray-300 text-sm space-y-1">
        <li>• <strong>Mask:</strong> Briogeo Don't Despair, Repair!</li>
        <li>• <strong>Leave-in:</strong> It's a 10 (detangling + protection)</li>
        <li>• <strong>Ends:</strong> Moroccanoil Treatment (seals split ends)</li>
        <li>• <strong>Tool:</strong> Wet Brush Original (gentle detangling)</li>
      </ul>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">The 4-Week Hair Recovery Plan</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    If your hair is severely damaged, here's the protocol I use on clients. Follow this for 
    four weeks and you'll see dramatic improvement:
  </p>

  <div class="space-y-4 mb-8">
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</span>
      <div>
        <h4 class="text-white font-semibold">Week 1: Emergency Repair</h4>
        <p class="text-gray-300 text-sm">
          Use Olaplex No. 3 twice this week (leave on overnight). Use a deep conditioning mask 
          after every shampoo. Stop all heat styling.
        </p>
      </div>
    </div>
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</span>
      <div>
        <h4 class="text-white font-semibold">Week 2: Protein Focus</h4>
        <p class="text-gray-300 text-sm">
          Alternate between protein treatments and moisture masks. Introduce Olaplex No. 6 daily. 
          If you must heat style, use No. 7 as protectant on lowest setting.
        </p>
      </div>
    </div>
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</span>
      <div>
        <h4 class="text-white font-semibold">Week 3: Balance & Maintenance</h4>
        <p class="text-gray-300 text-sm">
          Continue Olaplex No. 3 weekly. Use No. 8 mask bi-weekly. You should start seeing 
          significantly less breakage and improved shine.
        </p>
      </div>
    </div>
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">4</span>
      <div>
        <h4 class="text-white font-semibold">Week 4: Evaluation & Trim</h4>
        <p class="text-gray-300 text-sm">
          Schedule a trim to remove split ends that can't be repaired. By now, your hair should 
          feel significantly stronger and look healthier.
        </p>
      </div>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Ingredients to Look For</h2>

  <div class="grid md:grid-cols-2 gap-6 mb-8">
    <div>
      <h3 class="text-green-400 font-semibold mb-3">✓ Good for Damaged Hair</h3>
      <ul class="text-gray-300 text-sm space-y-2">
        <li><strong>Bis-aminopropyl diglycol dimaleate</strong> – Olaplex's bond-building ingredient</li>
        <li><strong>Hydrolyzed keratin/protein</strong> – Rebuilds hair structure</li>
        <li><strong>Argan oil</strong> – Moisture and shine</li>
        <li><strong>Shea butter</strong> – Deep conditioning</li>
        <li><strong>Panthenol (vitamin B5)</strong> – Strengthens and moisturizes</li>
        <li><strong>Amino acids</strong> – Repair and strengthen</li>
        <li><strong>Ceramides</strong> – Restore lipid barrier</li>
      </ul>
    </div>
    <div>
      <h3 class="text-red-400 font-semibold mb-3">✗ Avoid on Damaged Hair</h3>
      <ul class="text-gray-300 text-sm space-y-2">
        <li><strong>Sulfates (SLS/SLES)</strong> – Too stripping</li>
        <li><strong>Alcohol (high on ingredient list)</strong> – Drying</li>
        <li><strong>Formaldehyde-releasing preservatives</strong> – Damaging</li>
        <li><strong>High heat styling</strong> – Causes further damage</li>
        <li><strong>Protein overload</strong> – Can make hair brittle</li>
        <li><strong>Clarifying shampoos</strong> – Use sparingly</li>
        <li><strong>Tight hairstyles</strong> – Causes mechanical damage</li>
      </ul>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Budget vs. Luxury: My Honest Take</h2>

  <div class="overflow-x-auto my-8">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="border-b-2 border-pink-bright/50">
          <th class="py-4 px-4 text-white font-semibold">Category</th>
          <th class="py-4 px-4 text-green-400 font-semibold">Budget Pick</th>
          <th class="py-4 px-4 text-yellow-400 font-semibold">Luxury Pick</th>
        </tr>
      </thead>
      <tbody class="text-gray-300 text-sm">
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4">Bond Repair</td>
          <td class="py-3 px-4">Olaplex No. 3 ($30)</td>
          <td class="py-3 px-4">K18 Leave-in ($75)</td>
        </tr>
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4">Deep Mask</td>
          <td class="py-3 px-4">Redken All Soft ($22)</td>
          <td class="py-3 px-4">Kérastase Therapiste ($64)</td>
        </tr>
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4">Leave-in</td>
          <td class="py-3 px-4">It's a 10 ($18)</td>
          <td class="py-3 px-4">Oribe Supershine ($52)</td>
        </tr>
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4">Hair Oil</td>
          <td class="py-3 px-4">Argan Oil ($10)</td>
          <td class="py-3 px-4">Olaplex No. 7 ($30)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="bg-pink-bright/10 border-l-4 border-pink-bright p-6 my-8">
    <p class="text-white font-medium">
      <strong>My Recommendation:</strong> If budget is tight, invest in Olaplex No. 3 and It's a 10. 
      Those two products alone will make a significant difference. Add other products as your budget 
      allows.
    </p>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">When to See a Professional</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    At-home products can do wonders, but some damage requires professional intervention:
  </p>

  <ul class="text-gray-300 space-y-2 mb-8">
    <li>• <strong>Severely compromised hair</strong> – Breaking when wet, mushy texture</li>
    <li>• <strong>Chemical burns</strong> – Scalp irritation or hair melting</li>
    <li>• <strong>Extreme breakage</strong> – Losing more than 100 strands daily</li>
    <li>• <strong>Elasticity loss</strong> – Hair doesn't stretch and return</li>
    <li>• <strong>Post-color damage</strong> – After DIY bleach or color</li>
  </ul>

  <p class="text-gray-300 leading-relaxed mb-6">
    A professional can provide salon-strength treatments like K18, in-salon Olaplex Stand-Alone 
    treatments, and protein reconstructions that aren't available for home use. Sometimes, a 
    professional trim and treatment is worth more than months of at-home products.
  </p>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">The Bottom Line</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    Damaged hair can be repaired – but it takes the right products and consistency. My professional 
    recommendation for most people is the Olaplex system: No. 3 weekly, No. 6 daily, and No. 7 before 
    heat styling. Add a deep conditioning mask like Briogeo or Kérastase, and be patient. Real repair 
    takes time, but with these products, you'll see and feel the difference.
  </p>

  <p class="text-gray-300 leading-relaxed mb-6">
    Remember: products can repair damage, but they can't replace a good trim. If you have split ends, 
    book a cut first, then start your repair routine. Fresh ends make all the difference.
  </p>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Frequently Asked Questions</h2>

  <div class="space-y-6 mt-8">
    <div>
      <h4 class="text-white font-semibold mb-2">How long does it take to repair damaged hair?</h4>
      <p class="text-gray-300 text-sm">
        With consistent use of quality products, you'll see improvement in 2-4 weeks. Significant 
        repair takes 2-3 months. Severely damaged hair may need 6+ months and professional treatments.
      </p>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-2">Can damaged hair be fully repaired?</h4>
      <p class="text-gray-300 text-sm">
        Disulfide bonds can be rebuilt with Olaplex, and moisture can be restored with conditioning. 
        However, split ends cannot be repaired – they must be trimmed. Think of it as healing a wound 
        versus removing dead tissue.
      </p>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-2">Should I use protein or moisture for damaged hair?</h4>
      <p class="text-gray-300 text-sm">
        Both! Damaged hair needs protein to rebuild structure AND moisture to restore softness. Alternate 
        between protein treatments and deep moisture masks. Too much protein without moisture can make 
        hair brittle.
      </p>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-2">Is Olaplex worth the money?</h4>
      <p class="text-gray-300 text-sm">
        In my professional opinion, absolutely. No other at-home product actually repairs broken bonds. 
        The patented technology is unique and effective. For $30, Olaplex No. 3 is the single best 
        investment you can make for damaged hair.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Related Articles</h2>
  <ul class="text-gray-300 space-y-2">
    <li>→ <a href="/blog/keratin-treatment-guide" class="text-pink-bright hover:underline">Complete Keratin Treatment Guide</a></li>
    <li>→ <a href="/blog/summer-hair-care-tips" class="text-pink-bright hover:underline">Summer Hair Care: Protecting Your Hair</a></li>
    <li>→ <a href="/blog/best-hair-dryers-2025" class="text-pink-bright hover:underline">Best Hair Dryers 2025: Less Damage, Better Results</a></li>
  </ul>
</div>
