<script lang="ts">
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';
	import { getPostBySlug, getPublishedPosts, formatDate } from '$lib/content/posts';
	import { generateBreadcrumbSchema } from '$lib/utils/seo';
	import BestHairDryers from '$lib/content/posts/best-hair-dryers-2025.svelte';
	import KeratinGuide from '$lib/content/posts/keratin-treatment-guide.svelte';
	import DefaultPost from '$lib/content/posts/default.svelte';
	
	const slug = $page.params.slug;
	const post = getPostBySlug(slug);
	
	// Get related posts (same category, excluding current)
	const relatedPosts = post 
		? getPublishedPosts()
			.filter(p => p.category === post.category && p.slug !== slug)
			.slice(0, 3)
		: [];
	
	// Dynamic component loading based on slug
	const postComponents: Record<string, typeof DefaultPost> = {
		'best-hair-dryers-2025': BestHairDryers,
		'keratin-treatment-guide': KeratinGuide
	};
	
	$: PostContent = postComponents[slug] || DefaultPost;
	
	$: breadcrumbSchema = post ? generateBreadcrumbSchema([
		{ name: 'Home', path: '/' },
		{ name: 'Blog', path: '/blog' },
		{ name: post.title, path: `/blog/${post.slug}` }
	]) : null;
</script>

{#if post}
	<SEO 
		title={post.title}
		description={post.description}
		type="article"
		published={post.date}
		modified={post.modified}
		author={post.author}
		schema={breadcrumbSchema}
	/>

	<article class="min-h-screen bg-black">
		<!-- Hero -->
		<header class="relative py-20 bg-gradient-to-b from-pink-bright/10 to-black">
			<div class="max-w-4xl mx-auto px-4">
				<!-- Breadcrumbs -->
				<nav class="mb-6">
					<ol class="flex items-center text-sm text-gray-medium">
						<li><a href="/" class="hover:text-pink-bright">Home</a></li>
						<li class="mx-2">/</li>
						<li><a href="/blog" class="hover:text-pink-bright">Blog</a></li>
						<li class="mx-2">/</li>
						<li class="text-gray-light">{post.title}</li>
					</ol>
				</nav>
				
				<!-- Category -->
				<span class="inline-block px-4 py-1 bg-pink-bright/10 text-pink-bright text-sm font-medium rounded-full mb-4">
					{post.category}
				</span>
				
				<h1 class="text-4xl md:text-5xl font-display text-white mb-6">{post.title}</h1>
				
				<!-- Meta -->
				<div class="flex flex-wrap items-center gap-6 text-gray-medium">
					<div class="flex items-center">
						<span class="w-10 h-10 bg-pink-bright/20 rounded-full flex items-center justify-center text-pink-bright font-bold mr-3">
							{post.author.charAt(0)}
						</span>
						<div>
							<p class="text-white font-medium">{post.author}</p>
							<p class="text-sm">Professional Stylist</p>
						</div>
					</div>
					<div class="flex items-center gap-4 text-sm">
						<span>📅 {formatDate(post.date)}</span>
						<span>⏱️ {post.readingTime} min read</span>
					</div>
				</div>
			</div>
		</header>

		<!-- Content -->
		<section class="py-12">
			<div class="max-w-4xl mx-auto px-4">
				<div class="bg-black-soft/30 rounded-lg p-8 md:p-12 border border-gray-dark">
					<PostContent />
				</div>
			</div>
		</section>

		<!-- Tags -->
		<section class="py-8 border-t border-gray-dark">
			<div class="max-w-4xl mx-auto px-4">
				<div class="flex flex-wrap gap-2">
					<span class="text-gray-medium">Tags:</span>
					{#each post.tags as tag}
						<span class="px-3 py-1 bg-black-soft text-gray-light rounded-full text-sm">
							{tag}
						</span>
					{/each}
				</div>
			</div>
		</section>

		<!-- Related Posts -->
		{#if relatedPosts.length > 0}
			<section class="py-16 bg-black-soft/30">
				<div class="max-w-7xl mx-auto px-4">
					<h2 class="text-2xl font-display text-white mb-8">Related Articles</h2>
					<div class="grid md:grid-cols-3 gap-6">
						{#each relatedPosts as related}
							<a href="/blog/{related.slug}" class="group">
								<article class="bg-black-soft/50 rounded-lg overflow-hidden border border-gray-dark group-hover:border-pink-bright/40 transition-colors">
									<div class="aspect-video bg-gradient-to-br from-pink-bright/20 to-pink-dark/20 flex items-center justify-center">
										<span class="text-2xl">✨</span>
									</div>
									<div class="p-4">
										<span class="text-xs text-pink-bright">{related.category}</span>
										<h3 class="text-white font-medium mt-1 group-hover:text-pink-bright transition-colors">{related.title}</h3>
									</div>
								</article>
							</a>
						{/each}
					</div>
				</div>
			</section>
		{/if}

		<!-- CTA -->
		<section class="py-16">
			<div class="max-w-4xl mx-auto px-4 text-center">
				<h2 class="text-3xl font-display text-white mb-4">Ready to Transform Your Hair?</h2>
				<p class="text-gray-light mb-8">
					Book an appointment with our expert stylists and experience the difference.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a href="/shop" class="px-8 py-4 border-2 border-pink-bright text-pink-bright font-semibold rounded-lg hover:bg-pink-bright hover:text-black transition-colors">
						Shop Recommended Products
					</a>
					<a href="/contact" class="px-8 py-4 bg-pink-bright text-black font-semibold rounded-lg hover:bg-pink-medium transition-colors">
						Book an Appointment
					</a>
				</div>
			</div>
		</section>
	</article>
{:else}
	<!-- 404 State -->
	<div class="min-h-screen bg-black flex items-center justify-center">
		<div class="text-center">
			<h1 class="text-4xl font-display text-white mb-4">Post Not Found</h1>
			<p class="text-gray-medium mb-8">The article you're looking for doesn't exist or has been removed.</p>
			<a href="/blog" class="px-8 py-4 bg-pink-bright text-black font-semibold rounded-lg hover:bg-pink-medium transition-colors">
				Browse All Articles
			</a>
		</div>
	</div>
{/if}
