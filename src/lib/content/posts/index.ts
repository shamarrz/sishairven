// Dynamic import map for blog posts
// Each slug maps to its corresponding Svelte component

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postComponents: Record<string, () => Promise<any>> = {
	'best-hair-dryers-2025': () => import('./best-hair-dryers-2025.svelte'),
	'keratin-treatment-guide': () => import('./keratin-treatment-guide.svelte'),
	// Fallback for other posts will use default.svelte
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPostComponent(slug: string): () => Promise<any> {
	// Return specific component if exists, otherwise use default
	return postComponents[slug] || (() => import('./default.svelte'));
}
