<script lang="ts">
  /**
   * SEO Component with Internationalization Support
   * 
   * Generates comprehensive SEO meta tags including:
   * - Basic meta tags (title, description)
   * - Open Graph tags
   * - Twitter Card tags
   * - Hreflang links for multilingual SEO
   * - Structured data (JSON-LD)
   * 
   * @component SEO
   * @author Hairven Dev Team
   * @since 2026-02-10
   */
  
  import { page } from '$app/stores';
  import { locale } from '$lib/i18n';
  import { supportedLanguages } from '$lib/types/geo';
  
  // Props
  export let title: string;
  export let description: string;
  export let type: 'website' | 'article' | 'product' = 'website';
  export let image: string = '/og-image.jpg';
  export let published: string | undefined = undefined;
  export let modified: string | undefined = undefined;
  export let author: string | undefined = undefined;
  export let keywords: string[] = [];
  export let noindex = false;
  export let schema: object | null = null;
  
  // Site config
  const siteName = 'Hairven by Elyn';
  const siteUrl = 'https://sishairven.com';
  const defaultImage = '/og-image.jpg';
  
  // Current language
  $: currentLang = $locale?.split('-')[0] || 'en';
  
  // Full title
  $: fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  
  // Full image URL
  $: imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  // Current path
  $: currentPath = $page.url.pathname;
  
  // Generate alternate language URLs
  $: alternateUrls = supportedLanguages
    .filter(lang => lang.enabled)
    .map(lang => {
      // Remove existing language prefix
      const cleanPath = currentPath.replace(/^\/(es|fr|de|pt|it)/, '') || '/';
      
      return {
        lang: lang.code,
        href: lang.code === 'en'
          ? `${siteUrl}${cleanPath}`
          : `${siteUrl}/${lang.code}${cleanPath}`,
      };
    });
  
  // Generate JSON-LD structured data
  $: structuredData = schema ? JSON.stringify(schema) : null;
  
  // Default website schema if none provided
  $: defaultSchema = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : type === 'product' ? 'Product' : 'WebPage',
    headline: title,
    description: description,
    url: `${siteUrl}${currentPath}`,
    image: imageUrl,
    ...(type === 'article' && {
      datePublished: published,
      dateModified: modified || published,
      author: {
        '@type': 'Person',
        name: author || 'Elyn Makna',
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
      },
    }),
  };
  
  $: finalSchema = schema || defaultSchema;
</script>

<svelte:head>
  <!-- Basic Meta Tags -->
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords.join(', ')} />
  <meta name="author" content={author || 'Elyn Makna'} />
  <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
  
  <!-- Canonical URL -->
  <link rel="canonical" href="{siteUrl}{currentPath}" />
  
  <!-- Hreflang Tags for Multilingual SEO -->
  {#each alternateUrls as {lang, href}}
    <link rel="alternate" hreflang={lang} href={href} />
  {/each}
  <!-- X-default for unmatched languages -->
  <link rel="alternate" hreflang="x-default" href="{siteUrl}{currentPath.replace(/^\/(es|fr|de|pt|it)/, '') || '/'}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content="{siteUrl}{currentPath}" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={imageUrl} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:locale" content={currentLang === 'en' ? 'en_US' : `${currentLang}_${currentLang.toUpperCase()}`} />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="{siteUrl}{currentPath}" />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={imageUrl} />
  
  <!-- Article Specific (if applicable) -->
  {#if type === 'article'}
    <meta property="article:published_time" content={published} />
    {#if modified}
      <meta property="article:modified_time" content={modified} />
    {/if}
    <meta property="article:author" content={author} />
  {/if}
  
  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
    {JSON.stringify(finalSchema)}
  </script>
</svelte:head>
