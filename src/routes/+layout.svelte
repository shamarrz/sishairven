<script lang="ts">
  /**
   * Root Layout Component
   * 
   * Initializes i18n, sets up geo data from server, and provides
   * the base structure for all pages.
   * 
   * @component Layout
   * @author Hairven Dev Team
   * @since 2026-02-10
   */
  
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  
  // Components
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Analytics from '$lib/components/Analytics.svelte';
  import { initializeI18n, isLoadingTranslations } from '$lib/i18n';
  import { initializeGeoStore } from '$lib/stores/geo';
  
  // Initialize on mount
  onMount(async () => {
    // Always use dark theme
    document.body.classList.add('dark');
    
    // Initialize i18n
    if (browser) {
      await initializeI18n($page.data?.lang);
    }
    
    // Initialize geo store from page data
    if ($page.data?.geo) {
      initializeGeoStore($page.data.geo);
    }
  });
</script>

<!-- Analytics -->
<Analytics />

<!-- Loading Indicator for Translations -->
{#if $isLoadingTranslations}
  <div class="fixed top-0 left-0 w-full h-0.5 bg-pink-bright z-[100]">
    <div class="h-full bg-white animate-pulse"></div>
  </div>
{/if}

<!-- Main Layout -->
<div class="min-h-screen flex flex-col bg-black">
  <Header />
  
  <main class="flex-1">
    <slot />
  </main>
  
  <Footer />
</div>
