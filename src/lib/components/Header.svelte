<script lang="ts">
	import { page } from '$app/stores';
	
	let isMenuOpen = false;
	
	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/services', label: 'Services' },
		{ href: '/shop', label: 'Shop' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' }
	];
	
	$: currentPath = $page.url.pathname;
</script>

<header class="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-pink-bright/20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-20">
			<!-- Logo -->
			<a href="/" class="text-2xl sm:text-3xl font-handwritten font-bold text-pink-bright hover:text-pink-medium transition-colors">
				Hairven by Elyn
			</a>
			
			<!-- Desktop Nav -->
			<nav class="hidden md:flex items-center space-x-1">
				{#each navItems as item}
					<a 
						href={item.href}
						class="px-4 py-2 rounded-lg transition-colors {currentPath === item.href ? 'text-pink-bright bg-pink-bright/10' : 'text-gray-light hover:text-pink-bright hover:bg-pink-bright/5'}"
					>
						{item.label}
					</a>
				{/each}
				<a 
					href="/contact"
					class="ml-4 px-6 py-2 bg-pink-bright text-black font-semibold rounded-lg hover:bg-pink-medium transition-colors"
				>
					Book Now
				</a>
			</nav>
			
			<!-- Mobile Menu Button -->
			<button 
				class="md:hidden p-2 text-gray-light hover:text-pink-bright"
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
	
	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="md:hidden bg-black/95 backdrop-blur-lg border-t border-pink-bright/20">
			<nav class="max-w-7xl mx-auto px-4 py-4 space-y-2">
				{#each navItems as item}
					<a 
						href={item.href}
						class="block px-4 py-3 rounded-lg transition-colors {currentPath === item.href ? 'text-pink-bright bg-pink-bright/10' : 'text-gray-light hover:text-pink-bright hover:bg-pink-bright/5'}"
						on:click={() => isMenuOpen = false}
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>
	{/if}
</header>

<!-- Spacer for fixed header -->
<div class="h-20"></div>
