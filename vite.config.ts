import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 3000,
		host: '0.0.0.0',
	},
	build: {
		// Generate source maps for production debugging
		sourcemap: true,
		// Optimize chunk size
		chunkSizeWarningLimit: 1000,
		// Rollup options for better optimization
		rollupOptions: {
			output: {
				// Manual chunk splitting for better caching
				manualChunks: {
					// Vendor chunks
					'vendor': [
						'svelte',
						'svelte-i18n',
					],
					// Analytics chunk (lazy loaded)
					'analytics': [
						// Google Analytics will be loaded dynamically
					],
				},
				// Asset naming for better caching
				entryFileNames: 'js/[name]-[hash].js',
				chunkFileNames: 'js/[name]-[hash].js',
				assetFileNames: (assetInfo) => {
					const info = assetInfo.name || '';
					if (info.endsWith('.css')) {
						return 'css/[name]-[hash][extname]';
					}
					if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(info)) {
						return 'images/[name]-[hash][extname]';
					}
					if (/\.(woff2?|ttf|otf|eot)$/.test(info)) {
						return 'fonts/[name]-[hash][extname]';
					}
					return 'assets/[name]-[hash][extname]';
				},
			},
		},
		// Minification options
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
			format: {
				comments: false,
			},
		},
	},
	// CSS optimization
	css: {
		devSourcemap: true,
	},
	// Optimize dependencies
	optimizeDeps: {
		include: ['svelte-i18n'],
	},
	// Define constants for build
	define: {
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
		__BUILD_TIME__: JSON.stringify(new Date().toISOString()),
	},
});
