<script>
  import { createAmazonLink } from '$lib/utils/amazon';
  import { amazonProducts, getBestSellers } from '$lib/utils/amazon-products';
  import ProductCard from '$lib/components/ProductCard.svelte';
  
  // Get featured bestsellers to show
  const featuredProducts = getBestSellers().slice(0, 3);
</script>

<div class="prose prose-invert prose-pink max-w-none">
  <p class="text-xl text-gray-300 leading-relaxed mb-8">
    This article provides expert insights and product recommendations from the team at Hairven by Elyn. 
    We've curated the best tools and products to help you achieve salon-quality results at home.
  </p>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Expert Tips from Our Stylists</h2>
  
  <p class="text-gray-300 mb-6 leading-relaxed">
    At Hairven by Elyn, we believe that great hair starts with the right knowledge and tools. Our team 
    of experienced stylists has compiled their best advice to help you maintain healthy, beautiful hair 
    between salon visits.
  </p>

  <div class="bg-black-soft/30 rounded-lg p-6 mb-8 border border-gray-dark">
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

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Products We Recommend</h2>
  
  <p class="text-gray-300 mb-6 leading-relaxed">
    Based on our professional experience, here are our top-rated products that deliver salon-quality 
    results at home:
  </p>

  <div class="grid md:grid-cols-3 gap-6 mb-8">
    {#each featuredProducts as product}
      <ProductCard {product} />
    {/each}
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Browse All Categories</h2>
  
  <div class="grid md:grid-cols-2 gap-4 mb-8">
    <a href="/shop?category=hair-tools" class="bg-black-soft/30 p-5 rounded-lg border border-gray-dark hover:border-pink-bright/50 transition-all group">
      <h3 class="text-lg font-semibold text-white group-hover:text-pink-bright transition-colors">Hair Tools</h3>
      <p class="text-gray-light text-sm mt-2">Dryers, straighteners, curling irons, and styling tools</p>
    </a>
    <a href="/shop?category=hair-care" class="bg-black-soft/30 p-5 rounded-lg border border-gray-dark hover:border-pink-bright/50 transition-all group">
      <h3 class="text-lg font-semibold text-white group-hover:text-pink-bright transition-colors">Hair Care</h3>
      <p class="text-gray-light text-sm mt-2">Treatments, masks, oils, and nourishing products</p>
    </a>
    <a href="/shop?category=styling" class="bg-black-soft/30 p-5 rounded-lg border border-gray-dark hover:border-pink-bright/50 transition-all group">
      <h3 class="text-lg font-semibold text-white group-hover:text-pink-bright transition-colors">Styling Products</h3>
      <p class="text-gray-light text-sm mt-2">Sprays, serums, creams, and finishing products</p>
    </a>
    <a href="/shop?category=brushes" class="bg-black-soft/30 p-5 rounded-lg border border-gray-dark hover:border-pink-bright/50 transition-all group">
      <h3 class="text-lg font-semibold text-white group-hover:text-pink-bright transition-colors">Brushes & Accessories</h3>
      <p class="text-gray-light text-sm mt-2">Professional brushes, silk accessories, and tools</p>
    </a>
  </div>

  <h2 class="text-2xl font-display text-pink-bright mt-12 mb-6">Visit Us in Cortland</h2>
  
  <p class="text-gray-300 mb-4 leading-relaxed">
    While these products can help you maintain your look at home, nothing beats professional care. 
    Our team at Hairven by Elyn is dedicated to helping you achieve your hair goals.
  </p>
  
  <p class="text-gray-300 mb-6 leading-relaxed">
    Located at <strong class="text-white">64 Owego St in Cortland, NY</strong>, we offer a full range of 
    services including cuts, color, balayage, keratin treatments, and more. Book your appointment today 
    and experience the Hairven difference.
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
