import type { RequestHandler } from './$types';
import { siteConfig } from '$lib/utils/seo';
import { getPublishedPosts } from '$lib/content/posts';

export const GET: RequestHandler = () => {
	const baseUrl = siteConfig.url;
	const posts = getPublishedPosts();
	
	const staticPages = [
		{ url: '/', priority: '1.0', changefreq: 'weekly' },
		{ url: '/about', priority: '0.8', changefreq: 'monthly' },
		{ url: '/contact', priority: '0.8', changefreq: 'monthly' },
		{ url: '/services', priority: '0.9', changefreq: 'weekly' },
		{ url: '/shop', priority: '0.8', changefreq: 'weekly' },
		{ url: '/blog', priority: '0.8', changefreq: 'daily' },
		{ url: '/privacy', priority: '0.3', changefreq: 'yearly' },
		{ url: '/terms', priority: '0.3', changefreq: 'yearly' },
		{ url: '/affiliate-disclosure', priority: '0.3', changefreq: 'yearly' }
	];
	
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `\t<url>
\t\t<loc>${baseUrl}${page.url}</loc>
\t\t<changefreq>${page.changefreq}</changefreq>
\t\t<priority>${page.priority}</priority>
\t</url>`).join('\n')}
${posts.map(post => `\t<url>
\t\t<loc>${baseUrl}/blog/${post.slug}</loc>
\t\t<lastmod>${post.date}</lastmod>
\t\t<changefreq>monthly</changefreq>
\t\t<priority>0.7</priority>
\t</url>`).join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
