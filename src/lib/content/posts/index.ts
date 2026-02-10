// Dynamic import map for blog posts
// Each slug maps to its corresponding Svelte component

export const postComponents: Record<string, () => Promise<typeof import('*.svelte')>> = {
	'best-hair-dryers-2025': () => import('./best-hair-dryers-2025.svelte'),
	'keratin-treatment-guide': () => import('./keratin-treatment-guide.svelte'),
	// Fallback for other posts will use default.svelte
};

export function getPostComponent(slug: string) {
	// Return specific component if exists, otherwise use default
	return postComponents[slug] || (() => import('./default.svelte'));
}
