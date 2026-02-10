<script>
	import { createAmazonLink } from '$lib/utils/amazon';
	
	const products = [
		{
			rank: 1,
			name: 'Dyson Supersonic',
			asin: 'B01FIG3JA4',
			bestFor: 'All hair types, professionals',
			pros: ['Intelligent heat control prevents damage', 'Fast drying time', 'Multiple attachments included'],
			cons: ['Premium price point'],
			verdict: 'Worth the investment for daily use'
		},
		{
			rank: 2,
			name: 'ghd Helios',
			asin: 'B07W7RSG9L',
			bestFor: 'Fine to medium hair',
			pros: ['Lightweight', 'Aerodynamic design', 'Ionic technology'],
			cons: ['Fewer attachments than Dyson'],
			verdict: 'Excellent mid-range option'
		},
		{
			rank: 3,
			name: 'Revlon One-Step',
			asin: 'B08PZVDB4J',
			bestFor: 'Quick styling, blowout look',
			pros: ['Affordable', 'Dries and styles simultaneously', 'User-friendly'],
			cons: ['Not for very short hair', 'Can get hot'],
			verdict: 'Best budget option for smooth styles'
		}
	];
</script>

<div class="prose prose-invert max-w-none">
	<p class="lead text-xl text-gray-300 mb-8">
		After testing dozens of hair dryers in our salon, we've narrowed down the absolute best options for every budget and hair type. Whether you're looking for salon-quality results or the best value, this guide has you covered.
	</p>

	<h2 class="text-2xl font-bold text-pink-bright mt-8 mb-4">Why Trust Our Reviews?</h2>
	<p class="text-gray-300 mb-6">
		At Hairven by Elyn, we use these tools daily on hundreds of clients. We evaluate each dryer on drying time, heat consistency, weight, noise level, and long-term durability. Every recommendation below is something our stylists actually use.
	</p>

	<h2 class="text-2xl font-bold text-pink-bright mt-8 mb-4">Top Picks for 2025</h2>

	{#each products as product}
		<div class="bg-black-soft/50 rounded-lg p-6 mb-6 border border-pink-bright/20">
			<div class="flex items-start gap-4">
				<span class="flex-shrink-0 w-10 h-10 bg-pink-bright text-black font-bold rounded-full flex items-center justify-center text-xl">
					#{product.rank}
				</span>
				<div class="flex-1">
					<h3 class="text-xl font-semibold text-white mb-2">{product.name}</h3>
					<p class="text-pink-medium text-sm mb-3">Best for: {product.bestFor}</p>
					
					<div class="grid md:grid-cols-2 gap-4 mb-4">
						<div>
							<h4 class="text-green-400 font-medium mb-2">Pros:</h4>
							<ul class="text-sm text-gray-300 space-y-1">
								{#each product.pros as pro}
									<li>✓ {pro}</li>
								{/each}
							</ul>
						</div>
						<div>
							<h4 class="text-red-400 font-medium mb-2">Cons:</h4>
							<ul class="text-sm text-gray-300 space-y-1">
								{#each product.cons as con}
									<li>− {con}</li>
								{/each}
							</ul>
						</div>
					</div>
					
					<p class="text-gold-light font-medium mb-4">{product.verdict}</p>
					
					<a 
						href={createAmazonLink(product.asin)}
						class="inline-flex items-center px-6 py-3 bg-pink-bright text-black font-semibold rounded-lg hover:bg-pink-medium transition-colors"
						rel="sponsored noopener noreferrer"
						target="_blank"
					>
						Check Price on Amazon
						<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	{/each}

	<h2 class="text-2xl font-bold text-pink-bright mt-8 mb-4">How to Choose the Right Hair Dryer</h2>
	
	<div class="bg-black-soft/30 rounded-lg p-6 mb-6">
		<h3 class="text-lg font-semibold text-white mb-3">Key Features to Consider:</h3>
		<ul class="text-gray-300 space-y-2">
			<li><strong class="text-pink-medium">Wattage:</strong> Higher wattage (1800W+) means faster drying but can be heavier</li>
			<li><strong class="text-pink-medium">Ionic Technology:</strong> Reduces frizz by breaking down water molecules</li>
			<li><strong class="text-pink-medium">Heat Settings:</strong> Multiple settings allow customization for your hair type</li>
			<li><strong class="text-pink-medium">Weight:</strong> Lighter dryers reduce arm fatigue during styling</li>
			<li><strong class="text-pink-medium">Attachments:</strong> Diffusers for curly hair, concentrators for straight styles</li>
		</ul>
	</div>

	<h2 class="text-2xl font-bold text-pink-bright mt-8 mb-4">Final Thoughts</h2>
	<p class="text-gray-300">
		Investing in a quality hair dryer pays off in healthier hair and better styling results. While the Dyson Supersonic leads in technology and performance, the Revlon One-Step offers incredible value for those who want salon-style blowouts without the salon price tag.
	</p>
	<p class="text-gray-300 mt-4">
		Visit us at Hairven by Elyn for a consultation on which tools are best for your specific hair type and styling goals.
	</p>
</div>
