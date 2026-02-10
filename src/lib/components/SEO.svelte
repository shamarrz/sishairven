<script lang="ts">
	import { page } from '$app/stores';
	import { generateMetaTags, generateLocalBusinessSchema, siteConfig } from '$lib/utils/seo';
	
	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let image: string | undefined = undefined;
	export let type: 'website' | 'article' = 'website';
	export let published: string | undefined = undefined;
	export let modified: string | undefined = undefined;
	export let author: string | undefined = undefined;
	export let schema: Record<string, unknown> | undefined = undefined;
	
	$: meta = generateMetaTags({
		title,
		description,
		image,
		path: $page.url.pathname,
		type,
		published,
		modified,
		author
	});
	
	$: localBusinessSchema = generateLocalBusinessSchema();
</script>

<svelte:head>
	<!-- Primary Meta -->
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={meta.canonical} />
	
	<!-- Open Graph -->
	<meta property="og:title" content={meta.og.title} />
	<meta property="og:description" content={meta.og.description} />
	<meta property="og:url" content={meta.og.url} />
	<meta property="og:image" content={meta.og.image} />
	<meta property="og:type" content={meta.og.type} />
	<meta property="og:site_name" content={meta.og.siteName} />
	{#if meta.og.publishedTime}
		<meta property="article:published_time" content={meta.og.publishedTime} />
	{/if}
	{#if meta.og.modifiedTime}
		<meta property="article:modified_time" content={meta.og.modifiedTime} />
	{/if}
	
	<!-- Twitter -->
	<meta name="twitter:card" content={meta.twitter.card} />
	<meta name="twitter:title" content={meta.twitter.title} />
	<meta name="twitter:description" content={meta.twitter.description} />
	<meta name="twitter:image" content={meta.twitter.image} />
	
	<!-- JSON-LD Schema -->
	{#if schema}
		{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
	{:else}
		{@html `<script type="application/ld+json">${JSON.stringify(localBusinessSchema)}</script>`}
	{/if}
</svelte:head>
