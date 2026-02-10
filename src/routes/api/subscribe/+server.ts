import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateEmail, validateName, validateOrThrow } from '$lib/security/validation';
import { applyRateLimit, createRateLimitHeaders } from '$lib/security/rate-limit';

interface SubscribeRequest {
	email: string;
	name?: string;
}

/**
 * POST /api/subscribe
 * Handle newsletter subscription with validation
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		// Apply rate limiting (3 subscriptions per 10 minutes per IP)
		const rateLimitResult = applyRateLimit(request, {
			maxRequests: 3,
			windowMs: 600000, // 10 minutes
			burst: 1,
		});
		
		// Parse request body
		const data: SubscribeRequest = await request.json();
		
		// Validate email
		const emailResult = validateEmail(data.email);
		validateOrThrow(emailResult, 400);
		
		// Validate name if provided
		if (data.name) {
			const nameResult = validateName(data.name, 'Name');
			validateOrThrow(nameResult, 400);
		}
		
		// TODO: Integrate with email service (Mailchimp, SendGrid, etc.)
		// For now, just log and return success
		console.log('Newsletter subscription:', {
			email: emailResult.data,
			name: data.name,
			timestamp: new Date().toISOString()
		});
		
		return json({
			success: true,
			message: 'Subscription successful!'
		}, {
			headers: createRateLimitHeaders(rateLimitResult)
		});
		
	} catch (err) {
		// Handle validation errors
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		
		console.error('Subscription error:', err);
		
		return json(
			{ error: 'Failed to process subscription' },
			{ status: 500 }
		);
	}
};
