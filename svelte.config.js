import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			out: 'build',
			// Precompress files for better performance
			precompress: {
				brotli: true,
				gzip: true,
			},
			// Clean build output
			clean: true,
		}),
		// Security and performance headers for static assets
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ["'self'"],
				'script-src': ["'self'", "'unsafe-inline'"],
				'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
				'img-src': ["'self'", 'data:', 'blob:', 'https://m.media-amazon.com', 'https://images-na.ssl-images-amazon.com'],
				'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
				'connect-src': ["'self'", 'https://www.google-analytics.com', 'https://*.sentry.io'],
				'frame-src': ["'self'", 'https://js.stripe.com'],
				'object-src': ["'none'"],
				'base-uri': ["'self'"],
				'form-action': ["'self'"],
			},
		},
		// Module aliases
		alias: {
			$components: 'src/lib/components',
			$utils: 'src/lib/utils',
			$stores: 'src/lib/stores',
			$types: 'src/lib/types',
			$i18n: 'src/lib/i18n',
			$content: 'src/lib/content',
		},
		// Prerender configuration
		prerender: {
			entries: ['/', '/about', '/contact', '/services', '/shop', '/blog', '/privacy', '/terms', '/affiliate-disclosure'],
			origin: 'https://sishairven.com',
		},
		// Service worker
		serviceWorker: {
			register: true,
		},
		// Version for cache busting
		version: {
			name: process.env.npm_package_version || Date.now().toString(),
		},
	},
};

export default config;
