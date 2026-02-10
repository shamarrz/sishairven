<script lang="ts">
  /**
   * Site Header Component
   * 
   * Main navigation header with language switcher.
   * Responsive design with mobile hamburger menu.
   * 
   * @component Header
   * @author Hairven Dev Team
   * @since 2026-02-10
   */
  
  import { page } from '$app/stores';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import { locale } from '$lib/i18n';
  
  let isMenuOpen = false;
  
  // Navigation items - could be moved to translations
  const navItems = [
    { href: '/', label: 'Home', labelKey: 'nav.home' },
    { href: '/about', label: 'About', labelKey: 'nav.about' },
    { href: '/services', label: 'Services', labelKey: 'nav.services' },
    { href: '/shop', label: 'Shop', labelKey: 'nav.shop' },
    { href: '/blog', label: 'Blog', labelKey: 'nav.blog' },
    { href: '/contact', label: 'Contact', labelKey: 'nav.contact' }
  ];
  
  $: currentPath = $page.url.pathname;
  
  // Get current language from URL for link generation
  $: currentLang = $locale?.split('-')[0] || 'en';
  
  // Generate language-prefixed URLs
  function getLocalizedUrl(path: string): string {
    if (currentLang === 'en') return path;
    return `/${currentLang}${path}`;
  }
</script>

<header class="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-pink-bright/20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
      <!-- Logo -->
      <a href={getLocalizedUrl('/')} class="text-2xl sm:text-3xl font-handwritten font-bold text-pink-bright hover:text-pink-medium transition-colors">
        Hairven by Elyn
      </a>
      
      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center space-x-1">
        {#each navItems as item}
          <a 
            href={getLocalizedUrl(item.href)}
            class="px-4 py-2 rounded-lg transition-colors {currentPath === getLocalizedUrl(item.href) ? 'text-pink-bright bg-pink-bright/10' : 'text-gray-light hover:text-pink-bright hover:bg-pink-bright/5'}"
          >
            {item.label}
          </a>
        {/each}
        
        <!-- Language Switcher -->
        <div class="ml-4 pl-4 border-l border-gray-dark">
          <LanguageSwitcher variant="dropdown" showFlags={true} showNames={false} />
        </div>
        
        <!-- Book Now Button -->
        <a 
          href={getLocalizedUrl('/contact')}
          class="ml-4 px-6 py-2 bg-pink-bright text-black font-semibold rounded-lg hover:bg-pink-medium transition-colors"
        >
          Book Now
        </a>
      </nav>
      
      <!-- Mobile Menu Button -->
      <div class="md:hidden flex items-center gap-2">
        <!-- Mobile Language Switcher -->
        <LanguageSwitcher variant="minimal" />
        
        <button 
          class="p-2 text-gray-light hover:text-pink-bright"
          on:click={() => isMenuOpen = !isMenuOpen}
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if isMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            {/if}
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile Menu -->
  {#if isMenuOpen}
    <div class="md:hidden bg-black/95 backdrop-blur-lg border-t border-pink-bright/20">
      <nav class="max-w-7xl mx-auto px-4 py-4 space-y-2">
        {#each navItems as item}
          <a 
            href={getLocalizedUrl(item.href)}
            class="block px-4 py-3 rounded-lg transition-colors {currentPath === getLocalizedUrl(item.href) ? 'text-pink-bright bg-pink-bright/10' : 'text-gray-light hover:text-pink-bright hover:bg-pink-bright/5'}"
            on:click={() => isMenuOpen = false}
          >
            {item.label}
          </a>
        {/each}
        <a 
          href={getLocalizedUrl('/contact')}
          class="block mt-4 px-4 py-3 bg-pink-bright text-black font-semibold rounded-lg text-center"
          on:click={() => isMenuOpen = false}
        >
          Book Now
        </a>
      </nav>
    </div>
  {/if}
</header>

<!-- Spacer for fixed header -->
<div class="h-20"></div>
