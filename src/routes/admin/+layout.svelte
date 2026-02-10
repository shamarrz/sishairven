<script lang="ts">
  /**
   * Admin Layout Component
   * 
   * Provides the admin dashboard layout with sidebar navigation,
   * authentication check, and dark theme.
   * 
   * @component AdminLayout
   * @author Hairven Dev Team
   * @since 2026-02-10
   */
  
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { 
    authStore, 
    sidebarOpen,
    connectLiveUpdates,
    disconnectLiveUpdates 
  } from '$lib/admin/stores';
  
  // Icons (SVG components)
  const icons = {
    dashboard: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>`,
    analytics: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
    revenue: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    clika: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
    translations: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>`,
    logout: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>`,
    menu: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`,
    close: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
    logo: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/></svg>`
  };
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: icons.dashboard },
    { path: '/admin/analytics', label: 'Geo Analytics', icon: icons.analytics },
    { path: '/admin/revenue', label: 'Revenue', icon: icons.revenue },
    { path: '/admin/clika', label: 'Clika Evasion', icon: icons.clika },
    { path: '/admin/translations', label: 'Translations', icon: icons.translations },
  ];
  
  let isCheckingAuth = true;
  let mobileMenuOpen = false;
  
  onMount(() => {
    // Check authentication
    const isAuth = authStore.checkAuth();
    if (!isAuth) {
      goto('/admin');
    }
    isCheckingAuth = false;
    
    // Connect to live updates
    connectLiveUpdates();
    
    // Close mobile menu on route change
    const unsubscribe = page.subscribe(() => {
      mobileMenuOpen = false;
    });
    
    return () => {
      unsubscribe();
    };
  });
  
  onDestroy(() => {
    disconnectLiveUpdates();
  });
  
  function handleLogout() {
    authStore.logout();
    goto('/admin');
  }
  
  function isActive(path: string): boolean {
    return $page.url.pathname === path || 
           (path !== '/admin' && $page.url.pathname.startsWith(path));
  }
  
  // Get page title based on current route
  $: pageTitle = navItems.find(item => isActive(item.path))?.label || 'Dashboard';
  
  // Handle login form submission
  function handleLoginSubmit(e: Event) {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const success = authStore.login(username, password);
    if (!success) {
      alert('Invalid credentials. Try password: hairven2026');
    }
  }
</script>

<svelte:head>
  <title>{pageTitle} - Hairven Admin</title>
</svelte:head>

<!-- Login Screen -->
{#if !$authStore.isAuthenticated}
  <div class="min-h-screen bg-black flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-black-soft rounded-2xl border border-pink-bright/30 p-8 shadow-2xl">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-pink-bright/10 rounded-full mb-4">
          <span class="text-pink-bright text-3xl">✦</span>
        </div>
        <h1 class="text-3xl font-handwritten text-pink-bright mb-2">Hairven Admin</h1>
        <p class="text-gray-medium">Sign in to access the dashboard</p>
      </div>
      
      <form 
        class="space-y-6"
        on:submit|preventDefault={handleLoginSubmit}
      >
        <div>
          <label for="username" class="block text-sm font-medium text-gray-light mb-2">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username"
            class="w-full bg-black border border-gray-dark rounded-lg px-4 py-3 text-white placeholder-gray-medium focus:outline-none focus:border-pink-bright transition-colors"
            placeholder="admin"
            required
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-light mb-2">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            class="w-full bg-black border border-gray-dark rounded-lg px-4 py-3 text-white placeholder-gray-medium focus:outline-none focus:border-pink-bright transition-colors"
            placeholder="••••••••"
            required
          />
        </div>
        
        <button 
          type="submit"
          class="w-full bg-pink-bright text-white font-semibold py-3 rounded-lg hover:bg-pink-dark transition-colors shadow-lg hover:shadow-pink-bright/30"
        >
          Sign In
        </button>
      </form>
      
      <p class="text-center text-gray-medium text-sm mt-6">
        Default password: <code class="bg-black px-2 py-1 rounded text-pink-light">hairven2026</code>
      </p>
    </div>
  </div>

<!-- Admin Dashboard -->
{:else}
  <div class="min-h-screen bg-black flex">
    <!-- Sidebar (Desktop) -->
    <aside 
      class="hidden lg:flex flex-col w-64 bg-black-soft border-r border-gray-dark/50 fixed h-full transition-all duration-300 z-40"
      class:w-64={$sidebarOpen}
      class:w-20={!$sidebarOpen}
    >
      <!-- Logo -->
      <div class="p-6 border-b border-gray-dark/50 flex items-center gap-3" class:justify-center={!$sidebarOpen}>
        <span class="text-pink-bright text-2xl">✦</span>
        {#if $sidebarOpen}
          <span class="text-xl font-handwritten text-pink-bright">Hairven</span>
        {/if}
      </div>
      
      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-1">
        {#each navItems as item}
          <a 
            href={item.path}
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
            class:justify-center={!$sidebarOpen}
            class:bg-pink-bright/20={isActive(item.path)}
            class:text-pink-bright={isActive(item.path)}
            class:text-gray-light={!isActive(item.path)}
            class:hover:bg-gray-dark/50={!isActive(item.path)}
          >
            <span class="flex-shrink-0">{@html item.icon}</span>
            {#if $sidebarOpen}
              <span class="font-medium">{item.label}</span>
            {/if}
          </a>
        {/each}
      </nav>
      
      <!-- User & Logout -->
      <div class="p-4 border-t border-gray-dark/50">
        <button 
          on:click={handleLogout}
          class="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-medium hover:text-red-400 hover:bg-red-400/10 transition-all"
          class:justify-center={!$sidebarOpen}
        >
          <span class="flex-shrink-0">{@html icons.logout}</span>
          {#if $sidebarOpen}
            <span class="font-medium">Logout</span>
          {/if}
        </button>
        
        {#if $sidebarOpen}
          <div class="mt-4 px-4 py-2 bg-black rounded-lg">
            <p class="text-sm text-gray-medium">Logged in as</p>
            <p class="text-sm text-pink-light font-medium">{$authStore.user?.username || 'Admin'}</p>
          </div>
        {/if}
      </div>
      
      <!-- Toggle Sidebar -->
      <button 
        on:click={() => sidebarOpen.update(v => !v)}
        class="absolute -right-3 top-24 w-6 h-6 bg-pink-bright rounded-full flex items-center justify-center text-white shadow-lg hover:bg-pink-dark transition-colors"
        title={$sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={$sidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}/>
        </svg>
      </button>
    </aside>
    
    <!-- Mobile Header -->
    <div class="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black-soft/95 backdrop-blur border-b border-gray-dark/50">
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-2">
          <span class="text-pink-bright text-xl">✦</span>
          <span class="text-lg font-handwritten text-pink-bright">Hairven Admin</span>
        </div>
        <button 
          on:click={() => mobileMenuOpen = !mobileMenuOpen}
          class="p-2 text-gray-light hover:text-pink-bright transition-colors"
        >
          {@html mobileMenuOpen ? icons.close : icons.menu}
        </button>
      </div>
      
      <!-- Mobile Navigation -->
      {#if mobileMenuOpen}
        <nav class="border-t border-gray-dark/50 p-4 space-y-1">
          {#each navItems as item}
            <a 
              href={item.path}
              class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
              class:bg-pink-bright/20={isActive(item.path)}
              class:text-pink-bright={isActive(item.path)}
              class:text-gray-light={!isActive(item.path)}
            >
              <span>{@html item.icon}</span>
              <span class="font-medium">{item.label}</span>
            </a>
          {/each}
          <button 
            on:click={handleLogout}
            class="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-medium hover:text-red-400 transition-colors"
          >
            <span>{@html icons.logout}</span>
            <span class="font-medium">Logout</span>
          </button>
        </nav>
      {/if}
    </div>
    
    <!-- Main Content -->
    <main 
      class="flex-1 transition-all duration-300 lg:ml-64 pt-16 lg:pt-0"
      class:ml-20={!$sidebarOpen}
    >
      <!-- Page Header -->
      <header class="sticky top-0 z-30 bg-black/80 backdrop-blur border-b border-gray-dark/30 px-6 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-handwritten text-pink-bright">{pageTitle}</h1>
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Live updates active"></div>
          </div>
        </div>
      </header>
      
      <!-- Page Content -->
      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
{/if}
