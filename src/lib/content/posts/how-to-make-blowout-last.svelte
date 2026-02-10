<script>
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { amazonProducts } from '$lib/utils/amazon-products';

  const texturizing = amazonProducts.find(p => p.asin === 'B007PS9NXY');
  const dryShampoo = amazonProducts.find(p => p.asin === 'B00ILBHEB2'); // Ouai
  const silkPillowcase = amazonProducts.find(p => p.asin === 'B01N2ALN52');
  const scrunchies = amazonProducts.find(p => p.asin === 'B07S8YP5NS');
  const hairspray = amazonProducts.find(p => p.asin === 'B000TK9ZYE');
</script>

<div class="prose prose-invert prose-pink max-w-none">
  <p class="text-xl text-gray-300 leading-relaxed mb-8">
    You just spent $50+ on a professional blowout, or 45 minutes perfecting your hair at home. 
    The style is flawless – smooth, bouncy, full of volume. Fast forward to day two: flat, greasy, 
    slept-on. Sound familiar? As a stylist who gives dozens of blowouts weekly, I'm sharing the 
    secrets to making that perfect style last 5-7 days.
  </p>

  <div class="bg-gradient-to-r from-pink-bright/20 to-purple-500/20 p-6 rounded-lg my-8">
    <h2 class="text-xl font-display text-white mb-4">What's Possible</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div>
        <p class="text-3xl font-bold text-pink-bright">Day 1</p>
        <p class="text-gray-300 text-sm">Fresh & perfect</p>
      </div>
      <div>
        <p class="text-3xl font-bold text-pink-bright">Day 3</p>
        <p class="text-gray-300 text-sm">Still voluminous</p>
      </div>
      <div>
        <p class="text-3xl font-bold text-pink-bright">Day 5</p>
        <p class="text-gray-300 text-sm">Textured & chic</p>
      </div>
      <div>
        <p class="text-3xl font-bold text-pink-bright">Day 7</p>
        <p class="text-gray-300 text-sm">Time to wash</p>
      </div>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">The Foundation: A Proper Blowout</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    The longevity of your blowout starts with how it's styled. A rushed, improperly executed 
    blowout won't last past day one, no matter what products you use. Here's what professionals 
    do differently:
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Professional Blowout Technique</h3>

  <div class="space-y-4 mb-8">
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</span>
      <div>
        <h4 class="text-white font-semibold">Prep is everything</h4>
        <p class="text-gray-300 text-sm">
          Start with a clarifying shampoo to remove all product buildup. Follow with a lightweight 
          conditioner only on ends. Towel-dry thoroughly – excess water makes blow-drying take twice as long.
        </p>
      </div>
    </div>
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</span>
      <div>
        <h4 class="text-white font-semibold">Apply the right products</h4>
        <p class="text-gray-300 text-sm">
          Heat protectant is non-negotiable. For volume, add a root-lifting mousse. For smoothness, 
          use a lightweight serum on ends only. Too much product = greasy hair by day two.
        </p>
      </div>
    </div>
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</span>
      <div>
        <h4 class="text-white font-semibold">Rough dry first</h4>
        <p class="text-gray-300 text-sm">
          Blast hair with medium heat until 70% dry. This sets the foundation and saves time during 
          the styling phase.
        </p>
      </div>
    </div>
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">4</span>
      <div>
        <h4 class="text-white font-semibold">Section and style</h4>
        <p class="text-gray-300 text-sm">
          Work in small sections (2-3 inches). Use a round brush, directing roots upward for volume 
          and pulling ends under for smoothness. The tension is key – it locks in the style.
        </p>
      </div>
    </div>
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">5</span>
      <div>
        <h4 class="text-white font-semibold">The cool shot</h4>
        <p class="text-gray-300 text-sm">
          This is crucial: hit each section with cool air for 5-10 seconds before moving to the next. 
          Cool air sets the style and seals the cuticle, giving you that salon finish that lasts.
        </p>
      </div>
    </div>
    <div class="flex items-start">
      <span class="bg-pink-bright text-black font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">6</span>
      <div>
        <h4 class="text-white font-semibold">Set with product</h4>
        <p class="text-gray-300 text-sm">
          Finish with a lightweight hairspray (hold arms-length away) and a serum or oil on ends 
          for shine and frizz control.
        </p>
      </div>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Day 1: The Golden Hour</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    The first 24 hours are critical. What you do (and don't do) on day one sets the stage for 
    the entire week.
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Day 1 Do's</h3>
  <ul class="text-gray-300 space-y-2 mb-6">
    <li>✓ <strong>Let it cool completely</strong> – Don't touch, clip, or pin hair for at least 2 hours after styling</li>
    <li>✓ <strong>Avoid touching</strong> – The oils from your hands transfer to hair and cause grease</li>
    <li>✓ <strong>Sleep on silk</strong> – A silk pillowcase reduces friction that causes frizz and flattening</li>
    <li>✓ <strong>Use minimal product</strong> – One light mist of hairspray is enough; over-producting leads to buildup</li>
    <li>✓ <strong>Pineapple for bed</strong> – Gather hair loosely at the crown with a silk scrunchie</li>
  </ul>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Day 1 Don'ts</h3>
  <ul class="text-gray-300 space-y-2 mb-8">
    <li>✗ Don't use dry shampoo yet (save it for day 2+)</li>
    <li>✗ Don't wear tight ponytails or hats</li>
    <li>✗ Don't work out intensely (sweat is the enemy of blowouts)</li>
    <li>✗ Don't get caught in the rain</li>
    <li>✗ Don't play with your hair out of habit</li>
  </ul>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Days 2-3: Maintaining Volume</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    As natural oils start to accumulate at the roots, volume at the crown often deflates first. 
    Here's how to revive it:
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">The Morning Revival Routine</h3>

  <div class="space-y-4 mb-8">
    <div class="bg-black-soft/30 p-4 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">Step 1: Dry Shampoo at the Roots</h4>
      <p class="text-gray-300 text-sm">
        Apply dry shampoo to roots BEFORE you need it – ideally the night before. Spray 6-8 inches 
        from scalp, focusing on crown and hairline. Massage in with fingertips and let sit for 2 
        minutes before brushing through.
      </p>
    </div>
    <div class="bg-black-soft/30 p-4 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">Step 2: Re-volumize</h4>
      <p class="text-gray-300 text-sm">
        Flip your head upside down and massage roots vigorously for 30 seconds. Flip back up and 
        use a large round brush to smooth the top layer while maintaining volume underneath.
      </p>
    </div>
    <div class="bg-black-soft/30 p-4 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">Step 3: Touch Up with Heat</h4>
      <p class="text-gray-300 text-sm">
        Use a curling iron (1-1.25 inch) to refresh any fallen sections. Curl away from the face 
        for a modern look. Don't curl the ends – keep them straight for that "lived-in" vibe.
      </p>
    </div>
  </div>

  <div class="my-8">
    <h4 class="text-white font-semibold mb-4">Recommended Dry Shampoo</h4>
    {#if dryShampoo}
      <ProductCard product={dryShampoo} />
    {/if}
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Days 4-5: Embracing Texture</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    By day 4, your blowout has evolved. It's no longer about smooth perfection – it's about 
    embracing the natural texture that comes with a few days of wear. This is when styled texture 
    looks best.
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Style Transformations</h3>

  <div class="grid md:grid-cols-2 gap-6 mb-8">
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">Day 4: Textured Waves</h4>
      <p class="text-gray-300 text-sm mb-3">
        Add dry texturizing spray throughout, then use a curling wand to create loose, beachy waves. 
        The natural oils actually help the waves hold better.
      </p>
      <p class="text-gray-400 text-xs">Style time: 10 minutes</p>
    </div>
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">Day 5: Sleek Low Pony</h4>
      <p class="text-gray-300 text-sm mb-3">
        The accumulated oils make hair easier to smooth. Create a sleek low pony or bun using the 
        natural texture to your advantage.
      </p>
      <p class="text-gray-400 text-xs">Style time: 5 minutes</p>
    </div>
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">Day 5: Braided Crown</h4>
      <p class="text-gray-300 text-sm mb-3">
        Dirty hair braids beautifully. Create two braids on each side and pin them across the crown 
        for a boho-chic look.
      </p>
      <p class="text-gray-400 text-xs">Style time: 15 minutes</p>
    </div>
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">Day 5: Half-Up Top Knot</h4>
      <p class="text-gray-300 text-sm mb-3">
        Gather the top section into a messy top knot, leaving the rest down. The contrast between 
        polished top and textured bottom is effortlessly chic.
      </p>
      <p class="text-gray-400 text-xs">Style time: 3 minutes</p>
    </div>
  </div>

  <div class="my-8">
    <h4 class="text-white font-semibold mb-4">Essential for Textured Styles</h4>
    {#if texturizing}
      <ProductCard product={texturizing} />
    {/if}
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Days 6-7: The Home Stretch</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    You're almost there! By day 6-7, your hair has significant oil buildup. It's time for strategic 
    styling that works with, not against, the natural texture.
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Best Styles for Oily Hair</h3>
  
  <ul class="text-gray-300 space-y-3 mb-8">
    <li>
      <strong>Sleek Bun:</strong> Use the natural oils to create a smooth, polished ballerina bun. 
      The oil actually helps flyaways stay put.
    </li>
    <li>
      <strong>French Twist:</strong> Classic and sophisticated. The oils help the style stay secure 
      without pins slipping.
    </li>
    <li>
      <strong>Fishtail Braid:</strong> Textured braids look better with some "grit" in the hair. 
      Spray with texturizing spray before braiding.
    </li>
    <li>
      <strong>Milkmaid Braids:</strong> Two Dutch braids pinned across the top. Hide greasy roots 
      while looking intentionally styled.
    </li>
  </ul>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">The Products That Make It Possible</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    Here are the must-have products in my blowout-extending arsenal:
  </p>

  <div class="grid md:grid-cols-2 gap-6 mb-8">
    {#if dryShampoo}
      <ProductCard product={dryShampoo} />
    {/if}
    {#if texturizing}
      <ProductCard product={texturizing} />
    {/if}
    {#if hairspray}
      <ProductCard product={hairspray} />
    {/if}
    {#if silkPillowcase}
      <ProductCard product={silkPillowcase} />
    {/if}
  </div>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Complete Product Lineup</h3>

  <div class="overflow-x-auto my-8">
    <table class="w-full text-left border-collapse text-sm">
      <thead>
        <tr class="border-b-2 border-pink-bright/50">
          <th class="py-4 px-4 text-white font-semibold">Product Type</th>
          <th class="py-4 px-4 text-pink-bright font-semibold">Best For</th>
          <th class="py-4 px-4 text-pink-bright font-semibold">When to Use</th>
        </tr>
      </thead>
      <tbody class="text-gray-300">
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4">Dry Shampoo</td>
          <td class="py-3 px-4">Absorbing oil, adding volume</td>
          <td class="py-3 px-4">Days 2-7, mornings</td>
        </tr>
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4">Texturizing Spray</td>
          <td class="py-3 px-4">Adding grit, refreshing style</td>
          <td class="py-3 px-4">Days 4-7</td>
        </tr>
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4">Lightweight Hairspray</td>
          <td class="py-3 px-4">Setting style, fighting humidity</td>
          <td class="py-3 px-4">Day 1, touch-ups</td>
        </tr>
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4">Serum/Oil</td>
          <td class="py-3 px-4">Smoothing ends, adding shine</td>
          <td class="py-3 px-4">Days 3-7</td>
        </tr>
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4">Silk Accessories</td>
          <td class="py-3 px-4">Preventing damage while sleeping</td>
          <td class="py-3 px-4">Every night</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Sleep Strategies: Protect Your Style Overnight</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    How you sleep has the biggest impact on blowout longevity. Here's my night routine:
  </p>

  <div class="space-y-4 mb-8">
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">The Pineapple Method</h4>
      <p class="text-gray-300 text-sm">
        Gather hair loosely at the crown of your head using a silk scrunchie. This keeps volume 
        at the roots and prevents the back of your head from flattening. Sleep on a silk pillowcase 
        for extra protection.
      </p>
    </div>
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">The Wrap Method</h4>
      <p class="text-gray-300 text-sm">
        For straighter styles, wrap hair around your head (like a beehive) and secure with large 
        pins. Cover with a silk scarf or bonnet. This maintains smoothness and prevents tangling.
      </p>
    </div>
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">Silk Is Non-Negotiable</h4>
      <p class="text-gray-300 text-sm">
        Cotton pillowcases create friction that causes frizz and absorbs natural oils (and your 
        hair products). Silk allows hair to glide smoothly and maintains moisture balance.
      </p>
    </div>
  </div>

  <div class="my-8">
    <h4 class="text-white font-semibold mb-4">Essential Sleep Accessories</h4>
    <div class="grid md:grid-cols-2 gap-6">
      {#if silkPillowcase}
        <ProductCard product={silkPillowcase} />
      {/if}
      {#if scrunchies}
        <ProductCard product={scrunchies} />
      {/if}
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Lifestyle Tips for Maximum Longevity</h2>

  <div class="grid md:grid-cols-2 gap-6 mb-8">
    <div class="bg-green-900/30 p-6 rounded-lg border border-green-500/30">
      <h3 class="text-green-400 font-semibold mb-4">Do This</h3>
      <ul class="text-gray-300 text-sm space-y-2">
        <li>• Shower with a cap (don't get hair wet)</li>
        <li>• Use a shower cap when bathing</li>
        <li>• Apply dry shampoo before bed</li>
        <li>• Keep hands off your hair</li>
        <li>• Use a boar bristle brush daily</li>
        <li>• Embrace styles that work with texture</li>
        <li>• Carry a mini dry shampoo for touch-ups</li>
      </ul>
    </div>
    <div class="bg-red-900/30 p-6 rounded-lg border border-red-500/30">
      <h3 class="text-red-400 font-semibold mb-4">Avoid This</h3>
      <ul class="text-gray-300 text-sm space-y-2">
        <li>• High-intensity workouts (causes scalp sweat)</li>
        <li>• Touching your hair frequently</li>
        <li>• Wearing tight hats or headbands</li>
        <li>• Getting caught in rain or humidity</li>
        <li>• Using too much product</li>
        <li>• Sleeping on cotton pillowcases</li>
        <li>• Brushing when hair is damp from humidity</li>
      </ul>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Quick Fixes for Common Blowout Problems</h2>

  <div class="space-y-4 mb-8">
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h4 class="text-white font-semibold mb-2">Problem: Flat Crown</h4>
      <p class="text-gray-300 text-sm">
        <strong>Fix:</strong> Section out the top layer. Backcomb (tease) the under layers at the 
        crown with a fine-tooth comb. Smooth the top layer over. Set with hairspray.
      </p>
    </div>
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h4 class="text-white font-semibold mb-2">Problem: Greasy Roots</h4>
      <p class="text-gray-300 text-sm">
        <strong>Fix:</strong> Apply dry shampoo the night before. In the morning, use a blow dryer 
        on cool setting at the roots to reactivate the dry shampoo and add volume.
      </p>
    </div>
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h4 class="text-white font-semibold mb-2">Problem: Frizzy Ends</h4>
      <p class="text-gray-300 text-sm">
        <strong>Fix:</strong> Apply a tiny amount of hair oil or serum to ends only. Use a flat iron 
        on low heat to smooth just the ends.
      </p>
    </div>
    <div class="bg-black-soft/30 p-5 rounded-lg">
      <h4 class="text-white font-semibold mb-2">Problem: Weird Kinks</h4>
      <p class="text-gray-300 text-sm">
        <strong>Fix:</strong> Lightly mist the kinked section with water, then use a round brush and 
        blow dryer to reshape. The key is "lightly" – too much water ruins the dry sections.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">The Bottom Line</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    A week-long blowout is absolutely achievable with the right technique and products. The keys 
    are: starting with a properly executed blowout, using dry shampoo strategically, protecting 
    hair while sleeping, and embracing the natural evolution of the style rather than fighting it.
  </p>

  <p class="text-gray-300 leading-relaxed mb-6">
    Remember: by day 5, you're not maintaining a blowout anymore – you're rocking a textured, 
    lived-in style that has its own beauty. Work with your hair, not against it, and you'll not 
    only extend your style but also reduce heat damage from daily styling.
  </p>

  <div class="bg-pink-bright/10 border-l-4 border-pink-bright p-6 my-8">
    <p class="text-white font-medium">
      <strong>Pro Tip:</strong> The best blowout is one you don't have to do daily. By extending 
      your style, you're actually improving your hair health by reducing heat exposure. Invest in 
      the right products and techniques – your hair will thank you.
    </p>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Frequently Asked Questions</h2>

  <div class="space-y-6 mt-8">
    <div>
      <h4 class="text-white font-semibold mb-2">Can fine hair really last a week?</h4>
      <p class="text-gray-300 text-sm">
        Fine hair can actually last longer because it shows oil less than thick hair. The key is 
        using volumizing products at the roots and not over-conditioning. Dry shampoo is your best friend.
      </p>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-2">What if I work out every day?</h4>
      <p class="text-gray-300 text-sm">
        Try low-impact workouts that don't cause excessive sweating (yoga, pilates). If you do sweat, 
        dry your hairline with a towel immediately and use dry shampoo at the roots. You may need to 
        wash every 4-5 days instead of 7.
      </p>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-2">Does hair type affect how long a blowout lasts?</h4>
      <p class="text-gray-300 text-sm">
        Yes! Straight hair tends to get oily faster but holds smoothness longer. Curly and textured 
        hair can go longer between washes but may lose the straight style faster. Adjust your routine 
        to your natural texture.
      </p>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-2">Is it bad to go a week without washing hair?</h4>
      <p class="text-gray-300 text-sm">
        Not at all! The scalp naturally regulates oil production. Washing too frequently can actually 
        cause the scalp to produce more oil. Many hair experts recommend washing 1-2 times per week 
        for optimal hair health.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Related Articles</h2>
  <ul class="text-gray-300 space-y-2">
    <li>→ <a href="/blog/best-hair-dryers-2025" class="text-pink-bright hover:underline">Best Hair Dryers 2025: The Foundation of a Great Blowout</a></li>
    <li>→ <a href="/blog/dyson-vs-ghd-vs-revlon" class="text-pink-bright hover:underline">Dyson vs ghd vs Revlon: Which Tool Is Best?</a></li>
    <li>→ <a href="/blog/summer-hair-care-tips" class="text-pink-bright hover:underline">Summer Hair Care: Protecting Your Style</a></li>
  </ul>
</div>
