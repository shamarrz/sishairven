import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { saveAppointment } from '$lib/db';
import { validateBookingData, validateOrThrow } from '$lib/security/validation';
import { applyRateLimit, rateLimiters, createRateLimitHeaders } from '$lib/security/rate-limit';
import { env } from '$env/dynamic/private';

/**
 * POST /api/book
 * Handle appointment booking with validation and rate limiting
 */
export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	try {
		// Apply rate limiting (5 requests per 5 minutes per IP)
		const rateLimitResult = applyRateLimit(request, {
			maxRequests: parseInt(env.RATE_LIMIT_REQUESTS_PER_MINUTE || '5'),
			windowMs: 300000, // 5 minutes
			burst: 1,
		});
		
		// Parse request body
		const data = await request.json();
		
		// Validate input data
		const validationResult = validateBookingData(data);
		const validatedData = validateOrThrow(validationResult, 400);
		
		// Save to database
		const id = await saveAppointment({
			name: validatedData.name,
			phone: validatedData.phone,
			email: validatedData.email,
			service: validatedData.service,
			date: validatedData.date,
			message: validatedData.message || ''
		});
		
		// Return success response with rate limit headers
		return json({
			success: true,
			id,
			message: 'Appointment request submitted successfully!'
		}, {
			headers: createRateLimitHeaders(rateLimitResult)
		});
		
	} catch (err) {
		// Handle validation errors
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		
		console.error('Booking error:', err);
		
		return json(
			{ error: 'Failed to process booking request' },
			{ status: 500 }
		);
	}
};

/**
 * GET /api/book
 * Get all appointments (admin only - requires authentication)
 */
export const GET: RequestHandler = async ({ request, locals }) => {
	// Apply stricter rate limiting for admin endpoints
	const rateLimitResult = applyRateLimit(request, {
		maxRequests: 30,
		windowMs: 60000,
		burst: 5,
	});
	
	// Check authentication (implement proper auth check)
	// For now, return unauthorized
	return json(
		{ error: 'Authentication required' },
		{ 
			status: 401,
			headers: createRateLimitHeaders(rateLimitResult)
		}
	);
};
