<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Analytics from '$lib/components/Analytics.svelte';
	import { onMount } from 'svelte';
	
	onMount(() => {
		// Always use dark theme
		document.body.classList.add('dark');
	});
</script>

<Analytics />

<div class="min-h-screen flex flex-col bg-black">
	<Header />
	
	<main class="flex-1">
		<slot />
	</main>
	
	<Footer />
</div>
