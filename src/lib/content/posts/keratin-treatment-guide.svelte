<script>
	import { createAmazonLink } from '$lib/utils/amazon';
</script>

<div class="prose prose-invert max-w-none">
	<p class="lead text-xl text-gray-300 mb-8">
		Keratin treatments have revolutionized how we manage frizzy, unmanageable hair. As specialists in the French Balayage technique, we've seen firsthand how the right keratin treatment can transform not just hair texture, but daily styling routines.
	</p>

	<h2 class="text-2xl font-bold text-pink-bright mt-8 mb-4">What is a Keratin Treatment?</h2>
	<p class="text-gray-300 mb-6">
		A keratin treatment is a chemical process that smooths and shines frizzy hair. It involves applying a keratin-based formula to the hair, which is then sealed in with heat (usually a flat iron). The result is smoother, more manageable hair that can last 3-6 months.
	</p>

	<h2 class="text-2xl font-bold text-pink-bright mt-8 mb-4">Benefits You'll Love</h2>
	<div class="grid md:grid-cols-2 gap-6 mb-8">
		<div class="bg-black-soft/50 p-4 rounded-lg">
			<h3 class="text-pink-medium font-semibold mb-2">Eliminates Frizz</h3>
			<p class="text-gray-300 text-sm">Say goodbye to humidity-induced frizz. Your hair stays smooth even in the most challenging weather.</p>
		</div>
		<div class="bg-black-soft/50 p-4 rounded-lg">
			<h3 class="text-pink-medium font-semibold mb-2">Cuts Styling Time</h3>
			<p class="text-gray-300 text-sm">Reduce your morning routine by 50% or more. Hair dries faster and styles more easily.</p>
		</div>
		<div class="bg-black-soft/50 p-4 rounded-lg">
			<h3 class="text-pink-medium font-semibold mb-2">Adds Incredible Shine</h3>
			<p class="text-gray-300 text-sm">The treatment creates a reflective surface that gives hair a healthy, glossy appearance.</p>
		</div>
		<div class="bg-black-soft/50 p-4 rounded-lg">
			<h3 class="text-pink-medium font-semibold mb-2">Protects Color</h3>
			<p class="text-gray-300 text-sm">Seals the cuticle, helping your color last longer and resist fading.</p>
		</div>
	</div>

	<h2 class="text-2xl font-bold text-pink-bright mt-8 mb-4">Our Recommended At-Home Maintenance</h2>
	<p class="text-gray-300 mb-6">
		To extend the life of your keratin treatment, using the right at-home products is essential. Here are our stylist-approved recommendations:
	</p>

	<div class="bg-black-soft/50 rounded-lg p-6 mb-6">
		<h3 class="text-xl font-semibold text-white mb-4">Sulfate-Free Shampoo</h3>
		<p class="text-gray-300 mb-4">
			Regular shampoos contain sulfates that strip the keratin from your hair. Switch to a sulfate-free formula to maintain your treatment.
		</p>
		<a 
			href={createAmazonLink('B0037LTTRO', { keywords: 'sulfate free shampoo keratin' })}
			class="inline-flex items-center px-4 py-2 bg-pink-bright text-black font-medium rounded hover:bg-pink-medium transition-colors"
			rel="sponsored noopener noreferrer"
			target="_blank"
		>
			Shop Sulfate-Free Shampoos
		</a>
	</div>

	<div class="bg-black-soft/50 rounded-lg p-6 mb-6">
		<h3 class="text-xl font-semibold text-white mb-4">Weekly Deep Conditioning</h3>
		<p class="text-gray-300 mb-4">
			Keep hair hydrated with a weekly deep conditioning mask. Look for formulas specifically designed for keratin-treated hair.
		</p>
		<a 
			href={createAmazonLink('B07YQ8C6GM', { keywords: 'keratin hair mask deep conditioning' })}
			class="inline-flex items-center px-4 py-2 bg-pink-bright text-black font-medium rounded hover:bg-pink-medium transition-colors"
			rel="sponsored noopener noreferrer"
			target="_blank"
		>
			Shop Hair Masks
		</a>
	</div>

	<h2 class="text-2xl font-bold text-pink-bright mt-8 mb-4">What to Expect During Your Appointment</h2>
	<div class="space-y-4 text-gray-300 mb-8">
		<p><strong class="text-pink-medium">1. Consultation (15 min):</strong> We assess your hair type, condition, and desired results.</p>
		<p><strong class="text-pink-medium">2. Clarifying Wash:</strong> Deep cleansing to prepare hair for treatment.</p>
		<p><strong class="text-pink-medium">3. Application (30-45 min):</strong> Keratin formula is applied section by section.</p>
		<p><strong class="text-pink-medium">4. Processing (30 min):</strong> Product penetrates the hair shaft.</p>
		<p><strong class="text-pink-medium">5. Sealing (60+ min):</strong> Heat activation with flat iron locks in the treatment.</p>
	</div>

	<h2 class="text-2xl font-bold text-pink-bright mt-8 mb-4">Aftercare: The First 72 Hours</h2>
	<div class="bg-gold/10 border border-gold/30 rounded-lg p-6 mb-8">
		<h3 class="text-gold font-semibold mb-3">Critical Rules:</h3>
		<ul class="text-gray-300 space-y-2">
			<li>✓ Keep hair dry (no washing, swimming, or sweating)</li>
			<li>✓ Don't tuck hair behind ears or use hair ties</li>
			<li>✓ Sleep on a silk or satin pillowcase</li>
			<li>✓ Come back for your complimentary rinse and blowout</li>
		</ul>
	</div>

	<h2 class="text-2xl font-bold text-pink-bright mt-8 mb-4">Is It Right for You?</h2>
	<p class="text-gray-300 mb-4">
		Keratin treatments work best on frizzy, textured, or damaged hair. They're not recommended for fine, thin hair or those with certain chemical treatments. Book a consultation with us to determine if this treatment is right for your hair goals.
	</p>

	<div class="mt-8 p-6 bg-pink-bright/10 rounded-lg border border-pink-bright/30">
		<p class="text-gray-300">
			<strong class="text-pink-bright">Ready to transform your hair?</strong> 
			Book a keratin treatment consultation at Hairven by Elyn. Call us at 
			<a href="tel:6072526610" class="text-pink-bright hover:underline">607-252-6610</a> 
			or book online.
		</p>
	</div>
</div>
