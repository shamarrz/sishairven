/**
 * Security Headers Configuration
 * 
 * Implements security best practices for HTTP headers:
 * - Content Security Policy (CSP)
 * - HTTP Strict Transport Security (HSTS)
 * - X-Frame-Options
 * - X-Content-Type-Options
 * - Referrer-Policy
 * - Permissions-Policy
 * 
 * @module lib/security/headers
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import { env } from '$env/dynamic/private';

/**
 * Generate a cryptographically secure nonce for CSP
 */
export function generateNonce(): string {
	const array = new Uint8Array(16);
	crypto.getRandomValues(array);
	return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * CSP directives configuration
 * Uses 'self' for same-origin and specific allowed domains
 */
export const cspDirectives = {
	'default-src': ["'self'"],
	'script-src': [
		"'self'",
		"'unsafe-inline'", // Required for SvelteKit inline scripts
		"'unsafe-eval'",   // Required for SvelteKit HMR in dev (remove in strict prod)
		'https://www.googletagmanager.com',
		'https://www.google-analytics.com',
		'https://pagead2.googlesyndication.com',
		'https://partner.googleadservices.com',
		'https://tpc.googlesyndication.com',
		'https://www.google.com',
		'https://connect.facebook.net',
		'https://js.stripe.com',
		'https://m.stripe.network',
	],
	'style-src': [
		"'self'",
		"'unsafe-inline'", // Required for Tailwind + Svelte
		'https://fonts.googleapis.com',
	],
	'img-src': [
		"'self'",
		'data:',
		'blob:',
		'https://m.media-amazon.com',
		'https://images-na.ssl-images-amazon.com',
		'https://www.google-analytics.com',
		'https://www.googletagmanager.com',
		'https://googleads.g.doubleclick.net',
		'https://pagead2.googlesyndication.com',
	],
	'font-src': [
		"'self'",
		'https://fonts.gstatic.com',
		'data:',
	],
	'connect-src': [
		"'self'",
		'https://www.google-analytics.com',
		'https://analytics.google.com',
		'https://pagead2.googlesyndication.com',
		'https://googleads.g.doubleclick.net',
		'https://www.amazon.com',
		'https://api.amazon.com',
		'https://*.sentry.io',
	],
	'frame-src': [
		"'self'",
		'https://googleads.g.doubleclick.net',
		'https://tpc.googlesyndication.com',
		'https://js.stripe.com',
		'https://www.youtube.com',
		'https://www.youtube-nocookie.com',
	],
	'object-src': ["'none'"],
	'base-uri': ["'self'"],
	'form-action': ["'self'"],
	'frame-ancestors': ["'self'"],
	'upgrade-insecure-requests': [],
};

/**
 * Build CSP header string from directives
 */
export function buildCSPHeader(nonce?: string): string {
	const directives = { ...cspDirectives };
	
	// Add nonce to script-src if provided
	if (nonce) {
		directives['script-src'] = [`'nonce-${nonce}'`, ...directives['script-src'].filter(s => s !== "'unsafe-inline'")];
	}
	
	return Object.entries(directives)
		.map(([key, values]) => {
			if (values.length === 0) return key;
			return `${key} ${values.join(' ')}`;
		})
		.join('; ');
}

/**
 * Security headers configuration
 */
export interface SecurityHeaders {
	// Content Security Policy
	'Content-Security-Policy': string;
	// Prevent MIME type sniffing
	'X-Content-Type-Options': 'nosniff';
	// Prevent clickjacking
	'X-Frame-Options': 'DENY' | 'SAMEORIGIN';
	// XSS Protection (legacy but still useful)
	'X-XSS-Protection': '1; mode=block';
	// Control referrer information
	'Referrer-Policy': string;
	// Control browser features
	'Permissions-Policy': string;
	// HSTS (only in production with HTTPS)
	'Strict-Transport-Security'?: string;
	// Remove server identification
	'X-Powered-By'?: string;
	'Server'?: string;
}

/**
 * Generate security headers based on environment
 */
export function getSecurityHeaders(isProduction: boolean, nonce?: string): SecurityHeaders {
	const headers: SecurityHeaders = {
		'Content-Security-Policy': buildCSPHeader(nonce),
		'X-Content-Type-Options': 'nosniff',
		'X-Frame-Options': 'SAMEORIGIN', // Allow framing from same origin
		'X-XSS-Protection': '1; mode=block',
		'Referrer-Policy': 'strict-origin-when-cross-origin',
		'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
	};
	
	// Add HSTS in production (requires HTTPS)
	if (isProduction) {
		headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
	}
	
	// Remove server identification
	headers['X-Powered-By'] = '';
	
	return headers;
}

/**
 * Apply security headers to a Response object
 */
export function applySecurityHeaders(
	response: Response,
	isProduction: boolean,
	nonce?: string
): Response {
	const headers = getSecurityHeaders(isProduction, nonce);
	
	Object.entries(headers).forEach(([key, value]) => {
		if (value) {
			response.headers.set(key, value);
		} else {
			response.headers.delete(key);
		}
	});
	
	return response;
}

/**
 * Check if request is from a trusted proxy
 */
export function isTrustedProxy(clientIP: string, trustedProxies: string[] = []): boolean {
	const defaults = ['127.0.0.1', '::1', '::ffff:127.0.0.1'];
	const trusted = [...defaults, ...trustedProxies];
	return trusted.includes(clientIP);
}

/**
 * Get client IP considering trusted proxies
 */
export function getClientIP(request: Request, trustedProxies?: string[]): string {
	const forwardedFor = request.headers.get('X-Forwarded-For');
	const realIP = request.headers.get('X-Real-IP');
	
	// If we have forwarded headers and trust the source
	if (forwardedFor) {
		const ips = forwardedFor.split(',').map(ip => ip.trim());
		// Return the leftmost (original client) IP if we trust the proxy
		if (trustedProxies && trustedProxies.length > 0) {
			return ips[0];
		}
	}
	
	return realIP || 'unknown';
}
