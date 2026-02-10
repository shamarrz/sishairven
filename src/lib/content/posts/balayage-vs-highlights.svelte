<script>
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { getProductByAsin } from '$lib/utils/amazon-products';

  const purpleShampoo = getProductByAsin('B003JQJZ5A'); // Using a placeholder or I'll need to add one
  const olaplex = getProductByAsin('B00SNM5SJO');
  const moroccanoil = getProductByAsin('B00BEUWX9Y');
</script>

<div class="prose prose-invert prose-pink max-w-none">
  <p class="text-xl text-gray-300 leading-relaxed mb-8">
    "Should I get balayage or highlights?" It's the question I hear most in my salon chair. Both 
    techniques add dimension and brightness to your hair, but they create very different results. 
    After 15 years as a colorist, I can tell you: choosing the wrong technique for your lifestyle 
    and hair goals is the #1 reason people are unhappy with their color.
  </p>

  <div class="bg-gradient-to-r from-pink-bright/20 to-transparent p-6 rounded-lg my-8">
    <h2 class="text-xl font-display text-white mb-4">Quick Answer</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <h3 class="text-pink-bright font-semibold mb-2">Choose Balayage If:</h3>
        <ul class="text-gray-300 text-sm space-y-1">
          <li>• You want natural, sun-kissed results</li>
          <li>• Low maintenance is important</li>
          <li>• You prefer softer regrowth</li>
          <li>• You like beachy, lived-in looks</li>
        </ul>
      </div>
      <div>
        <h3 class="text-pink-bright font-semibold mb-2">Choose Highlights If:</h3>
        <ul class="text-gray-300 text-sm space-y-1">
          <li>• You want brighter, more dramatic lift</li>
          <li>• You like precise, structured placement</li>
          <li>• You don't mind regular touch-ups</li>
          <li>• You want all-over lightness</li>
        </ul>
      </div>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">What Is Balayage?</h2>
  
  <p class="text-gray-300 leading-relaxed mb-6">
    Balayage is a French word meaning "to sweep." The technique involves hand-painting color onto 
    the hair in a sweeping motion, creating a graduated, natural-looking effect. Unlike traditional 
    highlights that go all the way to the root, balayage typically starts mid-shaft and gets 
    progressively lighter toward the ends.
  </p>

  <p class="text-gray-300 leading-relaxed mb-6">
    I like to describe balayage as "the color your hair would be if you spent the summer at the beach." 
    It's dimensional, sun-kissed, and incredibly natural-looking. The technique was developed in Paris 
    in the 1970s and has become the most requested color service in my salon.
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">How Balayage Works</h3>
  <p class="text-gray-300 leading-relaxed mb-6">
    During a balayage service, I freehand paint sections of hair with lightener, using the natural 
    fall of your hair as a guide. The paint is thicker at the ends and feathered toward the top, 
    creating that signature gradient effect. Each section is then wrapped in cotton or foil to 
    process, depending on how much lift is needed.
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Pros of Balayage</h3>
  <ul class="text-gray-300 space-y-2 mb-6">
    <li>✓ <strong>Low maintenance</strong> – can go 3-6 months between appointments</li>
    <li>✓ <strong>Natural grow-out</strong> – no harsh root line</li>
    <li>✓ <strong>Customizable</strong> – placement tailored to your face shape</li>
    <li>✓ <strong>Dimensional</strong> – creates depth and movement</li>
    <li>✓ <strong>Less damage</strong> – not all hair is lightened</li>
    <li>✓ <strong>Versatile</strong> – works on all hair lengths and colors</li>
  </ul>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Cons of Balayage</h3>
  <ul class="text-gray-300 space-y-2 mb-8">
    <li>✗ Cannot achieve all-over blonde in one session</li>
    <li>✗ More expensive initial service ($200-400+)</li>
    <li>✗ Results depend heavily on colorist skill</li>
    <li>✗ May require multiple sessions for dramatic change</li>
  </ul>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">What Are Highlights?</h2>
  
  <p class="text-gray-300 leading-relaxed mb-6">
    Traditional highlights involve sectioning hair into foils and applying lightener from root to tip. 
    This creates precise, uniform pieces of lightness throughout the hair. Highlights can range from 
    subtle babylights to bold, chunky streaks depending on the size of sections and placement.
  </p>

  <p class="text-gray-300 leading-relaxed mb-6">
    Think of highlights as "structured brightness." They follow a pattern and create predictable, 
    consistent results. When you want that classic "blonde with dimension" look – think Jennifer 
    Aniston or Reese Witherspoon – that's highlights.
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">How Highlights Work</h3>
  <p class="text-gray-300 leading-relaxed mb-6">
    Hair is woven into fine or chunky sections (depending on the desired effect) and placed in 
    foils with lightener. The foil traps heat, allowing for more lift than balayage. Processing 
    time varies based on how light you want to go and your starting color.
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Pros of Highlights</h3>
  <ul class="text-gray-300 space-y-2 mb-6">
    <li>✓ <strong>Maximum lift</strong> – can achieve platinum blonde</li>
    <li>✓ <strong>Precise placement</strong> – predictable results</li>
    <li>✓ <strong>All-over lightness</strong> – brightest possible outcome</li>
    <li>✓ <strong>Faster results</strong> – dramatic change in one session</li>
    <li>✓ <strong>More affordable</strong> – typically $100-250</li>
  </ul>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Cons of Highlights</h3>
  <ul class="text-gray-300 space-y-2 mb-8">
    <li>✗ <strong>High maintenance</strong> – touch-ups every 6-8 weeks</li>
    <li>✗ <strong>Visible roots</strong> – noticeable grow-out line</li>
    <li>✗ <strong>More damage</strong> – lightener closer to scalp</li>
    <li>✗ <strong>Striped look</strong> – can look artificial if overdone</li>
    <li>✗ <strong>Less dimensional</strong> – can appear flat</li>
  </ul>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Head-to-Head Comparison</h2>

  <div class="overflow-x-auto my-8">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="border-b-2 border-pink-bright/50">
          <th class="py-4 px-4 text-white font-semibold">Factor</th>
          <th class="py-4 px-4 text-pink-bright font-semibold">Balayage</th>
          <th class="py-4 px-4 text-pink-bright font-semibold">Highlights</th>
        </tr>
      </thead>
      <tbody class="text-gray-300">
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4 font-medium">Maintenance</td>
          <td class="py-3 px-4">3-6 months</td>
          <td class="py-3 px-4">6-8 weeks</td>
        </tr>
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4 font-medium">Cost (initial)</td>
          <td class="py-3 px-4">$200-400+</td>
          <td class="py-3 px-4">$100-250</td>
        </tr>
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4 font-medium">Root visibility</td>
          <td class="py-3 px-4">Minimal</td>
          <td class="py-3 px-4">Very visible</td>
        </tr>
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4 font-medium">Lift potential</td>
          <td class="py-3 px-4">Moderate</td>
          <td class="py-3 px-4">Maximum</td>
        </tr>
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4 font-medium">Damage level</td>
          <td class="py-3 px-4">Lower</td>
          <td class="py-3 px-4">Higher</td>
        </tr>
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4 font-medium">Natural look</td>
          <td class="py-3 px-4">Very natural</td>
          <td class="py-3 px-4">Structured</td>
        </tr>
        <tr class="border-b border-gray-dark">
          <td class="py-3 px-4 font-medium">Best for</td>
          <td class="py-3 px-4">Beachy, lived-in</td>
          <td class="py-3 px-4">Bright, dramatic</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Which Is Right for You?</h2>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Choose Balayage If You:</h3>
  <ul class="text-gray-300 space-y-2 mb-8">
    <li>• Want a natural, sun-kissed look</li>
    <li>• Don't want to visit the salon every 6-8 weeks</li>
    <li>• Prefer a softer, more lived-in aesthetic</li>
    <li>• Have medium to dark brown hair and want subtle lightness</li>
    <li>• Want to minimize damage to your hair</li>
    <li>• Like the "I woke up like this" vibe</li>
    <li>• Have fine hair (creates illusion of thickness)</li>
  </ul>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Choose Highlights If You:</h3>
  <ul class="text-gray-300 space-y-2 mb-8">
    <li>• Want the brightest, most dramatic blonde possible</li>
    <li>• Don't mind frequent salon visits</li>
    <li>• Like a polished, finished look</li>
    <li>• Want to go significantly lighter than your natural color</li>
    <li>• Have dark hair and want to be blonde</li>
    <li>• Prefer structured, uniform color</li>
    <li>• Want gray coverage at the same time</li>
  </ul>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Hybrid Options</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    Many of my clients choose a combination approach. Here are the most popular hybrid techniques:
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Foilayage</h3>
  <p class="text-gray-300 leading-relaxed mb-6">
    The best of both worlds! Hair is hand-painted like balayage, then wrapped in foils for processing. 
    This gives you the natural, blended look of balayage with the lift potential of foils. My go-to 
    for dark-haired clients wanting significant lightness.
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Babylights</h3>
  <p class="text-gray-300 leading-relaxed mb-6">
    Ultra-fine highlights that mimic the natural highlights children get from the sun. These are 
    delicate, subtle, and perfect for adding dimension without obvious streaks. They blend beautifully 
    with balayage.
  </p>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">Root Smudge + Balayage</h3>
  <p class="text-gray-300 leading-relaxed mb-6">
    For the lowest maintenance option, I apply a shadow root (slightly darker color at the scalp) 
    that blends into balayage ends. This can extend your touch-ups to 4-6 months while looking 
    completely intentional.
  </p>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Essential Aftercare Products</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    Whether you choose balayage or highlights, your color-treated hair needs special care. Here are 
    my must-have products for maintaining lightened hair:
  </p>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
    {#if olaplex}
      <ProductCard product={olaplex} />
    {/if}
    {#if moroccanoil}
      <ProductCard product={moroccanoil} />
    {/if}
  </div>

  <h3 class="text-xl font-bold text-white mt-8 mb-4">My Aftercare Recommendations</h3>
  
  <div class="space-y-6">
    <div class="bg-black-soft/30 p-6 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">For All Lightened Hair</h4>
      <ul class="text-gray-300 text-sm space-y-1">
        <li>• <strong>Olaplex No. 3</strong> – Use weekly to rebuild broken bonds</li>
        <li>• <strong>Sulfate-free shampoo</strong> – Prevents color fading</li>
        <li>• <strong>Heat protectant</strong> – Essential before any heat styling</li>
        <li>• <strong>Deep conditioner</strong> – Weekly moisture treatment</li>
      </ul>
    </div>
    
    <div class="bg-black-soft/30 p-6 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">For Blonde/Platinum</h4>
      <ul class="text-gray-300 text-sm space-y-1">
        <li>• <strong>Purple shampoo</strong> – Neutralizes brassiness</li>
        <li>• <strong>Toning gloss</strong> – Refresh color between salon visits</li>
        <li>• <strong>UV protection</strong> – Prevents sun-induced brassiness</li>
      </ul>
    </div>
    
    <div class="bg-black-soft/30 p-6 rounded-lg">
      <h4 class="text-pink-bright font-semibold mb-2">For Brunette Balayage</h4>
      <ul class="text-gray-300 text-sm space-y-1">
        <li>• <strong>Blue shampoo</strong> – Prevents orange tones</li>
        <li>• <strong>Color-depositing conditioner</strong> – Enhances richness</li>
        <li>• <strong>Hair oil</strong> – Adds shine to dimensional color</li>
      </ul>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Cost Breakdown: Year One</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    Here's what you can expect to spend in your first year for each option:
  </p>

  <div class="grid md:grid-cols-2 gap-8 my-8">
    <div class="bg-black-soft/30 p-6 rounded-lg">
      <h3 class="text-pink-bright font-semibold mb-4">Balayage (Year 1)</h3>
      <ul class="text-gray-300 text-sm space-y-2">
        <li class="flex justify-between"><span>Initial service</span><span class="font-mono">$250-400</span></li>
        <li class="flex justify-between"><span>Touch-up #1 (4 months)</span><span class="font-mono">$150-250</span></li>
        <li class="flex justify-between"><span>Gloss refresh (2x)</span><span class="font-mono">$80 x 2</span></li>
        <li class="flex justify-between"><span>Home care products</span><span class="font-mono">$200</span></li>
        <li class="border-t border-gray-dark pt-2 flex justify-between font-semibold">
          <span>Total Year 1</span><span class="text-pink-bright">$760-1,010</span>
        </li>
      </ul>
    </div>
    
    <div class="bg-black-soft/30 p-6 rounded-lg">
      <h3 class="text-pink-bright font-semibold mb-4">Highlights (Year 1)</h3>
      <ul class="text-gray-300 text-sm space-y-2">
        <li class="flex justify-between"><span>Initial full highlight</span><span class="font-mono">$150-250</span></li>
        <li class="flex justify-between"><span>Touch-ups (5x)</span><span class="font-mono">$100 x 5</span></li>
        <li class="flex justify-between"><span>Toner refresh (3x)</span><span class="font-mono">$50 x 3</span></li>
        <li class="flex justify-between"><span>Home care products</span><span class="font-mono">$200</span></li>
        <li class="border-t border-gray-dark pt-2 flex justify-between font-semibold">
          <span>Total Year 1</span><span class="text-pink-bright">$950-1,200</span>
        </li>
      </ul>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">The Bottom Line</h2>

  <p class="text-gray-300 leading-relaxed mb-6">
    After 15 years of creating both looks, here's my honest take: <strong>Balayage is better for 
    80% of people.</strong> The lower maintenance, natural grow-out, and dimensional results make 
    it more practical for busy lifestyles. However, if you're committed to being significantly 
    lighter than your natural color and don't mind the upkeep, highlights will get you there faster.
  </p>

  <div class="bg-pink-bright/10 border-l-4 border-pink-bright p-6 my-8">
    <p class="text-white font-medium">
      <strong>Pro Tip:</strong> Book a consultation before committing. A good colorist will analyze 
      your hair type, lifestyle, and goals to recommend the perfect technique. At Hairven, we offer 
      complimentary color consultations – <a href="/contact" class="text-pink-bright hover:underline">book yours today</a>.
    </p>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Frequently Asked Questions</h2>

  <div class="space-y-6 mt-8">
    <div>
      <h4 class="text-white font-semibold mb-2">Can I go from highlights to balayage?</h4>
      <p class="text-gray-300 text-sm">
        Absolutely! This is actually one of my most requested transitions. I blend existing highlights 
        into a balayage pattern, giving you the low-maintenance benefits while keeping your brightness.
      </p>
    </div>
    
    <div>
      <h4 class="text-white font-semibold mb-2">Does balayage work on short hair?</h4>
      <p class="text-gray-300 text-sm">
        Yes, but placement is crucial. On short hair (above shoulders), I use a technique called 
        "foilayage" to ensure enough lift while maintaining the natural, blended look.
      </p>
    </div>
    
    <div>
      <h4 class="text-white font-semibold mb-2">Why did my balayage turn orange/brassy?</h4>
      <p class="text-gray-300 text-sm">
        This happens when hair doesn't lift light enough or underlying pigment isn't properly neutralized. 
        A toner and purple/blue shampoo routine usually fixes it. Prevention: trust your colorist if they 
        recommend multiple sessions.
      </p>
    </div>
    
    <div>
      <h4 class="text-white font-semibold mb-2">How do I maintain my color between visits?</h4>
      <p class="text-gray-300 text-sm">
        Use sulfate-free shampoo, wash in cool water, apply heat protectant before styling, use toning 
        products as recommended, and get a gloss treatment every 6-8 weeks to refresh vibrancy.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Related Articles</h2>
  <ul class="text-gray-300 space-y-2">
    <li>→ <a href="/blog/keratin-treatment-guide" class="text-pink-bright hover:underline">Complete Keratin Treatment Guide</a></li>
    <li>→ <a href="/blog/summer-hair-care-tips" class="text-pink-bright hover:underline">Summer Hair Care: Protecting Color</a></li>
    <li>→ <a href="/blog/best-products-damaged-hair" class="text-pink-bright hover:underline">Best Products for Color-Damaged Hair</a></li>
  </ul>
</div>
