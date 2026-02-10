<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { browser } from '$app/environment';
	
	const GA4_ID = env.PUBLIC_GA4_ID;
	const ADSENSE_CLIENT = env.PUBLIC_ADSENSE_CLIENT;
	const isProd = env.NODE_ENV === 'production' || (browser && window.location.hostname !== 'localhost');
	
	$: shouldLoadGA4 = GA4_ID && isProd;
	$: shouldLoadAdSense = ADSENSE_CLIENT && isProd;
</script>

<svelte:head>
	{#if shouldLoadGA4}
		<!-- Google Analytics 4 -->
		<script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}></script>
		{@html `
			<script>
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', '${GA4_ID}');
			</script>
		`}
	{/if}
	
	{#if shouldLoadAdSense}
		<!-- Google AdSense -->
		<script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
			crossorigin="anonymous"></script>
	{/if}
</svelte:head>

{#if !isProd && (GA4_ID || ADSENSE_CLIENT)}
	<!-- Dev mode warning - analytics disabled -->
	<div class="fixed bottom-4 right-4 bg-yellow-500/90 text-black px-4 py-2 rounded-lg text-sm font-medium z-50 shadow-lg">
		⚠️ Analytics disabled (dev mode)
	</div>
{/if}
