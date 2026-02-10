<script>
	import { createAmazonLink } from '$lib/utils/amazon';
	import { curatedProducts } from '$lib/utils/amazon';
	
	// Get a few featured products to show
	const featuredProducts = curatedProducts.slice(0, 3);
</script>

<div class="prose prose-invert max-w-none">
	<p class="lead text-xl text-gray-300 mb-8">
		This article provides expert insights and product recommendations from the team at Hairven by Elyn. We've curated the best tools and products to help you achieve salon-quality results at home.
	</p>

	<h2 class="text-2xl font-bold text-pink-bright mt-8 mb-4">Expert Tips from Our Stylists</h2>
	<p class="text-gray-300 mb-6">
		At Hairven by Elyn, we believe that great hair starts with the right knowledge and tools. Our team of experienced stylists has compiled their best advice to help you maintain healthy, beautiful hair between salon visits.
	</p>

	<div class="bg-black-soft/50 rounded-lg p-6 mb-8">
		<h3 class="text-xl font-semibold text-white mb-4">Key Takeaways:</h3>
		<ul class="text-gray-300 space-y-3">
			<li class="flex items-start">
				<span class="text-pink-bright mr-2">→</span>
				<span>Always use heat protectant before styling with hot tools</span>
			</li>
			<li class="flex items-start">
				<span class="text-pink-bright mr-2">→</span>
				<span>Don't overwash - 2-3 times per week is usually sufficient</span>
			</li>
			<li class="flex items-start">
				<span class="text-pink-bright mr-2">→</span>
				<span>Invest in quality tools - they last longer and cause less damage</span>
			</li>
			<li class="flex items-start">
				<span class="text-pink-bright mr-2">→</span>
				<span>Regular trims every 6-8 weeks prevent split ends</span>
			</li>
		</ul>
	</div>

	<h2 class="text-2xl font-bold text-pink-bright mt-8 mb-4">Products We Recommend</h2>
	<p class="text-gray-300 mb-6">
		Based on our professional experience, here are the products we trust and recommend to our clients:
	</p>

	<div class="grid md:grid-cols-3 gap-6 mb-8">
		{#each featuredProducts as product}
			<div class="bg-black-soft/50 rounded-lg p-4 border border-pink-bright/20">
				<h3 class="text-lg font-semibold text-white mb-2">{product.title}</h3>
				<p class="text-gray-400 text-sm mb-3">{product.description.substring(0, 100)}...</p>
				<p class="text-pink-bright font-bold mb-3">{product.price}</p>
				<a 
					href={createAmazonLink(product.asin)}
					class="inline-flex items-center text-sm px-4 py-2 bg-pink-bright text-black font-medium rounded hover:bg-pink-medium transition-colors w-full justify-center"
					rel="sponsored noopener noreferrer"
					target="_blank"
				>
					View on Amazon
				</a>
			</div>
		{/each}
	</div>

	<h2 class="text-2xl font-bold text-pink-bright mt-8 mb-4">Visit Us in Cortland</h2>
	<p class="text-gray-300 mb-4">
		While these products can help you maintain your look at home, nothing beats professional care. Our team at Hairven by Elyn is dedicated to helping you achieve your hair goals.
	</p>
	<p class="text-gray-300">
		Located at 64 Owego St in Cortland, NY, we offer a full range of services including cuts, color, balayage, keratin treatments, and more. Book your appointment today and experience the Hairven difference.
	</p>

	<div class="mt-8 flex flex-col sm:flex-row gap-4">
		<a href="/services" class="inline-flex items-center justify-center px-6 py-3 bg-pink-bright text-black font-semibold rounded-lg hover:bg-pink-medium transition-colors">
			View Our Services
		</a>
		<a href="/shop" class="inline-flex items-center justify-center px-6 py-3 border-2 border-pink-bright text-pink-bright font-semibold rounded-lg hover:bg-pink-bright hover:text-black transition-colors">
			Browse All Products
		</a>
	</div>
</div>
