import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://sishairven.com/sitemap.xml

# Disallow admin areas (none currently)
# Disallow: /admin
`;

	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};
