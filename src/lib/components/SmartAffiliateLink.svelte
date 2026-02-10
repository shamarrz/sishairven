<script lang="ts">
  /**
   * Smart Affiliate Link Component
   * 
   * Displays affiliate products with geo-targeted Amazon links.
   * Automatically redirects to the appropriate Amazon store based on user location.
   * 
   * @component SmartAffiliateLink
   * @author Hairven Dev Team
   * @since 2026-02-10
   */
  
  import { buildSmartAffiliateLink } from '$lib/amazon/geo-affiliates';
  import { amazonProducts } from '$lib/utils/amazon-products';
  import { geoStore } from '$lib/stores/geo';
  
  // Props
  export let asin: string;
  export let source: string = 'website';
  export let campaign: string = '';
  export let showPrice: boolean = true;
  export let variant: 'link' | 'button' | 'card' = 'link';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  // Get product data
  $: product = amazonProducts.find(p => p.asin === asin);
  
  // Build smart link
  $: smartLink = product 
    ? buildSmartAffiliateLink({
        asin,
        productName: product.title,
        category: product.category,
        source,
        campaign,
      })
    : null;
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    link: 'text-pink-bright hover:underline inline-flex items-center gap-1',
    button: 'bg-pink-bright text-black font-semibold rounded-lg hover:bg-pink-medium transition-colors inline-flex items-center justify-center gap-2',
    card: 'block bg-black-soft/50 border border-gray-dark rounded-lg overflow-hidden hover:border-pink-bright/50 transition-all',
  };
</script>

{#if product && smartLink}
  {#if variant === 'card'}
    <!-- Card Variant -->
    <a 
      href={smartLink.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      class={variantClasses[variant]}
    >
      <div class="aspect-square bg-white/5 p-4 flex items-center justify-center">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          class="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>
      <div class="p-4">
        <h3 class="text-white font-medium line-clamp-2">{product.title}</h3>
        {#if showPrice}
          <p class="text-pink-bright font-semibold mt-2">
            {smartLink.displayPrice}
            {#if $geoStore.country !== 'US'}
              <span class="text-gray-medium text-sm ml-1">(approx. {$geoStore.currency})</span>
            {/if}
          </p>
        {/if}
        <p class="text-gray-medium text-xs mt-2">View on Amazon {$geoStore.country}</p>
      </div>
    </a>
    
  {:else if variant === 'button'}
    <!-- Button Variant -->
    <a 
      href={smartLink.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      class="{variantClasses[variant]} {sizeClasses[size]}"
    >
      <span>View on Amazon</span>
      {#if showPrice && smartLink.displayPrice}
        <span class="opacity-80">- {smartLink.displayPrice}</span>
      {/if}
    </a>
    
  {:else}
    <!-- Link Variant (Default) -->
    <a 
      href={smartLink.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      class={variantClasses[variant]}
    >
      <slot>
        <span>{product.title}</span>
        {#if showPrice && smartLink.displayPrice}
          <span class="font-semibold">({smartLink.displayPrice})</span>
        {/if}
      </slot>
    </a>
  {/if}
{:else}
  <!-- Fallback for missing product -->
  <span class="text-gray-medium">Product not found</span>
{/if}
